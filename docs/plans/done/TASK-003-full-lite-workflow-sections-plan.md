# Implementation Plan: Add Full and Lite Mode Sections to Workflows

## Task

- Task file: `docs/tasks/TASK-003-add-full-lite-sections-to-workflows.md`
- Objective: Make workflow mode differences explicit and beginner-friendly.

## Context Read

- `docs/tasks/TASK-003-add-full-lite-sections-to-workflows.md`
- `references/workflow-modes.md`
- `workflows/new-feature.workflow.md`
- `workflows/README.md`

## Affected Files

- `workflows/new-feature.workflow.md`
- `workflows/bugfix.workflow.md`
- `workflows/review.workflow.md`
- `workflows/refactor.workflow.md`
- `workflows/release.workflow.md`
- Optional: `workflows/api-contract.workflow.md`, `workflows/database-migration.workflow.md`, `workflows/security-review.workflow.md`, `workflows/ui-design.workflow.md`

## Approach

1. Define a short standard section pattern:
   - `## Full Mode Flow`
   - `## Lite Mode Flow`
   - `## After This Flow`
2. Update `new-feature.workflow.md` first.
3. Apply the same pattern to related workflows without changing their intent.
4. Ensure mode-specific text matches `references/workflow-modes.md`.
5. Run Markdown whitespace checks.

## Data Flow / Behavior Changes

No runtime behavior changes. This is documentation/workflow guidance only.

## Risks

- Workflow files could become repetitive.
- Updating too many workflows at once may introduce inconsistent wording.

## Test Plan

- `git diff --check -- workflows`
- Manual review of updated workflow files.

## Rollback Notes

Revert the workflow document edits. No code or generated assets should be affected.
