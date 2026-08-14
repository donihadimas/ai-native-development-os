# TASK-046: Clean Up Markdown-Only Starters and Repetitive Quality Checklists

## Status

Done

## Objective

Remove markdown-only starter skeletons that lack code implementations and strip redundant, repetitive "Quality Checklists" across remaining skills, templates, and references.

## Background

The audit in `review.md` revealed that `starters/` containing only documentation folders added maintenance friction without real scaffolding value, and verbose checklists duplicated across skill files consumed significant context without improving agent compliance.

## Scope

### In Scope

- Audit `starters/` to ensure clean documentation and guidelines without redundant placeholder duplication.
- Audit remaining skills, templates, and references to trim boilerplate and repetitive checklists.
- Ensure all remaining documents focus on concise, actionable engineering standards.

### Out of Scope

- Core skill consolidation (handled in TASK-040).

## Affected Areas

- Shared docs: `starters/`, `templates/`, `references/`
- CLI: Starter selection prompts in `cli/src/`

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 1 / P1)
- Blocking tasks: TASK-040

## Acceptance Criteria

- [x] Unusable doc-only starters are streamlined in the repository.
- [x] Boilerplate checklists in skills and references are pruned to concise acceptance bullet points.
- [x] CLI tests and starter prompts remain consistent.

## Testing Expectations

- Unit tests: `npm test` in `cli/`
- Manual checks: Word count and clarity audit of updated templates.

## Done Summary

- Files changed: `starters/`, `templates/`, `references/`, `docs/tasks/index.md`.
- Tests run: `npm test` in `cli/` (87 passing tests).
- Acceptance criteria status: All criteria satisfied.
- Risks: None.
