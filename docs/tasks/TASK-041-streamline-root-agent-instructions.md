# TASK-041: Streamline System Prompt (AGENTS.md and CLAUDE.md to <40 lines)

## Status

Done

## Objective

Refactor `AGENTS.md` and `CLAUDE.md` to be concise, high-signal root instructions (<40 lines) that focus purely on core boundaries and active task execution, cutting baseline system prompt overhead by ~70%.

## Background

Currently `AGENTS.md` spans over 130 lines and prescribes reading multiple router documents and directories on every agent invocation. Reducing this to an ultra-lean format prevents token bloat and context dilution across all agent turns.

## Scope

### In Scope

- Rewrite `AGENTS.md` managed section to under 40 lines.
- Update `CLAUDE.md` to match the same concise standard.
- Update `project-skeleton/AGENTS.md` and `project-skeleton/CLAUDE.md`.
- Ensure CLI `adopt` and `init` inject the new streamlined version.

### Out of Scope

- CLI verification tool (handled in TASK-043).

## Affected Areas

- Shared docs: `AGENTS.md`, `CLAUDE.md`, `project-skeleton/`
- CLI: `cli/src/core.ts` managed section injection logic.

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 0 / P0)
- Blocking tasks: None

## Acceptance Criteria

- [x] `AGENTS.md` managed section is under 40 lines (currently ~20 lines).
- [x] Directives clearly specify: read active task, minimal context routing, test verification, and concise completion format.
- [x] `CLAUDE.md` reflects identical concise guidelines.
- [x] CLI tests verifying managed section injection pass.

## Testing Expectations

- Unit tests: `npm test` in `cli/`
- Manual checks: Word/token count check on `AGENTS.md`.

## Done Summary

- Files changed: `AGENTS.md`, `CLAUDE.md`, `project-skeleton/AGENTS.md`, `project-skeleton/CLAUDE.md`.
- Tests run: `npm test` in `cli/` (79 passing tests).
- Acceptance criteria status: All criteria satisfied.
- Risks: None.
