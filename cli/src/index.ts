#!/usr/bin/env node
import fs from "node:fs";
import { execFileSync, execSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkbox, confirm, input, select } from "@inquirer/prompts";
import {
  AGENT_TARGETS,
  CAVEMAN_MODES,
  CORE_SKILLS,
  INTEGRATIONS,
  PROJECT_SHAPES,
  PROJECT_SHAPE_PATHS,
  type AgentScope,
  type AgentTarget,
  type CavemanMode,
  type IntegrationName,
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
  const compiledSourceDir = path.dirname(fileURLToPath(import.meta.url));
  const packageRoot = path.resolve(compiledSourceDir, "../..");
  const packageJsonPath = path.join(packageRoot, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as { version?: string };

  return packageJson.version ?? "0.0.0";
}

function usage(): string {
  return `AI-Native Development OS CLI

The CLI is only for setup, validation, and generating AIOS template files:
docs, tasks, prompts, skills, workflow rules, and optional RTK/Caveman
integration rules. For AI-native development, use Codex or another AI
agent directly inside the project. The agent should read AGENTS.md,
.aios/config.json, project docs, skills, and workflows. The CLI does not
run the agent or generate application code.

Start here:
  aios
    Open the guided setup wizard.

  aios init <project-name>
    Create a new AI-ready project from the bundled skeleton.

  aios adopt [project-path]
    Add AIOS to an existing project without overwriting existing files.

  aios next [project-path]
    Show the next recommended development step.

  aios validate [project-path]
    Check whether a project has the expected AI-ready structure.

Common commands:
  aios -v
    Show the installed AIOS CLI version.

  aios init <project-name> [--lite] [--shape fullstack|frontend|backend|mobile|library|docs] [--docs-root <path>] [--agents <list>] [--skills <set>] [--skill-delivery portable|native|both] [--yes]
    Create a new project. Installs the local .aios workflow kit unless --lite is provided.

  aios starter <starter-name> <project-name> [--lite] [--shape fullstack|frontend|backend|mobile|library|docs] [--docs-root <path>] [--agents <list>] [--skills <set>] [--skill-delivery portable|native|both] [--yes]
    Create a new project from a bundled AI docs only starter.

  aios adopt [project-path] [--lite] [--shape fullstack|frontend|backend|mobile|library|docs] [--docs-root <path>] [--agents <list>] [--skills <set>] [--skill-delivery portable|native|both] [--yes]
    Add AIOS folders and docs to an existing project.

  aios kit install [project-path]
    Install or repair the local .aios workflow kit without overwriting
    existing files. Defaults to the current directory.

  aios prompt list [project-path]
    List available local AIOS command prompts.

  aios prompt show <name> [project-path]
    Print a local AIOS command prompt. Read-only.

  aios agent install [project-path] [--agents codex,qwen] [--skills core|planning|delivery|all|name,name] [--scope repo|user] [--dry-run]
    Install selected AIOS skills into native agent skill folders.

  aios agent list
    List supported agent targets and available AIOS skills.

Advanced commands:
  aios integration list
    List optional external integrations supported by AIOS.

  aios integration status [project-path]
    Show project config, local rules, and detected external tool status.

  aios integration add <rtk|caveman|all> [project-path] [--install] [--mode lite|full|ultra] [--agents <list>] [--dry-run] [--yes]
    Enable optional RTK/Caveman rules in the local .aios kit.
    With --install --yes, also runs the external installer when supported.

  aios integration remove <rtk|caveman|all> [project-path] [--scope project|user|both] [--dry-run] [--yes]
    Disable local rules, offer user-computer uninstall, or both.
    External uninstall only runs with --yes.

  aios integration doctor [project-path]
    Check integration config, local rules, external detection, and recommended fixes.

  aios integration repair [project-path]
    Repair missing local integration rules for enabled integrations.

  aios config [project-path]
    Print resolved AIOS project configuration.

Document commands:
  aios create feature <feature-name>
    Create a feature PRD stub in the configured docsRoot product/features folder.

  aios create adr <decision-name>
    Create the next numbered Architecture Decision Record in the configured docsRoot adr folder.

  aios create task <task-name>
    Create the next numbered implementation task in the configured docsRoot tasks folder.

  aios create review <name>
    Create a review report stub in the configured docsRoot reviews folder.

  aios create design <name>
    Create a UI/UX design document stub in the configured docsRoot design folder.

  aios create openapi <api-name>
    Create an OpenAPI contract stub in the configured docsRoot api folder.

  aios create migration <migration-name>
    Create the next numbered migration plan in the configured docsRoot database/migrations folder.

  aios create security <review-name>
    Create a security review report stub in the configured docsRoot security folder.

  aios create release <release-name>
    Create a release note in the configured docsRoot releases folder and a changelog draft if missing.

  aios validate [project-path] [--lite]
    Check whether a project has the required AI-ready structure.
    Requires the local .aios kit unless --lite is provided.
    Defaults to the current directory.

  aios next [project-path]
    Print the next recommended development step. Read-only.

Options:
  --lite
    Create or validate only the base project docs, without the local .aios kit.

  --shape fullstack|frontend|backend|mobile|library|docs
    Choose which app placeholder folders should exist.

  --docs-root <path>
    Put product, architecture, task, review, and API docs somewhere other than docs/.

  --agents codex,qwen,opencode,antigravity,generic
    Install native skills for selected AI agents.

  --skills core|planning|delivery|all|name,name
    Choose which AIOS skills to install.

  --skill-delivery portable|native|both
    Choose whether skills live in .aios/skills, native agent folders, or both.

  --yes
    Confirm external install/uninstall actions after the command has enough information.

  aios --version
    Same as aios -v.

  aios --help
    Show this help message.

Typical workflow:
  aios init demo-project
  aios validate demo-project
  aios next demo-project
  cd demo-project
  aios create feature "Habit reminders"
  aios prompt show discover-product
  aios create design "Habit reminders"
  aios create openapi "Habit API"
  aios create migration "Create habits table"
  aios create security "Habit API"
  aios create adr "Use server date for completion"
  aios create task "Implement habit API"
  aios create review "Habit API"
  aios create release "0.3.0"
  aios integration status
  aios integration add rtk . --dry-run

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
  scope?: string;
  projectShape?: ProjectShape;
  install: boolean;
  mode?: string;
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
  const valueFlags = new Set(["--docs-root", "--skill-delivery", "--agents", "--skills", "--scope", "--shape", "--mode"]);
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
    install: argv.includes("--install"),
    docsRoot: readFlagValue(argv, "--docs-root"),
    skillDelivery: readFlagValue(argv, "--skill-delivery") as SkillDelivery | undefined,
    agents: parseCsv<AgentTarget>(readFlagValue(argv, "--agents")),
    skills: readFlagValue(argv, "--skills"),
    scope: readFlagValue(argv, "--scope"),
    projectShape: readFlagValue(argv, "--shape") as ProjectShape | undefined,
    mode: readFlagValue(argv, "--mode")
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
  const agentScope = options.scope === "user" ? "user" : "repo";
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
    agentScope,
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

function setupLiteConfig(projectPath: string, config: ReturnType<typeof normalizeProjectSetup>): void {
  writeProjectConfig(projectPath, {
    ...config,
    mode: "lite"
  });
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
  } else {
    setupLiteConfig(target, config);
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
  } else {
    setupLiteConfig(target, config);
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
  if (options.lite) {
    setupLiteConfig(projectPath, config);
  }

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
  const result = installAiosKit(ctx.runtimePaths.aiosKitSource, projectPath, {
    config: {
      ...readProjectConfig(projectPath),
      mode: "full"
    }
  });

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
  const commandName = requireName(name, "prompt show");
  const slug = slugify(commandName);
  const directory = commandDirectory(ctx, projectPathArg);
  const commandPath = path.join(directory, `${slug}.md`);

  if (!fs.existsSync(commandPath)) {
    throw new Error(`Unknown AIOS command: ${commandName}`);
  }

  return fs.readFileSync(commandPath, "utf8").trimEnd();
}

function commandPromptGroup(ctx: CommandContext, action: string | undefined, name: string | undefined, projectPathArg: string | undefined): string {
  switch (action) {
    case "list":
      return commandList(ctx, name);
    case "show":
      return commandPrompt(ctx, name, projectPathArg);
    default:
      throw new Error("Missing prompt action. Usage: aios prompt <list|show> [name] [project-path]");
  }
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
  const scope = options.scope === "user" ? "user" : "repo";
  const result = installAgentSkills({
    sourceRoot: ctx.runtimePaths.aiosKitSource,
    projectPath,
    agents,
    skills,
    scope,
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
        agentScope: scope ?? current.agentScope
      })
    );
  }

  return [
    options.dryRun ? "Planned native agent skill install:" : `Installed native agent skills in ${projectPath}`,
    `Agents: ${agents.join(", ")}`,
    `Skills: ${skills.join(", ")}`,
    `Scope: ${scope}`,
    options.dryRun ? `Planned: ${result.planned.length}` : `Created: ${result.created.length}`,
    `Skipped existing: ${result.skipped.length}`,
    ...((options.dryRun ? result.planned : result.created).slice(0, 20).map((item) => `- ${item}`))
  ].join("\n");
}

function commandAgent(ctx: CommandContext, action: string | undefined, projectPathArg: string | undefined, options: ParsedArgs): string {
  switch (action) {
    case "list":
      return commandAgentList(ctx);
    case "install":
      return commandAgentInstall(ctx, projectPathArg, options);
    default:
      throw new Error("Missing agent action. Usage: aios agent <list|install> [project-path]");
  }
}

function commandKit(ctx: CommandContext, action: string | undefined, projectPathArg: string | undefined): string {
  switch (action) {
    case "install":
    case "repair":
      return commandInstallKit(ctx, projectPathArg);
    default:
      throw new Error("Missing kit action. Usage: aios kit install [project-path]");
  }
}

type IntegrationScope = "project" | "user" | "both";

function expandIntegrationSelection(name: string | undefined): IntegrationName[] {
  const value = requireName(name, "integration <add|remove>");
  if (value === "all") {
    return [...INTEGRATIONS];
  }
  if (INTEGRATIONS.includes(value as IntegrationName)) {
    return [value as IntegrationName];
  }
  throw new Error(`Unknown integration: ${value}`);
}

function integrationScope(value: string | undefined): IntegrationScope {
  if (!value) {
    return "project";
  }
  if (value === "project" || value === "user" || value === "both") {
    return value;
  }
  throw new Error(`Unknown integration remove scope: ${value}`);
}

function cavemanMode(value: string | undefined): CavemanMode {
  if (!value) {
    return "lite";
  }
  if (CAVEMAN_MODES.includes(value as CavemanMode)) {
    return value as CavemanMode;
  }
  throw new Error(`Unknown Caveman mode: ${value}`);
}

function normalizeCavemanTargetAgents(config = defaultProjectConfig(), options: ParsedArgs = parseArgs([])): AgentTarget[] {
  const requested = options.agents ?? config.integrations.caveman.targetAgents ?? config.selectedAgents;
  const targets: AgentTarget[] = requested.length > 0 ? requested : ["codex"];
  return [...new Set(targets)].filter((agent) => AGENT_TARGETS.includes(agent));
}

function skillsCliAgentName(agent: AgentTarget): string {
  switch (agent) {
    case "qwen":
      return "qwen-code";
    case "opencode":
      return "opencode";
    case "antigravity":
      return "antigravity";
    case "codex":
    case "generic":
      return "codex";
  }
}

function runQuiet(command: string): string | undefined {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      shell: os.platform() === "win32" ? undefined : "/bin/bash"
    }).trim();
  } catch {
    return undefined;
  }
}

function commandExists(command: string): boolean {
  if (os.platform() === "win32") {
    return Boolean(runQuiet(`where ${command}`));
  }
  return Boolean(runQuiet(`command -v ${command}`));
}

function commandVersion(command: string, args: string[] = ["--version"]): string | undefined {
  try {
    return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return undefined;
  }
}

function cavemanLocations(projectPath: string, homeDir = process.env.HOME ?? ""): string[] {
  return [
    path.join(projectPath, ".agents", "skills", "caveman"),
    path.join(projectPath, ".codex", "skills", "caveman"),
    path.join(projectPath, ".claude", "skills", "caveman"),
    path.join(projectPath, ".qwen", "skills", "caveman"),
    path.join(projectPath, ".opencode", "skills", "caveman"),
    path.join(homeDir, ".agents", "skills", "caveman"),
    path.join(homeDir, ".codex", "skills", "caveman"),
    path.join(homeDir, ".claude", "skills", "caveman"),
    path.join(homeDir, ".qwen", "skills", "caveman"),
    path.join(homeDir, ".config", "opencode", "skills", "caveman")
  ].filter(Boolean);
}

function detectIntegration(projectPath: string, integration: IntegrationName): { detected: boolean; detail: string; locations?: string[] } {
  if (integration === "rtk") {
    if (!commandExists("rtk")) {
      return { detected: false, detail: "rtk not found on PATH" };
    }
    return { detected: true, detail: commandVersion("rtk") ?? "rtk found" };
  }

  const locations = cavemanLocations(projectPath).filter((location) => fs.existsSync(location));
  if (locations.length === 0) {
    return { detected: false, detail: "caveman skill/plugin not found in common locations", locations: [] };
  }
  return { detected: true, detail: `${locations.length} caveman location(s) found`, locations };
}

function integrationRulePath(projectPath: string, integration: IntegrationName): string {
  return path.join(projectPath, ".aios", "integrations", `${integration}.md`);
}

function disabledIntegrationRulePath(projectPath: string, integration: IntegrationName): string {
  return path.join(projectPath, ".aios", "integrations", `${integration}.md.disabled`);
}

function ensureIntegrationRule(ctx: CommandContext, projectPath: string, integration: IntegrationName): string {
  const source = path.join(ctx.runtimePaths.aiosKitSource, "integrations", `${integration}.md`);
  const target = integrationRulePath(projectPath, integration);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing AIOS integration rule source: ${source}`);
  }
  if (!fs.existsSync(target)) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
  return target;
}

