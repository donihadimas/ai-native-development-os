# Artifact Lifecycle

Use this reference when routing tasks, plans, or completed work.

## Task Lifecycle

- Active and completed tasks live directly under `<docsRoot>/tasks/`.
- Update task status (`Status: Done`) in-place in `<docsRoot>/tasks/`.
- Do not move task files into `done/` subfolders; git history and the status field preserve archival tracking.
- Set `Status: Done` only after:
  - acceptance criteria are verified,
  - validation evidence is recorded,
  - `## Done Summary` is filled.

## Plan Lifecycle

- Active and completed implementation plans live directly under `<docsRoot>/plans/`.
- Update plan status in-place under `<docsRoot>/plans/`.
- Do not move plan files into `done/` subfolders.
- Multi-task plans stay active until every task they govern is complete.

## Summary-First Reading

- Prefer indexes, summaries, headings, status, and acceptance criteria before reading full artifact bodies.
- For large PRDs, architecture docs, design docs, release notes, or reviews, read the summary and relevant section headings first.
- Read the full document only when the summary and selected sections are insufficient to plan, implement, test, or review safely.

## Index Maintenance

- Update `tasks/index.md` when creating, blocking, completing, or reopening a task.
- Update `plans/index.md` when creating, completing, or reopening a plan.
- Do not treat stale index entries as stronger evidence than file status or verified repository state.

