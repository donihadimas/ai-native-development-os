import fs from "node:fs";
import path from "node:path";
import { exec, execSync } from "node:child_process";

export interface VerifyOptions {
  projectPath?: string;
  taskFile?: string;
  testCommand?: string;
  allowNoTests?: boolean;
  onProgress?: (message: string) => void;
}

export interface VerifyResult {
  ok: boolean;
  testRunner?: string;
  testPassed: boolean;
  testOutput: string;
  gitDiffFiles: string[];
  gitDiffStat: string;
  taskViolations: string[];
  summary: string;
}

export function detectTestRunner(projectPath: string): { runner: string; command: string } | null {
  const pkgJsonPath = path.join(projectPath, "package.json");
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
      if (pkg.scripts && pkg.scripts.test && pkg.scripts.test !== 'echo "Error: no test specified" && exit 1') {
        return { runner: "npm", command: "npm test" };
      }
    } catch {
      // ignore JSON parse error
    }
  }

  if (
    fs.existsSync(path.join(projectPath, "pytest.ini")) ||
    fs.existsSync(path.join(projectPath, "pyproject.toml")) ||
    fs.existsSync(path.join(projectPath, "setup.py"))
  ) {
    return { runner: "pytest", command: "pytest" };
  }

  if (fs.existsSync(path.join(projectPath, "Cargo.toml"))) {
    return { runner: "cargo", command: "cargo test" };
  }

  if (fs.existsSync(path.join(projectPath, "go.mod"))) {
    return { runner: "go", command: "go test ./..." };
  }

  if (fs.existsSync(path.join(projectPath, "pubspec.yaml"))) {
    return { runner: "dart", command: "dart test" };
  }

  if (
    fs.existsSync(path.join(projectPath, "build.gradle")) ||
    fs.existsSync(path.join(projectPath, "build.gradle.kts")) ||
    fs.existsSync(path.join(projectPath, "gradlew")) ||
    fs.existsSync(path.join(projectPath, "gradlew.bat"))
  ) {
    const gradleCmd = process.platform === "win32" && fs.existsSync(path.join(projectPath, "gradlew.bat"))
      ? "gradlew.bat test"
      : fs.existsSync(path.join(projectPath, "gradlew"))
        ? "./gradlew test"
        : "gradle test";
    return { runner: "gradle", command: gradleCmd };
  }

  return null;
}

export function getGitChanges(projectPath: string): { files: string[]; stat: string } {
  try {
    const statusOut = execSync("git status --porcelain", {
      cwd: projectPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    const diffStat = execSync("git diff --stat", {
      cwd: projectPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    const files = statusOut
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(/^[MADRCU?! ]+\s+/, ""));
    return { files, stat: diffStat.trim() };
  } catch {
    return { files: [], stat: "" };
  }
}

function buildVerificationReport(
  projectPath: string,
  runner: { runner: string; command: string } | null,
  testPassed: boolean,
  testOutput: string
): VerifyResult {
  const gitChanges = getGitChanges(projectPath);
  const taskViolations: string[] = [];

  const ok = testPassed && taskViolations.length === 0;

  const lines = [
    `AIOS Verification Report: ${projectPath}`,
    `Test Runner: ${runner ? `${runner.runner} (${runner.command})` : "None detected"}`,
    `Test Result: ${testPassed ? "PASSED" : "FAILED"}`,
    "",
    "--- Test Output ---",
    testOutput.slice(0, 1500),
    ...(testOutput.length > 1500 ? ["... [truncated]"] : []),
    "",
    "--- Git Changes ---",
    gitChanges.stat
      ? gitChanges.stat
      : gitChanges.files.length > 0
        ? gitChanges.files.map((f) => `- ${f}`).join("\n")
        : "Clean working directory (no modified files)",
    "",
    `Verdict: ${ok ? "VERIFICATION PASSED" : "VERIFICATION FAILED"}`
  ];

  return {
    ok,
    testRunner: runner?.runner,
    testPassed,
    testOutput,
    gitDiffFiles: gitChanges.files,
    gitDiffStat: gitChanges.stat,
    taskViolations,
    summary: lines.join("\n")
  };
}

export async function runVerificationAsync(options: VerifyOptions = {}): Promise<VerifyResult> {
  const projectPath = path.resolve(options.projectPath ?? ".");
  const runner = options.testCommand
    ? { runner: "custom", command: options.testCommand }
    : detectTestRunner(projectPath);

  if (!runner) {
    const testPassed = Boolean(options.allowNoTests);
    const testOutput = options.allowNoTests
      ? "No automated test runner detected; skipped test execution."
      : "No automated test runner detected in project (package.json, pytest, cargo, go, pubspec).";
    return buildVerificationReport(projectPath, null, testPassed, testOutput);
  }

  options.onProgress?.(`Running test command: ${runner.command}...`);

  return new Promise((resolve) => {
    exec(runner.command, { cwd: projectPath, encoding: "utf8", maxBuffer: 10 * 1024 * 1024, env: process.env }, (err, stdout, stderr) => {
      const testPassed = !err;
      const testOutput = err
        ? `${stdout || ""}\n${stderr || ""}\n${err.message || ""}`.trim()
        : stdout;
      resolve(buildVerificationReport(projectPath, runner, testPassed, testOutput));
    });
  });
}

export function runVerification(options: VerifyOptions = {}): VerifyResult {
  const projectPath = path.resolve(options.projectPath ?? ".");
  const runner = options.testCommand
    ? { runner: "custom", command: options.testCommand }
    : detectTestRunner(projectPath);

  let testPassed = false;
  let testOutput = "";

  if (runner) {
    try {
      options.onProgress?.(`Running test command: ${runner.command}...`);
      testOutput = execSync(runner.command, {
        cwd: projectPath,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        env: process.env
      });
      testPassed = true;
    } catch (err: any) {
      testPassed = false;
      testOutput = `${err.stdout || ""}\n${err.stderr || ""}\n${err.message || ""}`.trim();
    }
  } else if (options.allowNoTests) {
    testPassed = true;
    testOutput = "No automated test runner detected; skipped test execution.";
  } else {
    testPassed = false;
    testOutput = "No automated test runner detected in project (package.json, pytest, cargo, go, pubspec).";
  }

  return buildVerificationReport(projectPath, runner, testPassed, testOutput);
}
