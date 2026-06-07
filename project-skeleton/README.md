# AI-Ready Project Skeleton

This skeleton is a generic fullstack project shell for AI-native development. Copy it into a new project, then fill the docs before asking an AI agent to implement code.

## Structure

- `AGENTS.md` - primary coding-agent instructions.
- `CLAUDE.md` - optional compatibility instructions for Claude-style agents.
- `docs/product/` - vision and PRD.
- `docs/product/features/` - feature-level PRD stubs created by `aios feature`.
- `docs/architecture/` - system architecture.
- `docs/adr/` - architecture decision records.
- `docs/tasks/` - small implementation-ready tasks.
- `docs/reviews/` - review reports for implemented tasks or changes.
- `docs/api/` - API contracts or integration notes.
- `docs/context/context-map.md` - context routing guide.
- `docs/context/development-start.md` - first-run guide for AI-native development.
- `.aios/` - local AIOS workflow kit with skills, prompts, references, templates, and workflows.
- `frontend/` - frontend application placeholder.
- `backend/` - backend application placeholder.

## First Use

1. Fill `docs/product/vision.md`.
2. Ask Codex to read `AGENTS.md` and `.aios/prompts/01-generate-prd.md`.
3. Generate or write `docs/product/prd.md`.
4. Generate or write `docs/architecture/architecture.md`.
5. Record important technical decisions in `docs/adr/`.
6. Create small tasks in `docs/tasks/`.
7. Ask the agent to implement one task at a time.
8. Save review evidence in `docs/reviews/` before marking work done.

Run `aios next` from the project root to see the next recommended step.
