import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import packageJson from "../package.json" with { type: "json" };
import { run } from "../src/index.js";
import type { RuntimePaths } from "../src/core.js";

const osRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const runtimePaths: RuntimePaths = {
  root: osRoot,
  aiosKit: path.join(osRoot, "aios-kit"),
  projectSkeleton: path.join(osRoot, "project-skeleton"),
  templates: path.join(osRoot, "templates"),
  starters: path.join(osRoot, "starters")
};

function tempCwd(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "aios-cmd-"));
}

test("help explains the CLI purpose and available commands", () => {
  const output = run(["help"], { runtimePaths, cwd: tempCwd() });

  assert.match(output, /AIOS helps you create and maintain an AI-ready project structure/);
  assert.match(output, /aios -v/);
  assert.match(output, /aios init <project-name> \[--lite\]/);
  assert.match(output, /aios starter <starter-name> <project-name> \[--lite\]/);
  assert.match(output, /aios adopt \[project-path\]/);
  assert.match(output, /aios install-kit \[project-path\]/);
  assert.match(output, /aios openapi <api-name>/);
  assert.match(output, /aios migration <migration-name>/);
  assert.match(output, /aios security <review-name>/);
  assert.match(output, /aios release <release-name>/);
  assert.match(output, /aios validate \[project-path\] \[--lite\]/);
  assert.match(output, /aios next \[project-path\]/);
  assert.match(output, /Typical workflow:/);
});

test("version commands show the installed CLI version", () => {
  assert.equal(run(["-v"], { runtimePaths, cwd: tempCwd() }), `aios ${packageJson.version}`);
  assert.equal(run(["--version"], { runtimePaths, cwd: tempCwd() }), `aios ${packageJson.version}`);
});

