# TASK-034: Add Handoffs To Remaining Workflows

## Status

Done

## Objective

Add explicit `Workflow Handoffs` sections to every remaining source workflow so agents can follow adjacent AIOS workflow and skill steps after selecting a primary workflow.

## Background

`TASK-033` added workflow-first routing and handoffs to new-feature, bugfix, and API contract workflows. The remaining workflows should use the same handoff pattern so the router and workflow files stay consistent.

## Scope

### In Scope

- Add handoff guidance to source files in `workflows/` that do not yet have `## Workflow Handoffs`.
- Keep generated `.aios/workflows/` files unchanged.

### Out of Scope

- CLI behavior changes.
- Generated `.aios/` edits.
- Website content changes.

## Acceptance Criteria

- [x] Every `workflows/*.workflow.md` file has a `## Workflow Handoffs` section.
- [x] Handoffs name adjacent workflows and key skills without replacing the primary workflow.
- [x] Generated `.aios/` workflow copies are not changed manually.

## Testing Expectations

- Regression tests: targeted search confirming every workflow has `## Workflow Handoffs`.
- Manual checks: confirm `git diff --name-only -- .aios` is empty.

## Done Summary

- Files changed: `workflows/database-migration.workflow.md`, `workflows/new-project.workflow.md`, `workflows/refactor.workflow.md`, `workflows/release.workflow.md`, `workflows/review.workflow.md`, `workflows/security-review.workflow.md`, `workflows/ui-design.workflow.md`, `docs/tasks/TASK-034-add-handoffs-to-remaining-workflows.md`
- Tests run: targeted check that every `workflows/*.workflow.md` has `## Workflow Handoffs`; `git diff --name-only -- .aios` confirmed no generated `.aios/` workflow changes.
- Acceptance criteria status: All satisfied.
- Risks: Generated `.aios/` copies will remain stale until refreshed by the project update/install flow.
