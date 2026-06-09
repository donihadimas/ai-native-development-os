# Context Map

Read `.aios/config.json` first if it exists. Use `docsRoot` as the documentation root; otherwise use `docs`.

## Source of Truth

- Product: `<docsRoot>/product/vision.md`, `<docsRoot>/product/prd.md`, and `<docsRoot>/product/features/`.
- Architecture: `<docsRoot>/architecture/architecture.md`.
- Decisions: `<docsRoot>/adr/`.
- Active tasks: `<docsRoot>/tasks/`.
- API contracts: `<docsRoot>/api/`.
- Database migration plans: `<docsRoot>/database/migrations/`.
- Frontend code: `frontend/`.
- Backend code: `backend/`.

## Routing

- Frontend task: active task, relevant PRD section, API contract if needed, affected files in `frontend/`.
- Backend task: active task, API contract, database plan if needed, affected files in `backend/`.
- Fullstack feature: active task, feature PRD, API contract, related ADRs, frontend and backend affected modules.
- Review: diff, active task acceptance criteria, tests, and review evidence.
