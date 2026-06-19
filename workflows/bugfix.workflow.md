# Bugfix Workflow

## Input

- Bug report, reproduction steps, failing test, or observed behavior.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `.aios/skill-router.md`, bugfix workflow guidance, testing skill, implementation planner, and code review skill.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, the bug report, affected files, and nearby tests. Keep the same sequence manually.
- If RTK is enabled, use it for noisy logs, failing tests, diffs, and repeated debug output unless exact full output is required.
- If Caveman is enabled, use concise style for debug-loop updates only; keep the final bugfix summary complete.

## Workflow Handoffs

Use this workflow as the primary route for bugs, regressions, failing tests, crashes, incorrect behavior, flaky behavior, broken builds, and production incidents. Keep the bugfix workflow as primary even when the affected feature is payment, auth, API, database, or UI behavior.

- Use `testing` first when reproduction requires a failing check, regression test, or test evidence review.
- Use `implementation-planner`, then `task-implementation`, for the smallest safe fix.
- Use `.aios/workflows/api-contract.workflow.md` and `api-contract-design` when the bug reveals a missing, incorrect, or incompatible API contract.
- Use `.aios/workflows/database-migration.workflow.md` and `database-migration` when the fix requires schema, data repair, index, seed, or rollback planning.
- Use `.aios/workflows/security-review.workflow.md` and `security-review` before marking work done when the bug touches authentication, authorization, permissions, secrets, payments, billing, subscriptions, checkout, webhooks, or personally sensitive data.
- Use `.aios/workflows/review.workflow.md` and `code-review` after tests or manual verification.

## Process

1. Reproduce or clearly describe the bug.
2. Identify affected module and expected behavior.
3. Create a bugfix task with acceptance criteria.
4. Read related code and nearby tests.
5. Check ADRs only if the bug touches architectural behavior.
6. Route to API contract, migration, or security review planning when the affected behavior requires it.
7. Plan the fix.
8. Implement the smallest safe change.
9. Add or update a regression test when feasible.
10. Run relevant tests.
11. Run security review before completion when the bug is security-sensitive.
12. Review the diff.

## Output

- Bugfix task.
- Fixed behavior.
- Regression test or documented manual verification.
- API, migration, or security review notes when the bug requires them.
- Review summary.

## Done Criteria

- Bug is reproduced or sufficiently characterized.
- Root cause or likely cause is explained.
- Fix is limited to affected scope.
- Regression risk is covered.
- Security-sensitive fixes have security review evidence before completion.
- Tests or manual verification are reported.

## Full Mode Flow

Use `.aios/skill-router.md` to select this workflow first, then use testing, implementation planning, task implementation, security review, API contract, database migration, and code-review skills as the bug requires. Use `.aios/templates/` for task, security, migration, contract, and review documents. Use `.aios/references/` for engineering guidance.

## Lite Mode Flow

Use `AGENTS.md`, `<docsRoot>/context/context-map.md`, the bug report, affected files, and nearby tests. Do not assume `.aios/skill-router.md` or `.aios/templates/` exist. Follow the same sequence manually: reproduce, plan fix, implement, test, review.

## After This Flow

If the bug is not reproduced, define a reproduction or failing check first. If fixed, ask the user to review the diff and regression evidence, then run code review. If review passes, prepare the change for release notes when user-visible behavior changed.
