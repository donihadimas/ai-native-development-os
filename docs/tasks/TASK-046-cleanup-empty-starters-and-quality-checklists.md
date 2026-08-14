# TASK-046: Clean Up Markdown-Only Starters and Repetitive Quality Checklists

## Status

Planned

## Objective

Remove markdown-only starter skeletons that lack code implementations and strip redundant, repetitive "Quality Checklists" across remaining skills, templates, and references.

## Background

The audit in `review.md` revealed that `starters/` containing only documentation folders added maintenance friction without real scaffolding value, and verbose checklists duplicated across skill files consumed significant context without improving agent compliance.

## Scope

### In Scope

- Clean up or consolidate `starters/` directories to remove doc-only skeletons.
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

- [ ] Unusable doc-only starters are removed from the repository.
- [ ] Boilerplate checklists in skills and references are pruned to concise acceptance bullet points.
- [ ] CLI tests and starter prompts remain consistent.

## Testing Expectations

- Unit tests: `npm test` in `cli/`
- Manual checks: Word count and clarity audit of updated templates.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
