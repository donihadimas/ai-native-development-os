# Implementation Plan: Add Ponytail Integration

## Task

- Task file: `docs/tasks/TASK-037-add-ponytail-integration.md`
- Objective: Add Ponytail as an optional AIOS external integration alongside RTK and Caveman.

## Context Read

- `.aios/config.json`
- `docs/context/context-map.md`
- `.aios/skill-router.md`
- Native `implementation-planner` and `task-implementation` skills
- `docs/architecture/architecture.md` Integration Strategy
- Existing integration implementation in `cli/src/core.ts`, `cli/src/index.ts`, and `cli/test/commands.test.ts`
- Existing integration rules in `integrations/`
- Ponytail upstream GitHub repo and portability docs

## Affected Files

- `cli/src/core.ts`
- `cli/src/index.ts`
- `cli/test/commands.test.ts`
- `integrations/README.md`
- `integrations/ponytail.md`
- `README.md`
- `cli/README.md`
- `website/src/content/docs/guides/integrations.md`
- `website/src/content/docs/reference/cli.md`
- `website/src/content/docs/reference/integrations-folder.md`
- `docs/tasks/index.md`
- `docs/plans/index.md`
- Synced files under `cli/assets/`

## Approach

1. Extend integration types, default config, read/merge behavior, detection, install/uninstall guidance, and summaries for Ponytail.
2. Add Ponytail rules and update integration docs/help text.
3. Update CLI tests for list/status/add/remove/repair and installer dry-run behavior.
4. Sync CLI assets and run the CLI test suite.
5. Complete and archive the task/plan if acceptance criteria pass.

## Data Flow / Behavior Changes

Projects can enable Ponytail through `aios integration add ponytail`. AIOS writes `.aios/integrations/ponytail.md`, stores `integrations.ponytail` in `.aios/config.json`, reports external detection from common skill/plugin locations, and offers optional targeted installer guidance without adding dependencies.

## Risks

- The external `skills add` command behavior for Ponytail may differ by agent or version.
- Existing config merge code must preserve compatibility with projects that lack `integrations.ponytail`.
- Docs and bundled assets can drift if `cli/assets/` is not synced.

## Test Plan

- Run `npm test` from `cli/`.
- Manually inspect relevant `aios integration` outputs if tests fail or behavior is ambiguous.

## Rollback Notes

Revert the Ponytail additions in config types, CLI integration code, rule/docs files, tests, and synced assets. Existing projects with `integrations.ponytail` would ignore the unknown config only after code rollback if no command touches it.

After the related task or task range is complete and archived, move this plan to `<docsRoot>/plans/done/` without renaming it. Keep active plans directly under `<docsRoot>/plans/`. Update `<docsRoot>/plans/index.md` whenever this plan is created, completed, reopened, or archived.
