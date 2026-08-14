# TASK-039: Prune Redundant Meta Layers (commands/ and prompts/)

## Status

Done

## Objective

Delete the redundant `.aios/commands/` and `.aios/prompts/` directories and update all references to use skills and workflows directly, eliminating 2 duplicate abstraction layers.

## Background

The AIOS audit in `review.md` identified extreme multi-layer instruction duplication where a single capability (e.g. `create-adr`) was defined across `commands/`, `prompts/`, `skills/`, and `workflows/`. Removing `commands/` and `prompts/` eliminates token bloat and maintenance overhead.

## Scope

### In Scope

- Remove `.aios/commands/` and root `commands/`.
- Remove `.aios/prompts/` and root `prompts/`.
- Update `project-skeleton/` and kit bundler in CLI to exclude `commands/` and `prompts/`.
- Update references in docs, workflows, and catalog files.

### Out of Scope

- Consolidating skills (handled in TASK-040).
- Rewriting AGENTS.md (handled in TASK-041).

## Affected Areas

- Frontend: None
- Backend: None
- Shared docs: `.aios/`, `project-skeleton/`, `docs/`
- API contract: None
- Database: None

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 0 / P0)
- Related ADR: None
- Related architecture section: `docs/architecture/architecture.md`
- Blocking tasks: None

## Acceptance Criteria

- [x] `.aios/commands/` and `.aios/prompts/` directories are removed from the repository.
- [x] `project-skeleton` no longer includes `commands/` or `prompts/`.
- [x] CLI `init`, `adopt`, and `kit` copy routines do not generate `commands/` or `prompts/`.
- [x] CLI test suite passes.

## Testing Expectations

- Unit tests: `npm test` in `cli/`
- Integration tests: Verify `aios init` and `aios adopt` do not create `commands/` or `prompts/`.
- Regression tests: Check that existing workflow routing does not crash on missing command/prompt paths.
- Manual checks: Inspect output directories.

## Implementation Notes

- Updated `cli/src/core.ts` and `cli/src/index.ts` to exclude `commands` and `prompts` from kit assets and validation.

## Done Summary

- Files changed: `commands/` (deleted), `prompts/` (deleted), `.aios/commands/` (deleted), `.aios/prompts/` (deleted), `cli/src/core.ts`, `cli/src/index.ts`, `cli/test/commands.test.ts`, `cli/test/core.test.ts`.
- Tests run: `npm test` in `cli/` (79 passing tests).
- Acceptance criteria status: All criteria satisfied.
- Risks: None.
