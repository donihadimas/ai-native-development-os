# Context Map

Read `.aios/config.json` first if it exists. Use `docsRoot` as the documentation root; otherwise use `docs`.

## Source of Truth

- Product: `<docsRoot>/product/vision.md`, `<docsRoot>/product/prd.md`, and `<docsRoot>/product/features/`.
- Architecture: `<docsRoot>/architecture/architecture.md`.
- Decisions: `<docsRoot>/adr/`.
- Active tasks: `<docsRoot>/tasks/`.
- API contracts: `<docsRoot>/api/`.
- App code: `frontend/`.

## Routing

- Web UI task: active task, relevant PRD section, architecture frontend notes, affected files in `frontend/`.
- API integration: active task, API contract, related ADRs, affected frontend code.
- Review: diff, active task acceptance criteria, tests, and review evidence.
