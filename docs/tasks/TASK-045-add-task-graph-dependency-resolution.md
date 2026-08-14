# TASK-045: Add Task Graph Dependency Resolution (depends_on)

## Status

Done

## Objective

Add explicit prerequisite dependency support (`depends_on: ["TASK-001"]`) to task files and implement a dependency graph resolver in the AIOS CLI.

## Background

Currently AIOS tasks are flat and cannot declare dependencies. Agents or developers must manually guess execution order for complex features spanning multiple tasks. Adding structured dependencies allows deterministic sequencing and automated blocked/ready state tracking.

## Scope

### In Scope

- Add `depends_on` array field to `templates/task.template.md`.
- Implement DAG resolution logic in `cli/src/tasks.ts` to determine task execution order.
- Add CLI task queue display (`aios tasks`) showing tasks grouped by "Ready", "Blocked (waiting on dependencies)", and "Completed".
- Add cycle detection for circular task graphs.

### Out of Scope

- Worktree isolation (handled in TASK-047).

## Affected Areas

- Shared docs: `templates/task.template.md`, `.aios/templates/task.template.md`, `docs/tasks/`
- CLI: Task parsing and listing modules in `cli/src/tasks.ts`, `cli/src/index.ts`, `cli/src/core.ts`

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 1 / P1)
- Blocking tasks: TASK-042

## Acceptance Criteria

- [x] Task template supports `depends_on: ["TASK-XXX"]`.
- [x] CLI command (`aios tasks`) resolves dependency trees and flags tasks whose dependencies are not yet complete.
- [x] Circular dependency detection prevents infinite loops.
- [x] CLI tests pass.

## Testing Expectations

- Unit tests: Test DAG topological sorting and circular dependency detection in `cli/test/verify.test.ts`.
- Integration tests: Test with dependent tasks via CLI `aios tasks`.

## Done Summary

- Files changed: `cli/src/tasks.ts`, `cli/src/core.ts`, `cli/src/index.ts`, `templates/task.template.md`, `.aios/templates/task.template.md`, `cli/test/verify.test.ts`.
- Tests run: `npm test` in `cli/` (87 passing tests).
- Acceptance criteria status: All criteria satisfied.
- Risks: None.