function disableIntegrationRule(projectPath: string, integration: IntegrationName): string | undefined {
  const target = integrationRulePath(projectPath, integration);
  if (!fs.existsSync(target)) {
    return undefined;
  }
  const disabled = disabledIntegrationRulePath(projectPath, integration);
  if (fs.existsSync(disabled)) {
    fs.rmSync(disabled, { force: true });
  }
  fs.renameSync(target, disabled);
  return disabled;
}

function installCommand(
  integration: IntegrationName,
  targetAgents: AgentTarget[] = ["codex"]
): { command: string; runnable: boolean; note: string } {
  if (integration === "rtk") {
    if (os.platform() === "win32") {
      return {
        command: "Download rtk.exe from the official RTK releases and add it to PATH.",
        runnable: false,
        note: "Windows auto-install is not supported by AIOS."
      };
    }
    if (commandExists("brew")) {
      return { command: "brew install rtk", runnable: true, note: "Homebrew detected." };
    }
    return {
      command: "curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh",
      runnable: true,
      note: "Official RTK install script."
    };
  }

  const agentFlags = targetAgents.map((agent) => `-a ${skillsCliAgentName(agent)}`).join(" ");
  const targetedCommands = targetAgents
    .map((agent) => `npx -y skills add JuliusBrussee/caveman -a ${skillsCliAgentName(agent)} --yes`)
    .join(" && ");
  if (os.platform() === "win32") {
    return {
      command: targetedCommands || `npx -y skills add JuliusBrussee/caveman ${agentFlags} --yes`,
      runnable: false,
      note: "Windows auto-install is not run by AIOS; run this manually in PowerShell if trusted."
    };
  }
  return {
    command: targetedCommands || `npx -y skills add JuliusBrussee/caveman ${agentFlags} --yes`,
    runnable: true,
    note: `Targeted Caveman install for: ${targetAgents.join(", ")}. Requires Node >= 18.`
  };
}

