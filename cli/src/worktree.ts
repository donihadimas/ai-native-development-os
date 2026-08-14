import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { runVerification, type VerifyResult } from "./verify.js";

export interface WorktreeInfo {
  worktreePath: string;
  branch: string;
  head: string;
}

export interface StartWorktreeOptions {
  projectPath?: string;
  taskId: string;
  baseBranch?: string;
}

export interface StartWorktreeResult {
  ok: boolean;
  worktreePath: string;
  branch: string;
  message: string;
}

export interface FinishWorktreeOptions {
  projectPath?: string;
  taskId: string;
  commitMessage?: string;
  mergeToBase?: boolean;
}

export interface FinishWorktreeResult {
  ok: boolean;
  branch: string;
  commitSha?: string;
  verification?: VerifyResult;
  message: string;
}

function normalizeTaskSlug(taskId: string): string {
  return taskId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-");
}

function isGitRepo(projectPath: string): boolean {
  try {
    const out = execSync("git rev-parse --is-inside-work-tree", {
      cwd: projectPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    return out.trim() === "true";
  } catch {
    return false;
  }
}

export function listWorktrees(projectPath: string): WorktreeInfo[] {
  if (!isGitRepo(projectPath)) {
    return [];
  }

  try {
    const raw = execSync("git worktree list --porcelain", {
      cwd: projectPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });

    const entries = raw.split("\n\n").filter(Boolean);
    const results: WorktreeInfo[] = [];

    for (const entry of entries) {
      const lines = entry.split("\n");
      let worktreePath = "";
      let head = "";
      let branch = "";

      for (const line of lines) {
        if (line.startsWith("worktree ")) {
          worktreePath = line.substring("worktree ".length).trim();
        } else if (line.startsWith("HEAD ")) {
          head = line.substring("HEAD ".length).trim();
        } else if (line.startsWith("branch ")) {
          branch = line.substring("branch ".length).trim().replace(/^refs\/heads\//, "");
        }
      }

      if (worktreePath) {
        results.push({ worktreePath, branch: branch || "detached", head });
      }
    }

    return results;
  } catch {
    return [];
  }
}

export function startWorktree(options: StartWorktreeOptions): StartWorktreeResult {
  const projectPath = path.resolve(options.projectPath ?? ".");
  if (!isGitRepo(projectPath)) {
    throw new Error(`Directory is not a git repository: ${projectPath}`);
  }

  const taskSlug = normalizeTaskSlug(options.taskId);
  const branchName = `aios/${taskSlug}`;
  const worktreesDir = path.join(projectPath, ".aios", "worktrees");
  const worktreePath = path.join(worktreesDir, taskSlug);

  fs.mkdirSync(worktreesDir, { recursive: true });

  if (fs.existsSync(worktreePath)) {
    return {
      ok: true,
      worktreePath,
      branch: branchName,
      message: `Reusing existing worktree at ${worktreePath}`
    };
  }

  try {
    // Check if branch already exists
    let branchExists = false;
    try {
      execSync(`git show-ref --verify --quiet refs/heads/${branchName}`, {
        cwd: projectPath,
        stdio: "ignore"
      });
      branchExists = true;
    } catch {
      branchExists = false;
    }

    if (branchExists) {
      execSync(`git worktree add "${worktreePath}" "${branchName}"`, {
        cwd: projectPath,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"]
      });
    } else {
      const base = options.baseBranch ? ` "${options.baseBranch}"` : "";
      execSync(`git worktree add -b "${branchName}" "${worktreePath}"${base}`, {
        cwd: projectPath,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"]
      });
    }

    return {
      ok: true,
      worktreePath,
      branch: branchName,
      message: `Created isolated worktree for ${options.taskId} on branch ${branchName}`
    };
  } catch (err: any) {
    throw new Error(`Failed to create git worktree: ${err.message || String(err)}`);
  }
}

export function finishWorktree(options: FinishWorktreeOptions): FinishWorktreeResult {
  const projectPath = path.resolve(options.projectPath ?? ".");
  const taskSlug = normalizeTaskSlug(options.taskId);
  const branchName = `aios/${taskSlug}`;
  const worktreePath = path.join(projectPath, ".aios", "worktrees", taskSlug);

  if (!fs.existsSync(worktreePath)) {
    throw new Error(`No active worktree found for ${options.taskId} at ${worktreePath}`);
  }

  // 1. Run deterministic verification inside worktree
  const verification = runVerification({ projectPath: worktreePath });
  if (!verification.ok) {
    return {
      ok: false,
      branch: branchName,
      verification,
      message: `Verification failed for worktree ${taskSlug}. Worktree preserved for inspection.`
    };
  }

  // 2. Commit changes in the worktree
  try {
    const commitMsg = options.commitMessage ?? `feat(${taskSlug}): complete task execution`;
    execSync("git add -A", { cwd: worktreePath, stdio: "ignore" });

    // Check if there are changes to commit
    const status = execSync("git status --porcelain", {
      cwd: worktreePath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });

    let commitSha = "";
    if (status.trim().length > 0) {
      execSync(`git commit -m "${commitMsg}"`, {
        cwd: worktreePath,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"]
      });
      commitSha = execSync("git rev-parse HEAD", {
        cwd: worktreePath,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      }).trim();
    } else {
      commitSha = execSync("git rev-parse HEAD", {
        cwd: worktreePath,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      }).trim();
    }

    // 3. Remove worktree
    execSync(`git worktree remove --force "${worktreePath}"`, {
      cwd: projectPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
    execSync("git worktree prune", { cwd: projectPath, stdio: "ignore" });

    return {
      ok: true,
      branch: branchName,
      commitSha,
      verification,
      message: `Worktree ${taskSlug} verified, committed (${commitSha.slice(0, 7)}), and cleaned up.`
    };
  } catch (err: any) {
    throw new Error(`Failed to finalize worktree ${taskSlug}: ${err.message || String(err)}`);
  }
}

export function removeWorktree(projectPath: string, taskId: string): boolean {
  const taskSlug = normalizeTaskSlug(taskId);
  const worktreePath = path.join(projectPath, ".aios", "worktrees", taskSlug);

  try {
    if (fs.existsSync(worktreePath)) {
      execSync(`git worktree remove --force "${worktreePath}"`, {
        cwd: projectPath,
        stdio: "ignore"
      });
    }
    execSync("git worktree prune", { cwd: projectPath, stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
