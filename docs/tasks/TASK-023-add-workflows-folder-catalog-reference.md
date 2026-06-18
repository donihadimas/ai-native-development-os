# TASK-023: Add Workflows Folder Catalog Reference

## Status

Planned

## Objective

Add a website reference page that catalogs every file in the AIOS `workflows/` folder and explains when to follow each workflow.

## Background

Workflows connect skills, templates, references, and project docs into end-to-end sequences. The current recommended workflow page covers the common path, but it does not catalog every workflow file or explain which workflow to choose for a new project, feature, bugfix, refactor, review, release, migration, API contract, security review, or UI design.

## Scope

### In Scope

- Create a new website reference page for the `workflows/` folder.
- Explain that workflows are multi-step development sequences.
- Document each current file:
  - `api-contract.workflow.md`
  - `bugfix.workflow.md`
  - `database-migration.workflow.md`
  - `new-feature.workflow.md`
  - `new-project.workflow.md`
  - `refactor.workflow.md`
  - `release.workflow.md`
  - `review.workflow.md`
  - `security-review.workflow.md`
  - `ui-design.workflow.md`
  - `README.md`
- For each workflow, include:
  - purpose
  - when to use
  - prerequisite docs
  - skills involved
  - expected outputs
  - next recommended action
- Explain full mode versus lite mode behavior at workflow level.
- Add the page to the sidebar.

### Out of Scope

- Do not rewrite workflow source files.
- Do not replace the existing recommended workflow guide.
- Do not make workflows stack-specific.
- Do not instruct users to run all workflows for every feature.

## Affected Areas

- Frontend: `website/src/content/docs/reference/`, `website/astro.config.mjs`
- Backend: N/A
- Shared docs: Website reference docs only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `website/DESIGN.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: TASK-011 and TASK-018 are recommended for cross-links.

## Acceptance Criteria

- [ ] Every current workflow file is listed and explained.
- [ ] The page helps users choose the right workflow for a project situation.
- [ ] Each workflow entry includes purpose, when to use, prerequisites, involved skills, expected outputs, and next action.
- [ ] The page explains full mode and lite mode differences without duplicating all workflow text.
- [ ] The page links to the recommended workflow guide and AI agent simulation.
- [ ] The page is discoverable from the sidebar.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Compare the catalog against `rg --files workflows` and confirm no workflow file is missing.

## Implementation Notes

- Recommended filename: `website/src/content/docs/reference/workflows-folder.md`.
- Keep the current `website/src/content/docs/guides/workflow.md` as a guided path, and use this new page as a full catalog.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
