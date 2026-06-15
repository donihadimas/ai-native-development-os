# Implementation Plan: Normalize Root README Encoding

## Task

- Task file: `docs/tasks/TASK-007-normalize-root-readme-encoding.md`
- Objective: Remove mojibake and make root README render cleanly.

## Context Read

- `docs/tasks/TASK-007-normalize-root-readme-encoding.md`
- `README.md`
- Optional: `cli/README.md`

## Affected Files

- `README.md`
- Optional: `cli/README.md`

## Approach

1. Search README files for mojibake patterns.
2. Replace corrupted emoji, arrows, and tree characters with ASCII-safe text.
3. Preserve section order and content.
4. Run targeted searches to confirm artifacts are gone.

## Data Flow / Behavior Changes

No runtime behavior changes. Documentation readability improves.

## Risks

- Accidentally changing too much README content.
- Replacing valid Unicode that should stay.

## Test Plan

- `rg "ðŸ|â†|â”" README.md cli/README.md`
- `git diff --check -- README.md cli/README.md`

## Rollback Notes

Revert README edits.
