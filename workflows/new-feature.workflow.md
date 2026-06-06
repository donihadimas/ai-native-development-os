# New Feature Workflow

## Input

- Feature idea or user request.
- Existing PRD, architecture, ADRs, and task list.

## Process

1. Update or extend the PRD for the feature.
2. Check whether architecture changes are needed.
3. Create or update ADRs for important decisions.
4. Define or update API contract notes in `docs/api/` when frontend/backend integration is involved.
5. Break the feature into small tasks.
6. Split frontend and backend tasks when complexity is medium or high.
7. Plan implementation for one task.
8. Implement the task.
9. Add or update tests.
10. Review the diff.
11. Update docs when behavior or decisions changed.

## Output

- Updated PRD or feature section.
- ADRs if needed.
- API notes if needed.
- Implementation-ready tasks.
- Tested and reviewed change.

## Done Criteria

- Feature scope is clear.
- Acceptance criteria are met.
- API changes are documented before integration work.
- Tests or manual checks are reported.
- Review does not identify blocking findings.
