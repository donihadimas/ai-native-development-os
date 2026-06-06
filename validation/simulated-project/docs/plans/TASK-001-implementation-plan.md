# Implementation Plan: Backend Habit Completion

## Task

- Task file: `docs/tasks/TASK-001-backend-habit-completion.md`
- Objective: backend habit create/list/complete behavior.

## Context Read

- `docs/product/prd.md`
- `docs/architecture/architecture.md`
- `docs/adr/ADR-001-server-date-for-completion.md`
- `docs/api/habit-api-notes.md`

## Affected Files

- Backend habit module files after stack initialization.
- Backend habit tests after stack initialization.

## Approach

1. Add habit and completion persistence models.
2. Add create/list/complete behavior.
3. Enforce one completion per habit per server date.
4. Add behavior tests.

## Risks

- Time zone behavior is intentionally simplified for MVP.

## Test Plan

- Create habit returns stored habit.
- List habits includes created habit.
- Duplicate completion for same server date is rejected or idempotent.
