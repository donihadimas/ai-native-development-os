# TASK-006: Improve Adopt Summary Output

## Objective

Make `aios adopt` output clearer about project shape, expected app folders, preserved files, removed placeholders, native skill repair, and next validation step.

## Background

Adopt currently reports counts such as created, skipped, kit created, and native skills created. When users choose `docs` shape or native-only skills, the summary can be hard to interpret. A clearer summary will reduce confusion after setup.

## Scope

### In Scope

- Improve adopt output wording.
- Include selected shape and expected app folders.
- Report generated placeholder folders removed by shape logic.
- Distinguish native skills created, repaired, and skipped if feasible.
- Keep output concise.

### Out of Scope

- Do not change adopt filesystem behavior beyond summary reporting.
- Do not add interactive prompts.
- Do not expose internal implementation details.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: CLI docs if output examples are updated
- API contract: N/A
- Database: N/A
- CLI: `cli/src/index.ts`, tests

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: N/A
- Related ADR: `docs/adr/ADR-003-configurable-project-shapes-and-modes.md`
- Related architecture section: `docs/architecture/architecture.md#Project Shape Strategy`
- Blocking tasks: None

## Acceptance Criteria

- [ ] Adopt output includes project shape.
- [ ] Adopt output includes expected app placeholders for the selected shape.
- [ ] Docs shape reports no app placeholders expected.
- [ ] Removed placeholder folders are reported when present.
- [ ] Tests cover docs shape output.

## Testing Expectations

- Unit tests: formatting helper if introduced.
- Integration tests: adopt command output for docs shape.
- Regression tests: existing adopt tests continue passing.
- Manual checks: run adopt in a temp folder for `docs` and `fullstack` shapes.

## Implementation Notes

- Reuse `PROJECT_SHAPE_PATHS`.
- Keep counts but add human-readable lines.
- Avoid reporting skipped files as scary errors.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
