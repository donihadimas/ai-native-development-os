---
name: product-discovery
description: Use when turning a raw product idea into a clear product vision, MVP scope, and success criteria.
---

# Product Discovery

## Goal

Transform an early idea into a useful product vision that can feed PRD generation and architecture planning.

## When to Use

Use this skill when:

- the product idea is still rough,
- target users or core value are unclear,
- MVP scope needs to be narrowed,
- a new project needs `docs/product/vision.md`.

## Inputs

Expected inputs:

- raw product idea,
- known target users,
- business or personal constraints,
- existing notes or market assumptions.

## Outputs

Expected outputs:

- `docs/product/vision.md`,
- problem statement,
- target users,
- value proposition,
- MVP scope,
- out-of-scope list,
- success metrics,
- open questions.

## Process

Step-by-step process:

1. Restate the idea in plain language.
2. Identify the primary user and their painful job-to-be-done.
3. Separate user value from implementation ideas.
4. Define the smallest useful MVP.
5. Mark tempting but non-essential ideas as out of scope.
6. Define success metrics that can be observed.
7. Capture open questions without blocking the MVP unnecessarily.
8. Write the result using `templates/vision.template.md`.

## Rules

Hard rules:

- Do not jump into architecture or implementation.
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
