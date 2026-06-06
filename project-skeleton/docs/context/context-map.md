# Context Map

Use this file to choose the smallest useful context set for each task.

## Source of Truth

- Product intent: `docs/product/vision.md` and `docs/product/prd.md`.
- System design: `docs/architecture/architecture.md`.
- Technical decisions: `docs/adr/`.
- Active work: `docs/tasks/`.
- API contracts and integration notes: `docs/api/`.
- Code context: affected files and nearby tests in `frontend/` or `backend/`.

## Task Routing

### New Feature

Read the active task, relevant PRD section, related ADRs, API docs if frontend/backend integration is involved, and affected modules.

### Bugfix

Read the bugfix task, affected files, related tests, and related ADR only if the bug touches architecture or cross-cutting behavior.

### Refactor

Read the refactor task, architecture document, related ADRs, affected modules, and existing tests.

### Review

Read the diff, active task acceptance criteria, relevant ADRs, testing evidence, and changed files.

## Anti-Patterns

- Do not dump the whole repository into context.
- Do not read all ADRs for a local code change.
- Do not read the full PRD when the task already has clear acceptance criteria.
- Do not treat stale documentation as stronger than verified code behavior.
