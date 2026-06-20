# TASK-003: Add Full and Lite Mode Sections to Workflows

## Objective

Make core workflow documents easier for beginners by adding explicit `Full Mode Flow`, `Lite Mode Flow`, and `After This Flow` sections.

## Background

Workflow docs currently explain mode routing, but users and agents still need to infer how full mode differs from lite mode. Explicit sections will make the workflow easier to follow after setup, especially for new feature, bugfix, review, refactor, release, security, API, migration, and UI design flows.

## Scope

### In Scope

- Update core workflow files with explicit full/lite flow sections.
- Keep existing process steps but make mode-specific behavior clearer.
- Ensure every workflow ends with a next action.
- Keep wording concise.

### Out of Scope

- Do not change CLI behavior.
- Do not add new workflow types.
- Do not duplicate entire skill instructions inside workflows.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: `workflows/*.workflow.md`, possibly `workflows/README.md`
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: N/A
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: None

## Acceptance Criteria

- [x] `new-feature.workflow.md` includes clear full and lite mode flows.
- [x] Other core workflows are updated consistently where useful.
- [x] Each updated workflow includes a clear next action after completion.
- [x] No workflow tells lite mode to assume `.aios/` workflow files exist.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: `git diff --check`
- Manual checks: read workflows for duplicated or contradictory steps.

## Implementation Notes

- Start with `new-feature.workflow.md`, then apply the same pattern to other workflows.
- Keep sections short. Use routing references instead of copying full skill content.

## Done Summary

- Files changed: `workflows/new-feature.workflow.md`, `workflows/bugfix.workflow.md`, `workflows/review.workflow.md`, `workflows/refactor.workflow.md`, `workflows/release.workflow.md`, `workflows/api-contract.workflow.md`, `workflows/database-migration.workflow.md`, `workflows/security-review.workflow.md`, `workflows/ui-design.workflow.md`, `workflows/new-project.workflow.md`, `workflows/README.md`
- Tests run: `git diff --check -- workflows` (no whitespace errors)
- Acceptance criteria status: All 4 criteria met
- Risks: None. Documentation-only change, no runtime behavior affected.
