# TASK-040: Consolidate 16 Skills into 4 Core Lifecycle Skills

## Status

Done

## Objective

Consolidate the 16 fragmented and prose-heavy skill directories into 4 cohesive lifecycle skills (`spec`, `arch`, `task`, `verify`) and eliminate redundant skills (`backend-api-development` and `context-management`).

## Background

The audit in `review.md` showed that 16 skills cause high token duplication and circular context loading. Merging skills into 4 core lifecycle pillars reduces meta-context tokens by >60% while clarifying agent roles.

## Scope

### In Scope

- Merge `product-discovery` and `prd-generator` into `spec`.
- Merge `architecture-design` and `adr-generator` into `arch`.
- Merge `task-breakdown` and `implementation-planner` into `task`.
- Merge `testing`, `code-review`, and `security-review` into `verify`.
- Remove `backend-api-development` and `context-management` skills.
- Keep domain-optional skills (`api-contract-design`, `database-migration`, `ui-ux-design`, `release-management`) lean and optional.
- Update `.agents/skills/`, `.aios/skills/`, and `skills/`.

### Out of Scope

- CLI verification runner implementation (handled in TASK-043).

## Affected Areas

- Shared docs: `.aios/skills/`, `.agents/skills/`, `skills/`
- CLI: Skill bundler and validator in `cli/src/`

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 0 / P0)
- Related architecture section: `docs/architecture/architecture.md`
- Blocking tasks: None

## Acceptance Criteria

- [x] 4 core skills (`spec`, `arch`, `task`, `verify`) exist with crisp, non-repetitive instructions.
- [x] Redundant skills (`backend-api-development`, `context-management`) are removed.
- [x] `skill-router.md` is updated to map to the 4 core skills.
- [x] CLI tests and skill validation tests pass.

## Testing Expectations

- Unit tests: `npm test` in `cli/`
- Manual checks: Check token sizes of new consolidated skill files.

## Done Summary

- Files changed: `skills/spec/SKILL.md`, `skills/arch/SKILL.md`, `skills/task/SKILL.md`, `skills/verify/SKILL.md`, `.agents/skills/*`, `skill-router.md`, `.aios/skill-router.md`, `cli/src/core.ts`, `cli/src/index.ts`, `cli/test/commands.test.ts`.
- Tests run: `npm test` in `cli/` (79 passing tests).
- Acceptance criteria status: All criteria satisfied.
- Risks: None.
