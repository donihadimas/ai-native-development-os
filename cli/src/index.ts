#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  adoptSkeleton,
  copyDirectory,
  ensureEmptyOrMissingDirectory,
  getRuntimePaths,
  installAiosKit,
  nextNumber,
  slugify,
  titleize,
  validateProject,
  writeRenderedTemplate,
  type RuntimePaths
} from "./core.js";

interface CommandContext {
  runtimePaths: RuntimePaths;
  cwd: string;
}

function packageVersion(): string {
  const compiledSourceDir = path.dirname(new URL(import.meta.url).pathname);
  const packageRoot = path.resolve(compiledSourceDir, "../..");
  const packageJsonPath = path.join(packageRoot, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as { version?: string };

  return packageJson.version ?? "0.0.0";
}

function usage(): string {
  return `AI-Native Development OS CLI

AIOS helps you create and maintain an AI-ready project structure for
AI-assisted software development. It does not generate application code.
Instead, it prepares the docs, folders, and planning files that help Codex
or another coding agent work with clear context, small tasks, review notes,
API contracts, and repeatable project workflows.

Use it when you want to:
  - start a new frontend/backend project with AI-ready docs,
  - start from a lightweight AI docs only stack starter,
  - add AI Dev OS structure to an existing project,
  - create PRDs, ADRs, implementation tasks, API contracts, migration plans,
    security reviews, release notes, and review reports,
  - validate that a project has the expected AI workflow structure.

Usage:
  aios -v
    Show the installed AIOS CLI version.

  aios init <project-name> [--lite]
    Create a new AI-ready project from the bundled skeleton.
    Installs the local .aios workflow kit unless --lite is provided.

  aios starter <starter-name> <project-name> [--lite]
    Create a new AI-ready project from a bundled V2.x starter.
    Installs the local .aios workflow kit unless --lite is provided.

  aios adopt [project-path] [--lite]
    Add AI Dev OS folders and docs to an existing project without overwriting
    existing files. Also installs .aios unless --lite is provided.
    Defaults to the current directory.

  aios install-kit [project-path]
    Install or repair the local .aios workflow kit without overwriting
    existing files. Defaults to the current directory.

  aios feature <feature-name>
    Create a feature PRD stub in docs/product/features/.

  aios adr <decision-name>
    Create the next numbered Architecture Decision Record in docs/adr/.

  aios task <task-name>
    Create the next numbered implementation task in docs/tasks/.

  aios review <name>
    Create a review report stub in docs/reviews/.

  aios openapi <api-name>
    Create an OpenAPI contract stub in docs/api/.

  aios migration <migration-name>
    Create the next numbered migration plan in docs/database/migrations/.

  aios security <review-name>
    Create a security review report stub in docs/security/.

  aios release <release-name>
    Create a release note in docs/releases/ and a changelog draft if missing.

  aios validate [project-path] [--lite]
    Check whether a project has the required AI-ready structure.
    Requires the local .aios kit unless --lite is provided.
    Defaults to the current directory.

  aios next [project-path]
    Print the next recommended development step. Read-only.

Other options:
  aios --version
    Same as aios -v.

  aios --help
    Show this help message.

Typical workflow:
  aios init demo-project
  aios validate demo-project
  aios next demo-project
  cd demo-project
  aios feature "Habit reminders"
  aios openapi "Habit API"
  aios migration "Create habits table"
  aios security "Habit API"
  aios adr "Use server date for completion"
  aios task "Implement habit API"
  aios review "Habit API"
  aios release "0.3.0"

Starter workflow:
  aios starter fullstack-saas demo-saas
  aios validate demo-saas

Existing project workflow:
  cd existing-project
  aios adopt
  aios validate

Next step after generating docs:
  Open the project with Codex and ask it to read AGENTS.md,
  docs/context/context-map.md, and the active task before coding.
`;
}

function requireName(value: string | undefined, command: string): string {
  if (!value) {
    throw new Error(`Missing name. Usage: aios ${command} <name>`);
  }
  return value;
}

function parseArgs(argv: string[]): { args: string[]; lite: boolean } {
  return {
    args: argv.filter((arg) => arg !== "--lite"),
    lite: argv.includes("--lite")
  };
}

function commandInit(ctx: CommandContext, name: string | undefined, options: { lite?: boolean } = {}): string {
  const projectName = requireName(name, "init");
  const target = path.resolve(ctx.cwd, projectName);

  ensureEmptyOrMissingDirectory(target);
  copyDirectory(ctx.runtimePaths.projectSkeleton, target);
  if (!options.lite) {
    installAiosKit(ctx.runtimePaths.aiosKit, target);
  }
  return `Created AI-ready project at ${target}`;
}

function commandStarter(
  ctx: CommandContext,
  starterName: string | undefined,
  projectNameArg: string | undefined,
  options: { lite?: boolean } = {}
): string {
  const starter = requireName(starterName, "starter");
  const projectName = requireName(projectNameArg, "starter <starter-name>");
  const source = path.join(ctx.runtimePaths.starters, starter);
  const target = path.resolve(ctx.cwd, projectName);

  if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) {
    throw new Error(`Unknown starter: ${starter}`);
  }

  ensureEmptyOrMissingDirectory(target);
  copyDirectory(source, target);
  if (!options.lite) {
    installAiosKit(ctx.runtimePaths.aiosKit, target);
  }
  return `Created AI-ready ${starter} starter at ${target}`;
}

