# Refactor Workflow

## Input

- Refactor goal, affected area, and reason for change.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `.aios/skill-router.md`, implementation planning, testing, and review guidance.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, affected files, and existing tests. Keep scope and non-goals explicit.
- If RTK is enabled, use it for noisy test output and large diffs unless exact full output is required.
- If Caveman is enabled, use concise style for progress updates only; keep review evidence complete.

## Workflow Handoffs

Use this workflow as the primary route for architecture-preserving cleanup, restructuring, maintainability work, performance tuning without product behavior change, or dependency-free simplification.

- Switch to `.aios/workflows/new-feature.workflow.md` if the requested change adds product behavior or user-visible capability.
- Switch to `.aios/workflows/bugfix.workflow.md` if the requested change fixes incorrect behavior or a failing test.
- Use `implementation-planner` before edits and keep scope/non-goals explicit.
- Use `testing` before and after the refactor when feasible to prove behavior stayed stable.
- Use `.aios/workflows/api-contract.workflow.md` only when the refactor exposes or changes API boundaries; otherwise do not redesign contracts.
- Use `.aios/workflows/database-migration.workflow.md` only when persistence structure must change; otherwise avoid data changes.
- Use `.aios/workflows/security-review.workflow.md` when the refactor touches auth, permissions, secrets, payments, billing, subscriptions, checkout, webhooks, or sensitive data paths.
- Use `.aios/workflows/review.workflow.md` and `code-review` to check for accidental behavior changes before completion.

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

## Full Mode Flow

Use `.aios/skill-router.md` to select this workflow first, then use implementation-planning, testing, security review, API contract, migration, and code-review skills only as the refactor requires. Use `.aios/templates/` for task documents. Use `.aios/references/` for engineering guidance.

## Lite Mode Flow

Use `AGENTS.md`, `<docsRoot>/context/context-map.md`, affected files, and existing tests. Do not assume `.aios/skill-router.md` or `.aios/templates/` exist. Follow the same sequence manually: define scope, plan, refactor, test, review.

## After This Flow

If scope or behavior impact is unclear, get user approval before editing. If refactor is complete, review the diff for accidental behavior change, then run relevant tests and record evidence.
