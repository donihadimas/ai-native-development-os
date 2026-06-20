# TASK-024: Add Templates Folder Catalog Reference

## Status

Done

## Objective

Expand website documentation so every file in the AIOS `templates/` folder is cataloged with purpose, generated output, related command, related skill, and review expectations.

## Background

The existing templates guide lists included templates, but it can be made more complete as a reference. Users should understand which template creates which project artifact, how `aios create ...` relates to templates, and which AI agent skill should fill or review each output.

## Scope

### In Scope

- Create a new reference page or expand the existing templates page.
- Document each current file:
  - `vision.template.md`
  - `prd.template.md`
  - `design.template.md`
  - `architecture.template.md`
  - `adr.template.md`
  - `task.template.md`
  - `implementation-plan.template.md`
  - `review-report.template.md`
  - `test-plan.template.md`
  - `openapi.template.yaml`
  - `migration-plan.template.md`
  - `security-review-report.template.md`
  - `release-note.template.md`
  - `changelog.template.md`
  - `README.md`
- For each template, include:
  - purpose
  - generated location or typical output
  - related `aios create` command, if any
  - related skill
  - when the user should review it
- Explain that templates shape output; they do not decide product or architecture by themselves.
- Add the page to the sidebar if implemented as a new reference page.

### Out of Scope

- Do not rewrite template source files.
- Do not add new template types.
- Do not change `aios create` behavior.
- Do not duplicate complete template bodies.

## Affected Areas

- Frontend: `website/src/content/docs/guides/templates.md` or `website/src/content/docs/reference/`, `website/astro.config.mjs`
- Backend: N/A
- Shared docs: Website documentation only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `website/DESIGN.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: TASK-011 and TASK-012 are recommended for cross-links.

## Acceptance Criteria

- [x] Every current file in `templates/` is listed and explained.
- [x] Each template entry includes purpose, typical output location, related CLI command if any, related skill, and review expectation.
- [x] The page explains how templates differ from prompts, skills, and workflows.
- [x] The page links to command guide, skills, and AI agent simulation.
- [x] The page remains scannable and does not duplicate full template bodies.
- [x] The page is reachable from the sidebar or existing Templates guide.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Compare the catalog against `rg --files templates` and confirm no template file is missing.

## Implementation Notes

- Recommended filename if separate: `website/src/content/docs/reference/templates-folder.md`.
- If expanding `guides/templates.md`, add a concise catalog section and preserve the guide's existing task-oriented explanation.

## Done Summary

- Files changed: `website/src/content/docs/reference/templates-folder.md` (new), `website/src/content/docs/guides/templates.md` (added links), `website/astro.config.mjs` (sidebar)
- Tests run: `npm run build` (Starlight build successful, 22 pages generated)
- Acceptance criteria status: All 6 criteria met.
- Risks: None known.
