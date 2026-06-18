# TASK-020: Add Prompts Folder Catalog Reference

## Status

Done

## Objective

Add a website reference page that catalogs every numbered workflow prompt in the AIOS `prompts/` folder and explains how each prompt routes the agent.

## Background

The `prompts/` folder contains numbered workflow prompts such as product discovery, PRD generation, architecture generation, ADR creation, task generation, implementation, review, testing, API design, migration planning, security review, release planning, and UI/UX design. The website should explain what each prompt does and how prompts differ from skills, templates, workflows, and command prompts.

## Scope

### In Scope

- Create a new website reference page for the `prompts/` folder.
- Explain that prompts are thin wrappers that route the agent to the right context, skill, and template.
- Document each current file:
  - `00-discover-product.md`
  - `01-generate-prd.md`
  - `02-generate-architecture.md`
  - `03-generate-adr.md`
  - `04-generate-tasks.md`
  - `05-plan-implementation.md`
  - `06-implement-task.md`
  - `07-review-code.md`
  - `08-generate-tests.md`
  - `09-design-api-contract.md`
  - `10-plan-database-migration.md`
  - `11-review-security.md`
  - `12-plan-release.md`
  - `13-design-ui-ux.md`
- For each prompt, include:
  - lifecycle stage
  - purpose
  - prerequisite docs
  - output artifact
  - related skill/template
  - review gate, when applicable
- Add the page to the sidebar.

### Out of Scope

- Do not rewrite root prompt files.
- Do not add new prompt files.
- Do not turn the reference into a long tutorial; link to simulation guides for walkthroughs.
- Do not duplicate full prompt text.

## Affected Areas

- Frontend: `website/src/content/docs/reference/`, `website/astro.config.mjs`
- Backend: N/A
- Shared docs: Website reference docs only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`
- Related design: `website/DESIGN.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: `docs/architecture/architecture.md#Workflow Kit Strategy`, `docs/architecture/architecture.md#Agent Instruction Strategy`
- Blocking tasks: TASK-011 and TASK-018 are recommended for cross-links.

## Acceptance Criteria

- [x] Every current file in `prompts/` is listed and explained.
- [x] The page clearly explains prompts as routing wrappers, not the full operating procedure.
- [x] Each prompt entry includes lifecycle stage, purpose, prerequisite docs, output artifact, related skill/template, and review gate when applicable.
- [x] The page distinguishes `prompts/` from `commands/`.
- [x] The page links to AI agent simulation and relevant skills/templates pages.
- [x] The page is discoverable from the sidebar.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Compare the catalog against `rg --files prompts` and confirm no numbered prompt is missing.

## Implementation Notes

- Recommended filename: `website/src/content/docs/reference/prompts-folder.md`.
- Keep the table sorted by prompt number.
- Mention that full mode copies prompts into `.aios/prompts/`.

## Done Summary

- Files changed: `website/src/content/docs/reference/prompts-folder.md` (new), `website/astro.config.mjs` (sidebar)
- Tests run: `npm run build` (Starlight build successful, 18 pages generated)
- Acceptance criteria status: All 6 criteria met.
- Risks: None known.
