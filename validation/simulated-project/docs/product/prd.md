# PRD: Personal Habit Tracker MVP

## Summary

The MVP lets a user create simple habits, view them, complete one for today, and see the current streak.

## Target Users

- Primary: solo users tracking personal routines.

## Goals

- Provide a low-friction habit creation flow.
- Let users mark today's completion.
- Show streak progress clearly.

## Non-Goals

- Multi-user collaboration.
- Billing.
- Complex analytics.

## Functional Requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-001 | User can create a habit with a name. | Must |
| FR-002 | User can list active habits. | Must |
| FR-003 | User can mark a habit complete for today. | Must |
| FR-004 | User can see current streak. | Should |

## Non-Functional Requirements

- Usability: primary flow should be understandable without onboarding.
- Maintainability: frontend and backend tasks should remain separate.
- Security: no secrets in source code.

## Acceptance Criteria

- [ ] Creating a habit stores and displays the habit name.
- [ ] Completing a habit records today's completion only once.
- [ ] Habit list shows streak count when available.

## Risks

- Streak calculation can become more complex with time zones.

## Open Questions

- Should habit completion use local user date or server date?