test("init copies the project skeleton", () => {
  const cwd = tempCwd();
  const output = run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  assert.match(output, /Created AI-ready project/);
  assert.ok(fs.existsSync(path.join(project, "AGENTS.md")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "skills", "context-management", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "prompts", "01-generate-prd.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "context", "context-map.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "context", "development-start.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "product", "features")));
  assert.ok(fs.existsSync(path.join(project, "docs", "reviews")));
});

test("init --lite skips the local AIOS kit", () => {
  const cwd = tempCwd();
  run(["init", "demo-project", "--lite"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  assert.ok(fs.existsSync(path.join(project, "AGENTS.md")));
  assert.equal(fs.existsSync(path.join(project, ".aios")), false);

  const output = run(["validate", "demo-project", "--lite"], { runtimePaths, cwd });
  assert.match(output, /AI-ready structure validated/);
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
  assert.ok(fs.existsSync(path.join(project, ".aios", "skills", "context-management", "SKILL.md")));
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
  assert.ok(fs.existsSync(path.join(project, ".aios", "templates", "task.template.md")));
});

test("install-kit adds missing local workflow assets without overwriting existing files", () => {
  const cwd = tempCwd();
  run(["init", "demo-project", "--lite"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");
  const customPrompt = path.join(project, ".aios", "prompts", "01-generate-prd.md");
  fs.mkdirSync(path.dirname(customPrompt), { recursive: true });
  fs.writeFileSync(customPrompt, "# Custom prompt\n");

  const output = run(["install-kit"], { runtimePaths, cwd: project });

  assert.match(output, /Installed AIOS workflow kit/);
  assert.equal(fs.readFileSync(customPrompt, "utf8"), "# Custom prompt\n");
  assert.ok(fs.existsSync(path.join(project, ".aios", "skills", "context-management", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "workflows", "review.workflow.md")));
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

test("starter creates an AI docs only stack starter and refuses overwrite", () => {
  const cwd = tempCwd();

  const output = run(["starter", "flutter-mobile", "demo-mobile"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-mobile");

  assert.match(output, /Created AI-ready flutter-mobile starter/);
  assert.ok(fs.existsSync(path.join(project, "AGENTS.md")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "skills", "context-management", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "context", "context-map.md")));
  assert.ok(fs.existsSync(path.join(project, "mobile")));
  assert.throws(
    () => run(["starter", "flutter-mobile", "demo-mobile"], { runtimePaths, cwd }),
    /Refusing to overwrite non-empty directory/
  );
});

test("starter --lite skips the local AIOS kit", () => {
  const cwd = tempCwd();

  run(["starter", "fullstack-saas", "demo-saas", "--lite"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-saas");

  assert.ok(fs.existsSync(path.join(project, "frontend")));
  assert.equal(fs.existsSync(path.join(project, ".aios")), false);
});

test("fullstack starter creates frontend and backend placeholders", () => {
  const cwd = tempCwd();

  run(["starter", "fullstack-saas", "demo-saas"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-saas");

  assert.ok(fs.existsSync(path.join(project, "frontend")));
  assert.ok(fs.existsSync(path.join(project, "backend")));
  assert.ok(fs.existsSync(path.join(project, "docs", "api")));

  const validateOutput = run(["validate"], { runtimePaths, cwd: project });
  assert.match(validateOutput, /AI-ready structure validated/);
});

test("openapi, migration, security, and release create V2.x documents", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  run(["openapi", "Habit API"], { runtimePaths, cwd: project });
  run(["migration", "Create Habits Table"], { runtimePaths, cwd: project });
  run(["security", "Habit API"], { runtimePaths, cwd: project });
  const releaseOutput = run(["release", "0.3.0"], { runtimePaths, cwd: project });

  assert.ok(fs.existsSync(path.join(project, "docs", "api", "habit-api.openapi.yaml")));
  assert.ok(fs.existsSync(path.join(project, "docs", "database", "migrations", "MIGRATION-001-create-habits-table.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "security", "habit-api-security-review.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "releases", "0-3-0-release.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "releases", "CHANGELOG.md")));
  assert.match(releaseOutput, /Created changelog draft/);
});

test("validate succeeds for generated skeleton", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  const output = run(["validate"], { runtimePaths, cwd: project });

  assert.match(output, /AI-ready structure validated/);
  assert.match(output, /Warnings:/);
  assert.match(output, /Optional V2.x path not found: docs\/security/);
});

test("validate requires local AIOS kit unless lite mode is used", () => {
  const cwd = tempCwd();
  run(["init", "demo-project", "--lite"], { runtimePaths, cwd });

  const output = run(["validate", "demo-project"], { runtimePaths, cwd });
  assert.match(output, /AI-ready structure is incomplete/);
  assert.match(output, /\.aios\/skills\/context-management\/SKILL.md/);
  process.exitCode = undefined;

  const liteOutput = run(["validate", "demo-project", "--lite"], { runtimePaths, cwd });
  assert.match(liteOutput, /AI-ready structure validated/);
});

test("next reports vision, PRD, architecture, task creation, and task-ready states", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  assert.match(run(["next"], { runtimePaths, cwd: project }), /Fill `docs\/product\/vision.md`/);

  fs.writeFileSync(path.join(project, "docs", "product", "vision.md"), "# Product Vision\n\nReal product vision.\n");
  assert.match(run(["next"], { runtimePaths, cwd: project }), /Generate `docs\/product\/prd.md`/);

  fs.writeFileSync(path.join(project, "docs", "product", "prd.md"), "# PRD\n\nReal requirements.\n");
  assert.match(run(["next"], { runtimePaths, cwd: project }), /Generate `docs\/architecture\/architecture.md`/);

  fs.writeFileSync(path.join(project, "docs", "architecture", "architecture.md"), "# Architecture\n\nReal architecture.\n");
  assert.match(run(["next"], { runtimePaths, cwd: project }), /Create the first implementation task/);

  run(["task", "Implement habit API"], { runtimePaths, cwd: project });
  assert.match(run(["next"], { runtimePaths, cwd: project }), /Open the active task/);
});
