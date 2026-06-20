# Implementation Plan: TASK-036 Optimize AIOS Context Artifact Lifecycle

## Task

- Task file: `docs/tasks/TASK-036-optimize-aios-context-artifact-lifecycle.md`
- Objective: Improve token efficiency through task/plan archive migration, lightweight indexes, summary-first routing, and leaner router structure.

## Context Read

- `.aios/config.json`
- `AGENTS.md`
- `docs/context/context-map.md`
- `skill-router.md`
- Relevant commands, workflows, skills, and templates for task/plan lifecycle.

## Affected Files

- `docs/tasks/`, `docs/tasks/done/`, `docs/tasks/index.md`
- `docs/plans/`, `docs/plans/done/`, `docs/plans/index.md`
- `AGENTS.md`, `skill-router.md`, context docs
- Relevant `commands/`, `workflows/`, `skills/`, `.agents/skills/`, and templates
- Project skeleton instructions and context docs

## Approach

1. Archive completed task and plan files without renaming them.
2. Add lightweight task and plan indexes for active/archive routing.
3. Update routing rules to prefer indexes and summaries before full body reads.
4. Reduce router baseline by moving detailed lifecycle guidance into a reference file and pointing to it.
5. Validate with targeted searches, diff checks, and `.aios` untouched check.

## Data Flow / Behavior Changes

Agents should choose active tasks and plans from indexes or direct active-folder filenames first, avoid completed archives unless explicitly needed, and read summaries/sections before full documents.

## Risks

- Moving historical files may affect existing links that point to old task or plan paths.
- Generated `.aios/` remains stale until refreshed by the install/update flow.
- Indexes are manual documentation and can drift unless future workflows update them.

## Test Plan

- Run targeted `rg` checks for lifecycle, index, and summary-first wording.
- Run `git diff --check`.
- Confirm `git diff --name-only -- .aios` is empty.

## Rollback Notes

Move archived files back to their previous folders and remove index/lifecycle wording if the archive model is rejected.

After the related task or task range is complete and archived, move this plan to `<docsRoot>/plans/done/` without renaming it. Keep active plans directly under `<docsRoot>/plans/`.
