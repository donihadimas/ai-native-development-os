# TASK-007: Normalize Root README Encoding

## Objective

Fix mojibake and visual encoding artifacts in the root `README.md` so the public documentation looks polished and readable.

## Background

The root README contains corrupted emoji/tree characters such as `ðŸ...` and garbled arrows. This reduces perceived quality and can make package documentation harder to scan on npm or GitHub.

## Scope

### In Scope

- Replace corrupted headings, arrows, and tree graphics with valid UTF-8 or ASCII.
- Prefer ASCII where it keeps docs stable across terminals.
- Preserve README content and meaning.
- Check generated package README if needed.

### Out of Scope

- Do not rewrite the whole README content.
- Do not change product scope.
- Do not update website visual design.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: `README.md`, maybe `cli/README.md` if similar artifacts are found
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: N/A
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: N/A
- Blocking tasks: None

## Acceptance Criteria

- [ ] Root README no longer contains mojibake sequences such as `ðŸ`.
- [ ] Headings and tree diagrams render cleanly in plain Markdown.
- [ ] README content is otherwise preserved.
- [ ] `git diff --check` passes.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: `rg "ðŸ|â†|â”" README.md`
- Manual checks: visually scan README.

## Implementation Notes

- Use ASCII headings if necessary.
- Replace tree diagrams with simple ASCII tree or bullet list.
- Avoid large unrelated rewrites.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
