import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type TemplateValues = Record<string, string | number | undefined>;

export interface ValidationResult {
  ok: boolean;
  missing: string[];
  warnings: string[];
}

export type SkillDelivery = "portable" | "native" | "both";
export type AgentTarget = "codex" | "qwen" | "opencode" | "antigravity" | "generic";
export type AgentScope = "repo" | "user";
export type ProjectShape = "fullstack" | "frontend" | "backend" | "mobile" | "library" | "docs";
export type IntegrationName = "rtk" | "caveman";
export type CavemanMode = "lite" | "full" | "ultra";

export interface IntegrationConfig {
  rtk: {
    enabled: boolean;
    commandPolicy: "prefer-for-noisy-output";
  };
  caveman: {
    enabled: boolean;
    mode: CavemanMode;
    responsePolicy: "concise-for-status-only";
    targetAgents: AgentTarget[];
  };
}

export interface ProjectConfig {
  version: number;
  mode: "full" | "lite";
  docsRoot: string;
  kitRoot: string;
  skillDelivery: SkillDelivery;
  selectedAgents: AgentTarget[];
  selectedSkills: string[];
  agentScope: AgentScope;
  projectShape: ProjectShape;
  integrations: IntegrationConfig;
  starter?: string;
}

export interface RuntimePaths {
  root: string;
  aiosKitSource: string;
  projectSkeleton: string;
  templates: string;
  starters: string;
}

export interface AdoptResult {
  created: string[];
  skipped: string[];
}

export interface AgentInstallResult {
  created: string[];
  skipped: string[];
  planned: string[];
}

export const DEFAULT_DOCS_ROOT = "docs";
export const DEFAULT_KIT_ROOT = ".aios";

export const CORE_SKILLS = ["context-management", "implementation-planner", "task-breakdown", "testing", "code-review"];
export const PLANNING_SKILLS = [
  "product-discovery",
  "prd-generator",
  "architecture-design",
  "ui-ux-design",
  "adr-generator",
  "task-breakdown",
  "implementation-planner"
];
export const DELIVERY_SKILLS = ["testing", "code-review", "security-review", "release-management"];

export const AGENT_TARGETS: AgentTarget[] = ["codex", "qwen", "opencode", "antigravity", "generic"];
export const PROJECT_SHAPES: ProjectShape[] = ["fullstack", "frontend", "backend", "mobile", "library", "docs"];
export const INTEGRATIONS: IntegrationName[] = ["rtk", "caveman"];
export const CAVEMAN_MODES: CavemanMode[] = ["lite", "full", "ultra"];

export const REQUIRED_PROJECT_PATHS = ["AGENTS.md"];

export const PROJECT_SHAPE_PATHS: Record<ProjectShape, string[]> = {
  fullstack: ["frontend", "backend"],
  frontend: ["frontend"],
  backend: ["backend"],
  mobile: ["mobile"],
  library: ["src"],
  docs: []
};

export const REQUIRED_DOCS_PATHS = [
  ".",
  "context/context-map.md",
  "context/development-start.md",
  "product/vision.md",
  "product/prd.md",
  "product/features",
  "design/design.md",
  "architecture/architecture.md",
  "adr",
  "tasks",
  "reviews",
  "api"
];

export const OPTIONAL_V2X_DOCS_PATHS = ["security", "releases", "database/migrations"];

export const REQUIRED_AIOS_KIT_PATHS = [
  ".aios/skill-router.md",
  ".aios/config.json",
  ".aios/commands/discover-product.md",
  ".aios/commands/generate-prd.md",
  ".aios/commands/implement-task.md",
  ".aios/commands/review-code.md",
  ".aios/prompts/00-discover-product.md",
  ".aios/prompts/01-generate-prd.md",
  ".aios/references/context-principles.md",
  ".aios/templates/task.template.md",
  ".aios/workflows/new-feature.workflow.md",
  ".aios/workflows/review.workflow.md"
];

export const AIOS_KIT_ENTRIES = [
  "skill-router.md",
  "commands",
  "integrations",
  "skills",
  "prompts",
  "references",
  "templates",
  "workflows"
];

export const PORTABLE_SKILL_PATHS = CORE_SKILLS.map((skill) => `.aios/skills/${skill}/SKILL.md`);
const AIOS_MANAGED_BEGIN = "<!-- AIOS:BEGIN -->";
const AIOS_MANAGED_END = "<!-- AIOS:END -->";
const AIOS_AGENT_FILES = new Set(["AGENTS.md", "CLAUDE.md"]);