function uninstallCommand(integration: IntegrationName, projectPath: string): { command: string; runnable: boolean; note: string; paths?: string[] } {
  if (integration === "rtk") {
    if (!commandExists("rtk")) {
      return { command: "rtk init -g --uninstall", runnable: false, note: "RTK was not detected on PATH." };
    }
    return {
      command: "rtk init -g --uninstall",
      runnable: true,
      note: "Removes RTK agent hooks. Remove the RTK binary separately via your package manager if desired."
    };
  }

  const paths = cavemanLocations(projectPath).filter((location) => fs.existsSync(location));
  return {
    command: paths.length > 0 ? `rm -rf ${paths.map((item) => JSON.stringify(item)).join(" ")}` : "No caveman paths detected",
    runnable: paths.length > 0,
    note: paths.length > 0 ? "Removes detected Caveman skill/plugin folders only." : "Caveman was not detected in common locations.",
    paths
  };
}

function executeExternal(command: string, cwd: string): void {
  execSync(command, {
    cwd,
    stdio: "inherit",
    shell: os.platform() === "win32" ? undefined : "/bin/bash"
  });
}

function integrationStateLabel(enabled: boolean, detected: boolean): string {
  if (!enabled) {
    return "disabled";
  }
  return detected ? "ready" : "rules-only";
}

