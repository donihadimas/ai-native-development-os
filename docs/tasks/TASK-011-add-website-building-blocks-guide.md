# TASK-011: Add Website Building Blocks Guide

## Status

Done

## Objective

Add a clear documentation page that explains the role of each AIOS building block: CLI commands, prompts, skills, templates, workflows, references, `.aios/`, `docs/`, and native agent folders.

## Background

The website already has separate pages for getting started, skills, templates, workflow, CLI commands, integrations, and project structure. A new user can still miss the relationship between those pieces. The documentation needs one beginner-friendly map that answers "what is this for?" before users dive into references.

## Scope

### In Scope

- Create a new Starlight docs page under `website/src/content/docs/guides/`.
- Explain AIOS as a file-based workflow layer for AI coding agents.
- Add a comparison table for:
  - CLI commands
  - command prompts in `.aios/commands/`
  - numbered prompts in `.aios/prompts/`
  - skills
  - templates
  - workflows
  - references
  - project docs in `docs/`
  - native agent folders
- Include a "which one should I use?" section for common user intents.
- Link to existing pages: Getting Started, CLI Commands, Skills, Templates, Workflow, Project Structure, and AI Agents.
- Link to folder catalog reference pages for commands, prompts, integrations, references, templates, workflows, and skills when those pages exist.
- Add the page to the Starlight sidebar in `website/astro.config.mjs`.

### Out of Scope

- Do not redesign the landing page in this task.
- Do not change CLI behavior or generated project assets.
- Do not rewrite all existing guide pages.
- Do not introduce new dependencies.

## Affected Areas

- Frontend: `website/src/content/docs/guides/`, `website/astro.config.mjs`
- Backend: N/A
- Shared docs: Website documentation only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `website/DESIGN.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: `docs/architecture/architecture.md#Repository Architecture`, `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: None

## Acceptance Criteria

- [x] A new guide page explains the purpose of every major AIOS artifact type in plain language.
- [x] The page distinguishes `docs/` as project context from `.aios/` as the local workflow kit.
- [x] The page distinguishes CLI commands from prompts and skills.
- [x] The page includes a practical "when you want X, use Y" table.
- [x] The page links to the existing detailed reference pages and folder catalog pages instead of duplicating all reference content.
- [x] The Starlight sidebar exposes the page in a beginner-friendly location.
- [x] The page does not describe AIOS as an app framework, SaaS dashboard, autonomous agent, or code generator.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/` to confirm Starlight content and sidebar links compile.
- Manual checks: Open the page in local dev server and confirm links, headings, tables, and mobile wrapping are readable.

## Implementation Notes

- Recommended filename: `website/src/content/docs/guides/building-blocks.md`.
- Keep tone beginner-friendly but technical.
- Use short examples, such as `aios create task`, `product-discovery`, `prd.template.md`, and `new-feature.workflow.md`.
- Prefer ASCII text over emoji until the existing encoding issues are cleaned up.

## Done Summary

- Files changed: `website/src/content/docs/guides/building-blocks.md`, `website/astro.config.mjs`
- Tests run: `npm run build` (Starlight build successful, 12 pages generated)
- Acceptance criteria status: All 7 criteria met.
- Risks: None known.
