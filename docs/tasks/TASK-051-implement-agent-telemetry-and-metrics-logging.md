# TASK-051: Implement Agent Telemetry and Metrics Logging

## Status

Done

## Objective

Equip the AIOS task runtime with telemetry logging to record task duration, tool call frequency, test failure rates, and token consumption metrics into `.aios/metrics/`.

## Background

AIOS currently provides zero observability into agent performance. Tracking task metrics over time gives developers empirical data on agent reliability, token costs, and architectural bottlenecks.

## Scope

### In Scope

- Create structured metric logging schema for task executions (`.aios/metrics/task-<TASK-ID>.json`).
- Track: start/finish timestamps, duration, verification outcome, iteration count, files modified, test pass/fail status.
- Add `aios stats` command to summarize recent execution metrics.

### Out of Scope

- Cloud analytics or remote telemetry broadcasting (all data remains strictly local).

## Affected Areas

- CLI: `cli/src/telemetry.ts`, `cli/src/index.ts`
- Configuration: `.aios/config.json`

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 3 / P3)
- Blocking tasks: TASK-043, TASK-048

## Acceptance Criteria

- [x] Successful and failed task runs log a metrics payload under `.aios/metrics/`.
- [x] `aios stats` outputs summary statistics (success rate, average duration, test pass rate).
- [x] Telemetry remains purely local and opt-out configurable.
- [x] Tests verify metrics calculation and storage.

## Testing Expectations

- Unit tests: Verify metrics recording and aggregation logic in `cli/test/`.

## Done Summary

- Files changed:
  - `cli/src/telemetry.ts`
  - `cli/src/core.ts`
  - `cli/src/index.ts`
  - `cli/src/worktree.ts`
  - `cli/test/telemetry.test.ts`
  - `cli/test/commands.test.ts`
- Tests run: `npm test` (all 105 tests passed successfully)
- Acceptance criteria status: All met.
- Risks: None.

