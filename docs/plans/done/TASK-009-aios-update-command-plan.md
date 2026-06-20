# Implementation Plan: Add AIOS Update Command

## Task

- Task file: `docs/tasks/TASK-009-add-aios-update-command.md`
- Objective: Add a safe `aios update [project-path]` command for bringing existing adopted projects up to date with newly bundled AIOS workflow assets and skills.

## Context Read

- `docs/tasks/TASK-001-add-adopt-subproject-safety-warning.md`
- `docs/tasks/TASK-005-add-aios-repair-command.md`
- `docs/plans/TASK-005-aios-repair-command-plan.md`
- `docs/context/context-map.md`
- `docs/architecture/architecture.md#CLI Architecture`
- `docs/architecture/architecture.md#Workflow Kit Strategy`
- `cli/src/index.ts`
- `cli/src/core.ts`

## Affected Files

- `cli/src/index.ts`
- `cli/src/core.ts`
- `cli/test/commands.test.ts`
- `cli/test/core.test.ts`
- `cli/README.md`
- `website/src/content/docs/reference/cli.md`
- `README.md`
- Possibly `docs/product/prd.md` and `docs/architecture/architecture.md` if CLI behavior documentation needs source-of-truth updates.

## Approach

1. Add CLI help and routing for `aios update [project-path] [--dry-run]`.
2. Add core helper logic that reads project config and compares bundled AIOS kit assets with local project assets.
3. For full mode, copy missing `.aios/` assets and report existing files without overwriting them.
4. Update `.aios/config.json` only for safe defaults, especially newly bundled core/default skills, while preserving user-selected skills.
5. For `native` or `both` skill delivery, call native skill installation for the resolved selected agents and selected skills.
6. In dry-run mode, report planned file/config/native skill actions without writing.
7. Report review-needed files when local files exist and differ from bundled assets.
8. Add tests for dry-run, safe copy, config updates, native skill backfill, and non-overwrite behavior.
9. Update CLI docs and website command reference.

## Data Flow / Behavior Changes

Before:

```text
Existing adopted project
  -> user discovers `aios kit install`
  -> user separately runs `aios agent install`
  -> user manually notices new skills or changed assets
```

After:

```text
aios update [project-path]
  -> read .aios/config.json
  -> compare bundled AIOS assets with local project assets
  -> copy missing safe assets
  -> update safe selectedSkills defaults
  -> install missing native skills when configured
  -> report skipped/review-needed files
  -> recommend aios validate
```

## Risks

- Users may expect `update` to merge local edits with upstream asset changes.
- Automatically adding new skills to `selectedSkills` could surprise users who intentionally trimmed their setup.
- The command overlaps with `kit install`, `agent install`, and future `repair` behavior if boundaries are not clear.
- Asset comparison can become noisy if it reports every locally customized prompt or workflow as a conflict.

## Test Plan

- `npm test` from `cli/`
- Targeted tests in `cli/test/core.test.ts` for update classification helpers.
- Command tests in `cli/test/commands.test.ts` for:
  - `aios update --dry-run`,
  - full-mode missing asset backfill,
  - config skill addition without removing existing skills,
  - preserving locally edited files,
  - native skill backfill when configured.

## Rollback Notes

Remove `update` command routing, helper functions, tests, and docs. Existing `kit install`, `agent install`, and integration repair flows should continue to provide the previous manual update path.
