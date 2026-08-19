import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  detectTestRunner,
  getGitChanges,
  runVerification,
  loadAllTasks,
  resolveTaskGraph,
  detectCycles,
  formatTaskGraph,
  getRuntimePaths,
  type TaskInfo
} from "../src/core.js";
import { run } from "../src/index.js";

function tempCwd(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "aios-verify-test-"));
}

const runtimePaths = getRuntimePaths();

test("detectTestRunner identifies npm test in package.json", () => {
  const cwd = tempCwd();
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    JSON.stringify({ name: "demo", scripts: { test: "node --test" } }, null, 2)
  );

  const runner = detectTestRunner(cwd);
  assert.ok(runner);
  assert.equal(runner.runner, "npm");
  assert.equal(runner.command, "npm test");
});

test("detectTestRunner identifies pytest, cargo, go, and dart", () => {
  const pyDir = tempCwd();
  fs.writeFileSync(path.join(pyDir, "pytest.ini"), "[pytest]\n");
  assert.equal(detectTestRunner(pyDir)?.runner, "pytest");

  const cargoDir = tempCwd();
  fs.writeFileSync(path.join(cargoDir, "Cargo.toml"), "[package]\nname = \"demo\"\n");
  assert.equal(detectTestRunner(cargoDir)?.runner, "cargo");

  const goDir = tempCwd();
  fs.writeFileSync(path.join(goDir, "go.mod"), "module demo\n");
  assert.equal(detectTestRunner(goDir)?.runner, "go");

  const dartDir = tempCwd();
  fs.writeFileSync(path.join(dartDir, "pubspec.yaml"), "name: demo\n");
  assert.equal(detectTestRunner(dartDir)?.runner, "dart");

  const gradleDir = tempCwd();
  fs.writeFileSync(path.join(gradleDir, "build.gradle.kts"), "plugins {}\n");
  assert.equal(detectTestRunner(gradleDir)?.runner, "gradle");
});

test("runVerification returns pass for successful test command", () => {
  const cwd = tempCwd();
  const result = runVerification({
    projectPath: cwd,
    testCommand: "node -e \"process.exit(0)\""
  });

  assert.equal(result.ok, true);
  assert.equal(result.testPassed, true);
  assert.match(result.summary, /VERIFICATION PASSED/);
});

test("runVerification returns fail for failing test command", () => {
  const cwd = tempCwd();
  const result = runVerification({
    projectPath: cwd,
    testCommand: "node -e \"process.exit(1)\""
  });

  assert.equal(result.ok, false);
  assert.equal(result.testPassed, false);
  assert.match(result.summary, /VERIFICATION FAILED/);
});

test("loadAllTasks parses task metadata and dependencies", () => {
  const cwd = tempCwd();
  const tasksDir = path.join(cwd, "docs", "tasks");
  fs.mkdirSync(tasksDir, { recursive: true });

  fs.writeFileSync(
    path.join(tasksDir, "TASK-001-setup.md"),
    "# TASK-001: Project Setup\n\n## Status\n\nDone\n\n## Dependencies\n\n- Blocking tasks: None\n"
  );
  fs.writeFileSync(
    path.join(tasksDir, "TASK-002-feature.md"),
    "# TASK-002: Feature Implementation\n\n## Status\n\nActive\n\n## Dependencies\n\n- depends_on: [\"TASK-001\"]\n"
  );
  fs.writeFileSync(
    path.join(tasksDir, "TASK-003-extra.md"),
    "# TASK-003: Extra Feature\n\n## Status\n\nPlanned\n\n## Dependencies\n\n- depends_on: [\"TASK-002\"]\n"
  );

  const tasks = loadAllTasks(tasksDir);
  assert.equal(tasks.length, 3);
  assert.equal(tasks[0].id, "TASK-001");
  assert.equal(tasks[0].status, "Done");
  assert.equal(tasks[1].id, "TASK-002");
  assert.deepEqual(tasks[1].dependsOn, ["TASK-001"]);
  assert.equal(tasks[2].id, "TASK-003");
  assert.deepEqual(tasks[2].dependsOn, ["TASK-002"]);

  const resolution = resolveTaskGraph(tasks);
  assert.equal(resolution.done.length, 1);
  assert.equal(resolution.done[0].id, "TASK-001");
  assert.equal(resolution.ready.length, 1);
  assert.equal(resolution.ready[0].id, "TASK-002");
  assert.equal(resolution.blocked.length, 1);
  assert.equal(resolution.blocked[0].task.id, "TASK-003");
  assert.deepEqual(resolution.blocked[0].missingDependencies, ["TASK-002"]);
});

test("detectCycles identifies circular task dependencies", () => {
  const tasks: TaskInfo[] = [
    {
      id: "TASK-001",
      filePath: "/tasks/TASK-001.md",
      relativePath: "tasks/TASK-001.md",
      title: "Task 1",
      status: "Planned",
      dependsOn: ["TASK-002"]
    },
    {
      id: "TASK-002",
      filePath: "/tasks/TASK-002.md",
      relativePath: "tasks/TASK-002.md",
      title: "Task 2",
      status: "Planned",
      dependsOn: ["TASK-001"]
    }
  ];

  const cycles = detectCycles(tasks);
  assert.ok(cycles.length > 0);
  assert.deepEqual(cycles[0], ["TASK-001", "TASK-002", "TASK-001"]);
});

test("aios tasks command outputs formatted dependency graph", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  const tasksDir = path.join(project, "docs", "tasks");
  fs.writeFileSync(
    path.join(tasksDir, "TASK-001-foundation.md"),
    "# TASK-001: Foundation\n\n## Status\n\nDone\n"
  );
  fs.writeFileSync(
    path.join(tasksDir, "TASK-002-api.md"),
    "# TASK-002: API\n\n## Status\n\nPlanned\n\n## Dependencies\n\n- depends_on: [\"TASK-001\"]\n"
  );

  const output = run(["tasks", "demo-project"], { runtimePaths, cwd });
  assert.match(output, /AIOS Task Dependency Graph/);
  assert.match(output, /Ready for Execution \(1\)/);
  assert.match(output, /TASK-002/);
  assert.match(output, /Completed \(1\)/);
  assert.match(output, /TASK-001/);
});

test("aios verify command runs in project with custom test command", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  const output = run(["verify", "demo-project", "--test-command", "node -e \"process.exit(0)\""], {
    runtimePaths,
    cwd
  });

  assert.match(output, /AIOS Verification Report/);
  assert.match(output, /Test Result: PASSED/);
  assert.match(output, /Verdict: VERIFICATION PASSED/);
});