function integrationNextAction(integration: IntegrationName, enabled: boolean, detected: boolean): string {
  if (!enabled) {
    return `run aios integration add ${integration}`;
  }
  if (detected) {
    return "ready";
  }
  return "rules are active; install external tool when native integration is needed";
}

function integrationSummary(projectPath: string, integrations: IntegrationName[], title = "AIOS integration status after update:"): string[] {
  const config = readProjectConfig(projectPath);
  const output = ["", title];
  for (const integration of integrations) {
    const detection = detectIntegration(projectPath, integration);
    const rule = integrationRulePath(projectPath, integration);
    const enabled = config.integrations[integration].enabled;
    const state = integrationStateLabel(enabled, detection.detected);
    output.push(
      `- ${integration}: ${state}, external ${detection.detected ? "detected" : "not detected"} (${detection.detail}), rules ${fs.existsSync(rule) ? "present" : "missing"}`
    );
  }
  return output;
}

function commandIntegrationList(): string {
  return [
    "Optional AIOS integrations:",
    "- rtk: compact noisy terminal command output before it reaches AI context (optional external)",
    "- caveman: concise agent response style for status/debug loops (optional external)"
  ].join("\n");
}

function commandIntegrationStatus(projectPathArg: string | undefined, ctx: CommandContext): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const config = readProjectConfig(projectPath);
  const output = [`AIOS integration status for ${projectPath}:`];

  for (const integration of INTEGRATIONS) {
    const detection = detectIntegration(projectPath, integration);
    const rule = integrationRulePath(projectPath, integration);
    const disabledRule = disabledIntegrationRulePath(projectPath, integration);
    const enabled = config.integrations[integration].enabled;
    const state = integrationStateLabel(enabled, detection.detected);
    output.push(
      "",
      `${integration}:`,
      `- state: ${state}`,
      `- external: ${detection.detected ? "detected" : "not detected"} (${detection.detail})`,
      `- rules: ${fs.existsSync(rule) ? "present" : fs.existsSync(disabledRule) ? "disabled" : "missing"}`,
      `- next: ${integrationNextAction(integration, enabled, detection.detected)}`
    );
  }

  return output.join("\n");
}

function commandIntegrationAdd(
  ctx: CommandContext,
  integrationArg: string | undefined,
  projectPathArg: string | undefined,
  options: ParsedArgs
): string {
  const integrations = expandIntegrationSelection(integrationArg);
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const mode = cavemanMode(options.mode);
  const output = [options.dryRun ? "Planned AIOS integration add:" : `Updated AIOS integrations in ${projectPath}`];
  const config = readProjectConfig(projectPath);
  const cavemanTargets = normalizeCavemanTargetAgents(config, options);
  const executedInstallers: IntegrationName[] = [];

  for (const integration of integrations) {
    const detection = detectIntegration(projectPath, integration);
    const installer = installCommand(integration, cavemanTargets);
    output.push("", `${integration}:`, `- external: ${detection.detected ? "detected" : "not detected"} (${detection.detail})`);

    if (!options.dryRun) {
      ensureIntegrationRule(ctx, projectPath, integration);
      config.integrations[integration].enabled = true;
      if (integration === "caveman") {
        config.integrations.caveman.mode = mode;
        config.integrations.caveman.targetAgents = cavemanTargets;
      }
    }

    output.push(`- rules: ${options.dryRun ? "would create/update" : "created/updated"}`);

    if (options.install && !detection.detected) {
      output.push(`- installer: ${installer.command}`, `- install note: ${installer.note}`);
      if (integration === "caveman") {
        output.push(`- target agents: ${cavemanTargets.join(", ")}`);
        output.push("- install scope: targeted agents only; AIOS does not use Caveman all-agent auto-detection");
      }
      if (installer.runnable && options.yes && !options.dryRun) {
        try {
          executeExternal(installer.command, projectPath);
          executedInstallers.push(integration);
          output.push("- install: executed");
        } catch (error) {
          output.push(`- install: failed (${error instanceof Error ? error.message : String(error)})`);
        }
      } else if (installer.runnable) {
        output.push("- install: not executed; re-run with --yes after reviewing the installer command");
      } else {
        output.push("- install: manual only on this platform");
      }
    } else if (!detection.detected) {
      output.push(`- manual install: ${installer.command}`);
    }
  }

  if (!options.dryRun) {
    writeProjectConfig(projectPath, config);
  }

  if (!options.dryRun) {
    output.push(...integrationSummary(projectPath, integrations));
    if (executedInstallers.length > 0) {
      output.push(...integrationSummary(projectPath, executedInstallers, "External install verification:"));
    }
  }

  return output.join("\n");
}

