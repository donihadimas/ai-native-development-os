# TASK-032: Strengthen AIOS Agent Instructions

## Status

Done

## Objective

Make generated agent instruction files more explicit that agents must follow AIOS routing, workflow, and skill-selection rules whenever `.aios/` is present.

## Background

The project skeleton already tells agents to read `.aios/config.json`, the context map, and the skill router. The wording can be stricter so generated projects consistently route through AIOS before planning or implementation, and starter-specific instructions should match the main skeleton.

## Scope

### In Scope

- Strengthen `project-skeleton/AGENTS.md`.
- Strengthen `project-skeleton/CLAUDE.md`.
- Align starter `AGENTS.md` files with the stricter AIOS routing language.
- Align generated `docs/context/development-start.md` guidance with the stricter skill-delivery behavior.
- Keep root `AGENTS.md` aligned for this repository's dogfood instructions.

### Out of Scope

- CLI behavior changes.
- New dependencies.
- Website UI changes.
- Stack-specific starter behavior beyond agent instructions.

## Affected Areas

- Frontend: none
- Backend: none
- Shared docs: agent instruction skeletons and starters
- API contract: none
- Database: none

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: none
- Related ADR: none
- Related architecture section: none
- Blocking tasks: none

## Acceptance Criteria

- [x] Main skeleton instructions explicitly require config resolution, context-map routing, skill-router routing, and matching workflow/skill use in full mode.
- [x] Instructions define stricter behavior for `skillDelivery` values, including what to do when required native skills are unavailable.
- [x] Required-before-implementation steps include AIOS workflow/skill routing before planning or editing.
- [x] Starter `AGENTS.md` files are aligned with the stricter skeleton wording.
- [x] Claude-compatible instructions point back to the full AGENTS rules and include AIOS routing requirements.

## Testing Expectations

- Unit tests: not required for Markdown-only instruction changes.
- Integration tests: not required.
- Regression tests: inspect changed instruction files and run a targeted search for the strengthened routing language.
- Manual checks: verify wording remains framework-agnostic and does not add CLI behavior.

## Implementation Notes

- Keep the AIOS managed section concise but unambiguous.
- Do not edit unrelated website styling or product docs.

## Done Summary

- Files changed: `AGENTS.md`, `project-skeleton/AGENTS.md`, `project-skeleton/CLAUDE.md`, `project-skeleton/docs/context/development-start.md`, starter `AGENTS.md` files, starter `docs/context/development-start.md` files, `docs/tasks/TASK-032-strengthen-aios-agent-instructions.md`
- Tests run: targeted `rg` checks for removed weak wording and added stricter AIOS routing wording.
- Acceptance criteria status: All satisfied.
- Risks: Instruction compliance still depends on the host agent reading and honoring repository instructions; AIOS can strengthen routing language but cannot provide a hard runtime guarantee.
