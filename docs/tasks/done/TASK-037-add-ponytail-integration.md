# TASK-037: Add Ponytail Integration

## Status

Done

## Objective

Add Ponytail as an optional AIOS external integration alongside RTK and Caveman.

## Background

Ponytail is an agent-portable "lazy senior developer" ruleset from `DietrichGebert/ponytail`. It supports Codex and other agents through portable skills, plugins, and AGENTS-style rules. AIOS should be able to generate local Ponytail guidance, record project intent in `.aios/config.json`, and surface the integration through CLI list/status/add/remove/doctor/repair flows.

## Scope

### In Scope

- Add `ponytail` to supported AIOS integration config and CLI selection.
- Add local Ponytail integration rules under `integrations/`.
- Update CLI integration status/add/remove/doctor/repair behavior and tests.
- Update user-facing CLI and integration docs.

### Out of Scope

- Bundling Ponytail source files or vendoring the full plugin.
- Adding new package dependencies.
- Running external installers automatically without explicit `--install --yes`.
- Changing Ponytail upstream behavior.

## Affected Areas

- Frontend: Website documentation only.
- Backend: None.
- Shared docs: Integration docs and README references.
- API contract: None.
- Database: None.

## Dependencies

- Related PRD: Existing CLI integration scope in `prd.md` if needed.
- Related design: None.
- Related ADR: ADR-002 CLI as helper if behavior scope is unclear.
- Related architecture section: `docs/architecture/architecture.md` Integration Strategy.
- Blocking tasks: None.

## Acceptance Criteria

- [x] `ponytail` appears in supported integration lists and can be selected by `aios integration add ponytail`.
- [x] `.aios/config.json` persists `integrations.ponytail` with enabled state, mode, and target agents.
- [x] `aios integration status`, `doctor`, `repair`, and `remove` handle Ponytail consistently with existing integrations.
- [x] A local `ponytail.md` rule file is installed and repaired from AIOS kit assets.
- [x] CLI tests cover list/status/add/remove/repair behavior for Ponytail.
- [x] README, CLI README, and website integration docs mention Ponytail.
- [x] No new dependency is introduced.

## Testing Expectations

- Unit tests: Update and run CLI command tests.
- Integration tests: Covered by temporary-project CLI tests.
- Regression tests: Run full CLI test suite if feasible.
- Manual checks: Verify `aios integration list` and dry-run add output.

## Implementation Notes

- Ponytail upstream checked on GitHub: `DietrichGebert/ponytail`, latest release v4.8.0 on June 23, 2026.
- Prefer rules-first behavior; installer guidance can use `npx -y skills add DietrichGebert/ponytail` for targeted agents if supported by the existing skills CLI pattern.

## Done Summary

- Files changed: `cli/src/core.ts`, `cli/src/index.ts`, `cli/test/commands.test.ts`, `integrations/ponytail.md`, `integrations/README.md`, `.aios/integrations/ponytail.md`, `.aios/integrations/README.md`, `README.md`, `cli/README.md`, `website/src/content/docs/guides/integrations.md`, `website/src/content/docs/reference/cli.md`, `website/src/content/docs/reference/integrations-folder.md`, `AGENTS.md`, `project-skeleton/AGENTS.md`, `skill-router.md`, `.aios/skill-router.md`, `.aios/references/workflow-modes.md`, `docs/architecture/architecture.md`, `docs/tasks/index.md`, `docs/plans/index.md`.
- Tests run: `npm run build`; `npm run sync-assets`; `npm test`; manual `node cli/dist/src/index.js integration add ponytail demo --dry-run`; manual `npm run aios -- integration list`.
- Acceptance criteria status: All satisfied.
- Risks: External `npx -y skills add DietrichGebert/ponytail` behavior depends on the upstream skills installer and target agent support; AIOS only offers/runs it under explicit install confirmation.

After completion, move this file to `<docsRoot>/tasks/done/` without renaming it. Keep active or blocked tasks directly under `<docsRoot>/tasks/`. Update `<docsRoot>/tasks/index.md` whenever this task is created, blocked, completed, reopened, or archived.
