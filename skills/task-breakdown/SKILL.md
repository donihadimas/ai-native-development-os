---
name: task-breakdown
description: Use when splitting a PRD, feature, ADR, or bug report into small implementation-ready tasks for an AI coding agent.
---

# Task Breakdown

## Goal

Create small, specific, verifiable tasks that Codex can implement safely in one focused session.

## When to Use

Use this skill when:

- turning a PRD into implementation tasks,
- splitting a feature into frontend and backend work,
- creating a bugfix task,
- reducing an oversized task.

## Inputs

Expected inputs:

- PRD or feature description,
- architecture document,
- related ADRs,
- known affected modules,
- API or database impact if any.

## Clarification Gate

Before writing tasks, check whether these are clear enough:

- feature or PRD scope,
- acceptance criteria,
- affected project area,
- dependencies or required ADR/API/migration work,
- testing expectations,
- known out-of-scope work.

If tasks would be broad, unverifiable, or based on unclear ownership, stop and ask the user 3-6 focused questions before creating task files. Do not create implementation-ready tasks until acceptance criteria and testing expectations are specific.

## Outputs

Expected outputs:

- `docs/tasks/TASK-XXX-title.md`,
- objective,
- scope and out-of-scope,
- affected modules,
- dependencies,
- acceptance criteria,
- testing expectations,
- review checklist and next step guidance.

## Process

Step-by-step process:

1. Identify the smallest independently valuable work unit.
2. Split frontend and backend tasks when combined complexity is medium or high.
3. Keep each task to one objective.
4. List affected modules and dependencies.
5. Add testable acceptance criteria.
6. Add testing expectations tied to behavior.
7. Add review notes so the user can confirm the task list order and scope.
8. End with the next workflow step: user chooses one task, uses `implementation-planner` before coding, then uses `task-implementation` to execute and close status.
9. Use `templates/task.template.md` for structure.
10. Flag tasks that need ADR or API contract work first.

## Rules

Hard rules:

- One task must have one objective.
- Do not create tasks that require broad repo changes without explicit scope.
- Do not hide backend work inside a frontend task or vice versa when complexity is high.
- Do not call a task implementation-ready without acceptance criteria and testing expectations.
- Do not tell the agent to implement every generated task in one session.

## Quality Checklist

Before finishing, verify:

- [ ] Objective is singular and clear.
- [ ] Scope is limited.
- [ ] Affected areas are named.
- [ ] Dependencies are listed.
- [ ] Acceptance criteria are testable.
- [ ] Testing expectations are defined.
- [ ] Next step tells the user to select one task and plan before coding.

## Failure Modes

Watch out for:

- task bloat,
- unclear ownership between frontend and backend,
- missing API contract work,
- acceptance criteria that describe implementation details,
- tasks that cannot be verified,
- ending without a clear first task recommendation.

## Example Prompt

```text
Use the task-breakdown skill to split this PRD into Codex-sized tasks.
```
