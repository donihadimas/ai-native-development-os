# TASK-019: Add Commands Folder Catalog Reference

## Status

Done

## Objective

Add a website reference page that catalogs every file in the AIOS `commands/` folder and explains what each portable command prompt is for.

## Background

The CLI command guide explains terminal commands like `aios init` and `aios create task`, but AIOS also has a repository/workflow folder named `commands/`. Those files are portable command prompts for AI agents, not terminal commands. Users need a clear catalog so they understand the difference and know when to use each command prompt.

## Scope

### In Scope

- Create a new website reference page for the `commands/` folder.
- Explain that `commands/` contains portable prompt shortcuts for common AIOS workflows.
- Document each current file:
  - `create-adr.md`
  - `design-api.md`
  - `design-ui.md`
  - `discover-product.md`
  - `generate-architecture.md`
  - `generate-prd.md`
  - `generate-tasks.md`
  - `generate-tests.md`
  - `implement-task.md`
  - `plan-implementation.md`
  - `plan-migration.md`
  - `plan-release.md`
  - `review-code.md`
  - `review-security.md`
- For each file, include:
  - purpose
  - when to use it
  - expected source context
  - expected output
  - related skill or workflow
- Explain how these command prompts relate to `aios prompt list` and `aios prompt show`.
- Add the page to the Starlight sidebar under Reference or Core Concepts.

### Out of Scope

- Do not change the prompt files in `commands/`.
- Do not change `aios prompt` CLI behavior.
- Do not duplicate full file contents unless a short excerpt is needed.
- Do not describe `commands/` files as executable shell commands.

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
- Related architecture section: `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: TASK-011 is recommended so this page can be linked from the building blocks guide.

## Acceptance Criteria

- [x] Every current file in `commands/` is listed and explained.
- [x] The page clearly distinguishes AIOS command prompt files from terminal CLI commands.
- [x] Each command prompt entry includes purpose, when to use, expected context, expected output, and related skill/workflow.
- [x] The page links to CLI command docs where `aios prompt list/show` is relevant.
- [x] The page is linked from the sidebar and from the building blocks guide.
- [x] The documentation remains accurate if the user is using full mode with `.aios/commands/`.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Compare the catalog against `rg --files commands` and confirm no command prompt file is missing.

## Implementation Notes

- Recommended filename: `website/src/content/docs/reference/commands-folder.md`.
- Use a table for compact scanning, then short sections only where extra explanation is useful.
- Use "command prompt" wording consistently to avoid confusion with CLI commands.

## Done Summary

- Files changed: `website/src/content/docs/reference/commands-folder.md` (new), `website/astro.config.mjs` (sidebar), `website/src/content/docs/guides/building-blocks.md` (added link)
- Tests run: `npm run build` (Starlight build successful, 17 pages generated)
- Acceptance criteria status: All 6 criteria met.
- Risks: None known.
