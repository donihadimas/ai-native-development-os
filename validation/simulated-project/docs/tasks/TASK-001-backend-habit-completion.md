# TASK-001: Backend Habit Completion

## Objective

Implement backend behavior for creating habits, listing habits, and completing a habit once per server date.

## Scope

### In Scope

- Habit creation behavior.
- Habit list behavior.
- Completion uniqueness for server date.
- Streak calculation placeholder or simple current streak.

### Out of Scope

- Frontend UI.
- Authentication.
- Full OpenAPI contract.

## Affected Areas

- Frontend: none.
- Backend: habit module.
- Shared docs: API notes.
- API contract: `docs/api/habit-api-notes.md`.
- Database: habits and completions.

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related ADR: `docs/adr/ADR-001-server-date-for-completion.md`

## Acceptance Criteria

- [ ] Creating a habit stores a name.
- [ ] Listing habits returns created habits.
- [ ] Completing a habit twice on the same server date does not create duplicate completions.

## Testing Expectations

- Unit tests for duplicate completion behavior.
- Integration test or manual check for create/list/complete flow.
