#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkbox, confirm, input, select } from "@inquirer/prompts";
import {
  AGENT_TARGETS,
  CORE_SKILLS,
  PROJECT_SHAPES,
  PROJECT_SHAPE_PATHS,
  type AgentScope,
  type AgentTarget,
  adoptSkeleton,
  availableSkills,
  defaultProjectConfig,
  docsPath,
  expandSkillSelection,
  copyDirectory,
  ensureEmptyOrMissingDirectory,
  getRuntimePaths,
  installAgentSkills,
  installAiosKit,
  nextNumber,
  readProjectConfig,
  slugify,
  type ProjectShape,
  type SkillDelivery,
  titleize,
  validateProject,
  writeProjectConfig,
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
  - start a new project shape with AI-ready docs,
  - start from a lightweight AI docs only stack starter,
  - add AI Dev OS structure to an existing project,
  - create PRDs, ADRs, implementation tasks, API contracts, migration plans,
    security reviews, release notes, and review reports,
  - validate that a project has the expected AI workflow structure.

Usage:
  aios -v
    Show the installed AIOS CLI version.

  aios init <project-name> [--lite] [--shape fullstack|frontend|backend|mobile|library|docs] [--docs-root <path>] [--skill-delivery portable|native|both]
    Create a new AI-ready project from the bundled skeleton.
    Installs the local .aios workflow kit unless --lite is provided.

  aios starter <starter-name> <project-name> [--lite] [--shape fullstack|frontend|backend|mobile|library|docs] [--docs-root <path>] [--skill-delivery portable|native|both]
    Create a new AI-ready project from a bundled V2.x starter.
    Installs the local .aios workflow kit unless --lite is provided.

  aios adopt [project-path] [--lite] [--shape fullstack|frontend|backend|mobile|library|docs] [--docs-root <path>] [--skill-delivery portable|native|both]
    Add AI Dev OS folders and docs to an existing project without overwriting
    existing files. Also installs .aios unless --lite is provided.
    Defaults to the current directory.

  aios install-kit [project-path]
    Install or repair the local .aios workflow kit without overwriting
    existing files. Defaults to the current directory.

  aios command-list [project-path]
    List available local AIOS command prompts.

  aios command <name> [project-path]
    Print a local AIOS command prompt. Read-only.

  aios agent-install [project-path] [--agents codex,qwen] [--skills core|all|name,name] [--scope repo|user]
    Install selected AIOS skills into native agent skill folders.

  aios agent-list
    List supported agent targets and available AIOS skills.

  aios config [project-path]
    Print resolved AIOS project configuration.

  aios feature <feature-name>
    Create a feature PRD stub in the configured docsRoot product/features folder.

  aios adr <decision-name>
    Create the next numbered Architecture Decision Record in the configured docsRoot adr folder.

  aios task <task-name>
    Create the next numbered implementation task in the configured docsRoot tasks folder.

  aios review <name>
    Create a review report stub in the configured docsRoot reviews folder.

  aios openapi <api-name>
    Create an OpenAPI contract stub in the configured docsRoot api folder.

  aios migration <migration-name>
    Create the next numbered migration plan in the configured docsRoot database/migrations folder.

  aios security <review-name>
    Create a security review report stub in the configured docsRoot security folder.

  aios release <release-name>
    Create a release note in the configured docsRoot releases folder and a changelog draft if missing.

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
  Open the project with Codex and ask it to read AGENTS.md, .aios/config.json,
  the resolved context map, .aios/skill-router.md, and the active task before coding.
`;
}

interface ParsedArgs {
  args: string[];
  lite: boolean;
  yes: boolean;
  dryRun: boolean;
  overwrite: boolean;
  docsRoot?: string;
  skillDelivery?: SkillDelivery;
  agents?: AgentTarget[];
  skills?: string;
  scope?: AgentScope;
  projectShape?: ProjectShape;
}

function requireName(value: string | undefined, command: string): string {
  if (!value) {
    throw new Error(`Missing name. Usage: aios ${command} <name>`);
  }
  return value;
}

function readFlagValue(argv: string[], flag: string): string | undefined {
  const index = argv.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return argv[index + 1];
}

function parseCsv<T extends string>(value: string | undefined): T[] | undefined {
  return value?.split(",").map((item) => item.trim()).filter(Boolean) as T[] | undefined;
}

function parseArgs(argv: string[]): ParsedArgs {
  const valueFlags = new Set(["--docs-root", "--skill-delivery", "--agents", "--skills", "--scope", "--shape"]);
  const commandFlags = new Set(["--version", "--help"]);
  const args: string[] = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (valueFlags.has(arg)) {
      index += 1;
      continue;
    }
    if (arg.startsWith("--") && !commandFlags.has(arg)) {
      continue;
    }
    args.push(arg);
  }

  return {
    args,
    lite: argv.includes("--lite"),
    yes: argv.includes("--yes") || argv.includes("-y"),
    dryRun: argv.includes("--dry-run"),
    overwrite: argv.includes("--overwrite"),
    docsRoot: readFlagValue(argv, "--docs-root"),
    skillDelivery: readFlagValue(argv, "--skill-delivery") as SkillDelivery | undefined,
    agents: parseCsv<AgentTarget>(readFlagValue(argv, "--agents")),
    skills: readFlagValue(argv, "--skills"),
    scope: readFlagValue(argv, "--scope") as AgentScope | undefined,
    projectShape: readFlagValue(argv, "--shape") as ProjectShape | undefined
  };
}

function inferStarterShape(starter: string | undefined): ProjectShape {
  switch (starter) {
    case "flutter-mobile":
      return "mobile";
    case "nextjs-web":
      return "frontend";
    case "node-api":
    case "nestjs-api":
    case "laravel-api":
      return "backend";
    case "supabase-app":
    case "fullstack-saas":
    default:
      return "fullstack";
  }
}

function normalizeProjectSetup(ctx: CommandContext, options: ParsedArgs, starter?: string) {
  const selectedAgents = options.agents ?? [];
  const skillDelivery = options.skillDelivery ?? (selectedAgents.length > 0 ? "native" : "portable");
  const projectShape = options.projectShape ?? inferStarterShape(starter);
  if ((skillDelivery === "native" || skillDelivery === "both") && selectedAgents.length === 0) {
    throw new Error("Native skill delivery requires --agents <agent-list>.");
  }
  if (!PROJECT_SHAPES.includes(projectShape)) {
    throw new Error(`Unknown project shape: ${projectShape}`);
  }

  const selectedSkills = expandSkillSelection(ctx.runtimePaths.aiosKitSource, options.skills ?? "core");
  return defaultProjectConfig({
    mode: options.lite ? "lite" : "full",
    docsRoot: options.docsRoot ?? "docs",
    skillDelivery,
    selectedAgents,
    selectedSkills,
    agentScope: options.scope ?? "repo",
    projectShape,
    starter
  });
}

function relocateDocsRoot(projectPath: string, docsRootValue: string, skeletonDocsSource?: string): void {
  if (docsRootValue === "docs") {
    return;
  }

  const defaultDocs = path.join(projectPath, "docs");
  const targetDocs = path.join(projectPath, docsRootValue);
  if (!fs.existsSync(targetDocs)) {
    fs.mkdirSync(path.dirname(targetDocs), { recursive: true });
    if (fs.existsSync(defaultDocs)) {
      fs.renameSync(defaultDocs, targetDocs);
    } else if (skeletonDocsSource && fs.existsSync(skeletonDocsSource)) {
      copyDirectory(skeletonDocsSource, targetDocs);
    }
  }
}

function applyProjectShape(projectPath: string, shape: ProjectShape): void {
  const allShapeDirs = [...new Set(Object.values(PROJECT_SHAPE_PATHS).flat())];
  const required = new Set(PROJECT_SHAPE_PATHS[shape]);

  for (const directory of allShapeDirs) {
    const target = path.join(projectPath, directory);
    if (required.has(directory)) {
      fs.mkdirSync(target, { recursive: true });
      const gitkeep = path.join(target, ".gitkeep");
      if (!fs.existsSync(gitkeep)) {
        fs.writeFileSync(gitkeep, "", "utf8");
      }
      continue;
    }

    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true });
    }
  }
}

function ensureProjectShape(projectPath: string, shape: ProjectShape): void {
  for (const directory of PROJECT_SHAPE_PATHS[shape]) {
    const target = path.join(projectPath, directory);
    fs.mkdirSync(target, { recursive: true });
    const gitkeep = path.join(target, ".gitkeep");
    if (!fs.existsSync(gitkeep)) {
      fs.writeFileSync(gitkeep, "", "utf8");
    }
  }
}

function setupAiosForProject(
  ctx: CommandContext,
  projectPath: string,
  options: ParsedArgs,
  config = normalizeProjectSetup(ctx, options)
): { kit: string[]; agent: string[]; skipped: string[] } {
  if (options.lite) {
    return { kit: [], agent: [], skipped: [] };
  }

  const includeSkills = config.skillDelivery === "portable" || config.skillDelivery === "both";
  const kitResult = installAiosKit(ctx.runtimePaths.aiosKitSource, projectPath, { includeSkills, config });
  const agentResult =
    config.skillDelivery === "native" || config.skillDelivery === "both"
      ? installAgentSkills({
          sourceRoot: ctx.runtimePaths.aiosKitSource,
          projectPath,
          agents: config.selectedAgents,
          skills: config.selectedSkills,
          scope: config.agentScope,
          overwrite: options.overwrite,
          dryRun: options.dryRun
        })
      : { created: [], skipped: [], planned: [] };

  return {
    kit: kitResult.created,
    agent: agentResult.created,
    skipped: [...kitResult.skipped, ...agentResult.skipped]
  };
}

function commandInit(ctx: CommandContext, name: string | undefined, options: ParsedArgs = parseArgs([])): string {
  const projectName = requireName(name, "init");
  const target = path.resolve(ctx.cwd, projectName);
  const config = normalizeProjectSetup(ctx, options);

  ensureEmptyOrMissingDirectory(target);
  copyDirectory(ctx.runtimePaths.projectSkeleton, target);
  applyProjectShape(target, config.projectShape);
  relocateDocsRoot(target, config.docsRoot, path.join(ctx.runtimePaths.projectSkeleton, "docs"));
  if (!options.lite) {
    setupAiosForProject(ctx, target, options, config);
  }
  return `Created AI-ready project at ${target}`;
}

function commandStarter(
  ctx: CommandContext,
  starterName: string | undefined,
  projectNameArg: string | undefined,
  options: ParsedArgs = parseArgs([])
): string {
  const starter = requireName(starterName, "starter");
  const projectName = requireName(projectNameArg, "starter <starter-name>");
  const source = path.join(ctx.runtimePaths.starters, starter);
  const target = path.resolve(ctx.cwd, projectName);
  const config = normalizeProjectSetup(ctx, options, starter);

  if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) {
    throw new Error(`Unknown starter: ${starter}`);
  }

  ensureEmptyOrMissingDirectory(target);
  copyDirectory(source, target);
  relocateDocsRoot(target, config.docsRoot, path.join(source, "docs"));
  if (!options.lite) {
    setupAiosForProject(ctx, target, options, config);
  }
  return `Created AI-ready ${starter} starter at ${target}`;
}

function commandAdopt(ctx: CommandContext, projectPathArg: string | undefined, options: ParsedArgs = parseArgs([])): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const config = normalizeProjectSetup(ctx, options);
  const hadDocs = fs.existsSync(path.join(projectPath, "docs"));
  const result = adoptSkeleton(ctx.runtimePaths.projectSkeleton, projectPath);
  ensureProjectShape(projectPath, config.projectShape);
  if (config.docsRoot !== "docs") {
    if (hadDocs) {
      adoptSkeleton(path.join(ctx.runtimePaths.projectSkeleton, "docs"), path.join(projectPath, config.docsRoot));
    } else {
      relocateDocsRoot(projectPath, config.docsRoot, path.join(ctx.runtimePaths.projectSkeleton, "docs"));
    }
  }
  const setupResult = options.lite ? { kit: [], agent: [], skipped: [] } : setupAiosForProject(ctx, projectPath, options, config);

  const output = [
    `Adopted AI Dev OS structure in ${projectPath}`,
    `Created: ${result.created.length}`,
    `Skipped existing: ${result.skipped.length}`
  ];

  if (!options.lite) {
    output.push(`AIOS kit created: ${setupResult.kit.length}`, `Native agent skills created: ${setupResult.agent.length}`);
  }

  output.push("Next step: run `aios validate` from the project root.");
  return output.join("\n");
}

function commandInstallKit(ctx: CommandContext, projectPathArg: string | undefined): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const result = installAiosKit(ctx.runtimePaths.aiosKitSource, projectPath, { config: readProjectConfig(projectPath) });

  return [
    `Installed AIOS workflow kit in ${path.join(projectPath, ".aios")}`,
    `Created: ${result.created.length}`,
    `Skipped existing: ${result.skipped.length}`,
    "Next step: run `aios validate` from the project root."
  ].join("\n");
}

function commandDirectory(ctx: CommandContext, projectPathArg: string | undefined): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const projectCommands = path.join(projectPath, ".aios", "commands");
  if (fs.existsSync(projectCommands)) {
    return projectCommands;
  }
  return path.join(ctx.runtimePaths.aiosKitSource, "commands");
}

function commandList(ctx: CommandContext, projectPathArg: string | undefined): string {
  const directory = commandDirectory(ctx, projectPathArg);
  if (!fs.existsSync(directory)) {
    throw new Error(`AIOS commands directory not found: ${directory}`);
  }

  const commands = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.basename(file, ".md"))
    .sort();

  return ["Available AIOS commands:", ...commands.map((command) => `- ${command}`)].join("\n");
}

function commandPrompt(ctx: CommandContext, name: string | undefined, projectPathArg: string | undefined): string {
  const commandName = requireName(name, "command");
  const slug = slugify(commandName);
  const directory = commandDirectory(ctx, projectPathArg);
  const commandPath = path.join(directory, `${slug}.md`);

  if (!fs.existsSync(commandPath)) {
    throw new Error(`Unknown AIOS command: ${commandName}`);
  }

  return fs.readFileSync(commandPath, "utf8").trimEnd();
}

function commandAgentList(ctx: CommandContext): string {
  return [
    "Supported agent targets:",
    ...AGENT_TARGETS.map((agent) => `- ${agent}`),
    "",
    "Available AIOS skills:",
    ...availableSkills(ctx.runtimePaths.aiosKitSource).map((skill) => `- ${skill}`),
    "",
    "Skill groups:",
    "- core",
    "- planning",
    "- delivery",
    "- all"
  ].join("\n");
}

function commandAgentInstall(ctx: CommandContext, projectPathArg: string | undefined, options: ParsedArgs): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const agents = options.agents ?? ["codex"];
  const skills = expandSkillSelection(ctx.runtimePaths.aiosKitSource, options.skills ?? "core");
  const result = installAgentSkills({
    sourceRoot: ctx.runtimePaths.aiosKitSource,
    projectPath,
    agents,
    skills,
    scope: options.scope ?? "repo",
    overwrite: options.overwrite,
    dryRun: options.dryRun
  });

  if (!options.dryRun) {
    const current = readProjectConfig(projectPath);
    writeProjectConfig(
      projectPath,
      defaultProjectConfig({
        ...current,
        skillDelivery: current.skillDelivery === "portable" ? "both" : current.skillDelivery,
        selectedAgents: [...new Set([...current.selectedAgents, ...agents])],
        selectedSkills: [...new Set([...current.selectedSkills, ...skills])].sort(),
        agentScope: options.scope ?? current.agentScope
      })
    );
  }

  return [
    options.dryRun ? "Planned native agent skill install:" : `Installed native agent skills in ${projectPath}`,
    `Agents: ${agents.join(", ")}`,
    `Skills: ${skills.join(", ")}`,
    `Scope: ${options.scope ?? "repo"}`,
    options.dryRun ? `Planned: ${result.planned.length}` : `Created: ${result.created.length}`,
    `Skipped existing: ${result.skipped.length}`,
    ...((options.dryRun ? result.planned : result.created).slice(0, 20).map((item) => `- ${item}`))
  ].join("\n");
}

function commandConfig(ctx: CommandContext, projectPathArg: string | undefined): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  return JSON.stringify(readProjectConfig(projectPath), null, 2);
}

function commandFeature(ctx: CommandContext, name: string | undefined): string {
  const featureName = requireName(name, "feature");
  const slug = slugify(featureName);
  const title = titleize(featureName);
  const target = docsPath(ctx.cwd, path.join("product", "features", `${slug}.prd.md`));

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
  const directory = docsPath(ctx.cwd, "adr");
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
  const directory = docsPath(ctx.cwd, "tasks");
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
  const target = docsPath(ctx.cwd, path.join("reviews", `${slug}-review.md`));

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
  const target = docsPath(ctx.cwd, path.join("api", `${slug}.openapi.yaml`));

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
  const directory = docsPath(ctx.cwd, path.join("database", "migrations"));
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
  const target = docsPath(ctx.cwd, path.join("security", `${slug}-security-review.md`));

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
  const releaseTarget = docsPath(ctx.cwd, path.join("releases", `${slug}-release.md`));
  const changelogTarget = docsPath(ctx.cwd, path.join("releases", "CHANGELOG.md"));
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

function commandValidate(ctx: CommandContext, projectPathArg: string | undefined, options: ParsedArgs = parseArgs([])): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const result = validateProject(projectPath, { lite: options.lite, projectShape: options.projectShape });

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
  const tasksDir = docsPath(projectPath, "tasks");
  if (!fs.existsSync(tasksDir)) {
    return false;
  }

  return fs.readdirSync(tasksDir).some((file) => file.startsWith("TASK-") && file.endsWith(".md"));
}

function commandNext(ctx: CommandContext, projectPathArg: string | undefined): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const config = readProjectConfig(projectPath);
  const visionRelative = path.join(config.docsRoot, "product", "vision.md");
  const prdRelative = path.join(config.docsRoot, "product", "prd.md");
  const architectureRelative = path.join(config.docsRoot, "architecture", "architecture.md");
  const tasksRelative = path.join(config.docsRoot, "tasks");
  const visionPath = path.join(projectPath, visionRelative);
  const prdPath = path.join(projectPath, prdRelative);
  const architecturePath = path.join(projectPath, architectureRelative);

  if (
    isPlaceholderFile(visionPath, [
      /Describe the .*problem/i,
      /Describe the primary and secondary users/i,
      /List the smallest valuable version/i
    ])
  ) {
    return [
      `Next recommended step for ${projectPath}:`,
      `Fill \`${visionRelative}\` with the product problem, users, MVP scope, and success metrics.`,
      "Then ask Codex to read `AGENTS.md` and `.aios/prompts/01-generate-prd.md`."
    ].join("\n");
  }

  if (isPlaceholderFile(prdPath, [/Use the PRD template/i])) {
    return [
      `Next recommended step for ${projectPath}:`,
      `Generate \`${prdRelative}\` from \`${visionRelative}\`.`,
      "Ask Codex to use `.aios/prompts/01-generate-prd.md` and `.aios/templates/prd.template.md`."
    ].join("\n");
  }

  if (isPlaceholderFile(architecturePath, [/Use the architecture template/i])) {
    return [
      `Next recommended step for ${projectPath}:`,
      `Generate \`${architectureRelative}\` from the PRD.`,
      "Ask Codex to use `.aios/prompts/02-generate-architecture.md` and `.aios/templates/architecture.template.md`."
    ].join("\n");
  }

  if (!hasTaskFiles(projectPath)) {
    return [
      `Next recommended step for ${projectPath}:`,
      `Create the first implementation task in \`${tasksRelative}/\`.`,
      "Use `aios task \"Task name\"` or ask Codex to use `.aios/prompts/04-generate-tasks.md`."
    ].join("\n");
  }

  return [
    `Next recommended step for ${projectPath}:`,
    `Open the active task in \`${tasksRelative}/\` and implement one task at a time.`,
    `Ask Codex to read \`AGENTS.md\`, \`${path.join(config.docsRoot, "context", "context-map.md")}\`, \`.aios/skill-router.md\`, and the active task before coding.`
  ].join("\n");
}

