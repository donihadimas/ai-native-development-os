#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const cliRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const repoRoot = path.resolve(cliRoot, "..");
const assetsRoot = path.join(cliRoot, "assets");

const copies = [
  [path.join(repoRoot, "project-skeleton"), path.join(assetsRoot, "project-skeleton")],
  [path.join(repoRoot, "templates"), path.join(assetsRoot, "templates")]
];

function copyDirectory(source, target) {
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

fs.rmSync(assetsRoot, { recursive: true, force: true });
fs.mkdirSync(assetsRoot, { recursive: true });

for (const [source, target] of copies) {
  if (!fs.existsSync(source)) {
    throw new Error(`Missing asset source: ${source}`);
  }
  copyDirectory(source, target);
}

console.log(`Synced CLI assets to ${assetsRoot}`);
