# TASK-047: Implement Git Worktree Task Isolation

## Status

Done

## Objective

Equip the AIOS CLI with Git Worktree management to execute agent tasks in isolated worktree branches (`.aios/worktrees/task-XXX`), preventing dirty working tree pollution and branch conflicts.

## Background

Operating directly on a dirty active working tree risks uncommitted work being destroyed or incomplete agent experiments polluting the developer's environment. Worktree isolation guarantees a clean, atomic environment per task.

## Scope

### In Scope

- Add CLI commands to create, manage, and tear down git worktrees for a task:
  - `aios worktree start <TASK-ID> [project-path] [--base <branch>]`
  - `aios worktree finish <TASK-ID> [project-path] [--message <commit-msg>]`
  - `aios worktree list [project-path]`
  - `aios worktree remove <TASK-ID> [project-path]`
- Manage worktree lifecycle: branch creation from base, verification pass before commit, clean commit creation, and worktree pruning.
- Ignore `.aios/worktrees/` in `.gitignore`.

### Out of Scope

- Bounded execution heuristics (handled in TASK-048).

## Affected Areas

- CLI: `cli/src/worktree.ts`, `cli/src/core.ts`, `cli/src/index.ts`
- Shared docs: `.gitignore`, `docs/architecture/`

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 2 / P2)
- Blocking tasks: TASK-043

## Acceptance Criteria

- [x] `aios worktree start TASK-XXX` creates a dedicated worktree under `.aios/worktrees/task-xxx` on a feature branch.
- [x] Task completion cleanly verifies, creates a commit, and prunes the worktree upon successful verification.
- [x] Working directory of the main repo remains clean during agent operations.
- [x] CLI unit and integration tests pass.

## Testing Expectations

- Integration tests: Test git worktree creation, commit, and cleanup in `cli/test/worktree.test.ts`.

## Done Summary

- Files changed: `cli/src/worktree.ts`, `cli/src/core.ts`, `cli/src/index.ts`, `.gitignore`, `cli/test/worktree.test.ts`.
- Tests run: `npm test` in `cli/` (94 passing tests).
- Acceptance criteria status: All criteria satisfied.
- Risks: None.
