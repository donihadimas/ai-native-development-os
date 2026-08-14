# Implementation Plan: Phase 1 (TASK-043 through TASK-046)

## Status

Done

## Overview

Execute Phase 1 of the AIOS modernization roadmap:
1. **TASK-043**: Implement Deterministic CLI Verification Runner (`aios verify`). (Completed)
   - Automatically detects test runners (`npm`, `pytest`, `cargo`, `go`, `dart`).
   - Executes test commands and reports pass/fail with error logs.
   - Inspects git diffs.
2. **TASK-044**: Dynamic Skill Invocation Without Router Preload. (Completed)
   - Updated system prompts and workflows to trigger skills dynamically on demand.
3. **TASK-045**: Add Task Graph Dependency Resolution (`depends_on`). (Completed)
   - Added `depends_on: []` to task templates.
   - Implemented DAG topological resolution and cycle detection in `cli/src/tasks.ts`.
   - Added `aios tasks` CLI command.
4. **TASK-046**: Clean Up Markdown-Only Starters & Repetitive Quality Checklists. (Completed)
   - Streamlined starters and trimmed repetitive checklists.

## Affected Files

- `cli/src/verify.ts` (Deterministic verification engine)
- `cli/src/tasks.ts` (DAG task resolver and cycle detector)
- `cli/src/core.ts` (Exported verification and task modules)
- `cli/src/index.ts` (Wired `aios verify` and `aios tasks` CLI commands)
- `cli/test/verify.test.ts` (Unit and integration tests)
- `templates/task.template.md`, `.aios/templates/task.template.md` (Added `depends_on` and `aios verify` instructions)
- `docs/tasks/TASK-043-implement-deterministic-cli-verification.md` through `TASK-046-cleanup-empty-starters-and-quality-checklists.md`

## Verification Results

1. Verified `aios verify` runs automated tests in target directories and returns correct exit codes.
2. Verified task graph DAG ordering and circular dependency detection via unit tests and running `node cli/dist/src/index.js tasks`.
3. Ran `npm test` across all CLI tests — all 87 tests passed (0 fail).
