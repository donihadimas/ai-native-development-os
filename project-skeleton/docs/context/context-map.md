# Context Map

Use this file to choose the smallest useful context set for each task.

## Source of Truth

- Product intent: `docs/product/vision.md` and `docs/product/prd.md`.
- Feature PRDs: `docs/product/features/`.
- System design: `docs/architecture/architecture.md`.
- Technical decisions: `docs/adr/`.
- Active work: `docs/tasks/`.
- Review evidence: `docs/reviews/`.
- API contracts and integration notes: `docs/api/`.
- Local AIOS workflow kit: `.aios/`.
- Code context: affected files and nearby tests in `frontend/` or `backend/`.

## Task Routing

### New Feature

Read the active task, relevant PRD section, related ADRs, API docs if frontend/backend integration is involved, `.aios/workflows/new-feature.workflow.md`, and affected modules.

### Bugfix

Read the bugfix task, affected files, related tests, and related ADR only if the bug touches architecture or cross-cutting behavior.

### Refactor

Read the refactor task, architecture document, related ADRs, affected modules, and existing tests.

### Review

Read the diff, active task acceptance criteria, relevant ADRs, testing evidence, `.aios/skills/code-review/SKILL.md`, and changed files.

## Anti-Patterns

- Do not dump the whole repository into context.
- Do not read all ADRs for a local code change.
- Do not read the full PRD when the task already has clear acceptance criteria.
- Do not treat stale documentation as stronger than verified code behavior.
