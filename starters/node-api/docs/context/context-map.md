# Context Map

Read `.aios/config.json` first if it exists. Use `docsRoot` as the documentation root; otherwise use `docs`.

## Source of Truth

- Product: `<docsRoot>/product/vision.md`, `<docsRoot>/product/prd.md`, and `<docsRoot>/product/features/`.
- Architecture: `<docsRoot>/architecture/architecture.md`.
- Decisions: `<docsRoot>/adr/`.
- Active tasks: `<docsRoot>/tasks/`.
- API contracts: `<docsRoot>/api/`.
- Backend code: `backend/`.

## Routing

- API task: active task, API contract, relevant PRD section, related ADRs, affected files in `backend/`.
- Database task: active task, database migration plan, architecture constraints, affected backend files.
- Review: diff, active task acceptance criteria, tests, and review evidence.