function commandIntegrationRemove(
  ctx: CommandContext,
  integrationArg: string | undefined,
  projectPathArg: string | undefined,
  options: ParsedArgs
): string {
  const integrations = expandIntegrationSelection(integrationArg);
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const scope = integrationScope(options.scope);
  const config = readProjectConfig(projectPath);
  const output = [options.dryRun ? "Planned AIOS integration remove:" : `Removed AIOS integrations in ${projectPath}`, `Scope: ${scope}`];

  for (const integration of integrations) {
    output.push("", `${integration}:`);
    if (scope === "project" || scope === "both") {
      output.push("- project config: would disable");
      if (!options.dryRun) {
        config.integrations[integration].enabled = false;
        const disabled = disableIntegrationRule(projectPath, integration);
        output.push(disabled ? `- project rules: disabled at ${disabled}` : "- project rules: already missing");
      } else {
        output.push(`- project rules: would disable ${integrationRulePath(projectPath, integration)}`);
      }
    }

    if (scope === "user" || scope === "both") {
      const uninstall = uninstallCommand(integration, projectPath);
      output.push(`- user uninstall: ${uninstall.command}`, `- uninstall note: ${uninstall.note}`);
      if (uninstall.runnable && options.yes && !options.dryRun) {
        if (integration === "caveman" && uninstall.paths) {
          for (const target of uninstall.paths) {
            fs.rmSync(target, { recursive: true, force: true });
          }
        } else {
          executeExternal(uninstall.command, projectPath);
        }
        output.push("- uninstall: executed");
      } else if (uninstall.runnable) {
        output.push("- uninstall: not executed; re-run with --yes after reviewing the uninstall action");
      } else {
        output.push("- uninstall: manual or unavailable");
      }
    }
  }

  if (!options.dryRun && (scope === "project" || scope === "both")) {
    writeProjectConfig(projectPath, config);
  }

  return output.join("\n");
}

function integrationIssues(projectPath: string): string[] {
  const config = readProjectConfig(projectPath);
  const issues: string[] = [];

  for (const integration of INTEGRATIONS) {
    const enabled = config.integrations[integration].enabled;
    const detection = detectIntegration(projectPath, integration);
    const ruleExists = fs.existsSync(integrationRulePath(projectPath, integration));
    if (enabled && !ruleExists) {
      issues.push(`${integration}: enabled but local rule is missing`);
    }
    if (enabled && !detection.detected) {
      issues.push(`${integration}: enabled but external tool/skill is not detected`);
    }
  }

  if (config.integrations.caveman.enabled && config.integrations.caveman.targetAgents.length === 0) {
    issues.push("caveman: enabled without targetAgents; repair will default to selectedAgents or codex");
  }

  return issues;
}

function commandIntegrationDoctor(ctx: CommandContext, projectPathArg: string | undefined): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const issues = integrationIssues(projectPath);
  return [
    commandIntegrationStatus(projectPath, ctx),
    "",
    "Doctor:",
    ...(issues.length > 0 ? issues.map((issue) => `- ${issue}`) : ["- no integration issues found"]),
    "",
    "Recommended fixes:",
    issues.length > 0 ? "- run `aios integration repair` to restore local rules" : "- no action needed",
    "- use `aios integration add <name> --install` to review external install commands",
    "- use `aios integration remove <name> --scope project` to disable stale project rules"
  ].join("\n");
}

function commandIntegrationRepair(ctx: CommandContext, projectPathArg: string | undefined, options: ParsedArgs): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const config = readProjectConfig(projectPath);
  const output = [options.dryRun ? "Planned AIOS integration repair:" : `Repaired AIOS integrations in ${projectPath}`];

  for (const integration of INTEGRATIONS) {
    if (!config.integrations[integration].enabled) {
      output.push(`- ${integration}: skipped, disabled`);
      continue;
    }

    if (options.dryRun) {
      output.push(`- ${integration}: would ensure ${integrationRulePath(projectPath, integration)}`);
      continue;
    }

    const rule = ensureIntegrationRule(ctx, projectPath, integration);
    output.push(`- ${integration}: ensured ${rule}`);
  }

  if (config.integrations.caveman.enabled && config.integrations.caveman.targetAgents.length === 0 && !options.dryRun) {
    config.integrations.caveman.targetAgents = normalizeCavemanTargetAgents(config, options);
    writeProjectConfig(projectPath, config);
    output.push(`- caveman: targetAgents set to ${config.integrations.caveman.targetAgents.join(", ")}`);
  }

  return output.join("\n");
}

