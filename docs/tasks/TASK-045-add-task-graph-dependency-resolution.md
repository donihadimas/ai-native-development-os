# TASK-045: Add Task Graph Dependency Resolution (depends_on)

## Status

Planned

## Objective

Add explicit prerequisite dependency support (`depends_on: ["TASK-001"]`) to task files and implement a dependency graph resolver in the AIOS CLI.

## Background

Currently AIOS tasks are flat and cannot declare dependencies. Agents or developers must manually guess execution order for complex features spanning multiple tasks. Adding structured dependencies allows deterministic sequencing and automated blocked/ready state tracking.

## Scope

### In Scope

- Add `depends_on` array field to `templates/task.template.md`.
- Implement DAG resolution logic in `cli/src/` to determine task execution order.
- Add CLI task queue display showing tasks grouped by "Ready", "Blocked (waiting on dependencies)", and "Done".

### Out of Scope

- Worktree isolation (handled in TASK-047).

## Affected Areas

- Shared docs: `templates/task.template.md`, `docs/tasks/`
- CLI: Task parsing and listing modules in `cli/src/`

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 1 / P1)
- Blocking tasks: TASK-042

## Acceptance Criteria

- [ ] Task template supports `depends_on: ["TASK-XXX"]`.
- [ ] CLI command (`aios tasks` or `aios task list`) resolves dependency trees and flags tasks whose dependencies are not yet complete.
- [ ] Circular dependency detection prevents infinite loops.
- [ ] CLI tests pass.

## Testing Expectations

- Unit tests: Test DAG topological sorting and circular dependency detection in `cli/test/`.
- Integration tests: Test with a chain of 3 dependent tasks.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
