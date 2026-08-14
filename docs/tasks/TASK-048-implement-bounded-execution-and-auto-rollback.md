# TASK-048: Implement Bounded Execution and Automated Failure Rollback

## Status

Planned

## Objective

Add safety boundaries and circuit breakers into the task execution loop, including iteration counters, maximum file modification guards, and automated rollback/stashing upon consecutive verification failures.

## Background

Without bounded execution constraints, an agent encountering failing tests can loop indefinitely, consuming excessive API credits and degrading code quality. Implementing strict retry limits (e.g. 5 iterations, 3 consecutive test failures) ensures deterministic termination and prevents codebase regression.

## Scope

### In Scope

- Configure execution boundary rules in `.aios/config.json`:
  - `max_iterations_per_task: 5`
  - `max_consecutive_test_failures: 3`
  - `max_files_changed_per_task: 8`
- Implement tracking and enforcement in the CLI task loop.
- Automatically trigger git stash or reset when failure thresholds are breached, returning actionable diagnostic output.

### Out of Scope

- AST repository indexing (handled in TASK-049).

## Affected Areas

- CLI: `cli/src/runner.ts`, `cli/src/index.ts`
- Configuration: `.aios/config.json` schema

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 2 / P2)
- Blocking tasks: TASK-043, TASK-047

## Acceptance Criteria

- [ ] Task execution halts with a clear error report when exceeding maximum iterations or test failures.
- [ ] Code changes are automatically stashed/rolled back on failure if `auto_rollback_on_failure` is enabled.
- [ ] CLI unit/integration tests verify threshold tripping and rollback behavior.

## Testing Expectations

- Unit tests: Mock failing agent loops and assert that the process halts and rolls back cleanly after 3 test failures.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
