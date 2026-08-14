import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { execSync } from "node:child_process";
import {
  startWorktree,
  finishWorktree,
  listWorktrees,
  removeWorktree,
  checkExecutionBoundaries,
  rollbackTaskChanges,
  DEFAULT_EXECUTION_LIMITS,
  getRuntimePaths
} from "../src/core.js";
import { run } from "../src/index.js";

function tempGitRepo(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aios-worktree-test-"));
  execSync("git init -b main", { cwd: dir, stdio: "ignore" });
  execSync("git config user.name \"Test User\"", { cwd: dir, stdio: "ignore" });
  execSync("git config user.email \"test@example.com\"", { cwd: dir, stdio: "ignore" });

  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({ name: "demo", scripts: { test: "node -e \"process.exit(0)\"" } }, null, 2));
  fs.writeFileSync(path.join(dir, "README.md"), "# Test Project\n");
  execSync("git add -A && git commit -m \"initial commit\"", { cwd: dir, stdio: "ignore" });

  return dir;
}

const runtimePaths = getRuntimePaths();

test("startWorktree creates a git worktree on an aios branch", () => {
  const repo = tempGitRepo();
  const res = startWorktree({ projectPath: repo, taskId: "TASK-047" });

  assert.equal(res.ok, true);
  assert.equal(res.branch, "aios/task-047");
  assert.ok(fs.existsSync(res.worktreePath));
  assert.ok(fs.existsSync(path.join(res.worktreePath, "package.json")));

  const worktrees = listWorktrees(repo);
  assert.ok(worktrees.some((w) => w.branch === "aios/task-047"));
});

test("finishWorktree verifies, commits changes, and prunes worktree", () => {
  const repo = tempGitRepo();
  const start = startWorktree({ projectPath: repo, taskId: "TASK-047" });

  // Add a file in the worktree
  fs.writeFileSync(path.join(start.worktreePath, "new-file.txt"), "hello from worktree\n");

  const finish = finishWorktree({
    projectPath: repo,
    taskId: "TASK-047",
    commitMessage: "feat: add new file from worktree"
  });

  assert.equal(finish.ok, true);
  assert.ok(finish.commitSha);
  assert.equal(fs.existsSync(start.worktreePath), false, "worktree folder should be cleaned up");

  const worktrees = listWorktrees(repo);
  assert.equal(worktrees.some((w) => w.branch === "aios/task-047"), false);
});

test("removeWorktree cleans up worktree directory", () => {
  const repo = tempGitRepo();
  const start = startWorktree({ projectPath: repo, taskId: "TASK-047" });
  assert.ok(fs.existsSync(start.worktreePath));

  const removed = removeWorktree(repo, "TASK-047");
  assert.equal(removed, true);
  assert.equal(fs.existsSync(start.worktreePath), false);
});

test("checkExecutionBoundaries detects limits violations", () => {
  const normal = checkExecutionBoundaries({
    taskId: "TASK-001",
    iterations: 2,
    consecutiveTestFailures: 1,
    modifiedFiles: ["file1.ts", "file2.ts"]
  });
  assert.equal(normal.allowed, true);

  const maxIter = checkExecutionBoundaries({
    taskId: "TASK-001",
    iterations: 5,
    consecutiveTestFailures: 0,
    modifiedFiles: ["file1.ts"]
  });
  assert.equal(maxIter.allowed, false);
  assert.equal(maxIter.violation, "max_iterations");

  const maxFail = checkExecutionBoundaries({
    taskId: "TASK-001",
    iterations: 2,
    consecutiveTestFailures: 3,
    modifiedFiles: ["file1.ts"]
  });
  assert.equal(maxFail.allowed, false);
  assert.equal(maxFail.violation, "max_test_failures");

  const maxFiles = checkExecutionBoundaries({
    taskId: "TASK-001",
    iterations: 2,
    consecutiveTestFailures: 0,
    modifiedFiles: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  });
  assert.equal(maxFiles.allowed, false);
  assert.equal(maxFiles.violation, "max_files_changed");
});

test("rollbackTaskChanges stashes uncommitted changes", () => {
  const repo = tempGitRepo();
  fs.writeFileSync(path.join(repo, "dirty.txt"), "uncommitted work\n");

  const statusBefore = execSync("git status --porcelain", { cwd: repo, encoding: "utf8" });
  assert.ok(statusBefore.includes("dirty.txt"));

  const res = rollbackTaskChanges(repo, "stash", "TASK-048");
  assert.equal(res.success, true);

  const statusAfter = execSync("git status --porcelain", { cwd: repo, encoding: "utf8" });
  assert.equal(statusAfter.trim(), "", "working tree should be clean after stash");
});

test("aios worktree CLI commands work seamlessly", () => {
  const repo = tempGitRepo();

  const startOut = run(["worktree", "start", "TASK-099", repo], { runtimePaths, cwd: repo });
  assert.match(startOut, /Created isolated worktree/);
  assert.match(startOut, /aios\/task-099/);

  const listOut = run(["worktree", "list", repo], { runtimePaths, cwd: repo });
  assert.match(listOut, /Active AIOS Git Worktrees/);
  assert.match(listOut, /aios\/task-099/);

  const removeOut = run(["worktree", "remove", "TASK-099", repo], { runtimePaths, cwd: repo });
  assert.match(removeOut, /Removed worktree for TASK-099/);
});

test("aios rollback CLI command executes rollback on project", () => {
  const repo = tempGitRepo();
  fs.writeFileSync(path.join(repo, "temp.txt"), "modified\n");

  const out = run(["rollback", repo], { runtimePaths, cwd: repo });
  assert.match(out, /Auto-rollback completed/);
});
