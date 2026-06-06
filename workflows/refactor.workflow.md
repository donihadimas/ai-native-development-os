# Refactor Workflow

## Input

- Refactor goal, affected area, and reason for change.

## Process

1. Define safe scope and non-goals.
2. Read architecture and related ADRs when relevant.
3. Read affected modules and existing tests.
4. Create a refactor task with acceptance criteria.
5. Run existing tests before changing behavior when possible.
6. Plan affected files and risk points.
7. Refactor without changing intended external behavior.
8. Run tests again.
9. Review diff for accidental behavior changes.
10. Update docs only when structure or decisions changed.

## Output

- Refactor task.
- Cleaner implementation or structure.
- Test evidence before and after when available.
- Review report or summary.

## Done Criteria

- Scope stayed limited.
- Intended behavior did not change unless explicitly approved.
- Tests or manual checks show no regression.
- No unrelated cleanup was mixed in.
