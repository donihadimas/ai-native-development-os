import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import packageJson from "../package.json" with { type: "json" };
import { run } from "../src/index.js";
import type { RuntimePaths } from "../src/core.js";

const osRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
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

  assert.match(output, /The CLI is only for setup, validation, and generating AIOS template files/);
  assert.match(output, /For AI-native development, use Codex or another AI/);
  assert.match(output, /The CLI does not\s+run the agent or generate application code/);
  assert.match(output, /aios\n    Open the guided setup wizard/);
  assert.match(output, /Start here:/);
  assert.match(output, /Common commands:/);
  assert.match(output, /Advanced commands:/);
  assert.match(output, /Document commands:/);
  assert.match(output, /aios -v/);
  assert.match(output, /aios init <project-name> \[--lite\].*\[--agents <list>\].*\[--yes\]/);
  assert.match(output, /aios starter <starter-name> <project-name> \[--lite\].*\[--agents <list>\].*\[--yes\]/);
  assert.match(output, /aios adopt \[project-path\]/);
  assert.match(output, /aios kit install \[project-path\]/);
  assert.match(output, /aios prompt list \[project-path\]/);
  assert.match(output, /aios prompt show <name> \[project-path\]/);
  assert.match(output, /aios agent install \[project-path\].*\[--skills core\|planning\|delivery\|all\|name,name\]/);
  assert.match(output, /aios agent list/);
  assert.match(output, /aios integration list/);
  assert.match(output, /aios integration status \[project-path\]/);
  assert.match(output, /aios integration add <rtk\|caveman\|all>.*\[--agents <list>\].*\[--yes\]/);
  assert.match(output, /aios integration doctor \[project-path\]/);
  assert.match(output, /aios integration repair \[project-path\]/);
  assert.match(output, /aios config \[project-path\]/);
  assert.match(output, /aios create openapi <api-name>/);
  assert.match(output, /aios create migration <migration-name>/);
  assert.match(output, /aios create security <review-name>/);
  assert.match(output, /aios create release <release-name>/);
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

