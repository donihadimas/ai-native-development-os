# Implementation Plan: Improve Optional Docs Next Guidance

## Task

- Task file: `docs/tasks/TASK-002-improve-optional-docs-next-guidance.md`
- Objective: Make optional V2.x validation warnings actionable without making them required.

## Context Read

- `docs/tasks/TASK-002-improve-optional-docs-next-guidance.md`
- `docs/product/prd.md`
- `docs/architecture/architecture.md`
- `cli/src/core.ts`
- `cli/src/index.ts`
- `cli/test/commands.test.ts`

## Affected Files

- `cli/src/core.ts`
- `cli/src/index.ts`
- `cli/test/commands.test.ts`
- Optional: `cli/README.md`, `website/src/content/docs/reference/cli.md`

## Approach

1. Locate current warning creation for optional V2.x docs.
2. Add a formatter that appends concise guidance to each optional warning.
3. Ensure warnings remain warnings and do not affect `result.ok`.
4. Add or update tests for validate output.
5. Update docs if the user-facing output changes materially.

## Data Flow / Behavior Changes

Before:

```text
Warnings:
- Optional V2.x path not found: docs/security
```

After:

```text
Warnings:
- Optional V2.x path not found: docs/security. Create when needed with `aios create security <name>`.
```

## Risks

- Output could become noisy if every optional warning is verbose.
- Users may interpret optional commands as required.

## Test Plan

- `npm.cmd test` from `cli/`
- `node dist/src/index.js validate ..`

## Rollback Notes

Revert warning formatter and tests. Existing validation behavior should return to the previous terse warning format.