function commandAdopt(ctx: CommandContext, projectPathArg: string | undefined, options: { lite?: boolean } = {}): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const result = adoptSkeleton(ctx.runtimePaths.projectSkeleton, projectPath);
  const kitResult = options.lite
    ? { created: [], skipped: [] }
    : installAiosKit(ctx.runtimePaths.aiosKit, projectPath);

  const output = [
    `Adopted AI Dev OS structure in ${projectPath}`,
    `Created: ${result.created.length}`,
    `Skipped existing: ${result.skipped.length}`
  ];

  if (!options.lite) {
    output.push(`AIOS kit created: ${kitResult.created.length}`, `AIOS kit skipped existing: ${kitResult.skipped.length}`);
  }

  output.push("Next step: run `aios validate` from the project root.");
  return output.join("\n");
}

function commandInstallKit(ctx: CommandContext, projectPathArg: string | undefined): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const result = installAiosKit(ctx.runtimePaths.aiosKit, projectPath);

  return [
    `Installed AIOS workflow kit in ${path.join(projectPath, ".aios")}`,
    `Created: ${result.created.length}`,
    `Skipped existing: ${result.skipped.length}`,
    "Next step: run `aios validate` from the project root."
  ].join("\n");
}

function commandFeature(ctx: CommandContext, name: string | undefined): string {
  const featureName = requireName(name, "feature");
  const slug = slugify(featureName);
  const title = titleize(featureName);
  const target = path.join(ctx.cwd, "docs", "product", "features", `${slug}.prd.md`);

  writeRenderedTemplate({
    templatePath: path.join(ctx.runtimePaths.templates, "prd.template.md"),
    targetPath: target,
    values: {
      product_or_feature_name: title,
      title,
      slug
    }
  });

  return `Created feature PRD stub at ${target}`;
}

function commandAdr(ctx: CommandContext, name: string | undefined): string {
  const decisionName = requireName(name, "adr");
  const slug = slugify(decisionName);
  const title = titleize(decisionName);
  const directory = path.join(ctx.cwd, "docs", "adr");
  const number = nextNumber(directory, "ADR");
  const target = path.join(directory, `ADR-${number}-${slug}.md`);

  writeRenderedTemplate({
    templatePath: path.join(ctx.runtimePaths.templates, "adr.template.md"),
    targetPath: target,
    values: { number, title, slug }
  });

  return `Created ADR at ${target}`;
}

function commandTask(ctx: CommandContext, name: string | undefined): string {
  const taskName = requireName(name, "task");
  const slug = slugify(taskName);
  const title = titleize(taskName);
  const directory = path.join(ctx.cwd, "docs", "tasks");
  const number = nextNumber(directory, "TASK");
  const target = path.join(directory, `TASK-${number}-${slug}.md`);

  writeRenderedTemplate({
    templatePath: path.join(ctx.runtimePaths.templates, "task.template.md"),
    targetPath: target,
    values: { number, title, slug }
  });

  return `Created task at ${target}`;
}