test("init --lite writes lite config and skips the local AIOS workflow kit", () => {
  const cwd = tempCwd();
  run(["init", "demo-project", "--lite"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  assert.ok(fs.existsSync(path.join(project, "AGENTS.md")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "config.json")));
  assert.equal(JSON.parse(fs.readFileSync(path.join(project, ".aios", "config.json"), "utf8")).mode, "lite");
  assert.equal(fs.existsSync(path.join(project, ".aios", "skill-router.md")), false);

  const output = run(["validate", "demo-project"], { runtimePaths, cwd });
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
  fs.writeFileSync(path.join(project, "AGENTS.md"), "# Existing Agent Rules\n\nKeep user rules.\n");
  fs.writeFileSync(path.join(project, "CLAUDE.md"), "# Existing Claude Rules\n\nKeep Claude rules.\n");

  const output = run(["adopt", "existing-project"], { runtimePaths, cwd });

  assert.match(output, /Adopted AI Dev OS structure/);
  assert.equal(fs.readFileSync(path.join(project, "README.md"), "utf8"), "# Existing Project\n");
  assert.match(fs.readFileSync(path.join(project, "AGENTS.md"), "utf8"), /^<!-- AIOS:BEGIN -->/);
  assert.match(fs.readFileSync(path.join(project, "AGENTS.md"), "utf8"), /# Existing Agent Rules/);
  assert.match(fs.readFileSync(path.join(project, "CLAUDE.md"), "utf8"), /^<!-- AIOS:BEGIN -->/);
  assert.match(fs.readFileSync(path.join(project, "CLAUDE.md"), "utf8"), /# Existing Claude Rules/);
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

test("kit install adds missing local workflow assets without overwriting existing files", () => {
  const cwd = tempCwd();
  run(["init", "demo-project", "--lite"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");
  const customPrompt = path.join(project, ".aios", "prompts", "01-generate-prd.md");
  fs.mkdirSync(path.dirname(customPrompt), { recursive: true });
  fs.writeFileSync(customPrompt, "# Custom prompt\n");

  const output = run(["kit", "install"], { runtimePaths, cwd: project });

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

  run(["create", "task", "Implement Auth"], { runtimePaths, cwd: project });
  run(["create", "openapi", "Auth API"], { runtimePaths, cwd: project });

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

test("agent install supports dry-run, selected agents, selected skills, and skip existing", () => {
  const cwd = tempCwd();
  run(["init", "agent-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "agent-project");

  const dryRun = run(["agent", "install", "agent-project", "--agents", "opencode,antigravity", "--skills", "testing", "--dry-run"], {
    runtimePaths,
    cwd
  });
  assert.match(dryRun, /Planned native agent skill install/);
  assert.equal(fs.existsSync(path.join(project, ".opencode", "skills", "testing", "SKILL.md")), false);

  const output = run(["agent", "install", "agent-project", "--agents", "opencode,antigravity", "--skills", "testing"], {
    runtimePaths,
    cwd
  });
  assert.match(output, /Created: 2/);
  assert.ok(fs.existsSync(path.join(project, ".opencode", "skills", "testing", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(project, ".agent", "skills", "testing", "SKILL.md")));

  const skipped = run(["agent", "install", "agent-project", "--agents", "opencode", "--skills", "testing"], { runtimePaths, cwd });
  assert.match(skipped, /Skipped existing: 1/);
});

test("prompt list and prompt show expose local workflow command prompts", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  const listOutput = run(["prompt", "list"], { runtimePaths, cwd: project });
  assert.match(listOutput, /generate-prd/);
  assert.match(listOutput, /implement-task/);
  assert.match(listOutput, /review-code/);

  const commandOutput = run(["prompt", "show", "generate-prd"], { runtimePaths, cwd: project });
  assert.match(commandOutput, /Command: Generate PRD/);
  assert.match(commandOutput, /\.aios\/skill-router\.md/);
  assert.match(commandOutput, /prd-generator/);
});

test("integration list and status expose optional external integrations", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });

  const listOutput = run(["integration", "list"], { runtimePaths, cwd });
  assert.match(listOutput, /rtk: compact noisy terminal command output/);
  assert.match(listOutput, /caveman: concise agent response style/);

  const statusOutput = run(["integration", "status", "demo-project"], { runtimePaths, cwd });
  assert.match(statusOutput, /AIOS integration status/);
  assert.match(statusOutput, /rtk:/);
  assert.match(statusOutput, /caveman:/);
  assert.match(statusOutput, /state: disabled/);
});

test("integration add supports dry-run, RTK rules, Caveman mode, and all selection", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  const dryRun = run(["integration", "add", "rtk", "demo-project", "--dry-run"], { runtimePaths, cwd });
  assert.match(dryRun, /Planned AIOS integration add/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(project, ".aios", "config.json"), "utf8")).integrations.rtk.enabled, false);

  const rtkOutput = run(["integration", "add", "rtk", "demo-project"], { runtimePaths, cwd });
  assert.match(rtkOutput, /Updated AIOS integrations/);
  assert.match(rtkOutput, /AIOS integration status after update/);
  assert.match(rtkOutput, /rtk: (ready|rules-only)/);
  assert.ok(fs.existsSync(path.join(project, ".aios", "integrations", "rtk.md")));
  assert.equal(JSON.parse(fs.readFileSync(path.join(project, ".aios", "config.json"), "utf8")).integrations.rtk.enabled, true);

  run(["integration", "add", "caveman", "demo-project", "--mode", "full"], { runtimePaths, cwd });
  let config = JSON.parse(fs.readFileSync(path.join(project, ".aios", "config.json"), "utf8"));
  assert.equal(config.integrations.caveman.enabled, true);
  assert.equal(config.integrations.caveman.mode, "full");
  assert.deepEqual(config.integrations.caveman.targetAgents, ["codex"]);
  assert.ok(fs.existsSync(path.join(project, ".aios", "integrations", "caveman.md")));

  const cavemanDryRun = run(["integration", "add", "caveman", "demo-project", "--install", "--dry-run", "--agents", "codex,qwen"], {
    runtimePaths,
    cwd
  });
  assert.match(cavemanDryRun, /npx -y skills add JuliusBrussee\/caveman -a codex --yes/);
  assert.match(cavemanDryRun, /npx -y skills add JuliusBrussee\/caveman -a qwen-code --yes/);
  assert.match(cavemanDryRun, /targeted agents only/);

  run(["integration", "remove", "all", "demo-project", "--scope", "project"], { runtimePaths, cwd });
  run(["integration", "add", "all", "demo-project"], { runtimePaths, cwd });
  config = JSON.parse(fs.readFileSync(path.join(project, ".aios", "config.json"), "utf8"));
  assert.equal(config.integrations.rtk.enabled, true);
  assert.equal(config.integrations.caveman.enabled, true);
});

test("integration remove supports project, user dry-run, both dry-run, and validation", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");
  run(["integration", "add", "all", "demo-project"], { runtimePaths, cwd });

  const projectOutput = run(["integration", "remove", "rtk", "demo-project", "--scope", "project"], { runtimePaths, cwd });
  assert.match(projectOutput, /Scope: project/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(project, ".aios", "config.json"), "utf8")).integrations.rtk.enabled, false);
  assert.ok(fs.existsSync(path.join(project, ".aios", "integrations", "rtk.md.disabled")));

  const userDryRun = run(["integration", "remove", "rtk", "demo-project", "--scope", "user", "--dry-run"], { runtimePaths, cwd });
  assert.match(userDryRun, /Scope: user/);
  assert.match(userDryRun, /user uninstall/);

  const bothDryRun = run(["integration", "remove", "all", "demo-project", "--scope", "both", "--dry-run"], { runtimePaths, cwd });
  assert.match(bothDryRun, /Scope: both/);
  assert.match(bothDryRun, /project rules: would disable/);
  assert.match(bothDryRun, /user uninstall/);

  assert.throws(() => run(["integration", "add", "caveman", "demo-project", "--mode", "invalid"], { runtimePaths, cwd }), /Unknown Caveman mode/);
  assert.throws(() => run(["integration", "remove", "rtk", "demo-project", "--scope", "invalid"], { runtimePaths, cwd }), /Unknown integration remove scope/);
  assert.match(run(["validate"], { runtimePaths, cwd: project }), /AI-ready structure validated/);
});

test("integration doctor and repair report and restore local integration rules", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");
  run(["integration", "add", "rtk", "demo-project"], { runtimePaths, cwd });
  fs.rmSync(path.join(project, ".aios", "integrations", "rtk.md"));

  const doctor = run(["integration", "doctor", "demo-project"], { runtimePaths, cwd });
  assert.match(doctor, /rtk: enabled but local rule is missing/);

  const repairDryRun = run(["integration", "repair", "demo-project", "--dry-run"], { runtimePaths, cwd });
  assert.match(repairDryRun, /would ensure/);

  const repair = run(["integration", "repair", "demo-project"], { runtimePaths, cwd });
  assert.match(repair, /Repaired AIOS integrations/);
  assert.ok(fs.existsSync(path.join(project, ".aios", "integrations", "rtk.md")));
});

test("integration install runs external commands from the target project path", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");
  const bin = path.join(cwd, "bin");
  fs.mkdirSync(bin, { recursive: true });
  const fakeNpx = path.join(bin, "npx");
  fs.writeFileSync(
    fakeNpx,
    "#!/usr/bin/env sh\nmkdir -p .agents/skills/caveman\nprintf installed > .agents/skills/caveman/SKILL.md\n",
    "utf8"
  );
  fs.chmodSync(fakeNpx, 0o755);

  const oldPath = process.env.PATH;
  process.env.PATH = `${bin}${path.delimiter}${oldPath ?? ""}`;
  try {
    const output = run(["integration", "add", "caveman", "demo-project", "--install", "--yes", "--agents", "codex"], {
      runtimePaths,
      cwd
    });
    if (os.platform() === "win32") {
      assert.match(output, /install: manual only on this platform/);
    } else {
      assert.match(output, /install: executed/);
      assert.match(output, /caveman: ready/);
      assert.ok(fs.existsSync(path.join(project, ".agents", "skills", "caveman", "SKILL.md")));
    }
    assert.equal(fs.existsSync(path.join(cwd, ".agents", "skills", "caveman", "SKILL.md")), false);
  } finally {
    process.env.PATH = oldPath;
  }
});

