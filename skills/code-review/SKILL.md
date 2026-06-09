---
name: code-review
description: Use when reviewing a code change against task acceptance criteria, architecture, security, maintainability, and testing expectations.
---

# Code Review

## Goal

Review changes for correctness, safety, architecture alignment, maintainability, and test evidence before work is considered done.

## When to Use

Use this skill when:

- a task implementation is complete,
- a diff needs review,
- testing evidence needs evaluation,
- documentation or API changes need consistency checks.

## Inputs

Expected inputs:

- diff or changed files,
- active task,
- acceptance criteria,
- related ADRs or architecture docs,
- tests run and results.

## Clarification Gate

Before writing a review report, check whether these are available:

- diff or changed files,
- active task or stated intent,
- acceptance criteria or expected behavior,
- tests run and results.

If the review target or expected behavior is unclear, stop and ask for the missing inputs before approving or requesting changes. You may still perform a limited review, but label its scope and gaps explicitly.

## Outputs

Expected outputs:

- review report,
- actionable findings,
- risk summary,
- approval or revision required.

## Process

Step-by-step process:

1. Read the task acceptance criteria.
2. Inspect the diff and changed files.
3. Check correctness and behavioral regressions.
4. Check security, architecture, duplication, maintainability, performance, tests, and docs.
5. Verify test evidence matches the change.
6. Separate blocking findings from minor suggestions.
7. Use `templates/review-report.template.md` for structure when writing a persistent report.

## Rules

Hard rules:

- Findings come before summary.
- Do not approve when acceptance criteria are unmet.
- Do not ignore missing tests for behavior changes.
- Do not request broad unrelated refactors.
- Do not assume security-sensitive changes are safe without evidence.

## Quality Checklist

Before finishing, verify:

- [ ] Acceptance criteria were checked.
- [ ] Correctness risks were considered.
- [ ] Security risks were considered.
- [ ] Architecture alignment was considered.
- [ ] Duplication and maintainability were considered.
- [ ] Testing evidence was evaluated.
- [ ] Decision is clear.

## Failure Modes

Watch out for:

- style-only reviews,
- vague findings without action,
- approving untested behavior,
- ignoring docs/API drift,
- asking for unrelated rewrites.

## Example Prompt

```text
Use the code-review skill to review this diff against TASK-008.
```