function relativePath(...parts: string[]): string {
  return path.join(...parts).replace(/\\/g, "/");
}

function isAiosAgentInstructionFile(filePath: string): boolean {
  return AIOS_AGENT_FILES.has(path.basename(filePath));
}

function extractAiosManagedSection(content: string): string {
  const start = content.indexOf(AIOS_MANAGED_BEGIN);
  const end = content.indexOf(AIOS_MANAGED_END);

  if (start === -1 || end === -1 || end < start) {
    return content.trim();
  }

  return content.slice(start, end + AIOS_MANAGED_END.length).trim();
}

function prependAiosManagedSection(source: string, target: string): boolean {
  const targetContent = fs.readFileSync(target, "utf8");
  if (targetContent.includes(AIOS_MANAGED_BEGIN)) {
    return false;
  }

  const sourceContent = fs.readFileSync(source, "utf8");
  const managedSection = extractAiosManagedSection(sourceContent);
  const preservedContent = targetContent.trimStart();
  const heading = path.basename(target) === "CLAUDE.md" ? "## Existing Claude Instructions" : "## Existing Agent Instructions";

  fs.writeFileSync(target, `${managedSection}\n\n${heading}\n\n${preservedContent}`, "utf8");
  return true;
}

export function getOsRoot(): string {
  return getRuntimePaths().root;
}

export function getRuntimePaths(): RuntimePaths {
  const compiledSourceDir = path.dirname(fileURLToPath(import.meta.url));
  const packageRoot = path.resolve(compiledSourceDir, "../..");
  const packageAssetsRoot = path.join(packageRoot, "assets");

  if (
    fs.existsSync(path.join(packageAssetsRoot, "project-skeleton")) &&
    fs.existsSync(path.join(packageAssetsRoot, "aios-kit")) &&
    fs.existsSync(path.join(packageAssetsRoot, "aios-kit", "skill-router.md")) &&
    fs.existsSync(path.join(packageAssetsRoot, "aios-kit", "integrations")) &&
    fs.existsSync(path.join(packageAssetsRoot, "templates")) &&
    fs.existsSync(path.join(packageAssetsRoot, "starters"))
  ) {
    return {
      root: packageAssetsRoot,
      aiosKitSource: path.join(packageAssetsRoot, "aios-kit"),
      projectSkeleton: path.join(packageAssetsRoot, "project-skeleton"),
      templates: path.join(packageAssetsRoot, "templates"),
      starters: path.join(packageAssetsRoot, "starters")
    };
  }

  const repoRoot = path.resolve(packageRoot, "..");
  return {
    root: repoRoot,
    aiosKitSource: repoRoot,
    projectSkeleton: path.join(repoRoot, "project-skeleton"),
    templates: path.join(repoRoot, "templates"),
    starters: path.join(repoRoot, "starters")
  };
}

export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "untitled";
}

export function titleize(input: string): string {
  return input
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "Untitled";
}

export function defaultProjectConfig(overrides: Partial<ProjectConfig> = {}): ProjectConfig {
  const defaultIntegrations: IntegrationConfig = {
    rtk: {
      enabled: false,
      commandPolicy: "prefer-for-noisy-output"
    },
    caveman: {
      enabled: false,
      mode: "lite",
      responsePolicy: "concise-for-status-only",
      targetAgents: []
    }
  };

  return {
    version: 1,
    mode: "full",
    docsRoot: DEFAULT_DOCS_ROOT,
    kitRoot: DEFAULT_KIT_ROOT,
    skillDelivery: "portable",
    selectedAgents: [],
    selectedSkills: CORE_SKILLS,
    agentScope: "repo",
    projectShape: "fullstack",
    integrations: defaultIntegrations,
    ...overrides
  };
}

export function configPath(projectPath: string): string {
  return path.join(projectPath, DEFAULT_KIT_ROOT, "config.json");
}

export function readProjectConfig(projectPath: string): ProjectConfig {
  const target = configPath(projectPath);
  if (!fs.existsSync(target)) {
    return defaultProjectConfig();
  }

  const parsed = JSON.parse(fs.readFileSync(target, "utf8")) as Partial<ProjectConfig>;
  const base = defaultProjectConfig(parsed);
  return {
    ...base,
    integrations: {
      rtk: {
        ...base.integrations.rtk,
        ...parsed.integrations?.rtk
      },
      caveman: {
        ...base.integrations.caveman,
        ...parsed.integrations?.caveman
      }
    }
  };
}