test("integration status detects mocked RTK and Caveman locations", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");
  const bin = path.join(cwd, "bin");
  fs.mkdirSync(bin, { recursive: true });
  const fakeRtk = path.join(bin, "rtk");
  fs.writeFileSync(fakeRtk, "#!/usr/bin/env sh\necho 'rtk 0.0.0-test'\n");
  fs.chmodSync(fakeRtk, 0o755);
  const fakeHome = path.join(cwd, "home");
  fs.mkdirSync(path.join(fakeHome, ".agents", "skills", "caveman"), { recursive: true });

  const oldPath = process.env.PATH;
  const oldHome = process.env.HOME;
  process.env.PATH = `${bin}${path.delimiter}${oldPath ?? ""}`;
  process.env.HOME = fakeHome;
  try {
    const status = run(["integration", "status", "demo-project"], { runtimePaths, cwd });
    assert.match(status, os.platform() === "win32" ? /rtk found|rtk 0\.0\.0-test/ : /rtk 0\.0\.0-test/);
    assert.match(status, /caveman location\(s\) found/);
  } finally {
    process.env.PATH = oldPath;
    process.env.HOME = oldHome;
  }
});

test("legacy flat commands are not accepted", () => {
  const cwd = tempCwd();
  assert.throws(() => run(["task", "Old Shape"], { runtimePaths, cwd }), /Unknown command: task/);
  assert.throws(() => run(["agent-install"], { runtimePaths, cwd }), /Unknown command: agent-install/);
  assert.throws(() => run(["command-list"], { runtimePaths, cwd }), /Unknown command: command-list/);
});