function commandIntegration(
  ctx: CommandContext,
  action: string | undefined,
  integrationArg: string | undefined,
  projectPathArg: string | undefined,
  options: ParsedArgs
): string {
  switch (action) {
    case "list":
      return commandIntegrationList();
    case "status":
      return commandIntegrationStatus(integrationArg, ctx);
    case "add":
      return commandIntegrationAdd(ctx, integrationArg, projectPathArg, options);
    case "remove":
      return commandIntegrationRemove(ctx, integrationArg, projectPathArg, options);
    case "doctor":
      return commandIntegrationDoctor(ctx, integrationArg);
    case "repair":
      return commandIntegrationRepair(ctx, integrationArg, options);
    default:
      throw new Error("Missing integration action. Usage: aios integration <list|status|add|remove|doctor|repair> [name] [project-path]");
  }
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

function commandDesign(ctx: CommandContext, name: string | undefined): string {
  const designName = requireName(name, "design");
  const slug = slugify(designName);
  const title = titleize(designName);
  const target = docsPath(ctx.cwd, path.join("design", `${slug}-design.md`));

  writeRenderedTemplate({
    templatePath: path.join(ctx.runtimePaths.templates, "design.template.md"),
    targetPath: target,
    values: {
      feature_or_product_name: title,
      title,
      slug
    }
  });

  return `Created design document at ${target}`;
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

function commandCreate(ctx: CommandContext, type: string | undefined, name: string | undefined): string {
  switch (type) {
    case "feature":
      return commandFeature(ctx, name);
    case "adr":
      return commandAdr(ctx, name);
    case "task":
      return commandTask(ctx, name);
    case "review":
      return commandReview(ctx, name);
    case "design":
      return commandDesign(ctx, name);
    case "openapi":
      return commandOpenApi(ctx, name);
    case "migration":
      return commandMigration(ctx, name);
    case "security":
      return commandSecurity(ctx, name);
    case "release":
      return commandRelease(ctx, name);
    default:
      throw new Error("Missing artifact type. Usage: aios create <feature|adr|task|review|design|openapi|migration|security|release> <name>");
  }
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

function relativeDisplayPath(...parts: string[]): string {
  return path.join(...parts).replace(/\\/g, "/");
}

function commandNext(ctx: CommandContext, projectPathArg: string | undefined): string {
  const projectPath = path.resolve(ctx.cwd, projectPathArg ?? ".");
  const config = readProjectConfig(projectPath);
  const visionRelative = relativeDisplayPath(config.docsRoot, "product", "vision.md");
  const prdRelative = relativeDisplayPath(config.docsRoot, "product", "prd.md");
  const architectureRelative = relativeDisplayPath(config.docsRoot, "architecture", "architecture.md");
  const designRelative = relativeDisplayPath(config.docsRoot, "design", "design.md");
  const tasksRelative = relativeDisplayPath(config.docsRoot, "tasks");
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
      `Use product discovery to interview the user and fill \`${visionRelative}\` with the problem, users, MVP scope, success metrics, assumptions, and constraints.`,
      "Ask Codex to read `AGENTS.md` and `.aios/prompts/00-discover-product.md`.",
      "After the user reviews the vision, generate the PRD with `.aios/prompts/01-generate-prd.md`."
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
      `If the work has user-facing UI or product-facing interactions, create or update \`${designRelative}\` first.`,
      "Use `aios create design \"Feature name\"` or ask Codex to use `.aios/prompts/13-design-ui-ux.md`.",
      `When the design is reviewed, create the first implementation task in \`${tasksRelative}/\` with \`aios create task "Task name"\` or \`.aios/prompts/04-generate-tasks.md\`.`
    ].join("\n");
  }

  return [
    `Next recommended step for ${projectPath}:`,
    `Open the active task in \`${tasksRelative}/\` and implement one task at a time.`,
    `Ask Codex to read \`AGENTS.md\`, \`${relativeDisplayPath(config.docsRoot, "context", "context-map.md")}\`, \`.aios/skill-router.md\`, and the active task before coding.`
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

function formatList(values: string[], empty = "none"): string {
  return values.length > 0 ? values.join(", ") : empty;
}

function formatSetupSummary(projectPath: string, setup: ParsedArgs, action: "create" | "adopt", starter?: string): string {
  const projectShape = setup.projectShape ?? inferStarterShape(starter);
  const docsRootValue = setup.docsRoot ?? "docs";
  const selectedAgents = setup.agents ?? [];
  const skillDelivery = setup.lite ? "none (lite mode)" : setup.skillDelivery ?? (selectedAgents.length > 0 ? "native" : "portable");
  const selectedSkills = setup.lite ? "none (lite mode)" : setup.skills ?? "core";

  return [
    "",
    action === "create" ? "Project setup summary:" : "Adopt setup summary:",
    `- target: ${projectPath}`,
    starter ? `- starter: ${starter}` : "- starter: none",
    `- shape: ${projectShape}`,
    `- setup mode: ${setup.lite ? "lite project docs only" : "full AIOS workflow kit"}`,
    `- docs root: ${docsRootValue}`,
    `- native agents: ${formatList(selectedAgents)}`,
    `- skills: ${selectedSkills}`,
    `- skill delivery: ${skillDelivery}`
  ].join("\n");
}

async function promptSkillSelection(ctx: CommandContext, message = "Which AIOS skills should be installed?"): Promise<string> {
  const skillMode = await select({
    message,
    choices: [
      { name: "Core skills (recommended)", value: "core" },
      { name: "Planning skills", value: "planning" },
      { name: "Delivery skills", value: "delivery" },
      { name: "All skills", value: "all" },
      { name: "Pick skills manually", value: "custom" }
    ]
  });

  if (skillMode !== "custom") {
    return skillMode;
  }

  const selectedSkills = await checkbox<string>({
    message: "Pick skills:",
    choices: availableSkills(ctx.runtimePaths.aiosKitSource).map((skill) => ({ name: skill, value: skill })),
    required: true
  });
  return selectedSkills.join(",");
}

function integrationReviewMessage(selected: IntegrationName[], projectPath: string): string {
  const lines = ["Review installer plan above. Run external installer commands now?"];
  if (selected.includes("caveman")) {
    const config = readProjectConfig(projectPath);
    const targets = normalizeCavemanTargetAgents(config, { ...parseArgs([]), agents: config.selectedAgents });
    lines.push(`Caveman target agents: ${formatList(targets)}.`);
  }
  if (selected.includes("rtk")) {
    lines.push("RTK may install a user-level command-line tool.");
  }
  lines.push(`Commands will run from: ${projectPath}`);
  return lines.join(" ");
}

function hasRunnableInstallers(selected: IntegrationName[], projectPath: string): boolean {
  const config = readProjectConfig(projectPath);
  const targets = normalizeCavemanTargetAgents(config, { ...parseArgs([]), agents: config.selectedAgents });

  return selected.some((integration) => {
    const detection = detectIntegration(projectPath, integration);
    if (detection.detected) {
      return false;
    }
    return installCommand(integration, targets).runnable;
  });
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

  const setupMode = await select({
    message: "Setup mode?",
    choices: [
      { name: "Full AIOS setup: .aios kit + workflow guidance (recommended)", value: "full" },
      { name: "Lite setup: project docs only", value: "lite" }
    ]
  });
  const lite = setupMode === "lite";
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
    skillSelection = await promptSkillSelection(ctx);
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
      { name: "Blank AIOS project", value: "generic" },
      ...starterChoices(ctx).map((starter) => ({ name: `Starter: ${starter}`, value: starter }))
    ]
  });
  const projectName = await input({ message: "Project name:", required: true });
  const setup = await promptSetupOptions(ctx);
  const projectPath = path.resolve(ctx.cwd, projectName);
  console.log(formatSetupSummary(projectPath, setup, "create", projectType === "generic" ? undefined : projectType));
  const shouldCreate = await confirm({ message: "Create project now?", default: true });
  if (!shouldCreate) {
    return "Cancelled.";
  }

  const output =
    projectType === "generic"
      ? commandInit(ctx, projectName, setup)
      : commandStarter(ctx, projectType, projectName, setup);
  const integrationOutput = setup.lite ? "" : await promptOptionalIntegrationSetup(ctx, projectPath);
  return [output, integrationOutput].filter(Boolean).join("\n\n");
}

