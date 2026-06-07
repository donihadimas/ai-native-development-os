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
- deciding whether PRD, architecture, ADR, API, or code context is needed.

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
2. Read the active task first when one exists.
3. Use `docs/context/context-map.md` to choose supporting docs.
4. Read PRD only when user value or acceptance criteria are unclear.
5. Read architecture or ADRs only when the task touches design decisions or cross-cutting behavior.
6. Read API docs when frontend/backend integration is involved.
7. Search affected code before proposing new abstractions.
8. Stop reading once the plan can be made safely.

## Rules

Hard rules:

- Do not read the whole repository by default.
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
- ignoring task-specific instructions,
- over-reading product docs for a small code task,
- missing an ADR that changes constraints,
- creating abstractions before searching existing code.

## Example Prompt

```text
Use the context-management skill to decide what Codex should read before implementing TASK-012.
```
