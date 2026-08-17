import fs from "node:fs";
import path from "node:path";
import { readProjectConfig } from "./core.js";
import type { VerifyResult } from "./verify.js";

export interface TaskSession {
  taskId: string;
  startTimestamp: string;
  iterationCount: number;
  failures: number;
  passes: number;
}

export interface TaskMetric {
  taskId: string;
  startTimestamp: string;
  finishTimestamp: string;
  durationMs: number;
  verificationOutcome: "pass" | "fail";
  iterationCount: number;
  filesModified: string[];
  testPassed: boolean;
}

export function isTelemetryEnabled(projectPath: string): boolean {
  try {
    const config = readProjectConfig(projectPath);
    return config.telemetry !== false;
  } catch {
    return true;
  }
}

function getMetricsDir(projectPath: string): string {
  return path.join(projectPath, ".aios", "metrics");
}

export function initTaskSession(projectPath: string, taskId: string): void {
  if (!isTelemetryEnabled(projectPath)) return;

  const metricsDir = getMetricsDir(projectPath);
  fs.mkdirSync(metricsDir, { recursive: true });

  const sessionPath = path.join(metricsDir, `session-${taskId}.json`);
  if (!fs.existsSync(sessionPath)) {
    const session: TaskSession = {
      taskId,
      startTimestamp: new Date().toISOString(),
      iterationCount: 0,
      failures: 0,
      passes: 0
    };
    fs.writeFileSync(sessionPath, JSON.stringify(session, null, 2), "utf8");
  }
}

export function recordVerificationAttempt(projectPath: string, taskId: string, verifyResult: VerifyResult): void {
  if (!isTelemetryEnabled(projectPath)) return;

  const metricsDir = getMetricsDir(projectPath);
  fs.mkdirSync(metricsDir, { recursive: true });

  const sessionPath = path.join(metricsDir, `session-${taskId}.json`);
  let session: TaskSession;

  if (fs.existsSync(sessionPath)) {
    try {
      session = JSON.parse(fs.readFileSync(sessionPath, "utf8"));
    } catch {
      session = {
        taskId,
        startTimestamp: new Date().toISOString(),
        iterationCount: 0,
        failures: 0,
        passes: 0
      };
    }
  } else {
    session = {
      taskId,
      startTimestamp: new Date().toISOString(),
      iterationCount: 0,
      failures: 0,
      passes: 0
    };
  }

  session.iterationCount += 1;
  if (verifyResult.ok) {
    session.passes += 1;
  } else {
    session.failures += 1;
  }

  fs.writeFileSync(sessionPath, JSON.stringify(session, null, 2), "utf8");
}

export function finalizeTaskMetric(projectPath: string, taskId: string, verifyResult: VerifyResult): void {
  if (!isTelemetryEnabled(projectPath)) return;

  const metricsDir = getMetricsDir(projectPath);
  fs.mkdirSync(metricsDir, { recursive: true });

  const sessionPath = path.join(metricsDir, `session-${taskId}.json`);
  let session: TaskSession | null = null;

  if (fs.existsSync(sessionPath)) {
    try {
      session = JSON.parse(fs.readFileSync(sessionPath, "utf8"));
      fs.unlinkSync(sessionPath);
    } catch {
      // ignore parse / delete error
    }
  }

  const startTimestamp = session ? session.startTimestamp : new Date().toISOString();
  const finishTimestamp = new Date().toISOString();
  const durationMs = new Date(finishTimestamp).getTime() - new Date(startTimestamp).getTime();
  const iterationCount = session ? session.iterationCount + 1 : 1;

  const metric: TaskMetric = {
    taskId,
    startTimestamp,
    finishTimestamp,
    durationMs,
    verificationOutcome: verifyResult.ok ? "pass" : "fail",
    iterationCount,
    filesModified: verifyResult.gitDiffFiles || [],
    testPassed: verifyResult.testPassed
  };

  const metricPath = path.join(metricsDir, `task-${taskId}.json`);
  fs.writeFileSync(metricPath, JSON.stringify(metric, null, 2), "utf8");
}

export interface SummaryStats {
  totalTasks: number;
  successRate: number;
  avgDurationMs: number;
  testPassRate: number;
  avgIterationCount: number;
  totalFilesModifiedCount: number;
}

export function getSummaryStats(projectPath: string): SummaryStats {
  const metricsDir = getMetricsDir(projectPath);
  if (!fs.existsSync(metricsDir)) {
    return {
      totalTasks: 0,
      successRate: 0,
      avgDurationMs: 0,
      testPassRate: 0,
      avgIterationCount: 0,
      totalFilesModifiedCount: 0
    };
  }

  const files = fs.readdirSync(metricsDir).filter(f => f.startsWith("task-") && f.endsWith(".json"));
  let passedCount = 0;
  let totalDurationMs = 0;
  let testPassedCount = 0;
  let totalIterationCount = 0;
  const uniqueFiles = new Set<string>();

  for (const file of files) {
    try {
      const metric: TaskMetric = JSON.parse(fs.readFileSync(path.join(metricsDir, file), "utf8"));
      if (metric.verificationOutcome === "pass") {
        passedCount += 1;
      }
      if (metric.testPassed) {
        testPassedCount += 1;
      }
      totalDurationMs += metric.durationMs || 0;
      totalIterationCount += metric.iterationCount || 0;
      if (metric.filesModified) {
        metric.filesModified.forEach(f => uniqueFiles.add(f));
      }
    } catch {
      // ignore corrupt files
    }
  }

  const totalTasks = files.length;
  return {
    totalTasks,
    successRate: totalTasks ? passedCount / totalTasks : 0,
    avgDurationMs: totalTasks ? totalDurationMs / totalTasks : 0,
    testPassRate: totalTasks ? testPassedCount / totalTasks : 0,
    avgIterationCount: totalTasks ? totalIterationCount / totalTasks : 0,
    totalFilesModifiedCount: uniqueFiles.size
  };
}
