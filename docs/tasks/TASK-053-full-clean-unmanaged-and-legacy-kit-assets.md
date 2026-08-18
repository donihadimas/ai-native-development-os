---
name: TASK-053-full-clean-unmanaged-and-legacy-kit-assets
status: Done
depends_on: ["TASK-039", "TASK-040"]
---

# TASK-053: Full Clean Unmanaged and Legacy Kit Assets in AIOS Update

## Goal

Enhance `aios update --clean` to automatically identify and remove unmanaged, legacy top-level directories/files (such as `.aios/commands/`, `.aios/prompts/`, and `.aios/skills/` when in native-only delivery mode) while strictly preserving user and runtime assets (`config.json`, `repo-map.json`, `worktrees/`, `telemetry.json`, etc.).

## Acceptance Criteria

1. [x] Update `AdoptResult` in `cli/src/core.ts` to include optional `removed: string[]`.
2. [x] Update `installAiosKit` in `cli/src/core.ts` so that when `clean: true`, it scans `.aios/` top-level entries, removing deprecated/unmanaged top-level directories and files (e.g. `commands`, `prompts`, and `skills` if `includeSkills === false`) while preserving known runtime files (`config.json`, `repo-map.json`, `worktrees/`, etc.).
3. [x] Ensure recursive `cleanExtraEntries` tracks and records all removed files.
4. [x] In `commandUpdate` (`cli/src/index.ts`), log all removed kit items in the output summary when `--clean` is executed.
5. [x] Add unit/integration tests in `cli/test/commands.test.ts` verifying that legacy `.aios/commands/`, `.aios/prompts/`, and unselected kit files are purged by `aios update --clean`.
6. [x] Execute full test suite and verify deterministic pass.
