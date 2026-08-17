import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { initTaskSession, recordVerificationAttempt, finalizeTaskMetric, getSummaryStats, isTelemetryEnabled } from "../src/telemetry.js";
import { type VerifyResult } from "../src/verify.js";

function tempProjectDir(telemetryConfig: boolean | undefined = undefined): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aios-telemetry-"));
  fs.mkdirSync(path.join(dir, ".aios"), { recursive: true });
  
  const config: Record<string, any> = { mode: "lite", docsRoot: "docs" };
  if (telemetryConfig !== undefined) {
    config.telemetry = telemetryConfig;
  }
  fs.writeFileSync(path.join(dir, ".aios", "config.json"), JSON.stringify(config), "utf8");
  return dir;
}

test("isTelemetryEnabled respects project config", () => {
  const defaultDir = tempProjectDir();
  assert.equal(isTelemetryEnabled(defaultDir), true);
  fs.rmSync(defaultDir, { recursive: true, force: true });

  const optOutDir = tempProjectDir(false);
  assert.equal(isTelemetryEnabled(optOutDir), false);
  fs.rmSync(optOutDir, { recursive: true, force: true });

  const optInDir = tempProjectDir(true);
  assert.equal(isTelemetryEnabled(optInDir), true);
  fs.rmSync(optInDir, { recursive: true, force: true });
});

test("telemetry lifecycle records correct metrics and aggregates them", () => {
  const projectDir = tempProjectDir();
  const taskId = "TASK-999";

  // 1. Init Session
  initTaskSession(projectDir, taskId);
  const sessionPath = path.join(projectDir, ".aios", "metrics", `session-${taskId}.json`);
  assert.ok(fs.existsSync(sessionPath));
  const sessionData = JSON.parse(fs.readFileSync(sessionPath, "utf8"));
  assert.equal(sessionData.taskId, taskId);
  assert.equal(sessionData.iterationCount, 0);

  // 2. Record Attempt (Fail)
  const failedResult: VerifyResult = {
    ok: false,
    testPassed: false,
    testOutput: "fail",
    gitDiffFiles: ["file1.ts"],
    gitDiffStat: "1 file changed",
    taskViolations: [],
    summary: "fail"
  };
  recordVerificationAttempt(projectDir, taskId, failedResult);
  const updatedSessionData = JSON.parse(fs.readFileSync(sessionPath, "utf8"));
  assert.equal(updatedSessionData.iterationCount, 1);
  assert.equal(updatedSessionData.failures, 1);

  // 3. Finalize task (Pass)
  const passedResult: VerifyResult = {
    ok: true,
    testPassed: true,
    testOutput: "pass",
    gitDiffFiles: ["file1.ts", "file2.ts"],
    gitDiffStat: "2 files changed",
    taskViolations: [],
    summary: "pass"
  };
  finalizeTaskMetric(projectDir, taskId, passedResult);
  
  // Session file should be deleted
  assert.ok(!fs.existsSync(sessionPath));

  // Metric file should be created
  const metricPath = path.join(projectDir, ".aios", "metrics", `task-${taskId}.json`);
  assert.ok(fs.existsSync(metricPath));
  const metricData = JSON.parse(fs.readFileSync(metricPath, "utf8"));
  assert.equal(metricData.taskId, taskId);
  assert.equal(metricData.verificationOutcome, "pass");
  assert.equal(metricData.iterationCount, 2); // 1 from attempt, 1 from finalize
  assert.deepEqual(metricData.filesModified, ["file1.ts", "file2.ts"]);
  assert.equal(metricData.testPassed, true);

  // Test summary stats
  const stats = getSummaryStats(projectDir);
  assert.equal(stats.totalTasks, 1);
  assert.equal(stats.successRate, 1.0);
  assert.equal(stats.testPassRate, 1.0);
  assert.equal(stats.totalFilesModifiedCount, 2);

  // Cleanup
  fs.rmSync(projectDir, { recursive: true, force: true });
});
