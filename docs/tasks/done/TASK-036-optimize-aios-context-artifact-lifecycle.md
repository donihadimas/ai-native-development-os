# TASK-036: Optimize AIOS Context Artifact Lifecycle

## Status

Done

## Objective

Improve AIOS token efficiency by archiving completed task and plan artifacts, adding lightweight indexes, reducing routing preload risk, and guiding agents to read summaries before full documents.

## Background

AIOS now has active/archive lifecycle rules for tasks and implementation plans. The next step is to apply those rules to existing artifacts and add lightweight indexes so agents can choose relevant files without scanning historical content.

## Scope

### In Scope

- Move completed task files to `docs/tasks/done/` when their status is `Done`.
- Move completed implementation plans to `docs/plans/done/` when their related task or task range is completed.
- Add lightweight task and plan indexes.
- Add or update routing rules that prefer indexes, summaries, and relevant sections before full artifact reads.
- Keep generated `.aios/` copies unchanged.

### Out of Scope

- CLI behavior changes.
- Generated `.aios/` edits.
- Rewriting historical task or plan content beyond path moves and index entries.

## Affected Areas

- Documentation routing: `AGENTS.md`, `skill-router.md`, context maps, development-start docs.
- Skills and commands related to context management, planning, implementation, review, release, and task generation.
- Task and plan artifact folders under `docs/`.
- Project skeleton context docs and instructions.

## Dependencies

- Related PRD:
- Related design:
- Related ADR:
- Related architecture section:
- Blocking tasks:

## Acceptance Criteria

- [x] Completed tasks are archived under `docs/tasks/done/` without renaming.
- [x] Completed plans are archived under `docs/plans/done/` without renaming when their related tasks are complete.
- [x] `docs/tasks/index.md` and `docs/plans/index.md` provide lightweight routing metadata.
- [x] Agent routing prefers indexes and summaries before reading task, plan, PRD, architecture, or design bodies.
- [x] Router details are split or summarized enough to reduce baseline context while preserving strict routing.
- [x] Generated `.aios/` copies are not modified manually.

## Testing Expectations

- Regression checks: targeted `rg` searches for index, archive, summary-first, and stale broad-scan wording.
- Manual checks: `git diff --check` and `git diff --name-only -- .aios`.

## Implementation Notes

- Archive only direct task and plan files whose completion status can be determined from headings/status metadata.
- For multi-task plans, archive only when all referenced task IDs are already archived or otherwise complete.

## Done Summary

- Files changed: added task and plan indexes, archived completed task and plan artifacts under `docs/tasks/done/` and `docs/plans/done/`, added `references/artifact-lifecycle.md`, tightened `AGENTS.md`, `skill-router.md`, context docs, development-start docs, commands, templates, and related source/native skills for index-first and summary-first routing.
- Tests run: targeted `rg` checks for archive/index/summary-first and broad-scan wording; `git diff --check`; `git diff --name-only -- .aios`; direct active task/plan folder listing.
- Acceptance criteria status: all acceptance criteria satisfied.
- Risks: generated `.aios/` copies remain intentionally unchanged until regenerated; manual indexes can drift if future workflows skip index maintenance; historical links to moved task or plan files may need archive path updates.

After completion, move this file to `<docsRoot>/tasks/done/` without renaming it. Keep active or blocked tasks directly under `<docsRoot>/tasks/`.
