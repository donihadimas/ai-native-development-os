---
name: task-implementation
description: Use when implementing an active AIOS task from docs/tasks after an implementation plan exists or has been created, including scoped code or documentation changes, validation, acceptance criteria verification, and updating the task status or Done Summary when work is complete.
---

# Task Implementation

## Goal

Execute one active task safely from plan to verified completion.

## Inputs

Expected inputs:

- active task file in `<docsRoot>/tasks/`,
- implementation plan or enough context to create one with `implementation-planner`,
- context map,
- affected files and nearby tests,
- related PRDs, ADRs, architecture, API docs, or design docs only when needed.

## Clarification Gate

Before editing files, check whether these are clear enough:

- active task objective,
- acceptance criteria,
- affected files or modules,
- implementation plan,
- validation or testing expectations,
- task status location, such as `## Status` or `## Done Summary`.

If the task is missing acceptance criteria, has contradictory behavior, or cannot be verified, stop and ask focused questions before coding.

## Outputs

Expected outputs:

- scoped implementation,
- tests or validation evidence,
- acceptance criteria status,
- updated task status or Done Summary when the task is complete,
- final report with files changed, tests run, risks, and next step.

## Process

Step-by-step process:

1. Resolve `.aios/config.json` when present, including `mode`, `docsRoot`, `projectShape`, and `skillDelivery`.
2. Read `AGENTS.md` and `<docsRoot>/context/context-map.md`.
3. Resolve the active task without reading every task body: use an explicit task ID/path first, then IDE or conversation context, then direct task filenames under `<docsRoot>/tasks/`, then a narrow heading/status search with user-request terms. Exclude `<docsRoot>/tasks/done/` unless completed-task history is requested.
4. Read the single active task file before implementation; if no clear task exists, ask which task is active or whether to create one.
5. Read related ADRs when the task mentions them.
6. Use `implementation-planner` first when no usable plan exists.
7. Search existing implementation and nearby tests before creating new abstractions.
8. Identify affected files and state a short implementation plan.
9. Implement only the active task.
10. Run the smallest relevant tests, checks, or manual validation that prove the acceptance criteria.
11. Verify each acceptance criterion and record any unmet criteria honestly.
12. When all acceptance criteria are satisfied, update the task file:
    - set `## Status` to `Done` when that section exists,
    - check completed acceptance criteria when the task uses checkboxes,
    - fill `## Done Summary` with files changed, tests run, acceptance criteria status, and risks,
    - move the task file to `<docsRoot>/tasks/done/` without renaming it,
    - move any related implementation plan from `<docsRoot>/plans/` to `<docsRoot>/plans/done/` without renaming it when the task or task range it governs is complete,
    - leave status open and explain blockers when criteria are not satisfied.
13. End with what the user should review and the next recommended action.

## Rules

Hard rules:

- Do not implement before reading the active task.
- Do not open every file in `<docsRoot>/tasks/` just to discover the active task, and do not search `<docsRoot>/tasks/done/` for active work.
- Do not modify unrelated files.
- Do not introduce dependencies without approval.
- Do not claim tests passed unless they were run.
- Do not mark a task `Done` when acceptance criteria are unmet.
- Do not overwrite user changes while updating task status.
- Prefer updating existing task status fields over inventing a new status format.

## Task Status Guidance

Use the task's existing structure first. If the task has only `## Done Summary`, fill it at completion instead of adding a new section. Completed task files should be archived under `<docsRoot>/tasks/done/` after status and summary are updated.
Related implementation plans should be archived under `<docsRoot>/plans/done/` after the task or task range they govern is complete.

Recommended completed summary:

```markdown
## Done Summary

- Files changed: `path/to/file`, `path/to/test`
- Tests run: `npm test`
- Acceptance criteria status: All satisfied.
- Risks: None known.
```

For partial work, do not mark the task done. Record what passed, what remains, and the blocker in the final response. Update the task only if the repository's task format already supports partial status.

Do not rename completed tasks while archiving them. Preserve the original `TASK-XXX-title.md` filename so references from PRDs, ADRs, release notes, and reviews remain stable.
Do not rename archived plans. Preserve the original `TASK-XXX-title-plan.md` filename so task, review, and release references remain stable.

## Quality Checklist

Before finishing, verify:

- [ ] Active task was read.
- [ ] Existing implementation was searched.
- [ ] Implementation plan was created or confirmed.
- [ ] Changes are scoped to the active task.
- [ ] Relevant tests or validation were run.
- [ ] Acceptance criteria were checked one by one.
- [ ] Task status or Done Summary was updated only when justified.

## Failure Modes

Watch out for:

- coding from the plan without rereading the task,
- reading all task files before choosing the active task,
- using broad refactors to solve a narrow task,
- updating status before validation,
- leaving task checkboxes stale after completion,
- leaving completed tasks in the active queue,
- leaving completed implementation plans in the active plan queue,
- hiding test gaps in a positive final summary.

## Example Prompt

```text
Use the task-implementation skill to implement TASK-014, verify acceptance criteria, and update the task Done Summary when complete.
```
