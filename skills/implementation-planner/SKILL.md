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

## Clarification Gate

Before writing the implementation plan, check whether these are clear enough:

- active task objective,
- acceptance criteria,
- affected area or module,
- constraints from PRD/ADR/API/architecture,
- validation or test expectations.

If acceptance criteria are missing, contradictory, or too broad, stop and ask the user for clarification before planning or coding. Do not proceed from guesses for behavior-changing work.

## Outputs

Expected outputs:

- implementation plan,
- affected files,
- dependencies,
- risks,
- test plan.

## Process

Step-by-step process:

1. Resolve the active task without reading every task body: use an explicit task ID/path first, then IDE or conversation context, then task filenames, then a narrow heading/status search with user-request terms.
2. Read the single active task and acceptance criteria; if no clear task exists, ask which task is active or whether to create one.
3. Route context using the context map.
4. Search existing implementation and nearby tests.
5. Identify files likely to change.
6. Describe the intended behavior change.
7. List risks and dependency concerns.
8. Define tests or manual checks.
9. Use `templates/implementation-plan.template.md` for structure when writing a persistent plan.

## Rules

Hard rules:

- Do not code before planning.
- Do not open every task file to discover the active task.
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
- reading all task files before choosing one active task,
- vague affected-file lists,
- missing migration or API impact,
- ignoring acceptance criteria,
- over-large implementation steps.

## Example Prompt

```text
Use the implementation-planner skill to plan TASK-014 before making code changes.
```
