# TASK-005: Add AIOS Repair Command

## Objective

Add a repair command that restores missing AIOS workflow assets, native skills, and integration rules according to `.aios/config.json`.

## Background

During local adoption, native skill folders existed but were incomplete. A dedicated repair command would make it easier for users to recover from partial setup, deleted files, or older AIOS behavior without rerunning the whole wizard.

## Scope

### In Scope

- Add `aios repair [project-path]`.
- Repair missing `.aios/` kit assets in full mode.
- Repair native skills based on `selectedAgents`, `selectedSkills`, `agentScope`, and `skillDelivery`.
- Repair integration rules for enabled integrations.
- Run or suggest validation after repair.
- Add tests.

### Out of Scope

- Do not overwrite valid existing user-modified files by default.
- Do not auto-install external RTK or Caveman tools.
- Do not repair arbitrary app code or project docs content.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: CLI docs
- API contract: N/A
- Database: N/A
- CLI: `cli/src/index.ts`, `cli/src/core.ts`, tests

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: N/A
- Related ADR: `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`
- Related architecture section: `docs/architecture/architecture.md#CLI Architecture`
- Blocking tasks: None

## Acceptance Criteria

- [ ] `aios repair [project-path]` is available in help.
- [ ] Repair restores missing `.aios` kit files for full mode.
- [ ] Repair restores incomplete native skill folders.
- [ ] Repair restores enabled integration rule files.
- [ ] Repair output reports created, skipped, and next validation step.
- [ ] Tests cover repair behavior.

## Testing Expectations

- Unit tests: core repair helpers if introduced.
- Integration tests: command repairs intentionally missing files in temp project.
- Regression tests: existing `kit install`, `agent install`, and `integration repair` tests continue passing.
- Manual checks: run `aios repair` on a project with missing native skill files.

## Implementation Notes

- Reuse existing `installAiosKit`, `installAgentSkills`, and integration repair logic.
- Keep default behavior non-destructive.
- Consider `--dry-run` only if it stays small; otherwise defer.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
