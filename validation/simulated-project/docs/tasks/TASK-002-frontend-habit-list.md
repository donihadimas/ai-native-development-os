# TASK-002: Frontend Habit List

## Objective

Implement frontend UI for creating a habit, listing habits, and triggering completion.

## Scope

### In Scope

- Habit list view.
- Create habit form.
- Complete today action.
- Streak display from API response.

### Out of Scope

- Backend implementation.
- Authentication.
- Advanced analytics.

## Affected Areas

- Frontend: habit list screen and API client.
- Backend: none.
- API contract: `docs/api/habit-api-notes.md`.

## Dependencies

- Backend task: `docs/tasks/TASK-001-backend-habit-completion.md`

## Acceptance Criteria

- [ ] User can submit a habit name.
- [ ] Habit list displays returned habits.
- [ ] User can complete a habit from the list.
- [ ] Current streak is visible when returned by the API.

## Testing Expectations

- UI test or manual check for create/list/complete flow.
- Error state check for failed API request.