function commandReview(ctx: CommandContext, name: string | undefined): string {
  const reviewName = requireName(name, "review");
  const slug = slugify(reviewName);
  const title = titleize(reviewName);
  const target = path.join(ctx.cwd, "docs", "reviews", `${slug}-review.md`);

  writeRenderedTemplate({
    templatePath: path.join(ctx.runtimePaths.templates, "review-report.template.md"),
    targetPath: target,
    values: {
      change_or_task: title,
      title,
      slug
    }
  });

  return `Created review report at ${target}`;
}

function commandOpenApi(ctx: CommandContext, name: string | undefined): string {
  const apiName = requireName(name, "openapi");
  const slug = slugify(apiName);
  const title = titleize(apiName);
  const target = path.join(ctx.cwd, "docs", "api", `${slug}.openapi.yaml`);

  writeRenderedTemplate({
    templatePath: path.join(ctx.runtimePaths.templates, "openapi.template.yaml"),
    targetPath: target,
    values: { title, slug }
  });

  return `Created OpenAPI contract at ${target}`;
}

function commandMigration(ctx: CommandContext, name: string | undefined): string {
  const migrationName = requireName(name, "migration");
  const slug = slugify(migrationName);
  const title = titleize(migrationName);
  const directory = path.join(ctx.cwd, "docs", "database", "migrations");
  const number = nextNumber(directory, "MIGRATION");
  const target = path.join(directory, `MIGRATION-${number}-${slug}.md`);

  writeRenderedTemplate({
    templatePath: path.join(ctx.runtimePaths.templates, "migration-plan.template.md"),
    targetPath: target,
    values: { number, title, slug }
  });

  return `Created migration plan at ${target}`;
}

function commandSecurity(ctx: CommandContext, name: string | undefined): string {
  const reviewName = requireName(name, "security");
  const slug = slugify(reviewName);
  const title = titleize(reviewName);
  const target = path.join(ctx.cwd, "docs", "security", `${slug}-security-review.md`);

  writeRenderedTemplate({
    templatePath: path.join(ctx.runtimePaths.templates, "security-review-report.template.md"),
    targetPath: target,
    values: { title, slug }
  });

  return `Created security review at ${target}`;
}

function commandRelease(ctx: CommandContext, name: string | undefined): string {
  const releaseName = requireName(name, "release");
  const slug = slugify(releaseName);
  const title = titleize(releaseName);
  const releaseTarget = path.join(ctx.cwd, "docs", "releases", `${slug}-release.md`);
  const changelogTarget = path.join(ctx.cwd, "docs", "releases", "CHANGELOG.md");
  const output = [`Created release note at ${releaseTarget}`];

  writeRenderedTemplate({
    templatePath: path.join(ctx.runtimePaths.templates, "release-note.template.md"),
    targetPath: releaseTarget,
    values: { title, slug }
  });

  if (!fs.existsSync(changelogTarget)) {
    writeRenderedTemplate({
      templatePath: path.join(ctx.runtimePaths.templates, "changelog.template.md"),
      targetPath: changelogTarget,
      values: { title, slug }
    });
    output.push(`Created changelog draft at ${changelogTarget}`);
  } else {
    output.push(`Changelog already exists at ${changelogTarget}`);
  }

  return output.join("\n");
}

function commandValidate(ctx: CommandContext, projectPathArg: string | undefined, options: { lite?: boolean } = {}): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const result = validateProject(projectPath, options);

  if (result.ok) {
    const output = [`AI-ready structure validated: ${projectPath}`];
    if (result.warnings.length > 0) {
      output.push("Warnings:", ...result.warnings.map((item) => `- ${item}`));
    }
    return output.join("\n");
  }

  process.exitCode = 1;
  return [`AI-ready structure is incomplete: ${projectPath}`, "Missing:", ...result.missing.map((item) => `- ${item}`)].join("\n");
}

function isPlaceholderFile(filePath: string, patterns: RegExp[]): boolean {
  if (!fs.existsSync(filePath)) {
    return true;
  }

  const content = fs.readFileSync(filePath, "utf8").trim();
  if (content.length === 0) {
    return true;
  }

  return patterns.some((pattern) => pattern.test(content));
}

