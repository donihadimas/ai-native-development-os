# TASK-042: Eliminate Task File Movement to done/ Subfolders and Fix Link Decay

## Status

Done

## Objective

Update the AIOS task lifecycle rules, templates, and CLI validators so tasks and plans remain in their flat root directories (`docs/tasks/` and `docs/plans/`) with status updates, eliminating file movement to `done/` subdirectories that causes link decay.

## Background

The audit in `review.md` showed that moving completed task and plan files into `done/` subfolders breaks relative markdown links across PRDs, ADRs, and implementation notes, while adding unnecessary git noise. Git history and the task status field (`Status: Done`) already provide complete archival tracking.

## Scope

### In Scope

- Update `templates/task.template.md` and `templates/implementation-plan.template.md` to remove instructions for moving files to `done/`.
- Update `AGENTS.md` and workflow documentation to remove the `done/` archiving step.
- Update CLI validators and commands to treat flat tasks in `docs/tasks/` with `Status: Done` as completed.
- Update task indexing rules in `docs/tasks/index.md`.

### Out of Scope

- Removing existing historical files in `done/` (preserved as historical archive).

## Affected Areas

- Shared docs: `templates/`, `docs/tasks/`, `docs/plans/`, `project-skeleton/`
- CLI: Task parsing logic in `cli/src/`

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 0 / P0)
- Blocking tasks: None

## Acceptance Criteria

- [x] Task and plan templates instruct agents to update `Status: Done` in-place without moving files.
- [x] Relative markdown links in active tasks and plans remain valid upon completion.
- [x] Task index reflects completed tasks in a single unified table or state-based filter.
- [x] CLI tests pass.

## Testing Expectations

- Unit tests: `npm test` in `cli/`
- Integration tests: Run task lifecycle validation checks.

## Done Summary

- Files changed: `templates/task.template.md`, `templates/implementation-plan.template.md`, `.aios/templates/task.template.md`, `.aios/templates/implementation-plan.template.md`, `AGENTS.md`, `docs/tasks/index.md`.
- Tests run: `npm test` in `cli/` (79 passing tests).
- Acceptance criteria status: All criteria satisfied.
- Risks: None.
