import fs from "node:fs";
import path from "node:path";
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
export function getOsRoot() {
    return path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
}
export function slugify(input) {
    return input
        .trim()
        .toLowerCase()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "untitled";
}
export function titleize(input) {
    return input
        .trim()
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "Untitled";
}
export function renderTemplate(template, values) {
    return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_match, key) => {
        const value = values[key];
        return value === undefined ? "" : String(value);
    });
}
export function nextNumber(directory, prefix) {
    if (!fs.existsSync(directory)) {
        return "001";
    }
    const numbers = fs
        .readdirSync(directory)
        .map((file) => file.match(new RegExp(`^${prefix}-(\\d{3})-`))?.[1])
        .filter((value) => Boolean(value))
        .map((value) => Number.parseInt(value, 10));
    const next = numbers.length === 0 ? 1 : Math.max(...numbers) + 1;
    return String(next).padStart(3, "0");
}
export function ensureEmptyOrMissingDirectory(targetPath) {
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
export function copyDirectory(source, target) {
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
        const sourcePath = path.join(source, entry.name);
        const targetPath = path.join(target, entry.name);
        if (entry.isDirectory()) {
            copyDirectory(sourcePath, targetPath);
        }
        else if (entry.isFile()) {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}
export function writeRenderedTemplate(options) {
    const template = fs.readFileSync(options.templatePath, "utf8");
    const rendered = renderTemplate(template, options.values);
    fs.mkdirSync(path.dirname(options.targetPath), { recursive: true });
    if (fs.existsSync(options.targetPath)) {
        throw new Error(`Refusing to overwrite existing file: ${options.targetPath}`);
    }
    fs.writeFileSync(options.targetPath, rendered, "utf8");
}
export function validateProject(projectPath) {
    const missing = REQUIRED_PROJECT_PATHS.filter((relativePath) => {
        return !fs.existsSync(path.join(projectPath, relativePath));
    });
    return {
        ok: missing.length === 0,
        missing
    };
}
