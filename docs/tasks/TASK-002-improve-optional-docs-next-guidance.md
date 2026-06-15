# TASK-002: Improve Optional Docs Next Guidance

## Objective

Improve `aios next` and validation guidance so optional V2.x docs warnings tell users exactly what to do next.

## Background

`aios validate` currently warns when optional docs such as `docs/security`, `docs/releases`, `docs/database/migrations`, or OpenAPI contracts are missing. The warning is technically correct, but a beginner may not know whether to ignore it or which command creates the missing artifact.

## Scope

### In Scope

- Add clearer optional-doc guidance to `aios next` or validation output.
- Map optional docs to specific commands:
  - `aios create security <name>`
  - `aios create release <name>`
  - `aios create migration <name>`
  - `aios create openapi <name>`
- Keep optional warnings non-blocking.
- Add tests for the output.

### Out of Scope

- Do not make optional V2.x docs required.
- Do not auto-create optional docs.
- Do not change validation pass/fail semantics.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: CLI docs and validation docs if wording changes
- API contract: N/A
- Database: N/A
- CLI: `cli/src/core.ts`, `cli/src/index.ts`, CLI tests

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: N/A
- Related ADR: `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`
- Related architecture section: `docs/architecture/architecture.md#CLI Architecture`
- Blocking tasks: None

## Acceptance Criteria

- [ ] Optional docs warnings include the recommended command or next action.
- [ ] Missing optional docs do not fail validation.
- [ ] `aios next` remains focused on required workflow progress before optional suggestions.
- [ ] Tests cover optional warning guidance.

## Testing Expectations

- Unit tests: optional warning formatting.
- Integration tests: `validate` still passes for valid projects with optional warnings.
- Regression tests: existing `validate` tests continue passing.
- Manual checks: run `aios validate` on the root AIOS repo.

## Implementation Notes

- Prefer a small helper that maps optional path warnings to actionable command text.
- Keep output short enough to scan.
- Avoid recommending all optional docs as mandatory.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