test("adr, task, and review create files in a generated project", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  run(["create", "adr", "Use Server Date"], { runtimePaths, cwd: project });
  run(["create", "task", "Implement Habit API"], { runtimePaths, cwd: project });
  run(["create", "review", "Habit API"], { runtimePaths, cwd: project });

  assert.ok(fs.existsSync(path.join(project, "docs", "adr", "ADR-001-use-server-date.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "tasks", "TASK-001-implement-habit-api.md")));
  assert.ok(fs.existsSync(path.join(project, "docs", "reviews", "habit-api-review.md")));
});

test("feature creates a feature PRD stub", () => {
  const cwd = tempCwd();
  run(["init", "demo-project"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-project");

  run(["create", "feature", "Habit Reminders"], { runtimePaths, cwd: project });

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

test("starter --lite writes lite config and skips the local AIOS workflow kit", () => {
  const cwd = tempCwd();

  run(["starter", "fullstack-saas", "demo-saas", "--lite"], { runtimePaths, cwd });
  const project = path.join(cwd, "demo-saas");

  assert.ok(fs.existsSync(path.join(project, "frontend")));
  assert.ok(fs.existsSync(path.join(project, ".aios", "config.json")));
  assert.equal(JSON.parse(fs.readFileSync(path.join(project, ".aios", "config.json"), "utf8")).mode, "lite");
  assert.equal(fs.existsSync(path.join(project, ".aios", "skill-router.md")), false);
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

  run(["create", "openapi", "Habit API"], { runtimePaths, cwd: project });
  run(["create", "migration", "Create Habits Table"], { runtimePaths, cwd: project });
  run(["create", "security", "Habit API"], { runtimePaths, cwd: project });
  const releaseOutput = run(["create", "release", "0.3.0"], { runtimePaths, cwd: project });

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

test("validate follows lite config and requires kit only when not lite", () => {
  const cwd = tempCwd();
  run(["init", "demo-project", "--lite"], { runtimePaths, cwd });

  const output = run(["validate", "demo-project"], { runtimePaths, cwd });
  assert.match(output, /AI-ready structure validated/);

  fs.rmSync(path.join(cwd, "demo-project", ".aios"), { recursive: true, force: true });
  const fullOutput = run(["validate", "demo-project"], { runtimePaths, cwd });
  assert.match(fullOutput, /AI-ready structure is incomplete/);
  assert.match(fullOutput, /\.aios\/skills\/context-management\/SKILL.md/);
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

  run(["create", "task", "Implement habit API"], { runtimePaths, cwd: project });
  assert.match(run(["next"], { runtimePaths, cwd: project }), /Open the active task/);
});
