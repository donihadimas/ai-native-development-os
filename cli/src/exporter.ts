import fs from "node:fs";
import path from "node:path";
import { readProjectConfig } from "./core.js";

const TARGET_FILES: Record<string, string> = {
  cursor: ".cursorrules",
  claude: "CLAUDE.md",
  cline: ".clinerules",
  windsurf: ".windsurfrules",
  copilot: ".github/copilot-instructions.md"
};

export function getExportTargetPath(projectPath: string, target: string): string {
  const file = TARGET_FILES[target];
  if (!file) {
    throw new Error(`Unknown export target: ${target}`);
  }
  return path.join(projectPath, file);
}

export function exportTarget(projectPath: string, target: string): string {
  const config = readProjectConfig(projectPath);
  const docsRoot = config.docsRoot || "docs";

  let agentsContent = "";
  const agentsPath = path.join(projectPath, "AGENTS.md");
  if (fs.existsSync(agentsPath)) {
    agentsContent = fs.readFileSync(agentsPath, "utf8");
  } else {
    // Fallback if AGENTS.md doesn't exist
    agentsContent = `## Role & Core Directives

You are an AI coding agent working in this repository. Follow these execution rules:

1. **Task-Driven**: Do not write code before reading the active task in \`${docsRoot}/tasks/\`.
2. **Minimal Context**: Read only the files needed for the task. Use \`${docsRoot}/context/context-map.md\` (or \`.aios/repo-map.json\`) to locate code.
3. **Deterministic Verification**: Run automated tests and linters to verify acceptance criteria.
4. **In-Place Task State**: Update task status (\`Status: Done\`) in-place.
5. **Concise Reporting**: Always conclude with: files changed, tests run, acceptance criteria status, risks, and next steps.`;
  }

  const targetPath = getExportTargetPath(projectPath, target);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  let content = agentsContent;
  if (target === "cursor") {
    content = `# Cursor Rules\n\n${agentsContent}`;
  } else if (target === "cline") {
    content = `# Cline Rules\n\n${agentsContent}`;
  } else if (target === "windsurf") {
    content = `# Windsurf Rules\n\n${agentsContent}`;
  } else if (target === "copilot") {
    content = `# GitHub Copilot Rules\n\n${agentsContent}`;
  }

  fs.writeFileSync(targetPath, content, "utf8");
  return targetPath;
}

export function exportAll(projectPath: string): string[] {
  const targets = Object.keys(TARGET_FILES);
  return targets.map((t) => exportTarget(projectPath, t));
}
