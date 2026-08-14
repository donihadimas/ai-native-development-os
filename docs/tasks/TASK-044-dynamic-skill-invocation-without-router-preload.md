# TASK-044: Dynamic Skill Invocation Without Router Preload

## Status

Done

## Objective

Refactor skill routing so that agents load skills on-demand when invoked or referenced by a task, rather than mandatorily pre-loading `skill-router.md` on every single agent interaction.

## Background

Mandatory reading of `skill-router.md` on every turn in full mode consumes ~1,000 input tokens per step. Dynamic skill loading allows agents to inspect only the specific skill required for the current lifecycle step, significantly reducing token consumption.

## Scope

### In Scope

- Update agent routing guidance in `AGENTS.md` and workflows to trigger skills based on task context or explicit user command.
- Make `skill-router.md` a lightweight reference index rather than a mandatory pre-load requirement.
- Ensure CLI templates and validators reflect this dynamic resolution pattern.

### Out of Scope

- Skill consolidation (handled in TASK-040).

## Affected Areas

- Shared docs: `AGENTS.md`, `.aios/skill-router.md`, `workflows/`
- CLI: Context routing helpers.

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 1 / P1)
- Blocking tasks: TASK-040, TASK-041

## Acceptance Criteria

- [x] `AGENTS.md` no longer requires reading `skill-router.md` before every action.
- [x] Task and workflow descriptions explicitly declare their required skill (e.g. `Skill: task` or `Skill: verify`).
- [x] Token overhead per turn drops by ~1,000 tokens.

## Testing Expectations

- Manual checks: Validate token load in agent prompt traces.
- Regression tests: Ensure agent still correctly discovers needed skills.

## Done Summary

- Files changed: `AGENTS.md`, `CLAUDE.md`, `project-skeleton/AGENTS.md`, `project-skeleton/CLAUDE.md`, `skill-router.md`.
- Tests run: `npm test` in `cli/` (87 passing tests).
- Acceptance criteria status: All criteria satisfied.
- Risks: None.
