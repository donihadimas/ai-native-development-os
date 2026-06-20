# TASK-022: Add References Folder Catalog Reference

## Status

Done

## Objective

Add a website reference page that catalogs every file in the AIOS `references/` folder and explains what stable guidance each reference provides to agents.

## Background

References are a core AIOS layer, but the website currently does not explain each reference file. Users need to know when an agent should read `context-principles.md`, `testing-principles.md`, `security-principles.md`, `workflow-modes.md`, and other reference files.

## Scope

### In Scope

- Create a new website reference page for the `references/` folder.
- Explain that references are stable engineering principles, not task-specific requirements.
- Document each current file:
  - `api-standards.md`
  - `architecture-principles.md`
  - `backend-api-standards.md`
  - `backend-principles.md`
  - `context-budget.md`
  - `context-principles.md`
  - `database-standards.md`
  - `engineering-principles.md`
  - `frontend-principles.md`
  - `response-style.md`
  - `security-principles.md`
  - `testing-principles.md`
  - `workflow-modes.md`
  - `README.md`
- For each reference, include:
  - purpose
  - when an agent should read it
  - related skills/workflows
  - what decisions remain human-owned
- Add the page to the sidebar.

### Out of Scope

- Do not rewrite the reference source files.
- Do not add stack-specific implementation guidance.
- Do not duplicate entire reference documents.
- Do not make references override task acceptance criteria or ADRs.

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
- Blocking tasks: TASK-011 is recommended for cross-links.

## Acceptance Criteria

- [x] Every current file in `references/` is listed and explained.
- [x] The page explains when references should be read versus when task/PRD/ADR docs should be read.
- [x] Each reference entry includes purpose, when to use, related skills/workflows, and human-owned decisions.
- [x] The page warns against dumping every reference into context by default.
- [x] The page links to building blocks and AI agent simulation guides.
- [x] The page is discoverable from the sidebar.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Compare the catalog against `rg --files references` and confirm no reference file is missing.

## Implementation Notes

- Recommended filename: `website/src/content/docs/reference/references-folder.md`.
- Keep descriptions short and operational.
- Emphasize context routing: only read relevant references for the current task.

## Done Summary

- Files changed: `website/src/content/docs/reference/references-folder.md` (new), `website/astro.config.mjs` (sidebar)
- Tests run: `npm run build` (Starlight build successful, 20 pages generated)
- Acceptance criteria status: All 6 criteria met.
- Risks: None known.