async function promptOptionalIntegrationSetup(ctx: CommandContext, projectPath: string): Promise<string> {
  const selected = await checkbox<IntegrationName>({
    message: "Set up optional external integrations now?",
    choices: [
      { name: "RTK: compact noisy terminal output", value: "rtk" },
      { name: "Caveman: concise status/debug responses", value: "caveman" }
    ],
    required: false
  });

  if (selected.length === 0) {
    return "";
  }

  const integrationArg = selected.length === INTEGRATIONS.length ? "all" : selected.join(",");
  const mode = selected.includes("caveman")
    ? await select<CavemanMode>({
        message: "Caveman response mode:",
        choices: [
          { name: "Lite", value: "lite" },
          { name: "Full", value: "full" },
          { name: "Ultra", value: "ultra" }
        ]
      })
    : "lite";
  const installMode = await select({
    message: "Integration setup mode:",
    choices: [
      { name: "Generate AIOS rules only", value: "rules" },
      { name: "Generate rules and offer installer if missing", value: "install" }
    ]
  });
  const install = installMode === "install";
  if (install) {
    console.log(
      commandIntegrationAdd(ctx, integrationArg, projectPath, {
        ...parseArgs([]),
        install: true,
        dryRun: true,
        mode,
        agents: readProjectConfig(projectPath).selectedAgents
      })
    );
  }
  const yes = install && hasRunnableInstallers(selected, projectPath)
    ? await confirm({
        message: integrationReviewMessage(selected, projectPath),
        default: false
      })
    : false;

  return commandIntegrationAdd(ctx, integrationArg, projectPath, {
    ...parseArgs([]),
    install,
    yes,
    mode
  });
}

async function interactiveAdopt(ctx: CommandContext): Promise<string> {
  const projectPath = await input({ message: "Existing project path:", default: "." });
  const setup = await promptSetupOptions(ctx);
  const resolvedProjectPath = path.resolve(ctx.cwd, projectPath);
  console.log(formatSetupSummary(resolvedProjectPath, setup, "adopt"));
  const shouldAdopt = await confirm({ message: "Adopt AIOS into this project now?", default: true });
  if (!shouldAdopt) {
    return "Cancelled.";
  }

  const output = commandAdopt(ctx, projectPath, setup);
  const integrationOutput = setup.lite ? "" : await promptOptionalIntegrationSetup(ctx, resolvedProjectPath);
  return [output, integrationOutput].filter(Boolean).join("\n\n");
}

async function interactiveInit(ctx: CommandContext, projectName: string, setup: ParsedArgs): Promise<string> {
  const projectPath = path.resolve(ctx.cwd, projectName);
  console.log(formatSetupSummary(projectPath, setup, "create"));
  const shouldCreate = await confirm({ message: "Create project now?", default: true });
  if (!shouldCreate) {
    return "Cancelled.";
  }
  const output = commandInit(ctx, projectName, setup);
  const integrationOutput = setup.lite ? "" : await promptOptionalIntegrationSetup(ctx, projectPath);
  return [output, integrationOutput].filter(Boolean).join("\n\n");
}

