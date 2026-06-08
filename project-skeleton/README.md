# AI-Ready Project Skeleton

This skeleton is a generic AI-native project shell. `aios init` can keep it fullstack or trim it to frontend-only, backend-only, mobile, library, or docs-only with `--shape`.

## Structure

- `AGENTS.md` - primary coding-agent instructions.
- `CLAUDE.md` - optional compatibility instructions for Claude-style agents.
- `.aios/config.json` - selected docs root, project shape, agents, and skill delivery mode.
- `<docsRoot>/product/` - vision and PRD.
- `<docsRoot>/product/features/` - feature-level PRD stubs created by `aios feature`.
- `<docsRoot>/architecture/` - system architecture.
- `<docsRoot>/adr/` - architecture decision records.
- `<docsRoot>/tasks/` - small implementation-ready tasks.
- `<docsRoot>/reviews/` - review reports for implemented tasks or changes.
- `<docsRoot>/api/` - API contracts or integration notes.
- `<docsRoot>/context/context-map.md` - context routing guide.
- `<docsRoot>/context/development-start.md` - first-run guide for AI-native development.
- `.aios/` - local AIOS workflow kit with prompts, commands, references, templates, workflows, config, and optional portable skills.
- `frontend/`, `backend/`, `mobile/`, or `src/` - optional app placeholders based on selected project shape.

## First Use

1. Run `aios config` and confirm `docsRoot`.
2. Fill `<docsRoot>/product/vision.md`.
3. Ask Codex to read `AGENTS.md` and `.aios/prompts/01-generate-prd.md`.
4. Generate or write `<docsRoot>/product/prd.md`.
5. Generate or write `<docsRoot>/architecture/architecture.md`.
6. Record important technical decisions in `<docsRoot>/adr/`.
7. Create small tasks in `<docsRoot>/tasks/`.
8. Ask the agent to implement one task at a time.
9. Save review evidence in `<docsRoot>/reviews/` before marking work done.

Run `aios next` from the project root to see the next recommended step.
