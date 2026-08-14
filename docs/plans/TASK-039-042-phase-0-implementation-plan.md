# Implementation Plan: Phase 0 (TASK-039 through TASK-042)

## Status

Done

## Overview

Execute Phase 0 of the AIOS modernization roadmap:
1. **TASK-039**: Prune redundant `commands/` and `prompts/` directories from root, `.aios/`, and `project-skeleton/`. (Completed)
2. **TASK-040**: Consolidate 16 skills into 4 core lifecycle skills (`spec`, `arch`, `task`, `verify`) and remove obsolete skills (`backend-api-development`, `context-management`). (Completed)
3. **TASK-041**: Streamline root `AGENTS.md` and `CLAUDE.md` to under 40 lines. (Completed)
4. **TASK-042**: Eliminate task file movement to `done/` subfolders and fix link decay across templates and documentation. (Completed)

## Affected Files

- `commands/`, `.aios/commands/` (Deleted)
- `prompts/`, `.aios/prompts/` (Deleted)
- `.agents/skills/`, `skills/` (Consolidated into 4 core skills + lean optionals)
- `skill-router.md`, `.aios/skill-router.md` (Updated router)
- `AGENTS.md`, `CLAUDE.md`, `project-skeleton/AGENTS.md`, `project-skeleton/CLAUDE.md` (Streamlined to ~20 lines)
- `templates/task.template.md`, `templates/implementation-plan.template.md`, `.aios/templates/` (Removed done/ movement)
- `cli/src/core.ts`, `cli/src/index.ts` (Updated kit paths, core skills list, and template references)
- `cli/test/commands.test.ts`, `cli/test/core.test.ts` (Updated test suites)

## Verification Results

1. Verified removal of `commands/` and `prompts/` folders.
2. Verified creation of consolidated 4 core skills (`spec`, `arch`, `task`, `verify`).
3. Verified line counts of `AGENTS.md` (now under 30 lines).
4. Verified task templates contain in-place completion without moving files.
5. Ran `npm test` in `cli/` - all 79 tests passed with 0 failures.
