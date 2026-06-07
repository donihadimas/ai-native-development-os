import fs from "node:fs";
import path from "node:path";

export type TemplateValues = Record<string, string | number | undefined>;

export interface ValidationResult {
  ok: boolean;
  missing: string[];
  warnings: string[];
}

export interface RuntimePaths {
  root: string;
  aiosKit: string;
  projectSkeleton: string;
  templates: string;
  starters: string;
}

export interface AdoptResult {
  created: string[];
  skipped: string[];
}

export const REQUIRED_PROJECT_PATHS = [
  "AGENTS.md",
  "docs",
  "docs/context/context-map.md",
  "docs/context/development-start.md",
  "docs/product/vision.md",
  "docs/product/prd.md",
  "docs/product/features",
  "docs/architecture/architecture.md",
  "docs/adr",
  "docs/tasks",
  "docs/reviews",
  "docs/api",
  "frontend",
  "backend"
];

export const OPTIONAL_V2X_PROJECT_PATHS = [
  "docs/security",
  "docs/releases",
  "docs/database/migrations"
];

export const REQUIRED_AIOS_KIT_PATHS = [
  ".aios/skills/context-management/SKILL.md",
  ".aios/skills/implementation-planner/SKILL.md",
  ".aios/skills/task-breakdown/SKILL.md",
  ".aios/skills/testing/SKILL.md",
  ".aios/skills/code-review/SKILL.md",
  ".aios/prompts/01-generate-prd.md",
  ".aios/references/context-principles.md",
  ".aios/templates/task.template.md",
  ".aios/workflows/new-feature.workflow.md",
  ".aios/workflows/review.workflow.md"
];

export function getOsRoot(): string {
  return getRuntimePaths().root;
}

export function getRuntimePaths(): RuntimePaths {
  const compiledSourceDir = path.dirname(new URL(import.meta.url).pathname);
  const packageRoot = path.resolve(compiledSourceDir, "../..");
  const packageAssetsRoot = path.join(packageRoot, "assets");

  if (
    fs.existsSync(path.join(packageAssetsRoot, "project-skeleton")) &&
    fs.existsSync(path.join(packageAssetsRoot, "aios-kit")) &&
    fs.existsSync(path.join(packageAssetsRoot, "templates")) &&
    fs.existsSync(path.join(packageAssetsRoot, "starters"))
  ) {
    return {
      root: packageAssetsRoot,
      aiosKit: path.join(packageAssetsRoot, "aios-kit"),
      projectSkeleton: path.join(packageAssetsRoot, "project-skeleton"),
      templates: path.join(packageAssetsRoot, "templates"),
      starters: path.join(packageAssetsRoot, "starters")
    };
  }

  const repoRoot = path.resolve(packageRoot, "..");
  return {
    root: repoRoot,
    aiosKit: path.join(repoRoot, "aios-kit"),
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

export function installAiosKit(source: string, projectPath: string): AdoptResult {
  return adoptSkeleton(source, path.join(projectPath, ".aios"));
}

function copyMissingEntries(source: string, target: string, root: string, result: AdoptResult): void {
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    const relativePath = path.relative(root, targetPath) || ".";

    if (fs.existsSync(targetPath)) {
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

export function validateProject(projectPath: string, options: { lite?: boolean } = {}): ValidationResult {
  const requiredPaths = options.lite ? REQUIRED_PROJECT_PATHS : [...REQUIRED_PROJECT_PATHS, ...REQUIRED_AIOS_KIT_PATHS];
  const missing = requiredPaths.filter((relativePath) => {
    return !fs.existsSync(path.join(projectPath, relativePath));
  });

  const warnings = OPTIONAL_V2X_PROJECT_PATHS.filter((relativePath) => {
    return !fs.existsSync(path.join(projectPath, relativePath));
  }).map((relativePath) => `Optional V2.x path not found: ${relativePath}`);

  const apiDirectory = path.join(projectPath, "docs", "api");
  const hasOpenApiContract =
    fs.existsSync(apiDirectory) &&
    fs.readdirSync(apiDirectory).some((file) => file.endsWith(".openapi.yaml") || file === "openapi.yaml");

  if (!hasOpenApiContract) {
    warnings.push("Optional V2.x OpenAPI contract not found in docs/api/");
  }

  return {
    ok: missing.length === 0,
    missing,
    warnings
  };
}
