import fs from "node:fs";
import path from "node:path";

export type TemplateValues = Record<string, string | number | undefined>;

export interface ValidationResult {
  ok: boolean;
  missing: string[];
}

export interface RuntimePaths {
  root: string;
  projectSkeleton: string;
  templates: string;
}

export const REQUIRED_PROJECT_PATHS = [
  "AGENTS.md",
  "docs",
  "docs/context/context-map.md",
  "docs/product/vision.md",
  "docs/product/prd.md",
  "docs/architecture/architecture.md",
  "docs/adr",
  "docs/tasks",
  "docs/api",
  "frontend",
  "backend"
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
    fs.existsSync(path.join(packageAssetsRoot, "templates"))
  ) {
    return {
      root: packageAssetsRoot,
      projectSkeleton: path.join(packageAssetsRoot, "project-skeleton"),
      templates: path.join(packageAssetsRoot, "templates")
    };
  }

  const repoRoot = path.resolve(packageRoot, "..");
  return {
    root: repoRoot,
    projectSkeleton: path.join(repoRoot, "project-skeleton"),
    templates: path.join(repoRoot, "templates")
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

export function validateProject(projectPath: string): ValidationResult {
  const missing = REQUIRED_PROJECT_PATHS.filter((relativePath) => {
    return !fs.existsSync(path.join(projectPath, relativePath));
  });

  return {
    ok: missing.length === 0,
    missing
  };
}
