# Test Plan: Backend Habit Completion

## Scope

Backend behavior for create/list/complete habit flow.

## Acceptance Criteria Covered

- Creating a habit stores a name.
- Listing habits returns created habits.
- Completing twice on the same server date does not create duplicates.

## Test Scenarios

### Happy Path

- Create one habit and list it.
- Complete the habit once and verify completion exists.

### Error Path

- Complete an unknown habit ID.

### Edge Cases

- Complete the same habit twice on the same server date.

### Regression Checks

- Listing habits remains stable after completion.

## Pass / Fail Criteria

The task passes when all acceptance criteria are verified by automated tests or documented manual checks.