function starterChoices(ctx: CommandContext): string[] {
  if (!fs.existsSync(ctx.runtimePaths.starters)) {
    return [];
  }
  return fs
    .readdirSync(ctx.runtimePaths.starters, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

async function promptSetupOptions(ctx: CommandContext): Promise<ParsedArgs> {
  const projectShape = await select<ProjectShape>({
    message: "Project shape?",
    choices: [
      { name: "Fullstack: frontend + backend", value: "fullstack" },
      { name: "Frontend only", value: "frontend" },
      { name: "Backend only", value: "backend" },
      { name: "Mobile only", value: "mobile" },
      { name: "Library/package", value: "library" },
      { name: "Docs/planning only", value: "docs" }
    ]
  });

  const lite = await confirm({ message: "Use lite mode without local AIOS kit?", default: false });
  if (lite) {
    return { ...parseArgs(["--lite"]), projectShape };
  }

  const docsLocation = await select({
    message: "Where should project docs live?",
    choices: [
      { name: "docs/ (recommended)", value: "docs" },
      { name: ".aios/project-docs/ (clean root)", value: ".aios/project-docs" },
      { name: "Custom path", value: "custom" }
    ]
  });
  const docsRootValue =
    docsLocation === "custom"
      ? await input({ message: "Docs root path:", default: "docs" })
      : docsLocation;

  const selectedAgents = await checkbox<AgentTarget>({
    message: "Install native skills for which agents?",
    choices: [
      { name: "Codex", value: "codex" },
      { name: "Qwen Code", value: "qwen" },
      { name: "OpenCode", value: "opencode" },
      { name: "Antigravity", value: "antigravity" },
      { name: "Generic Agent Skills", value: "generic" }
    ],
    required: false
  });

  let skillSelection = "core";
  if (selectedAgents.length > 0) {
    const skillMode = await select({
      message: "Which AIOS skills should be installed?",
      choices: [
        { name: "Core skills", value: "core" },
        { name: "Planning skills", value: "planning" },
        { name: "Delivery skills", value: "delivery" },
        { name: "All skills", value: "all" },
        { name: "Pick skills manually", value: "custom" }
      ]
    });

    if (skillMode === "custom") {
      const selectedSkills = await checkbox<string>({
        message: "Pick skills:",
        choices: availableSkills(ctx.runtimePaths.aiosKitSource).map((skill) => ({ name: skill, value: skill })),
        required: true
      });
      skillSelection = selectedSkills.join(",");
    } else {
      skillSelection = skillMode;
    }
  }

  const skillDelivery =
    selectedAgents.length > 0
      ? await select<SkillDelivery>({
          message: "How should skills be delivered?",
          choices: [
            { name: "Native agent folders only", value: "native" },
            { name: "Portable .aios/skills only", value: "portable" },
            { name: "Both native and portable", value: "both" }
          ]
        })
      : "portable";

  return {
    ...parseArgs([]),
    docsRoot: docsRootValue,
    agents: selectedAgents,
    skills: skillSelection,
    skillDelivery,
    projectShape
  };
}

async function interactiveCreate(ctx: CommandContext): Promise<string> {
  const projectType = await select({
    message: "What do you want to create?",
    choices: [
      { name: "Generic frontend/backend project", value: "generic" },
      ...starterChoices(ctx).map((starter) => ({ name: `Starter: ${starter}`, value: starter }))
    ]
  });
  const projectName = await input({ message: "Project name:", required: true });
  const setup = await promptSetupOptions(ctx);
  const shouldCreate = await confirm({ message: "Create project now?", default: true });
  if (!shouldCreate) {
    return "Cancelled.";
  }

  if (projectType === "generic") {
    return commandInit(ctx, projectName, setup);
  }
  return commandStarter(ctx, projectType, projectName, setup);
}

async function interactiveAdopt(ctx: CommandContext): Promise<string> {
  const projectPath = await input({ message: "Existing project path:", default: "." });
  const setup = await promptSetupOptions(ctx);
  const shouldAdopt = await confirm({ message: "Adopt AIOS into this project now?", default: true });
  return shouldAdopt ? commandAdopt(ctx, projectPath, setup) : "Cancelled.";
}

async function interactiveAgentInstall(ctx: CommandContext): Promise<string> {
  const projectPath = await input({ message: "Project path:", default: "." });
  const agents = await checkbox<AgentTarget>({
    message: "Install skills for which agents?",
    choices: [
      { name: "Codex", value: "codex" },
      { name: "Qwen Code", value: "qwen" },
      { name: "OpenCode", value: "opencode" },
      { name: "Antigravity", value: "antigravity" },
      { name: "Generic Agent Skills", value: "generic" }
    ],
    required: true
  });
  const skills = await checkbox<string>({
    message: "Pick skills:",
    choices: availableSkills(ctx.runtimePaths.aiosKitSource).map((skill) => ({ name: skill, value: skill })),
    required: true
  });
  const scope = await select<AgentScope>({
    message: "Install scope:",
    choices: [
      { name: "Repo scope", value: "repo" },
      { name: "User scope", value: "user" }
    ]
  });
  const dryRun = await confirm({ message: "Dry-run only?", default: false });

  return commandAgentInstall(ctx, projectPath, {
    ...parseArgs([]),
    agents,
    skills: skills.join(","),
    scope,
    dryRun
  });
}

async function runInteractive(argv: string[], ctx: CommandContext = { runtimePaths: getRuntimePaths(), cwd: process.cwd() }): Promise<string> {
  const [command, name, secondName] = parseArgs(argv).args;

  if (command === "init" && !name) {
    const projectName = await input({ message: "Project name:", required: true });
    const setup = await promptSetupOptions(ctx);
    return commandInit(ctx, projectName, setup);
  }

  if (command === "starter" && (!name || !secondName)) {
    const starter = name ?? (await select({ message: "Starter:", choices: starterChoices(ctx).map((value) => ({ name: value, value })) }));
    const projectName = secondName ?? (await input({ message: "Project name:", required: true }));
    const setup = await promptSetupOptions(ctx);
    return commandStarter(ctx, starter, projectName, setup);
  }

  const action = await select({
    message: "What do you want to do?",
    choices: [
      { name: "Create new project", value: "create" },
      { name: "Adopt existing project", value: "adopt" },
      { name: "Install native agent skills", value: "agent-install" },
      { name: "Validate project", value: "validate" },
      { name: "Show next recommended step", value: "next" },
      { name: "Print AIOS command prompt", value: "command" },
      { name: "Show help", value: "help" }
    ]
  });

  switch (action) {
    case "create":
      return interactiveCreate(ctx);
    case "adopt":
      return interactiveAdopt(ctx);
    case "agent-install":
      return interactiveAgentInstall(ctx);
    case "validate":
      return commandValidate(ctx, await input({ message: "Project path:", default: "." }));
    case "next":
      return commandNext(ctx, await input({ message: "Project path:", default: "." }));
    case "command": {
      const commandName = await select({
        message: "AIOS command:",
        choices: fs
          .readdirSync(path.join(ctx.runtimePaths.aiosKitSource, "commands"))
          .filter((file) => file.endsWith(".md"))
          .map((file) => path.basename(file, ".md"))
          .map((value) => ({ name: value, value }))
      });
      return commandPrompt(ctx, commandName, ".");
    }
    default:
      return usage();
  }
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
      return commandInit(ctx, name, parsed);
    case "starter":
      return commandStarter(ctx, name, secondName, parsed);
    case "adopt":
      return commandAdopt(ctx, name, parsed);
    case "install-kit":
      return commandInstallKit(ctx, name);
    case "command-list":
      return commandList(ctx, name);
    case "command":
      return commandPrompt(ctx, name, secondName);
    case "agent-list":
      return commandAgentList(ctx);
    case "agent-install":
      return commandAgentInstall(ctx, name, parsed);
    case "config":
      return commandConfig(ctx, name);
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
      return commandValidate(ctx, name, parsed);
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
    const argv = process.argv.slice(2);
    const parsed = parseArgs(argv);
    const [command, name, secondName] = parsed.args;
    const needsInteractive =
      command === undefined ||
      (command === "init" && !name && !parsed.yes) ||
      (command === "starter" && (!name || !secondName) && !parsed.yes);
    const output = needsInteractive ? await runInteractive(argv) : run(argv);
    if (output) {
      console.log(output);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