export function writeProjectConfig(projectPath: string, config: ProjectConfig): void {
  const target = configPath(projectPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

export function docsRoot(projectPath: string, config: ProjectConfig = readProjectConfig(projectPath)): string {
  return path.join(projectPath, config.docsRoot);
}

export function docsPath(
  projectPath: string,
  relativePath: string,
  config: ProjectConfig = readProjectConfig(projectPath)
): string {
  return path.join(docsRoot(projectPath, config), relativePath);
}

export function availableSkills(sourceRoot: string): string[] {
  const skillsRoot = path.join(sourceRoot, "skills");
  if (!fs.existsSync(skillsRoot)) {
    return [];
  }

  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(skillsRoot, entry.name, "SKILL.md")))
    .map((entry) => entry.name)
    .sort();
}

export function expandSkillSelection(sourceRoot: string, selection: string | string[]): string[] {
  const requested = Array.isArray(selection) ? selection : selection.split(",").map((item) => item.trim()).filter(Boolean);
  const allSkills = availableSkills(sourceRoot);
  const expanded = new Set<string>();

  for (const item of requested.length > 0 ? requested : CORE_SKILLS) {
    if (item === "core") {
      CORE_SKILLS.forEach((skill) => expanded.add(skill));
    } else if (item === "planning") {
      PLANNING_SKILLS.forEach((skill) => expanded.add(skill));
    } else if (item === "delivery") {
      DELIVERY_SKILLS.forEach((skill) => expanded.add(skill));
    } else if (item === "all") {
      allSkills.forEach((skill) => expanded.add(skill));
    } else if (allSkills.includes(item)) {
      expanded.add(item);
    } else {
      throw new Error(`Unknown AIOS skill: ${item}`);
    }
  }

  return [...expanded].sort();
}

export function renderTemplate(template: string, values: TemplateValues): string {
  return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_match, key: string) => {
    const value = values[key];
    return value === undefined ? "" : String(value);
  });
}

export function nextNumber(directory: string, prefix: string): string {
  if (!fs.existsSync(directory)) {
    return "001";
  }

  const numbers = fs
    .readdirSync(directory)
    .map((file) => file.match(new RegExp(`^${prefix}-(\\d{3})-`))?.[1])
    .filter((value): value is string => Boolean(value))
    .map((value) => Number.parseInt(value, 10));

  const next = numbers.length === 0 ? 1 : Math.max(...numbers) + 1;
  return String(next).padStart(3, "0");
}

export function ensureEmptyOrMissingDirectory(targetPath: string): void {
  if (!fs.existsSync(targetPath)) {
    return;
  }

  const stat = fs.statSync(targetPath);
  if (!stat.isDirectory()) {
    throw new Error(`Refusing to overwrite non-directory path: ${targetPath}`);
  }

  const entries = fs.readdirSync(targetPath);
  if (entries.length > 0) {
    throw new Error(`Refusing to overwrite non-empty directory: ${targetPath}`);
  }
}

