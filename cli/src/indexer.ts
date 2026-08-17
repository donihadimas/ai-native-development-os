import fs from "node:fs";
import path from "node:path";

export interface SymbolInfo {
  name: string;
  type: string;
  signature: string;
}

export interface FileIndex {
  symbols: SymbolInfo[];
}

export interface RepoMap {
  [filePath: string]: FileIndex;
}

const IGNORE_DIRS = new Set([
  "node_modules",
  "dist",
  "build",
  "out",
  "target",
  ".git",
  ".aios",
  ".github",
  ".next",
  ".svelte-kit",
  "coverage",
  "bin",
  "obj"
]);

const SUPPORTED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".py",
  ".go",
  ".rs",
  ".dart"
]);

export function scanDirectory(dir: string, projectRoot: string, repoMap: RepoMap = {}): RepoMap {
  if (!fs.existsSync(dir)) {
    return repoMap;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(projectRoot, fullPath).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name) || entry.name.startsWith(".")) {
        continue;
      }
      scanDirectory(fullPath, projectRoot, repoMap);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        const content = fs.readFileSync(fullPath, "utf8");
        const symbols = parseSymbols(content, ext);
        if (symbols.length > 0) {
          repoMap[relPath] = { symbols };
        }
      }
    }
  }
  return repoMap;
}

export function parseSymbols(content: string, ext: string): SymbolInfo[] {
  const symbols: SymbolInfo[] = [];
  const lines = content.split(/\r?\n/);

  switch (ext) {
    case ".ts":
    case ".tsx":
    case ".js":
    case ".jsx":
      for (const line of lines) {
        const trimmed = line.trim();
        // Class
        const classMatch = trimmed.match(/^(?:export\s+)?(?:async\s+)?(?:abstract\s+)?class\s+([a-zA-Z0-9_$]+)/);
        if (classMatch) {
          symbols.push({ name: classMatch[1], type: "class", signature: trimmed });
          continue;
        }
        // Interface
        const interfaceMatch = trimmed.match(/^(?:export\s+)?interface\s+([a-zA-Z0-9_$]+)/);
        if (interfaceMatch) {
          symbols.push({ name: interfaceMatch[1], type: "interface", signature: trimmed });
          continue;
        }
        // Type
        const typeMatch = trimmed.match(/^(?:export\s+)?type\s+([a-zA-Z0-9_$]+)/);
        if (typeMatch) {
          symbols.push({ name: typeMatch[1], type: "type", signature: trimmed });
          continue;
        }
        // Function
        const funcMatch = trimmed.match(/^(?:export\s+)?(?:async\s+)?function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)/);
        if (funcMatch) {
          symbols.push({ name: funcMatch[1], type: "function", signature: `${funcMatch[0]}...` });
          continue;
        }
        // Exported constant/variable function/object
        const constMatch = trimmed.match(/^export\s+(?:const|let|var)\s+([a-zA-Z0-9_$]+)/);
        if (constMatch) {
          symbols.push({ name: constMatch[1], type: "export", signature: trimmed });
        }
      }
      break;

    case ".py":
      for (const line of lines) {
        const classMatch = line.match(/^class\s+([a-zA-Z0-9_$]+)/);
        if (classMatch) {
          symbols.push({ name: classMatch[1], type: "class", signature: classMatch[0] });
          continue;
        }
        const defMatch = line.match(/^def\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)/);
        if (defMatch) {
          symbols.push({ name: defMatch[1], type: "function", signature: `${defMatch[0]}...` });
        }
      }
      break;

    case ".go":
      for (const line of lines) {
        const trimmed = line.trim();
        const typeMatch = trimmed.match(/^type\s+([a-zA-Z0-9_$]+)\s+(struct|interface)/);
        if (typeMatch) {
          symbols.push({ name: typeMatch[1], type: typeMatch[2], signature: trimmed });
          continue;
        }
        const funcMatch = trimmed.match(/^func\s+(?:\([^)]+\)\s+)?([a-zA-Z0-9_$]+)\s*\(([^)]*)\)/);
        if (funcMatch) {
          symbols.push({ name: funcMatch[1], type: "function", signature: `${funcMatch[0]}...` });
        }
      }
      break;

    case ".rs":
      for (const line of lines) {
        const trimmed = line.trim();
        const structMatch = trimmed.match(/^(?:pub\s+)?(?:struct|enum|union)\s+([a-zA-Z0-9_$]+)/);
        if (structMatch) {
          symbols.push({ name: structMatch[1], type: "struct/enum", signature: trimmed });
          continue;
        }
        const traitMatch = trimmed.match(/^(?:pub\s+)?trait\s+([a-zA-Z0-9_$]+)/);
        if (traitMatch) {
          symbols.push({ name: traitMatch[1], type: "trait", signature: trimmed });
          continue;
        }
        const fnMatch = trimmed.match(/^(?:pub\s+)?fn\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)/);
        if (fnMatch) {
          symbols.push({ name: fnMatch[1], type: "function", signature: `${fnMatch[0]}...` });
        }
      }
      break;

    case ".dart":
      for (const line of lines) {
        const trimmed = line.trim();
        const classMatch = trimmed.match(/^(?:abstract\s+)?class\s+([a-zA-Z0-9_$]+)/);
        if (classMatch) {
          symbols.push({ name: classMatch[1], type: "class", signature: trimmed });
          continue;
        }
        const fnMatch = trimmed.match(/^(?:\w+\s+)?([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*\{/);
        if (fnMatch) {
          const name = fnMatch[1];
          if (!["if", "for", "while", "switch", "catch"].includes(name)) {
            symbols.push({ name, type: "function", signature: `${fnMatch[1]}(${fnMatch[2]})...` });
          }
        }
      }
      break;
  }

  return symbols;
}

export function generateRepoMap(projectPath: string): RepoMap {
  return scanDirectory(projectPath, projectPath);
}

export function writeRepoMap(projectPath: string, repoMap: RepoMap): string {
  const targetDir = path.join(projectPath, ".aios");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetPath = path.join(targetDir, "repo-map.json");
  fs.writeFileSync(targetPath, JSON.stringify(repoMap, null, 2), "utf8");
  return targetPath;
}
