# TASK-025: Expand Skills Folder Catalog Reference

## Status

Planned

## Objective

Expand website documentation so every AIOS skill is documented as a catalog entry with purpose, inputs, outputs, clarification gate behavior, related templates, and related workflows.

## Background

The current Skills page lists available skills and their general use. For a complete documentation site, users also need to understand what each `skills/<name>/SKILL.md` file expects, what it produces, when it should ask clarification questions, and how it fits with prompts, templates, commands, and workflows.

## Scope

### In Scope

- Expand `website/src/content/docs/guides/skills.md` or create a dedicated skills reference page.
- Document each current skill:
  - `product-discovery`
  - `prd-generator`
  - `architecture-design`
  - `ui-ux-design`
  - `adr-generator`
  - `task-breakdown`
  - `implementation-planner`
  - `task-implementation`
  - `backend-api-development`
  - `api-contract-design`
  - `database-migration`
  - `testing`
  - `code-review`
  - `security-review`
  - `release-management`
  - `context-management`
- For each skill, include:
  - purpose
  - when to use it
  - expected inputs
  - expected outputs
  - related templates
  - related workflows
  - related prompts or command prompts, when applicable
  - review or clarification gate notes
  - one short example user prompt that invokes the skill correctly
- Group skills by lifecycle stage:
  - discovery and product planning
  - architecture and decisions
  - design, API, backend, and data planning
  - task planning and implementation
  - testing, review, security, and release
- Explain native versus portable skill locations.
- Add sidebar entry if implemented as a separate reference page.

### Out of Scope

- Do not rewrite skill source files.
- Do not add new skills.
- Do not duplicate full `SKILL.md` contents.
- Do not imply that skills remove the need for human review.

## Affected Areas

- Frontend: `website/src/content/docs/guides/skills.md` or `website/src/content/docs/reference/`, `website/astro.config.mjs`
- Backend: N/A
- Shared docs: Website documentation only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `website/DESIGN.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: `docs/architecture/architecture.md#Agent Instruction Strategy`, `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: TASK-011, TASK-020, TASK-023, and TASK-024 are recommended for cross-links.

## Acceptance Criteria

- [ ] Every current skill folder is listed and explained.
- [ ] Each skill entry includes purpose, when to use, inputs, outputs, related templates, related workflows, related prompts/command prompts where applicable, and clarification/review notes.
- [ ] Each skill entry includes one short example prompt showing how a user should ask an AI agent to use that skill.
- [ ] Skills are grouped by lifecycle stage so users can understand where each skill belongs in the AIOS workflow.
- [ ] The page explains which skills are generator/planning skills that may ask clarification questions before writing final artifacts.
- [ ] The page explains which skills are execution/review skills that require an active task, diff, validation evidence, or review target.
- [ ] The page explains native and portable skill delivery locations.
- [ ] The page links skills to relevant prompts, templates, workflows, and AI agent simulation.
- [ ] The page remains scannable and does not duplicate complete `SKILL.md` files.
- [ ] The page is discoverable from the sidebar or existing Skills guide.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Compare the catalog against `rg --files skills -g 'SKILL.md'` and confirm no skill is missing.

## Implementation Notes

- Recommended filename if separate: `website/src/content/docs/reference/skills-folder.md`.
- The existing `guides/skills.md` can remain the practical guide, while a separate reference page can provide the full catalog.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
