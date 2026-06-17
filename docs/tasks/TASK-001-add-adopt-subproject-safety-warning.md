# TASK-001: Add Adopt Subproject Safety Warning

## Objective

Add an interactive safety warning when `aios adopt` appears to target a likely subproject instead of the intended repository root.

## Background

During local usage, running `aios` from `cli/` and choosing `Adopt existing project` with path `.` adopted AIOS into the CLI package folder instead of the repository root. This created local AIOS docs and agent files in a subproject. The CLI already preserves files, but the interactive wizard should help users avoid adopting the wrong target when the current directory looks like a package, app, or nested workspace.

## Scope

### In Scope

- Detect likely subproject targets during the interactive adopt flow.
- Show a clear warning before the final adopt confirmation.
- Suggest adopting the parent directory when it appears to be the repository root.
- Keep direct non-interactive `aios adopt <path>` deterministic and script-friendly.
- Add CLI tests for the detection helper or warning message formatting.

### Out of Scope

- Do not block advanced users from adopting a subproject intentionally.
- Do not delete or move already adopted files.
- Do not add framework-specific repository detection.
- Do not change `init`, `starter`, or validation semantics.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: `docs/product/prd.md`, `docs/architecture/architecture.md`
- API contract: N/A
- Database: N/A
- CLI: `cli/src/index.ts`, CLI tests

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: N/A
- Related ADR: `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`, `docs/adr/ADR-003-configurable-project-shapes-and-modes.md`
- Related architecture section: `docs/architecture/architecture.md#CLI Architecture`
- Blocking tasks: None

## Acceptance Criteria

- [x] Interactive adopt warns when the selected target has a parent containing AIOS root signals while the target itself looks like a subproject.
- [x] The warning names the selected target and the suggested parent target.
- [x] The user can continue with the selected target or cancel and rerun with a different path.
- [x] Non-interactive `aios adopt <path>` does not prompt or change behavior.
- [x] Tests cover likely subproject detection and at least one non-subproject case.

## Testing Expectations

- Unit tests: detection helper returns expected warning data for nested package folders and no warning for repository roots.
- Integration tests: existing CLI command tests still pass.
- Regression tests: `adopt` still preserves existing files and honors project shape.
- Manual checks: Run interactive flow manually from `cli/` after implementation if possible.

## Implementation Notes

- Candidate subproject signals: `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `composer.json`, `pubspec.yaml`, `pom.xml`, or common app folders.
- Candidate parent root signals: `.git/`, `AGENTS.md`, `.aios/config.json`, `project-skeleton/`, `skills/`, `templates/`, `workflows/`, or root package/workspace files.
- Keep the heuristic conservative. Prefer a warning over automatic path rewriting.

## Done Summary

- Files changed: `cli/src/index.ts`, `cli/test/commands.test.ts`, `docs/tasks/TASK-001-add-adopt-subproject-safety-warning.md`
- Tests run: `npm test` in `cli/` — 48 tests pass (4 new tests added)
- Acceptance criteria status: All 5 criteria satisfied
- Risks: Heuristic could warn for valid monorepo package adoption; kept conservative and non-blocking.
