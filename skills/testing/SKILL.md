---
name: testing
description: Use when creating, evaluating, or summarizing tests that prove behavior against acceptance criteria.
---

# Testing

## Goal

Create or evaluate tests that verify real behavior, not just implementation details or superficial coverage.

## When to Use

Use this skill when:

- planning tests for a task,
- adding unit, integration, regression, or manual tests,
- reviewing whether testing evidence is enough,
- creating a test plan.

## Inputs

Expected inputs:

- active task,
- acceptance criteria,
- affected files,
- existing tests,
- known bug reproduction steps if any.

## Clarification Gate

Before writing a test plan, check whether these are clear enough:

- behavior to verify,
- acceptance criteria,
- success and failure paths,
- affected files or module,
- existing test framework or conventions.

If expected behavior or pass/fail criteria are unclear, stop and ask the user 3-5 focused questions before generating the final test plan.

## Outputs

Expected outputs:

- test plan,
- unit test expectations,
- integration test expectations,
- regression checks,
- manual verification notes,
- testing gaps and risks.

## Process

Step-by-step process:

1. Resolve the active task without reading every task body when acceptance criteria are not already provided. Use `docs/tasks/index.md` when available, then direct task filenames under `docs/tasks/`, and exclude `docs/tasks/done/` unless completed-task history is requested.
2. Read only the selected active task or stated acceptance criteria.
3. Map acceptance criteria to observable behavior.
4. Inspect existing tests and test conventions.
5. Choose the smallest test level that proves each behavior using the Test Level Decision Guide.
6. Include happy path, error path, and edge cases when relevant.
7. Add regression tests for bugfixes.
8. Avoid assertions tied only to implementation details.
9. Record commands run and gaps.
10. Use `templates/test-plan.template.md` when writing a persistent plan.

## Test Level Decision Guide

Use the lowest level that proves the behavior with confidence:

- Unit tests: pure logic, small domain rules, formatting, validation helpers, deterministic branching, and error mapping that can be isolated without crossing process or network boundaries.
- Integration tests: behavior across modules, API handlers with services, database persistence, queues/jobs, auth boundaries, framework adapters, or any code where wiring can break correctness.
- Contract tests: frontend/backend or provider/consumer compatibility, request/response schemas, error semantics, auth expectations, and backward compatibility for public or shared interfaces.
- End-to-end tests: critical user journeys where confidence depends on multiple real layers working together, such as signup, checkout, onboarding, or role-sensitive workflows.
- Regression tests: any reproduced bug, risky refactor, security fix, or previously broken behavior that should not return.
- Manual checks: visual polish, exploratory UX, third-party systems, one-off operational checks, or flows where automation is not practical yet. Record why manual validation is enough for now.

Prefer a small mix over a large brittle suite. Do not duplicate every unit test at integration or end-to-end level unless risk justifies it.

## Rules

Hard rules:

- Test behavior, not private implementation details.
- Tie tests to acceptance criteria.
- Do not open every task file to discover acceptance criteria, and do not search `docs/tasks/done/` for active work.
- Do not claim unrun tests passed.
- Do not ignore error paths for risky behavior.
- Do not treat coverage percentage as proof of correctness.
- Do not choose end-to-end tests when a unit, integration, or contract test proves the same behavior with less brittleness.
- Do not rely on manual checks for repeated critical behavior without explaining why automation is deferred.

## Quality Checklist

Before finishing, verify:

- [ ] Tests map to acceptance criteria.
- [ ] Happy path is covered.
- [ ] Error path is covered when relevant.
- [ ] Edge cases are considered.
- [ ] Regression risk is addressed.
- [ ] Test levels are justified.
- [ ] Test commands and gaps are reported.

## Failure Modes

Watch out for:

- brittle implementation-detail tests,
- reading all task files to find acceptance criteria,
- missing negative cases,
- unverified manual assumptions,
- tests that duplicate mocks instead of behavior,
- claiming coverage without evidence.

## Example Prompt

```text
Use the testing skill to create a test plan for TASK-021.
```
