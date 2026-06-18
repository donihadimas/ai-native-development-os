# TASK-017: Add CLI Usage Simulation Guide

## Status

Done

## Objective

Add a website guide that simulates how a user uses the AIOS CLI from setup through document stub generation, while making clear that the CLI only creates, validates, and routes workflow files.

## Background

AIOS has two different usage surfaces: the `aios` CLI and the AI coding agent. The CLI prepares the workspace, creates document stubs, installs workflow assets, validates structure, and recommends next steps. It does not write PRDs, fill templates, implement app code, or make architecture decisions. The website needs a dedicated CLI simulation so users understand exactly what happens in terminal before they ask an agent to do deeper work.

## Scope

### In Scope

- Create a new guide under `website/src/content/docs/guides/`.
- Show a complete CLI-only simulation for a new project:
  - install AIOS
  - run guided setup or `aios init`
  - run `aios validate`
  - run `aios next`
  - create document stubs with `aios create ...`
- Show a CLI-only simulation for adopting an existing project:
  - run `aios adopt`
  - validate
  - inspect next step
- Explain what files the CLI creates or updates at each step.
- Explain what the CLI does not do:
  - does not fill PRD content
  - does not run Codex or another agent
  - does not generate application code
  - does not install app dependencies
  - does not apply migrations or publish releases
- Link to the command decision guide, CLI reference, project structure, and AI agent simulation guide.
- Add the page to the Starlight sidebar.

### Out of Scope

- Do not document a fictional CLI workflow or unreleased command.
- Do not make the CLI look like an autonomous app generator.
- Do not include framework-specific app setup.
- Do not change CLI source code or CLI tests.
- Do not merge this guide with AI agent prompting examples.

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
- Related architecture section: `docs/architecture/architecture.md#CLI Architecture`, `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: TASK-012 is recommended so this page can link to the command decision guide.

## Acceptance Criteria

- [x] The guide clearly separates CLI responsibilities from AI agent responsibilities.
- [x] The guide includes a realistic new-project CLI simulation using current commands.
- [x] The guide includes a realistic existing-project adoption CLI simulation.
- [x] The guide explains the files or folders created by the CLI, including `docs/`, `.aios/`, and optional native agent folders.
- [x] The guide explains that `aios create ...` creates stubs for the agent or user to fill later.
- [x] The guide explains that `aios next` is read-only guidance.
- [x] The guide links users to the AI agent guide as the next step after CLI setup.
- [x] The guide is discoverable from the sidebar.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Read the guide as a beginner and confirm every command has a clear purpose and boundary.

## Implementation Notes

- Recommended filename: `website/src/content/docs/guides/cli-simulation.md`.
- Prefer a transcript style:
  - "Run this command"
  - "What AIOS writes"
  - "What to do next"
- Keep commands short and copyable.
- Use placeholders like `demo-project` consistently.
- Avoid broken emoji or special symbols until TASK-015 is complete.

## Done Summary

- Files changed: `website/src/content/docs/guides/cli-simulation.md` (new), `website/astro.config.mjs` (sidebar)
- Tests run: `npm run build` (Starlight build successful, 15 pages generated)
- Acceptance criteria status: All 8 criteria met.
- Risks: None known.
