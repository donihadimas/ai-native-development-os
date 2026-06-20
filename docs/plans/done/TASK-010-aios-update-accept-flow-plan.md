# Implementation Plan: Add AIOS Update Accept Flow

## Task

- Task file: `docs/tasks/TASK-010-add-aios-update-accept-flow.md`
- Objective: Add an explicit accept flow for `aios update` so users can apply bundled AIOS asset changes after review without manually copying files.

## Context Read

- `.aios/config.json`
- `.aios/skill-router.md`
- `docs/context/context-map.md`
- `docs/tasks/TASK-009-add-aios-update-command.md`
- `docs/plans/TASK-009-aios-update-command-plan.md`
- `docs/architecture/architecture.md#CLI Architecture`
- `docs/architecture/architecture.md#Workflow Kit Strategy`
- `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`
- `templates/task.template.md`
- `templates/implementation-plan.template.md`
- Existing update command/tests search results in `cli/src/index.ts`, `cli/src/core.ts`, and `cli/test/commands.test.ts`

## Affected Files

- `cli/src/index.ts`
- `cli/src/core.ts`
- `cli/test/commands.test.ts`
- `cli/test/core.test.ts`
- `docs/tasks/TASK-010-add-aios-update-accept-flow.md`
- `docs/plans/TASK-010-aios-update-accept-flow-plan.md`
- Possibly `cli/README.md` or website CLI reference if CLI command docs are maintained outside help output.

## Approach

1. Extract current update asset traversal into a reusable classifier that compares bundled source files against local `.aios/` targets.
2. Add line-ending-insensitive comparison so line-ending-only differences are counted separately from content differences.
3. Extend argument parsing for accept mode, using a syntax such as `aios update --accept [section] [project-path]` or another parser-friendly equivalent.
4. In default mode, preserve current non-destructive behavior: copy missing files, report content differences as review-needed, and avoid overwrites.
5. In `--dry-run --accept` mode, report which local `.aios/` files would be overwritten without writing.
6. In `--accept` mode, copy bundled source files over local `.aios/` targets only for classified content differences and only within allowed kit entries or requested section.
7. Update CLI help and output summaries to include accepted and line-ending-only counts.
8. Add focused core/helper tests and command-level regression tests.

## Data Flow / Behavior Changes

Before:

```text
aios update
  -> copy missing assets
  -> skip existing differing assets
  -> report review-needed files
  -> user manually copies accepted files
```

After:

```text
aios update
  -> same safe default behavior
  -> report review-needed content differences
  -> report line-ending-only differences separately

aios update --dry-run --accept [section]
  -> report which review-needed assets would be overwritten
  -> write nothing

aios update --accept [section]
  -> copy bundled assets into matching local .aios targets
  -> do not touch project docs, app code, or native skill folders
  -> recommend aios validate
```

## Risks

- Ambiguous CLI syntax could treat a section name as a project path. Prefer parser behavior that is easy to test and document.
- Accept mode can overwrite local workflow customizations if users run it without reading the review-needed list first.
- Line-ending classification must avoid hiding real content changes.
- Duplicating update traversal logic could drift from `installAiosKit`; centralize classification where practical.

## Test Plan

- `npm test` from `cli/`
- Core/helper tests:
  - identical asset classification
  - missing asset classification
  - content-different asset classification
  - line-ending-only asset classification
  - section filter classification
- Command tests:
  - `aios update` preserves differing local `.aios` files by default
  - `aios update --accept` overwrites a differing local `.aios` file with bundled source
  - `aios update --dry-run --accept` reports planned overwrites and writes nothing
  - section-scoped accept updates workflow assets but leaves prompt/template differences untouched
  - line-ending-only differences are not counted as review-needed content changes
  - existing update/repair/validate tests continue to pass

## Rollback Notes

Remove accept-mode parsing, accept helper/classification changes, help output additions, and related tests. The existing safe `aios update` behavior from TASK-009 should remain available as the fallback workflow.
