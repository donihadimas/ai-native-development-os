# Context Map

Use this file to choose the smallest useful context set for each task.

Before routing, read `.aios/config.json` if it exists:

- Use `mode` to decide workflow access:
  - `full`: use `.aios/skill-router.md`, `.aios/prompts/`, `.aios/templates/`, `.aios/references/`, and `.aios/workflows/`.
  - `lite`: use project docs, `AGENTS.md`, and root or agent-provided AIOS instructions when available. Do not assume `.aios/` exists.
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
- UI/UX design: `<docsRoot>/design/design.md`.
- Technical decisions: `<docsRoot>/adr/`.
- Active work: `<docsRoot>/tasks/`.
- Review evidence: `<docsRoot>/reviews/`.
- API contracts and integration notes: `<docsRoot>/api/`.
- Local AIOS workflow kit: `.aios/` in full mode only.
- Code context: affected files and nearby tests in the code areas implied by `projectShape`.

## Task Routing

### New Feature

Read the active task, relevant PRD section, design docs if the feature is user-facing, related ADRs, API docs if app integration is involved, the new-feature workflow when available, and affected modules.

### Bugfix

Read the bugfix task, affected files, related tests, and related ADR only if the bug touches architecture or cross-cutting behavior.

### UI/UX Design

Read the relevant PRD or feature PRD, product vision if design intent is unclear, architecture/API notes when data dependencies matter, `<docsRoot>/design/design.md` if updating, and the UI/UX design workflow when available.

### Refactor

Read the refactor task, architecture document, related ADRs, affected modules, and existing tests.

### Review

Read the diff, active task acceptance criteria, relevant ADRs, testing evidence, the skill router when available, and changed files.

## Next Step Rule

Every agent response at the end of a workflow should say what the user should review, whether the current artifact is ready, and the next recommended action.

## Anti-Patterns

- Do not dump the whole repository into context.
- Do not read all ADRs for a local code change.
- Do not read the full PRD when the task already has clear acceptance criteria.
- Do not treat stale documentation as stronger than verified code behavior.
