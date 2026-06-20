---
name: context-management
description: Use when deciding which documents, tasks, references, and code files an AI agent should read before planning, implementing, testing, or reviewing.
---

# Context Management

## Goal

Route the agent to the minimum useful context for the current work without dumping the entire repository.

## When to Use

Use this skill when:

- starting a new task,
- planning implementation,
- reviewing a diff,
- investigating a bug,
- deciding whether PRD, design, architecture, ADR, API, or code context is needed.

## Inputs

Expected inputs:

- user request or active task,
- `docs/context/context-map.md` when available,
- relevant file paths if already known.

## Outputs

Expected outputs:

- context checklist,
- files or docs to read,
- files or docs intentionally skipped,
- risk notes for missing context.

## Process

Step-by-step process:

1. Identify the task type: new feature, bugfix, refactor, review, testing, or documentation.
2. Resolve the active task without reading every task body: use an explicit task ID/path first, then IDE or conversation context, then direct task filenames under `docs/tasks/`, then a narrow heading/status search with user-request terms. Exclude `docs/tasks/done/` unless completed-task history is requested.
3. Read the active task first when one clear task exists; if no clear task exists, ask which task is active or whether to create one.
4. Use `docs/context/context-map.md` to choose supporting docs.
5. Read PRD only when user value or acceptance criteria are unclear.
6. Read design docs when the task changes user-facing flows, screens, states, or accessibility.
7. Read architecture or ADRs only when the task touches design decisions or cross-cutting behavior.
8. Read API docs when frontend/backend integration is involved.
9. Search affected code before proposing new abstractions.
10. Stop reading once the plan can be made safely.

## Rules

Hard rules:

- Do not read the whole repository by default.
- Do not open every file in `docs/tasks/` just to discover the active task, and do not search `docs/tasks/done/` for active work.
- Do not read every ADR unless the task explicitly requires it.
- Do not use stale docs as stronger evidence than verified behavior.
- Do not continue implementation when acceptance criteria are missing or contradictory.

## Quality Checklist

Before finishing, verify:

- [ ] The active task was considered first.
- [ ] Context choices match the task type.
- [ ] Unnecessary docs were skipped.
- [ ] Affected code or tests were searched when implementation is planned.
- [ ] Missing context risks are named.

## Failure Modes

Watch out for:

- context dumping,
- reading all task files to find one active task,
- ignoring task-specific instructions,
- over-reading product docs for a small code task,
- missing an ADR that changes constraints,
- creating abstractions before searching existing code.

## Example Prompt

```text
Use the context-management skill to decide what Codex should read before implementing TASK-012.
```
