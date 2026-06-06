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

1. Map acceptance criteria to observable behavior.
2. Inspect existing tests and test conventions.
3. Choose the smallest test level that proves each behavior.
4. Include happy path, error path, and edge cases when relevant.
5. Add regression tests for bugfixes.
6. Avoid assertions tied only to implementation details.
7. Record commands run and gaps.
8. Use `templates/test-plan.template.md` when writing a persistent plan.

## Rules

Hard rules:

- Test behavior, not private implementation details.
- Tie tests to acceptance criteria.
- Do not claim unrun tests passed.
- Do not ignore error paths for risky behavior.
- Do not treat coverage percentage as proof of correctness.

## Quality Checklist

Before finishing, verify:

- [ ] Tests map to acceptance criteria.
- [ ] Happy path is covered.
- [ ] Error path is covered when relevant.
- [ ] Edge cases are considered.
- [ ] Regression risk is addressed.
- [ ] Test commands and gaps are reported.

## Failure Modes

Watch out for:

- brittle implementation-detail tests,
- missing negative cases,
- unverified manual assumptions,
- tests that duplicate mocks instead of behavior,
- claiming coverage without evidence.

## Example Prompt

```text
Use the testing skill to create a test plan for TASK-021.
```
