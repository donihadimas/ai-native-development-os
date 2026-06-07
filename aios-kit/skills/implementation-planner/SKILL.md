---
name: implementation-planner
description: Use before coding to create a short implementation plan with affected files, dependencies, risks, and tests.
---

# Implementation Planner

## Goal

Plan a safe implementation path before code changes begin.

## When to Use

Use this skill when:

- a task is ready for implementation,
- affected files need to be identified,
- dependencies or risks need to be checked,
- test strategy needs to be chosen before coding.

## Inputs

Expected inputs:

- active task,
- context map,
- relevant PRD, ADR, architecture, or API docs,
- affected code search results.

## Outputs

Expected outputs:

- implementation plan,
- affected files,
- dependencies,
- risks,
- test plan.

## Process

Step-by-step process:

1. Read the active task and acceptance criteria.
2. Route context using the context map.
3. Search existing implementation and nearby tests.
4. Identify files likely to change.
5. Describe the intended behavior change.
6. List risks and dependency concerns.
7. Define tests or manual checks.
8. Use `templates/implementation-plan.template.md` for structure when writing a persistent plan.

## Rules

Hard rules:

- Do not code before planning.
- Do not introduce dependencies without approval.
- Do not modify unrelated files.
- Do not skip testing expectations.
- Do not proceed if acceptance criteria are missing or contradictory.

## Quality Checklist

Before finishing, verify:

- [ ] Active task was read.
- [ ] Existing implementation was searched.
- [ ] Affected files are listed.
- [ ] Behavior change is clear.
- [ ] Risks are named.
- [ ] Test plan is specific.

## Failure Modes

Watch out for:

- planning from assumptions without searching,
- vague affected-file lists,
- missing migration or API impact,
- ignoring acceptance criteria,
- over-large implementation steps.

## Example Prompt

```text
Use the implementation-planner skill to plan TASK-014 before making code changes.
```