function hasTaskFiles(projectPath: string): boolean {
  const tasksDir = path.join(projectPath, "docs", "tasks");
  if (!fs.existsSync(tasksDir)) {
    return false;
  }

  return fs.readdirSync(tasksDir).some((file) => file.startsWith("TASK-") && file.endsWith(".md"));
}

function commandNext(ctx: CommandContext, projectPathArg: string | undefined): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const visionPath = path.join(projectPath, "docs", "product", "vision.md");
  const prdPath = path.join(projectPath, "docs", "product", "prd.md");
  const architecturePath = path.join(projectPath, "docs", "architecture", "architecture.md");

  if (
    isPlaceholderFile(visionPath, [
      /Describe the .*problem/i,
      /Describe the primary and secondary users/i,
      /List the smallest valuable version/i
    ])
  ) {
    return [
      `Next recommended step for ${projectPath}:`,
      "Fill `docs/product/vision.md` with the product problem, users, MVP scope, and success metrics.",
      "Then ask Codex to read `AGENTS.md` and `.aios/prompts/01-generate-prd.md`."
    ].join("\n");
  }

  if (isPlaceholderFile(prdPath, [/Use the PRD template/i])) {
    return [
      `Next recommended step for ${projectPath}:`,
      "Generate `docs/product/prd.md` from `docs/product/vision.md`.",
      "Ask Codex to use `.aios/prompts/01-generate-prd.md` and `.aios/templates/prd.template.md`."
    ].join("\n");
  }

  if (isPlaceholderFile(architecturePath, [/Use the architecture template/i])) {
    return [
      `Next recommended step for ${projectPath}:`,
      "Generate `docs/architecture/architecture.md` from the PRD.",
      "Ask Codex to use `.aios/prompts/02-generate-architecture.md` and `.aios/templates/architecture.template.md`."
    ].join("\n");
  }

  if (!hasTaskFiles(projectPath)) {
    return [
      `Next recommended step for ${projectPath}:`,
      "Create the first implementation task in `docs/tasks/`.",
      "Use `aios task \"Task name\"` or ask Codex to use `.aios/prompts/04-generate-tasks.md`."
    ].join("\n");
  }

  return [
    `Next recommended step for ${projectPath}:`,
    "Open the active task in `docs/tasks/` and implement one task at a time.",
    "Ask Codex to read `AGENTS.md`, `docs/context/context-map.md`, `.aios/skills/implementation-planner/SKILL.md`, and the active task before coding."
  ].join("\n");
}

export function run(argv: string[], ctx: CommandContext = { runtimePaths: getRuntimePaths(), cwd: process.cwd() }): string {
  const parsed = parseArgs(argv);
  const [command, name, secondName] = parsed.args;

  switch (command) {
    case undefined:
    case "help":
    case "--help":
    case "-h":
      return usage();
    case "version":
    case "--version":
    case "-v":
      return `aios ${packageVersion()}`;
    case "init":
      return commandInit(ctx, name, { lite: parsed.lite });
    case "starter":
      return commandStarter(ctx, name, secondName, { lite: parsed.lite });
    case "adopt":
      return commandAdopt(ctx, name, { lite: parsed.lite });
    case "install-kit":
      return commandInstallKit(ctx, name);
    case "feature":
      return commandFeature(ctx, name);
    case "adr":
      return commandAdr(ctx, name);
    case "task":
      return commandTask(ctx, name);
    case "review":
      return commandReview(ctx, name);
    case "openapi":
      return commandOpenApi(ctx, name);
    case "migration":
      return commandMigration(ctx, name);
    case "security":
      return commandSecurity(ctx, name);
    case "release":
      return commandRelease(ctx, name);
    case "validate":
      return commandValidate(ctx, name, { lite: parsed.lite });
    case "next":
      return commandNext(ctx, name);
    default:
      throw new Error(`Unknown command: ${command}\n\n${usage()}`);
  }
}

function isDirectRun(): boolean {
  if (!process.argv[1]) {
    return false;
  }

  return fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
}

if (isDirectRun()) {
  try {
    const output = run(process.argv.slice(2));
    if (output) {
      console.log(output);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
