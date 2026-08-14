import { execSync } from "node:child_process";

export interface ExecutionLimits {
  maxIterationsPerTask: number;
  maxConsecutiveTestFailures: number;
  maxFilesChangedPerTask: number;
  autoRollbackOnFailure: boolean;
}

export const DEFAULT_EXECUTION_LIMITS: ExecutionLimits = {
  maxIterationsPerTask: 5,
  maxConsecutiveTestFailures: 3,
  maxFilesChangedPerTask: 8,
  autoRollbackOnFailure: true
};

export interface TaskExecutionState {
  taskId: string;
  iterations: number;
  consecutiveTestFailures: number;
  modifiedFiles: string[];
}

export interface BoundaryCheckResult {
  allowed: boolean;
  violation?: "max_iterations" | "max_test_failures" | "max_files_changed";
  message: string;
}

export function checkExecutionBoundaries(
  state: TaskExecutionState,
  limits: ExecutionLimits = DEFAULT_EXECUTION_LIMITS
): BoundaryCheckResult {
  if (state.iterations >= limits.maxIterationsPerTask) {
    return {
      allowed: false,
      violation: "max_iterations",
      message: `Circuit breaker tripped: exceeded maximum iterations (${state.iterations}/${limits.maxIterationsPerTask}) for task ${state.taskId}.`
    };
  }

  if (state.consecutiveTestFailures >= limits.maxConsecutiveTestFailures) {
    return {
      allowed: false,
      violation: "max_test_failures",
      message: `Circuit breaker tripped: exceeded maximum consecutive test failures (${state.consecutiveTestFailures}/${limits.maxConsecutiveTestFailures}) for task ${state.taskId}.`
    };
  }

  if (state.modifiedFiles.length > limits.maxFilesChangedPerTask) {
    return {
      allowed: false,
      violation: "max_files_changed",
      message: `Circuit breaker tripped: modified ${state.modifiedFiles.length} files (limit is ${limits.maxFilesChangedPerTask}) for task ${state.taskId}.`
    };
  }

  return {
    allowed: true,
    message: "Execution within safety boundaries."
  };
}

export function rollbackTaskChanges(
  projectPath: string,
  mode: "stash" | "hard" = "stash",
  taskId = "task"
): { success: boolean; message: string } {
  try {
    if (mode === "hard") {
      execSync("git reset --hard HEAD", { cwd: projectPath, stdio: "ignore" });
      execSync("git clean -fd", { cwd: projectPath, stdio: "ignore" });
      return {
        success: true,
        message: `Hard reset completed for ${taskId}. All uncommitted changes discarded.`
      };
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    execSync(`git stash save "AIOS auto-rollback: ${taskId} (${timestamp})" --include-untracked`, {
      cwd: projectPath,
      stdio: "ignore"
    });
    return {
      success: true,
      message: `Auto-rollback completed: uncommitted changes stashed for ${taskId}.`
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Rollback failed: ${err.message || String(err)}`
    };
  }
}
