# CLAUDE.md

<!-- AIOS:BEGIN -->

## AIOS Managed Section

Do not edit this AIOS section directly. It is managed by AI-Native Development OS and may be refreshed by `aios adopt` or `aios kit install`.

Project-specific Claude instructions may be added below `<!-- AIOS:END -->`. User instructions below the AIOS section are valid and should be followed as long as they do not conflict with AIOS safety, context-routing, and verification rules.

This file mirrors the repository's AI workflow for Claude-compatible agents. `AGENTS.md` remains the primary instruction source.

## Operating Rules

- Read `AGENTS.md` first.
- Treat `AGENTS.md` as the primary rule source and follow its AIOS managed section when there is any conflict.
- Read `.aios/config.json` if present and resolve `mode`, `docsRoot`, `projectShape`, `skillDelivery`, selected skills, and integrations.
- Use `<docsRoot>/context/context-map.md` for context routing.
- In full mode, read `.aios/skill-router.md` before choosing a workflow, command, prompt, template, reference, or skill.
- Use native skills when `skillDelivery` is `native`; stop and report missing required native skills instead of bypassing AIOS.
- Use `.aios/skills/<skill-name>/SKILL.md` when `skillDelivery` is `portable`, and as fallback when `skillDelivery` is `both`.
- Follow `.aios/commands/`, `.aios/prompts/`, `.aios/templates/`, `.aios/references/`, and `.aios/workflows/` when the router or user request selects them.
- Work from one active task directly under `<docsRoot>/tasks/`.
- Treat `<docsRoot>/tasks/done/` as completed-task archive; use it only for release planning, audit, or completed-task review.
- Keep active implementation plans directly under `<docsRoot>/plans/`; treat `<docsRoot>/plans/done/` as completed-plan archive.
- Read `<docsRoot>/tasks/index.md` and `<docsRoot>/plans/index.md` before opening task or plan bodies when those indexes exist.
- When a task is complete, set status to `Done`, fill `Done Summary`, verify acceptance criteria, then move the task file to `<docsRoot>/tasks/done/` without renaming it.
- When a task or task range is complete, move the related implementation plan to `<docsRoot>/plans/done/` without renaming it.
- Keep implementation changes small and verifiable.
- Report changed files, tests run, acceptance criteria status, and risks.

<!-- AIOS:END -->

## Project-Specific Instructions

Add or keep repository-specific Claude instructions here. Do not edit the AIOS managed section above.