export function copyDirectory(source: string, target: string): void {
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

export function adoptSkeleton(source: string, target: string): AdoptResult {
  const result: AdoptResult = {
    created: [],
    skipped: []
  };

  copyMissingEntries(source, target, target, result);
  return result;
}

export function installAiosKit(
  sourceRoot: string,
  projectPath: string,
  options: { includeSkills?: boolean; config?: ProjectConfig } = {}
): AdoptResult {
  const targetRoot = path.join(projectPath, ".aios");
  const result: AdoptResult = {
    created: [],
    skipped: []
  };

  for (const entry of AIOS_KIT_ENTRIES) {
    if (entry === "skills" && options.includeSkills === false) {
      continue;
    }
    const sourcePath = path.join(sourceRoot, entry);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Missing AIOS kit source: ${sourcePath}`);
    }
    copyMissingEntries(sourcePath, path.join(targetRoot, entry), targetRoot, result);
  }

  const config = options.config ?? defaultProjectConfig({ skillDelivery: options.includeSkills === false ? "native" : "portable" });
  const configTarget = configPath(projectPath);
  if (fs.existsSync(configTarget)) {
    result.skipped.push(path.relative(targetRoot, configTarget));
  } else {
    writeProjectConfig(projectPath, config);
    result.created.push(path.relative(targetRoot, configTarget));
  }

  return result;
}

function agentSkillRoot(projectPath: string, agent: AgentTarget, scope: AgentScope, homeDir: string): string {
  if (scope === "user") {
    switch (agent) {
      case "codex":
      case "generic":
        return path.join(homeDir, ".agents", "skills");
      case "qwen":
        return path.join(homeDir, ".qwen", "skills");
      case "opencode":
        return path.join(homeDir, ".config", "opencode", "skills");
      case "antigravity":
        throw new Error("Antigravity user-scope skill install is not supported yet. Use --scope repo.");
    }
  }

  switch (agent) {
    case "codex":
    case "generic":
      return path.join(projectPath, ".agents", "skills");
    case "qwen":
      return path.join(projectPath, ".qwen", "skills");
    case "opencode":
      return path.join(projectPath, ".opencode", "skills");
    case "antigravity":
      return path.join(projectPath, ".agent", "skills");
  }
}

function readSkillMetadata(skillMarkdown: string, fallbackName: string): { name: string; description: string } {
  const match = skillMarkdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return { name: fallbackName, description: `Use the ${fallbackName} AIOS workflow.` };
  }

  const frontmatter = match[1];
  const name = frontmatter.match(/^name:\s*"?([^"\n]+)"?/m)?.[1]?.trim() || fallbackName;
  const description =
    frontmatter.match(/^description:\s*"?([^"\n]+)"?/m)?.[1]?.trim() || `Use the ${fallbackName} AIOS workflow.`;

  return { name, description };
}

function writeCodexMetadata(skillTarget: string, skillMarkdown: string, fallbackName: string): void {
  const metadataTarget = path.join(skillTarget, "agents", "openai.yaml");
  if (fs.existsSync(metadataTarget)) {
    return;
  }

  const metadata = readSkillMetadata(skillMarkdown, fallbackName);
  fs.mkdirSync(path.dirname(metadataTarget), { recursive: true });
  fs.writeFileSync(
    metadataTarget,
    [
      "interface:",
      `  display_name: "${titleize(metadata.name)}"`,
      `  short_description: "${metadata.description.replace(/"/g, "'")}"`,
      `  default_prompt: "Use $${metadata.name} for this AIOS workflow."`,
      ""
    ].join("\n"),
    "utf8"
  );
}

export function installAgentSkills(options: {
  sourceRoot: string;
  projectPath: string;
  agents: AgentTarget[];
  skills: string[];
  scope?: AgentScope;
  homeDir?: string;
  overwrite?: boolean;
  dryRun?: boolean;
}): AgentInstallResult {
  const result: AgentInstallResult = {
    created: [],
    skipped: [],
    planned: []
  };
  const scope = options.scope ?? "repo";
  const homeDir = options.homeDir ?? process.env.HOME ?? "";

  if (options.agents.length === 0 || options.skills.length === 0) {
    return result;
  }

  for (const agent of options.agents) {
    if (!AGENT_TARGETS.includes(agent)) {
      throw new Error(`Unknown agent target: ${agent}`);
    }

    const targetRoot = agentSkillRoot(options.projectPath, agent, scope, homeDir);
    for (const skill of options.skills) {
      const source = path.join(options.sourceRoot, "skills", skill);
      const sourceSkill = path.join(source, "SKILL.md");
      if (!fs.existsSync(sourceSkill)) {
        throw new Error(`Missing AIOS skill source: ${sourceSkill}`);
      }

      const target = path.join(targetRoot, skill);
      const relativeTarget = path.relative(options.projectPath, target);
      result.planned.push(`${agent}:${scope}:${target}`);

      if (options.dryRun) {
        continue;
      }

      if (fs.existsSync(target)) {
        if (!options.overwrite) {
          result.skipped.push(relativeTarget);
          continue;
        }
        fs.rmSync(target, { recursive: true, force: true });
      }

      copyDirectory(source, target);
      if (agent === "codex") {
        writeCodexMetadata(target, fs.readFileSync(sourceSkill, "utf8"), skill);
      }
      result.created.push(relativeTarget);
    }
  }

  return result;
}

