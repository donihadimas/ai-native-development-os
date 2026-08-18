# Artifact Lifecycle

Use this reference when routing tasks, plans, or completed work.

## Task Index

- Read `<docsRoot>/tasks/index.md` before opening task files when it exists.
- Use the index to identify active, blocked, planned, and archived tasks.
- Open a task body only after selecting the relevant task.
- If the index is missing or stale, list direct files under `<docsRoot>/tasks/` and update the index after changing task state.

## Task Archive

- Active tasks live directly under `<docsRoot>/tasks/`.
- Completed tasks live under `<docsRoot>/tasks/done/`.
- Do not search `<docsRoot>/tasks/done/` for active work.
- Move a task to `<docsRoot>/tasks/done/` only after:
  - `## Status` is `Done`,
  - acceptance criteria are verified,
  - validation evidence is recorded,
  - `## Done Summary` is filled.
- Preserve the original `TASK-XXX-title.md` filename when archiving.

## Plan Index

- Read `<docsRoot>/plans/index.md` before opening implementation plan files when it exists.
- Use the index to identify active plans and archived plans.
- Open a plan body only after selecting the relevant plan.
- If the index is missing or stale, list direct files under `<docsRoot>/plans/` and update the index after changing plan state.

## Plan Archive

- Active implementation plans live directly under `<docsRoot>/plans/`.
- Completed implementation plans live under `<docsRoot>/plans/done/`.
- Do not search `<docsRoot>/plans/done/` for active planning.
- Move a plan to `<docsRoot>/plans/done/` only after the task or task range it governs is complete and archived.
- Multi-task plans stay active until every task they govern is complete.
- Preserve the original `TASK-XXX-title-plan.md` filename when archiving.

## Summary-First Reading

- Prefer indexes, summaries, headings, status, and acceptance criteria before reading full artifact bodies.
- For large PRDs, architecture docs, design docs, release notes, or reviews, read the summary and relevant section headings first.
- Read the full document only when the summary and selected sections are insufficient to plan, implement, test, or review safely.

## Index Maintenance

- Update `tasks/index.md` when creating, blocking, completing, reopening, or archiving a task.
- Update `plans/index.md` when creating, completing, reopening, or archiving a plan.
- Do not treat stale index entries as stronger evidence than file status or verified repository state.
