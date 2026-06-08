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
  aiosKitSource: osRoot,
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
  assert.match(output, /aios command-list \[project-path\]/);
  assert.match(output, /aios command <name> \[project-path\]/);
  assert.match(output, /aios agent-install \[project-path\]/);
  assert.match(output, /aios agent-list/);
  assert.match(output, /aios config \[project-path\]/);
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
  assert.ok(fs.existsSync(path.join(project, ".aios", "skill-router.md")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "commands", "generate-prd.md")));
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

test("init supports project shapes and validate follows the configured shape", () => {
  const cwd = tempCwd();

  run(["init", "frontend-project", "--shape", "frontend"], { runtimePaths, cwd });
  const frontendProject = path.join(cwd, "frontend-project");
  assert.ok(fs.existsSync(path.join(frontendProject, "frontend")));
  assert.equal(fs.existsSync(path.join(frontendProject, "backend")), false);
  assert.match(run(["validate", "frontend-project"], { runtimePaths, cwd }), /AI-ready structure validated/);
  assert.equal(JSON.parse(run(["config", "frontend-project"], { runtimePaths, cwd })).projectShape, "frontend");

  run(["init", "backend-project", "--shape", "backend"], { runtimePaths, cwd });
  const backendProject = path.join(cwd, "backend-project");
  assert.ok(fs.existsSync(path.join(backendProject, "backend")));
  assert.equal(fs.existsSync(path.join(backendProject, "frontend")), false);
  assert.match(run(["validate", "backend-project"], { runtimePaths, cwd }), /AI-ready structure validated/);

  run(["init", "mobile-project", "--shape", "mobile"], { runtimePaths, cwd });
  assert.ok(fs.existsSync(path.join(cwd, "mobile-project", "mobile")));
  assert.match(run(["validate", "mobile-project"], { runtimePaths, cwd }), /AI-ready structure validated/);

  run(["init", "library-project", "--shape", "library"], { runtimePaths, cwd });
  assert.ok(fs.existsSync(path.join(cwd, "library-project", "src")));
  assert.match(run(["validate", "library-project"], { runtimePaths, cwd }), /AI-ready structure validated/);

  run(["init", "docs-project", "--shape", "docs"], { runtimePaths, cwd });
  assert.equal(fs.existsSync(path.join(cwd, "docs-project", "frontend")), false);
  assert.equal(fs.existsSync(path.join(cwd, "docs-project", "backend")), false);
  assert.match(run(["validate", "docs-project"], { runtimePaths, cwd }), /AI-ready structure validated/);
});

test("lite shape can be validated with an explicit shape override", () => {
  const cwd = tempCwd();
  run(["init", "lite-frontend", "--lite", "--shape", "frontend"], { runtimePaths, cwd });
  const project = path.join(cwd, "lite-frontend");

  assert.ok(fs.existsSync(path.join(project, "frontend")));
  assert.equal(fs.existsSync(path.join(project, "backend")), false);
  assert.match(run(["validate", "lite-frontend", "--lite", "--shape", "frontend"], { runtimePaths, cwd }), /AI-ready structure validated/);
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
  assert.ok(fs.existsSync(path.join(project, ".aios", "skill-router.md")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "commands", "review-code.md")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "skills", "context-management", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "workflows", "review.workflow.md")));
});

test("init can use a configurable docs root", () => {
  const cwd = tempCwd();
  run(["init", "clean-project", "--docs-root", ".aios/project-docs"], { runtimePaths, cwd });
  const project = path.join(cwd, "clean-project");

  assert.equal(fs.existsSync(path.join(project, "docs")), false);
  assert.ok(fs.existsSync(path.join(project, ".aios", "project-docs", "product", "vision.md")));

  run(["task", "Implement Auth"], { runtimePaths, cwd: project });
  run(["openapi", "Auth API"], { runtimePaths, cwd: project });

  assert.ok(fs.existsSync(path.join(project, ".aios", "project-docs", "tasks", "TASK-001-implement-auth.md")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "project-docs", "api", "auth-api.openapi.yaml")));
  assert.match(run(["next"], { runtimePaths, cwd: project }), /\.aios\/project-docs\/product\/vision.md/);
  assert.match(run(["validate"], { runtimePaths, cwd: project }), /AI-ready structure validated/);
});

test("native skill delivery installs agent skills without portable .aios skills", () => {
  const cwd = tempCwd();
  run(
    [
      "init",
      "native-project",
      "--agents",
      "codex,qwen",
      "--skills",
      "core",
      "--skill-delivery",
      "native"
    ],
    { runtimePaths, cwd }
  );
  const project = path.join(cwd, "native-project");

  assert.equal(fs.existsSync(path.join(project, ".aios", "skills")), false);
  assert.ok(fs.existsSync(path.join(project, ".agents", "skills", "context-management", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(project, ".agents", "skills", "context-management", "agents", "openai.yaml")));
  assert.ok(fs.existsSync(path.join(project, ".qwen", "skills", "implementation-planner", "SKILL.md")));
  assert.match(run(["validate"], { runtimePaths, cwd: project }), /AI-ready structure validated/);

  const config = JSON.parse(run(["config"], { runtimePaths, cwd: project })) as { skillDelivery: string; selectedAgents: string[] };
  assert.equal(config.skillDelivery, "native");
  assert.deepEqual(config.selectedAgents, ["codex", "qwen"]);
});

test("agent-install supports dry-run, selected agents, selected skills, and skip existing", () => {
  const cwd = tempCwd();
  run(["init", "agent-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "agent-project");

  const dryRun = run(["agent-install", "agent-project", "--agents", "opencode,antigravity", "--skills", "testing", "--dry-run"], {
    runtimePaths,
    cwd
  });
  assert.match(dryRun, /Planned native agent skill install/);
  assert.equal(fs.existsSync(path.join(project, ".opencode", "skills", "testing", "SKILL.md")), false);

  const output = run(["agent-install", "agent-project", "--agents", "opencode,antigravity", "--skills", "testing"], {
    runtimePaths,
    cwd
  });
  assert.match(output, /Created: 2/);
  assert.ok(fs.existsSync(path.join(project, ".opencode", "skills", "testing", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(project, ".agent", "skills", "testing", "SKILL.md")));

  const skipped = run(["agent-install", "agent-project", "--agents", "opencode", "--skills", "testing"], { runtimePaths, cwd });
  assert.match(skipped, /Skipped existing: 1/);
});

test("command-list and command expose local workflow command prompts", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  const listOutput = run(["command-list"], { runtimePaths, cwd: project });
  assert.match(listOutput, /generate-prd/);
  assert.match(listOutput, /implement-task/);
  assert.match(listOutput, /review-code/);

  const commandOutput = run(["command", "generate-prd"], { runtimePaths, cwd: project });
  assert.match(commandOutput, /Command: Generate PRD/);
  assert.match(commandOutput, /skills\/prd-generator\/SKILL.md/);
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
