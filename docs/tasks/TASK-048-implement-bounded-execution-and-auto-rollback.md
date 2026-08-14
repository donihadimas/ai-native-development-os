# TASK-048: Implement Bounded Execution and Automated Failure Rollback

## Status

Done

## Objective

Add safety boundaries and circuit breakers into the task execution loop, including iteration counters, maximum file modification guards, and automated rollback/stashing upon consecutive verification failures.

## Background

Without bounded execution constraints, an agent encountering failing tests can loop indefinitely, consuming excessive API credits and degrading code quality. Implementing strict retry limits (e.g. 5 iterations, 3 consecutive test failures) ensures deterministic termination and prevents codebase regression.

## Scope

### In Scope

- Configure execution boundary rules:
  - `maxIterationsPerTask: 5`
  - `maxConsecutiveTestFailures: 3`
  - `maxFilesChangedPerTask: 8`
  - `autoRollbackOnFailure: true`
- Implement circuit breaker boundary checker (`checkExecutionBoundaries`) in `cli/src/boundaries.ts`.
- Implement `aios rollback` command to stash or reset uncommitted changes when thresholds are tripped.

### Out of Scope

- AST repository indexing (handled in TASK-049).

## Affected Areas

- CLI: `cli/src/boundaries.ts`, `cli/src/core.ts`, `cli/src/index.ts`

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 2 / P2)
- Blocking tasks: TASK-043, TASK-047

## Acceptance Criteria

- [x] Task execution halts with a clear error report when exceeding maximum iterations or test failures.
- [x] Code changes can be automatically stashed/rolled back via `rollbackTaskChanges` and `aios rollback`.
- [x] CLI unit/integration tests verify threshold tripping and rollback behavior.

## Testing Expectations

- Unit tests: Mock failing agent loops and assert that the process halts and rolls back cleanly in `cli/test/worktree.test.ts`.

## Done Summary

- Files changed: `cli/src/boundaries.ts`, `cli/src/core.ts`, `cli/src/index.ts`, `cli/test/worktree.test.ts`.
- Tests run: `npm test` in `cli/` (94 passing tests).
- Acceptance criteria status: All criteria satisfied.
- Risks: None.
