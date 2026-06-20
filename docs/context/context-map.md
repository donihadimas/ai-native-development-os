# Context Map

Use this file to choose the smallest useful context set for each task.

Before routing, read `.aios/config.json` if it exists:

- Use `mode` to decide workflow access:
  - `full`: read `.aios/skill-router.md`, then open only the specific prompt, template, reference, and workflow files selected for the current lifecycle step. Do not preload whole `.aios/` folders.
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

## Active Task Discovery

When a workflow requires an active task:

1. Use a task ID, task title, or task file path from the user request when provided.
2. Otherwise use the IDE active file or recent conversation when it clearly points to one task.
3. Otherwise list filenames in `<docsRoot>/tasks/` first; do not read every task body.
4. Search task headings or status lines with terms from the user request only when filenames are not enough, then open only the top 1-3 likely candidates.
5. Ask the user to choose the active task, or ask whether to create a new task, when no confident match exists.

Do not scan full task contents just to discover the active task. Do not pick a `Done` task unless the user asks to review or continue it.

## Task Routing

### New Feature

Read the active task, the relevant PRD section only when acceptance criteria are unclear, the selected new-feature workflow when available, design docs only for user-facing changes, API docs only for integration boundaries, related ADRs only when they govern the change, and affected modules.

### Bugfix

Read the bugfix task, affected files, related tests, and related ADR only if the bug touches architecture or cross-cutting behavior.

### UI/UX Design

Read the relevant PRD or feature PRD section, product vision only when design intent is unclear, architecture/API notes only when data dependencies matter, `<docsRoot>/design/design.md` if updating, and the UI/UX design workflow when available.

### Refactor

Read the refactor task, affected modules, existing tests, architecture sections only when the refactor touches boundaries or cross-cutting behavior, and related ADRs only when they govern the affected area.

### Review

Read the diff, active task acceptance criteria, testing evidence, the skill router when available, changed files, and relevant ADRs only when the diff touches decisions they govern.

## Next Step Rule

Every agent response at the end of a workflow should say what the user should review, whether the current artifact is ready, and the next recommended action.

## Anti-Patterns

- Do not dump the whole repository into context.
- Do not read all ADRs for a local code change.
- Do not read the full PRD when the task already has clear acceptance criteria.
- Do not treat stale documentation as stronger than verified code behavior.
