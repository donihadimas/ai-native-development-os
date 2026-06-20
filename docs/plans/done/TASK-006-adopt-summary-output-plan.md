# Implementation Plan: Improve Adopt Summary Output

## Task

- Task file: `docs/tasks/TASK-006-improve-adopt-summary-output.md`
- Objective: Make adopt summary clearer and shape-aware.

## Context Read

- `docs/tasks/TASK-006-improve-adopt-summary-output.md`
- `cli/src/index.ts`
- `cli/test/commands.test.ts`
- `docs/adr/ADR-003-configurable-project-shapes-and-modes.md`

## Affected Files

- `cli/src/index.ts`
- `cli/test/commands.test.ts`
- Optional: `cli/README.md`

## Approach

1. Add or reuse a helper to format expected shape paths.
2. Update `commandAdopt` output with:
   - shape,
   - expected app placeholders,
   - removed shape placeholders,
   - next validation command.
3. Keep existing counts.
4. Update tests for docs shape and fullstack shape where useful.

## Data Flow / Behavior Changes

No filesystem behavior changes. Output becomes clearer after adopt.

## Risks

- Output could become too verbose.
- Tests that match old output may need updates.

## Test Plan

- `npm.cmd test` from `cli/`
- Manual check `node dist/src/index.js adopt <tmp> --shape docs`

## Rollback Notes

Revert output formatting changes and tests.
