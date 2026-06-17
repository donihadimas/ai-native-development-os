# Bugfix Workflow

## Input

- Bug report, reproduction steps, failing test, or observed behavior.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `.aios/skill-router.md`, bugfix workflow guidance, testing skill, implementation planner, and code review skill.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, the bug report, affected files, and nearby tests. Keep the same sequence manually.
- If RTK is enabled, use it for noisy logs, failing tests, diffs, and repeated debug output unless exact full output is required.
- If Caveman is enabled, use concise style for debug-loop updates only; keep the final bugfix summary complete.

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

## Full Mode Flow

Use `.aios/skill-router.md` to select testing, implementation planning, and code-review skills. Use `.aios/templates/` for task and review documents. Use `.aios/references/` for engineering guidance.

## Lite Mode Flow

Use `AGENTS.md`, `<docsRoot>/context/context-map.md`, the bug report, affected files, and nearby tests. Do not assume `.aios/skill-router.md` or `.aios/templates/` exist. Follow the same sequence manually: reproduce, plan fix, implement, test, review.

## After This Flow

If the bug is not reproduced, define a reproduction or failing check first. If fixed, ask the user to review the diff and regression evidence, then run code review. If review passes, prepare the change for release notes when user-visible behavior changed.
