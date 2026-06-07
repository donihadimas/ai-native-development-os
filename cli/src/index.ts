#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  adoptSkeleton,
  copyDirectory,
  ensureEmptyOrMissingDirectory,
  getRuntimePaths,
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
  - add AI Dev OS structure to an existing project,
  - create PRDs, ADRs, implementation tasks, and review reports,
  - validate that a project has the expected AI workflow structure.

Usage:
  aios -v
    Show the installed AIOS CLI version.

  aios init <project-name>
    Create a new AI-ready project from the bundled skeleton.

  aios adopt [project-path]
    Add AI Dev OS folders and docs to an existing project without overwriting
    existing files. Defaults to the current directory.

  aios feature <feature-name>
    Create a feature PRD stub in docs/product/features/.

  aios adr <decision-name>
    Create the next numbered Architecture Decision Record in docs/adr/.

  aios task <task-name>
    Create the next numbered implementation task in docs/tasks/.

  aios review <name>
    Create a review report stub in docs/reviews/.

  aios validate [project-path]
    Check whether a project has the required AI-ready structure.
    Defaults to the current directory.

Other options:
  aios --version
    Same as aios -v.

  aios --help
    Show this help message.

Typical workflow:
  aios init demo-project
  aios validate demo-project
  cd demo-project
  aios feature "Habit reminders"
  aios adr "Use server date for completion"
  aios task "Implement habit API"
  aios review "Habit API"

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

function commandInit(ctx: CommandContext, name: string | undefined): string {
  const projectName = requireName(name, "init");
  const target = path.resolve(ctx.cwd, projectName);

  ensureEmptyOrMissingDirectory(target);
  copyDirectory(ctx.runtimePaths.projectSkeleton, target);
  return `Created AI-ready project at ${target}`;
}

function commandAdopt(ctx: CommandContext, projectPathArg: string | undefined): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const result = adoptSkeleton(ctx.runtimePaths.projectSkeleton, projectPath);

  return [
    `Adopted AI Dev OS structure in ${projectPath}`,
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

function commandValidate(ctx: CommandContext, projectPathArg: string | undefined): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const result = validateProject(projectPath);

  if (result.ok) {
    return `AI-ready structure validated: ${projectPath}`;
  }

  process.exitCode = 1;
  return [`AI-ready structure is incomplete: ${projectPath}`, "Missing:", ...result.missing.map((item) => `- ${item}`)].join("\n");
}

export function run(argv: string[], ctx: CommandContext = { runtimePaths: getRuntimePaths(), cwd: process.cwd() }): string {
  const [command, name] = argv;

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
      return commandInit(ctx, name);
    case "adopt":
      return commandAdopt(ctx, name);
    case "feature":
      return commandFeature(ctx, name);
    case "adr":
      return commandAdr(ctx, name);
    case "task":
      return commandTask(ctx, name);
    case "review":
      return commandReview(ctx, name);
    case "validate":
      return commandValidate(ctx, name);
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
