#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  copyDirectory,
  ensureEmptyOrMissingDirectory,
  getOsRoot,
  nextNumber,
  slugify,
  titleize,
  validateProject,
  writeRenderedTemplate
} from "./core.js";

interface CommandContext {
  osRoot: string;
  cwd: string;
}

function usage(): string {
  return `AI-Native Development OS CLI

Usage:
  aios init <project-name>
  aios feature <feature-name>
  aios adr <decision-name>
  aios task <task-name>
  aios review <name>
  aios validate [project-path]
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
  const skeleton = path.join(ctx.osRoot, "project-skeleton");

  ensureEmptyOrMissingDirectory(target);
  copyDirectory(skeleton, target);
  return `Created AI-ready project at ${target}`;
}

function commandFeature(ctx: CommandContext, name: string | undefined): string {
  const featureName = requireName(name, "feature");
  const slug = slugify(featureName);
  const title = titleize(featureName);
  const target = path.join(ctx.cwd, "docs", "product", "features", `${slug}.prd.md`);

  writeRenderedTemplate({
    templatePath: path.join(ctx.osRoot, "templates", "prd.template.md"),
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
    templatePath: path.join(ctx.osRoot, "templates", "adr.template.md"),
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
    templatePath: path.join(ctx.osRoot, "templates", "task.template.md"),
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
    templatePath: path.join(ctx.osRoot, "templates", "review-report.template.md"),
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

export function run(argv: string[], ctx: CommandContext = { osRoot: getOsRoot(), cwd: process.cwd() }): string {
  const [command, name] = argv;

  switch (command) {
    case undefined:
    case "help":
    case "--help":
    case "-h":
      return usage();
    case "init":
      return commandInit(ctx, name);
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

if (import.meta.url === `file://${process.argv[1]}`) {
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
