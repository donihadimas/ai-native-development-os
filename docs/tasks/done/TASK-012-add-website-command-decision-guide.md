# TASK-012: Add Website Command Decision Guide

## Status

Done

## Objective

Add a guide that helps users choose the right `aios` command for their situation before they read the full CLI reference.

## Background

The existing CLI reference lists commands accurately, but it is reference-first. New users need a task-oriented guide that explains which command to run when they want to create, adopt, validate, generate docs, install skills, inspect prompts, or manage integrations.

## Scope

### In Scope

- Create a command decision guide under `website/src/content/docs/guides/`.
- Group commands by user intent:
  - Start a new project
  - Adopt an existing project
  - Validate project setup
  - Ask what to do next
  - Create planning/review documents
  - Install or inspect skills
  - Show portable prompts
  - Manage integrations
- Include short examples for the most common commands.
- Explain safe defaults and destructive boundaries, especially for `adopt`, `validate`, `next`, `kit install`, `agent install`, and integrations.
- Link from the guide to `website/src/content/docs/reference/cli.md`.
- Add the page to the Starlight sidebar.

### Out of Scope

- Do not change the CLI reference into a tutorial.
- Do not change command syntax.
- Do not add generated CLI documentation tooling.
- Do not document unreleased or speculative commands.

## Affected Areas

- Frontend: `website/src/content/docs/guides/`, `website/astro.config.mjs`
- Backend: N/A
- Shared docs: Website documentation only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `website/DESIGN.md`
- Related ADR: `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`
- Related architecture section: `docs/architecture/architecture.md#CLI Architecture`
- Blocking tasks: None

## Acceptance Criteria

- [x] Users can answer "which command should I run?" without reading the full CLI reference first.
- [x] The guide includes separate paths for `aios`, `aios init`, `aios starter`, and `aios adopt`.
- [x] The guide explains that `aios next` is read-only.
- [x] The guide explains that `aios create ...` creates document stubs, not application code.
- [x] The guide explains native versus portable skill installation at command level.
- [x] Integration commands are described as optional and rules-first.
- [x] The full CLI reference remains available and linked for complete syntax.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Verify command snippets are copyable, line lengths are mobile-safe, and links resolve.

## Implementation Notes

- Recommended filename: `website/src/content/docs/guides/command-guide.md`.
- Keep examples short and real:
  - `aios`
  - `aios init demo-project`
  - `aios adopt`
  - `aios validate`
  - `aios next`
  - `aios create task "Implement login API"`
  - `aios agent list`
  - `aios prompt list`
- Include a warning-style note only where the command can overwrite managed workflow assets or install external integration tools with explicit confirmation.

## Done Summary

- Files changed: `website/src/content/docs/guides/command-guide.md` (new), `website/astro.config.mjs` (sidebar)
- Tests run: `npm run build` (Starlight build successful, 13 pages generated)
- Acceptance criteria status: All 7 criteria met.
- Risks: Manual UX/mobile wrapping check pending. Run `npm run dev` and open `/guides/command-guide` to verify links, headings, tables, and mobile layout.
