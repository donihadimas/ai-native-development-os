import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { adoptSkeleton, copyDirectory, ensureEmptyOrMissingDirectory, getOsRoot, getRuntimePaths, nextNumber, renderTemplate, slugify, titleize, validateProject, writeRenderedTemplate } from "../src/core.js";
test("getOsRoot resolves the repository root from compiled CLI files", () => {
    const root = getOsRoot();
    assert.ok(fs.existsSync(path.join(root, "project-skeleton")));
    assert.ok(fs.existsSync(path.join(root, "templates")));
});
test("getRuntimePaths resolves bundled package assets when available", () => {
    const runtimePaths = getRuntimePaths();
    assert.ok(fs.existsSync(runtimePaths.projectSkeleton));
    assert.ok(fs.existsSync(runtimePaths.templates));
});
test("slugify creates filesystem-safe slugs", () => {
    assert.equal(slugify("Create User Profile!"), "create-user-profile");
    assert.equal(slugify("  API_contract v2  "), "api-contract-v2");
});
test("titleize creates readable titles", () => {
    assert.equal(titleize("create-user-profile"), "Create User Profile");
    assert.equal(titleize("api_contract"), "Api Contract");
});
test("renderTemplate replaces known placeholders and clears unknown placeholders", () => {
    assert.equal(renderTemplate("# {{title}} {{missing}}", { title: "Hello" }), "# Hello ");
});
test("nextNumber returns the next three-digit number for matching files", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "aios-number-"));
    fs.writeFileSync(path.join(directory, "ADR-001-first.md"), "");
    fs.writeFileSync(path.join(directory, "ADR-009-ninth.md"), "");
    fs.writeFileSync(path.join(directory, "NOTE-100-ignore.md"), "");
    assert.equal(nextNumber(directory, "ADR"), "010");
});
test("ensureEmptyOrMissingDirectory refuses non-empty directories", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "aios-non-empty-"));
    fs.writeFileSync(path.join(directory, "file.txt"), "content");
    assert.throws(() => ensureEmptyOrMissingDirectory(directory), /Refusing to overwrite non-empty directory/);
});
test("copyDirectory copies nested files", () => {
    const source = fs.mkdtempSync(path.join(os.tmpdir(), "aios-source-"));
    const target = path.join(os.tmpdir(), `aios-target-${Date.now()}`);
    fs.mkdirSync(path.join(source, "nested"));
    fs.writeFileSync(path.join(source, "nested", "file.md"), "hello");
    copyDirectory(source, target);
    assert.equal(fs.readFileSync(path.join(target, "nested", "file.md"), "utf8"), "hello");
});
test("adoptSkeleton copies missing files and skips existing files", () => {
    const source = fs.mkdtempSync(path.join(os.tmpdir(), "aios-adopt-source-"));
    const target = fs.mkdtempSync(path.join(os.tmpdir(), "aios-adopt-target-"));
    fs.mkdirSync(path.join(source, "docs", "context"), { recursive: true });
    fs.writeFileSync(path.join(source, "README.md"), "# Skeleton\n");
    fs.writeFileSync(path.join(source, "docs", "context", "context-map.md"), "# Context\n");
    fs.writeFileSync(path.join(target, "README.md"), "# Existing\n");
    const result = adoptSkeleton(source, target);
    assert.equal(fs.readFileSync(path.join(target, "README.md"), "utf8"), "# Existing\n");
    assert.equal(fs.readFileSync(path.join(target, "docs", "context", "context-map.md"), "utf8"), "# Context\n");
    assert.ok(result.created.includes("docs/"));
    assert.ok(result.created.includes(path.join("docs", "context", "context-map.md")));
    assert.ok(result.skipped.includes("README.md"));
});
test("writeRenderedTemplate writes rendered content and refuses overwrite", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "aios-template-"));
    const templatePath = path.join(directory, "template.md");
    const targetPath = path.join(directory, "out", "result.md");
    fs.writeFileSync(templatePath, "# {{title}}");
    writeRenderedTemplate({ templatePath, targetPath, values: { title: "Rendered" } });
    assert.equal(fs.readFileSync(targetPath, "utf8"), "# Rendered");
    assert.throws(() => writeRenderedTemplate({ templatePath, targetPath, values: { title: "Again" } }), /Refusing to overwrite existing file/);
});
test("validateProject reports missing AI-ready paths", () => {
    const project = fs.mkdtempSync(path.join(os.tmpdir(), "aios-validate-"));
    fs.mkdirSync(path.join(project, "docs", "context"), { recursive: true });
    fs.writeFileSync(path.join(project, "AGENTS.md"), "");
    fs.writeFileSync(path.join(project, "docs", "context", "context-map.md"), "");
    const result = validateProject(project);
    assert.equal(result.ok, false);
    assert.ok(result.missing.includes("docs/product/vision.md"));
});
