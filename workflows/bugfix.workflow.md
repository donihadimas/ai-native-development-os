# Bugfix Workflow

## Input

- Bug report, reproduction steps, failing test, or observed behavior.

## Process

1. Reproduce or clearly describe the bug.
2. Identify affected module and expected behavior.
3. Create a bugfix task with acceptance criteria.
4. Read related code and nearby tests.
5. Check ADRs only if the bug touches architectural behavior.
6. Plan the fix.
7. Implement the smallest safe change.
8. Add or update a regression test when feasible.
9. Run relevant tests.
10. Review the diff.

## Output

- Bugfix task.
- Fixed behavior.
- Regression test or documented manual verification.
- Review summary.

## Done Criteria

- Bug is reproduced or sufficiently characterized.
- Root cause or likely cause is explained.
- Fix is limited to affected scope.
- Regression risk is covered.
- Tests or manual verification are reported.
