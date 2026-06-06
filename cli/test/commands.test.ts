import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { run } from "../src/index.js";
import type { RuntimePaths } from "../src/core.js";

const osRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const runtimePaths: RuntimePaths = {
  root: osRoot,
  projectSkeleton: path.join(osRoot, "project-skeleton"),
  templates: path.join(osRoot, "templates")
};

function tempCwd(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "aios-cmd-"));
}

test("help explains the CLI purpose and available commands", () => {
  const output = run(["help"], { runtimePaths, cwd: tempCwd() });

  assert.match(output, /AIOS helps you create and maintain an AI-ready project structure/);
  assert.match(output, /aios init <project-name>/);
  assert.match(output, /aios adopt \[project-path\]/);
  assert.match(output, /aios validate \[project-path\]/);
  assert.match(output, /Typical workflow:/);
});

test("init copies the project skeleton", () => {
  const cwd = tempCwd();
  const output = run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  assert.match(output, /Created AI-ready project/);
  assert.ok(fs.existsSync(path.join(project, "AGENTS.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "context", "context-map.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "product", "features")));
  assert.ok(fs.existsSync(path.join(project, "docs", "reviews")));
});

test("adopt adds missing AI Dev OS files without overwriting existing files", () => {
  const cwd = tempCwd();
  const project = path.join(cwd, "existing-project");
  fs.mkdirSync(project, { recursive: true });
  fs.writeFileSync(path.join(project, "README.md"), "# Existing Project\n");

  const output = run(["adopt", "existing-project"], { runtimePaths, cwd });

  assert.match(output, /Adopted AI Dev OS structure/);
  assert.equal(fs.readFileSync(path.join(project, "README.md"), "utf8"), "# Existing Project\n");
  assert.ok(fs.existsSync(path.join(project, "AGENTS.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "context", "context-map.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "product", "features")));
  assert.ok(fs.existsSync(path.join(project, "docs", "reviews")));
  assert.ok(fs.existsSync(path.join(project, "frontend")));
  assert.ok(fs.existsSync(path.join(project, "backend")));

  const validateOutput = run(["validate"], { runtimePaths, cwd: project });
  assert.match(validateOutput, /AI-ready structure validated/);
});

test("adopt defaults to the current working directory", () => {
  const project = tempCwd();
  fs.writeFileSync(path.join(project, "README.md"), "# Existing Project\n");

  run(["adopt"], { runtimePaths, cwd: project });

  assert.ok(fs.existsSync(path.join(project, "AGENTS.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "product", "vision.md")));
});

test("adr, task, and review create files in a generated project", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  run(["adr", "Use Server Date"], { runtimePaths, cwd: project });
  run(["task", "Implement Habit API"], { runtimePaths, cwd: project });
  run(["review", "Habit API"], { runtimePaths, cwd: project });

  assert.ok(fs.existsSync(path.join(project, "docs", "adr", "ADR-001-use-server-date.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "tasks", "TASK-001-implement-habit-api.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "reviews", "habit-api-review.md")));
});

test("feature creates a feature PRD stub", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  run(["feature", "Habit Reminders"], { runtimePaths, cwd: project });

  assert.ok(fs.existsSync(path.join(project, "docs", "product", "features", "habit-reminders.prd.md")));
});

test("validate succeeds for generated skeleton", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  const output = run(["validate"], { runtimePaths, cwd: project });

  assert.match(output, /AI-ready structure validated/);
});
