import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { run } from "../src/index.js";

const osRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");

function tempCwd(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "aios-cmd-"));
}

test("init copies the project skeleton", () => {
  const cwd = tempCwd();
  const output = run(["init", "demo-project"], { osRoot, cwd });
  const project = path.join(cwd, "demo-project");

  assert.match(output, /Created AI-ready project/);
  assert.ok(fs.existsSync(path.join(project, "AGENTS.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "context", "context-map.md")));
});

test("adr, task, and review create files in a generated project", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { osRoot, cwd });
  const project = path.join(cwd, "demo-project");

  run(["adr", "Use Server Date"], { osRoot, cwd: project });
  run(["task", "Implement Habit API"], { osRoot, cwd: project });
  run(["review", "Habit API"], { osRoot, cwd: project });

  assert.ok(fs.existsSync(path.join(project, "docs", "adr", "ADR-001-use-server-date.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "tasks", "TASK-001-implement-habit-api.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "reviews", "habit-api-review.md")));
});

test("feature creates a feature PRD stub", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { osRoot, cwd });
  const project = path.join(cwd, "demo-project");

  run(["feature", "Habit Reminders"], { osRoot, cwd: project });

  assert.ok(fs.existsSync(path.join(project, "docs", "product", "features", "habit-reminders.prd.md")));
});

test("validate succeeds for generated skeleton", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { osRoot, cwd });
  const project = path.join(cwd, "demo-project");

  const output = run(["validate"], { osRoot, cwd: project });

  assert.match(output, /AI-ready structure validated/);
});