function copyMissingEntries(source: string, target: string, root: string, result: AdoptResult): void {
  const sourceStat = fs.statSync(source);
  const relativeRootPath = path.relative(root, target) || ".";

  if (sourceStat.isFile()) {
    if (fs.existsSync(target)) {
      if (isAiosAgentInstructionFile(target) && prependAiosManagedSection(source, target)) {
        result.created.push(`${relativeRootPath} (AIOS section prepended)`);
        return;
      }
      result.skipped.push(relativeRootPath);
      return;
    }

    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
    result.created.push(relativeRootPath);
    return;
  }

  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    const relativePath = path.relative(root, targetPath) || ".";

    if (fs.existsSync(targetPath)) {
      if (entry.isFile() && isAiosAgentInstructionFile(targetPath) && prependAiosManagedSection(sourcePath, targetPath)) {
        result.created.push(`${relativePath} (AIOS section prepended)`);
        continue;
      }
      result.skipped.push(relativePath);
      if (entry.isDirectory()) {
        copyMissingEntries(sourcePath, targetPath, root, result);
      }
      continue;
    }

    if (entry.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      result.created.push(`${relativePath}/`);
      copyMissingEntries(sourcePath, targetPath, root, result);
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(sourcePath, targetPath);
      result.created.push(relativePath);
    }
  }
}

export function writeRenderedTemplate(options: {
  templatePath: string;
  targetPath: string;
  values: TemplateValues;
}): void {
  const template = fs.readFileSync(options.templatePath, "utf8");
  const rendered = renderTemplate(template, options.values);
  fs.mkdirSync(path.dirname(options.targetPath), { recursive: true });
  if (fs.existsSync(options.targetPath)) {
    throw new Error(`Refusing to overwrite existing file: ${options.targetPath}`);
  }
  fs.writeFileSync(options.targetPath, rendered, "utf8");
}

export function validateProject(projectPath: string, options: { lite?: boolean; projectShape?: ProjectShape } = {}): ValidationResult {
  const currentConfig = readProjectConfig(projectPath);
  const config = defaultProjectConfig({
    ...currentConfig,
    projectShape: options.projectShape ?? currentConfig.projectShape
  });
  const effectiveLite = options.lite || config.mode === "lite";
  const docsRequired = REQUIRED_DOCS_PATHS.map((item) => relativePath(config.docsRoot, item));
  const shapeRequired = PROJECT_SHAPE_PATHS[config.projectShape] ?? PROJECT_SHAPE_PATHS.fullstack;
  const kitRequired =
    config.skillDelivery === "native"
      ? REQUIRED_AIOS_KIT_PATHS
      : [...REQUIRED_AIOS_KIT_PATHS, ...PORTABLE_SKILL_PATHS];
  const nativeSkillRequired =
    !effectiveLite && (config.skillDelivery === "native" || config.skillDelivery === "both") && config.agentScope === "repo"
      ? config.selectedAgents.flatMap((agent) => {
          try {
            const root = agentSkillRoot(projectPath, agent, "repo", process.env.HOME ?? "");
            return config.selectedSkills.map((skill) => path.relative(projectPath, path.join(root, skill, "SKILL.md")));
          } catch {
            return [];
          }
        })
      : [];
  const requiredPaths = effectiveLite
    ? [...REQUIRED_PROJECT_PATHS, ...shapeRequired, ...docsRequired]
    : [...REQUIRED_PROJECT_PATHS, ...shapeRequired, ...docsRequired, ...kitRequired, ...nativeSkillRequired];
  const missing = requiredPaths.filter((relativePath) => {
    return !fs.existsSync(path.join(projectPath, relativePath));
  });

  const warnings = OPTIONAL_V2X_DOCS_PATHS.filter((relativePath) => {
    return !fs.existsSync(docsPath(projectPath, relativePath, config));
  }).map((item) => `Optional V2.x path not found: ${relativePath(config.docsRoot, item)}`);

  const apiDirectory = docsPath(projectPath, "api", config);
  const hasOpenApiContract =
    fs.existsSync(apiDirectory) &&
    fs.readdirSync(apiDirectory).some((file) => file.endsWith(".openapi.yaml") || file === "openapi.yaml");

  if (!hasOpenApiContract) {
    warnings.push(`Optional V2.x OpenAPI contract not found in ${relativePath(config.docsRoot, "api")}/`);
  }

  return {
    ok: missing.length === 0,
    missing,
    warnings
  };
}
