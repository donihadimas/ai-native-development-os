# Context Map

Read `.aios/config.json` first if it exists. Use `docsRoot` as the documentation root; otherwise use `docs`.

## Source of Truth

- Product: `<docsRoot>/product/vision.md`, `<docsRoot>/product/prd.md`, and `<docsRoot>/product/features/`.
- Architecture: `<docsRoot>/architecture/architecture.md`.
- Decisions: `<docsRoot>/adr/`.
- Active tasks: `<docsRoot>/tasks/`.
- API contracts: `<docsRoot>/api/`.
- Database migration plans: `<docsRoot>/database/migrations/`.
- App code: `app/`.
- Supabase files: `supabase/`.

## Routing

- App task: active task, relevant PRD section, architecture notes, affected files in `app/`.
- Database task: active task, migration plan, related ADRs, affected files in `supabase/`.
- Review: diff, active task acceptance criteria, tests, and review evidence.