async function interactiveStarter(ctx: CommandContext, starter: string, projectName: string, setup: ParsedArgs): Promise<string> {
  const projectPath = path.resolve(ctx.cwd, projectName);
  console.log(formatSetupSummary(projectPath, setup, "create", starter));
  const shouldCreate = await confirm({ message: "Create project now?", default: true });
  if (!shouldCreate) {
    return "Cancelled.";
  }
  const output = commandStarter(ctx, starter, projectName, setup);
  const integrationOutput = setup.lite ? "" : await promptOptionalIntegrationSetup(ctx, projectPath);
  return [output, integrationOutput].filter(Boolean).join("\n\n");
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
  const skillSelection = await promptSkillSelection(ctx, "Which skill set should be installed?");
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
    skills: skillSelection,
    scope,
    dryRun
  });
}

async function interactiveIntegration(ctx: CommandContext): Promise<string> {
  const action = await select({
    message: "Integration action:",
    choices: [
      { name: "Show status", value: "status" },
      { name: "Add integrations", value: "add" },
      { name: "Remove integrations", value: "remove" },
      { name: "Run integration doctor", value: "doctor" },
      { name: "Repair local integration rules", value: "repair" }
    ]
  });
  const projectPath = await input({ message: "Project path:", default: "." });

  if (action === "status") {
    return commandIntegrationStatus(projectPath, ctx);
  }
  if (action === "doctor") {
    return commandIntegrationDoctor(ctx, projectPath);
  }
  if (action === "repair") {
    const dryRun = await confirm({ message: "Dry-run only?", default: false });
    return commandIntegrationRepair(ctx, projectPath, { ...parseArgs([]), dryRun });
  }

  const selected = await checkbox<IntegrationName>({
    message: action === "add" ? "Enable which integrations?" : "Remove which integrations?",
    choices: [
      { name: "RTK", value: "rtk" },
      { name: "Caveman", value: "caveman" }
    ],
    required: true
  });
  const integrationArg = selected.length === INTEGRATIONS.length ? "all" : selected.join(",");

  if (action === "add") {
    const mode = selected.includes("caveman")
      ? await select<CavemanMode>({
          message: "Caveman response mode:",
          choices: [
            { name: "Lite", value: "lite" },
            { name: "Full", value: "full" },
            { name: "Ultra", value: "ultra" }
          ]
        })
      : "lite";
    const installMode = await select({
      message: "Integration setup mode:",
      choices: [
        { name: "Generate AIOS rules only", value: "rules" },
        { name: "Generate rules and offer installer if missing", value: "install" }
      ]
    });
    const install = installMode === "install";
    if (install) {
      console.log(
        commandIntegrationAdd(ctx, integrationArg, projectPath, {
          ...parseArgs([]),
          install: true,
          dryRun: true,
          mode,
          agents: readProjectConfig(path.resolve(ctx.cwd, projectPath)).selectedAgents
        })
      );
    }
    const resolvedProjectPath = path.resolve(ctx.cwd, projectPath);
    const yes =
      install && hasRunnableInstallers(selected, resolvedProjectPath)
        ? await confirm({ message: integrationReviewMessage(selected, resolvedProjectPath), default: false })
        : false;
    return commandIntegrationAdd(ctx, integrationArg, projectPath, {
      ...parseArgs([]),
      install,
      yes,
      mode
    });
  }

  const scope = await select<IntegrationScope>({
    message: "Remove scope:",
    choices: [
      { name: "Project rules only", value: "project" },
      { name: "User computer only", value: "user" },
      { name: "Both project and user computer", value: "both" }
    ]
  });
  const yes =
    scope === "user" || scope === "both"
      ? await confirm({ message: "Run user-computer uninstall actions after showing them?", default: false })
      : false;
  return commandIntegrationRemove(ctx, integrationArg, projectPath, {
    ...parseArgs([]),
    scope,
    yes
  });
}

async function runInteractive(argv: string[], ctx: CommandContext = { runtimePaths: getRuntimePaths(), cwd: process.cwd() }): Promise<string> {
  const [command, name, secondName] = parseArgs(argv).args;

  if (command === "init" && !name) {
    const projectName = await input({ message: "Project name:", required: true });
    const setup = await promptSetupOptions(ctx);
    return interactiveInit(ctx, projectName, setup);
  }

  if (command === "starter" && (!name || !secondName)) {
    const starter = name ?? (await select({ message: "Starter:", choices: starterChoices(ctx).map((value) => ({ name: value, value })) }));
    const projectName = secondName ?? (await input({ message: "Project name:", required: true }));
    const setup = await promptSetupOptions(ctx);
    return interactiveStarter(ctx, starter, projectName, setup);
  }

  const action = await select({
    message: "What do you want to do?",
    choices: [
      { name: "Create new project", value: "create" },
      { name: "Adopt existing project", value: "adopt" },
      { name: "Install native agent skills", value: "agent install" },
      { name: "Set up external integrations", value: "integration" },
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
    case "agent install":
      return interactiveAgentInstall(ctx);
    case "integration":
      return interactiveIntegration(ctx);
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
  const [command, name, secondName, thirdName] = parsed.args;

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
    case "kit":
      return commandKit(ctx, name, secondName);
    case "prompt":
      return commandPromptGroup(ctx, name, secondName, thirdName);
    case "agent":
      return commandAgent(ctx, name, secondName, parsed);
    case "integration":
      return commandIntegration(ctx, name, secondName, thirdName, parsed);
    case "config":
      return commandConfig(ctx, name);
    case "create":
      return commandCreate(ctx, name, secondName);
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
