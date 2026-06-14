---
name: product-discovery
description: Use when turning a raw product idea into a clear product vision, MVP scope, and success criteria.
---

# Product Discovery

## Goal

Interview the user when needed, then transform an early idea into a useful product vision that can feed PRD generation and architecture planning.

## When to Use

Use this skill when:

- the product idea is still rough,
- the user is not sure how to fill `docs/product/vision.md`,
- target users or core value are unclear,
- MVP scope needs to be narrowed,
- a new project needs `docs/product/vision.md`.

## Inputs

Expected inputs:

- raw product idea,
- known target users,
- business or personal constraints,
- existing notes or market assumptions.
- answers from a short discovery interview.

## Clarification Gate

Before writing the vision document, check whether these are clear enough:

- primary user,
- painful problem or job-to-be-done,
- smallest useful MVP,
- explicit non-goals,
- success metrics or observable signals,
- important constraints.

If two or more items are missing or vague, stop and ask the user 3-6 focused questions before generating the final document. Prefer multiple-choice questions when they reduce friction for a beginner. Keep the interview lightweight: ask only what is needed to make the first PRD useful. Do not invent business facts; mark unresolved items as open questions only after asking.

## Outputs

Expected outputs:

- `docs/product/vision.md`,
- problem statement,
- target users,
- value proposition,
- MVP scope,
- out-of-scope list,
- success metrics,
- assumptions and constraints,
- open questions.

## Process

Step-by-step process:

1. Restate the idea in plain language.
2. If the idea is vague, interview the user with 3-6 focused questions before writing.
3. Identify the primary user and their painful job-to-be-done.
4. Separate user value from implementation ideas.
5. Define the smallest useful MVP.
6. Mark tempting but non-essential ideas as out of scope.
7. Define success metrics that can be observed.
8. Capture assumptions, constraints, and open questions without blocking the MVP unnecessarily.
9. Write the result using `templates/vision.template.md`.
10. End with the next workflow step: user reviews vision, then PRD generation starts.

## Rules

Hard rules:

- Do not jump into architecture or implementation.
- Do not generate the PRD in the same step unless the user explicitly asks for both.
- Do not include every possible feature in MVP scope.
- Do not invent business facts when the user has not provided them.
- Do not hide major uncertainty; record it as an open question.

## Quality Checklist

Before finishing, verify:

- [ ] The primary user is clear.
- [ ] The problem is specific.
- [ ] MVP scope is small enough to build first.
- [ ] Out-of-scope items are explicit.
- [ ] Success metrics are observable.
- [ ] Assumptions, constraints, and open questions are visible.
- [ ] Next step tells the user to review the vision before PRD generation.

## Failure Modes

Watch out for:

- vague target users,
- solution-first thinking,
- MVP scope creep,
- metrics that cannot be measured,
- unrecorded assumptions.

## Example Prompt

```text
Use the product-discovery skill to turn this SaaS idea into a vision document.
```
