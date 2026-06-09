# Context Map

Use this file to choose the smallest useful context set for each task.

Before routing, read `.aios/config.json` if it exists:

- Use `docsRoot` as the documentation root. If missing, use `docs`.
- Use `projectShape` to decide code areas:
  - `fullstack`: `frontend/` and `backend/`
  - `frontend`: `frontend/`
  - `backend`: `backend/`
  - `mobile`: `mobile/`
  - `library`: `src/`
  - `docs`: documentation only

## Source of Truth

- Product intent: `<docsRoot>/product/vision.md` and `<docsRoot>/product/prd.md`.
- Feature PRDs: `<docsRoot>/product/features/`.
- System design: `<docsRoot>/architecture/architecture.md`.
- Technical decisions: `<docsRoot>/adr/`.
- Active work: `<docsRoot>/tasks/`.
- Review evidence: `<docsRoot>/reviews/`.
- API contracts and integration notes: `<docsRoot>/api/`.
- Local AIOS workflow kit: `.aios/`.
- Code context: affected files and nearby tests in the code areas implied by `projectShape`.

## Task Routing

### New Feature

Read the active task, relevant PRD section, related ADRs, API docs if app integration is involved, `.aios/workflows/new-feature.workflow.md`, and affected modules.

### Bugfix

Read the bugfix task, affected files, related tests, and related ADR only if the bug touches architecture or cross-cutting behavior.

### Refactor

Read the refactor task, architecture document, related ADRs, affected modules, and existing tests.

### Review

Read the diff, active task acceptance criteria, relevant ADRs, testing evidence, `.aios/skill-router.md`, and changed files.

## Anti-Patterns

- Do not dump the whole repository into context.
- Do not read all ADRs for a local code change.
- Do not read the full PRD when the task already has clear acceptance criteria.
- Do not treat stale documentation as stronger than verified code behavior.
