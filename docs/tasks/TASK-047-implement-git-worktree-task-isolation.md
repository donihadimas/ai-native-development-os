# TASK-047: Implement Git Worktree Task Isolation

## Status

Planned

## Objective

Equip the AIOS CLI with Git Worktree management to execute agent tasks in isolated worktree branches (`.aios/worktrees/task-XXX`), preventing dirty working tree pollution and branch conflicts.

## Background

Operating directly on a dirty active working tree risks uncommitted work being destroyed or incomplete agent experiments polluting the developer's environment. Worktree isolation guarantees a clean, atomic environment per task.

## Scope

### In Scope

- Add CLI commands to create and tear down git worktrees for a task (`aios task start <TASK-ID>`, `aios task finish <TASK-ID>`).
- Manage worktree lifecycle: branch creation from base, clean commit on verification pass, and worktree pruning.
- Ignore `.aios/worktrees/` in `.gitignore`.

### Out of Scope

- Auto-rollback heuristics on test failures (handled in TASK-048).

## Affected Areas

- CLI: `cli/src/worktree.ts`, `cli/src/index.ts`
- Shared docs: `.gitignore`, `docs/architecture/`

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 2 / P2)
- Blocking tasks: TASK-043

## Acceptance Criteria

- [ ] `aios task start TASK-XXX` creates a dedicated worktree under `.aios/worktrees/TASK-XXX` on a feature branch.
- [ ] Task completion cleanly merges or creates a commit and prunes the worktree upon successful verification.
- [ ] Working directory of the main repo remains clean during agent operations.

## Testing Expectations

- Integration tests: Test git worktree creation, commit, and cleanup in a temporary git repository fixture.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
