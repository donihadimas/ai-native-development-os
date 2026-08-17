import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { exportTarget, exportAll } from "../src/exporter.js";

function tempProjectDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aios-exporter-"));
  fs.mkdirSync(path.join(dir, ".aios"), { recursive: true });
  fs.writeFileSync(path.join(dir, ".aios", "config.json"), JSON.stringify({ mode: "lite", docsRoot: "docs" }), "utf8");
  return dir;
}

test("exportTarget generates target rules file", () => {
  const projectDir = tempProjectDir();
  
  // Create an AGENTS.md file
  fs.writeFileSync(path.join(projectDir, "AGENTS.md"), "Core rule: be nice.", "utf8");

  const cursorPath = exportTarget(projectDir, "cursor");
  assert.ok(fs.existsSync(cursorPath));
  assert.equal(path.basename(cursorPath), ".cursorrules");
  const cursorRulesContent = fs.readFileSync(cursorPath, "utf8");
  assert.match(cursorRulesContent, /# Cursor Rules/);
  assert.match(cursorRulesContent, /Core rule: be nice\./);

  const copilotPath = exportTarget(projectDir, "copilot");
  assert.ok(fs.existsSync(copilotPath));
  assert.equal(path.basename(copilotPath), "copilot-instructions.md");
  assert.equal(path.basename(path.dirname(copilotPath)), ".github");
  const copilotContent = fs.readFileSync(copilotPath, "utf8");
  assert.match(copilotContent, /# GitHub Copilot Rules/);

  // Cleanup
  fs.rmSync(projectDir, { recursive: true, force: true });
});

test("exportAll generates all targets", () => {
  const projectDir = tempProjectDir();
  fs.writeFileSync(path.join(projectDir, "AGENTS.md"), "Core rule: be nice.", "utf8");

  const exported = exportAll(projectDir);
  assert.equal(exported.length, 5);
  assert.ok(fs.existsSync(path.join(projectDir, ".cursorrules")));
  assert.ok(fs.existsSync(path.join(projectDir, "CLAUDE.md")));
  assert.ok(fs.existsSync(path.join(projectDir, ".clinerules")));
  assert.ok(fs.existsSync(path.join(projectDir, ".windsurfrules")));
  assert.ok(fs.existsSync(path.join(projectDir, ".github", "copilot-instructions.md")));

  // Cleanup
  fs.rmSync(projectDir, { recursive: true, force: true });
});

test("exportTarget appends enabled integration rules", () => {
  const projectDir = tempProjectDir();
  
  // Set config with enabled integrations
  fs.writeFileSync(path.join(projectDir, ".aios", "config.json"), JSON.stringify({
    mode: "lite",
    docsRoot: "docs",
    integrations: {
      rtk: { enabled: true, commandPolicy: "prefer-for-noisy-output" },
      graphify: { enabled: true, queryPolicy: "prefer-for-relationships" }
    }
  }), "utf8");

  // Create rules directories and mock integration files
  fs.mkdirSync(path.join(projectDir, ".aios", "integrations"), { recursive: true });
  fs.writeFileSync(path.join(projectDir, ".aios", "integrations", "rtk.md"), "RTK rule content.", "utf8");
  fs.writeFileSync(path.join(projectDir, ".aios", "integrations", "graphify.md"), "Graphify rule content.", "utf8");

  // Create an AGENTS.md file
  fs.writeFileSync(path.join(projectDir, "AGENTS.md"), "Core rule: be nice.", "utf8");

  const cursorPath = exportTarget(projectDir, "cursor");
  const content = fs.readFileSync(cursorPath, "utf8");

  assert.match(content, /Core rule: be nice\./);
  assert.match(content, /RTK rule content\./);
  assert.match(content, /Graphify rule content\./);

  // Cleanup
  fs.rmSync(projectDir, { recursive: true, force: true });
});
