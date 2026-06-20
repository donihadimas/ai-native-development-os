# AI-Ready Project Skeleton

This skeleton is a generic AI-native project shell. `aios init` can keep it fullstack or trim it to frontend-only, backend-only, mobile, library, or docs-only with `--shape`.

## Structure

- `AGENTS.md` - primary coding-agent instructions.
- `CLAUDE.md` - optional compatibility instructions for Claude-style agents.
- `.aios/config.json` - selected docs root, project shape, agents, and skill delivery mode.
- `<docsRoot>/product/` - vision and PRD.
- `<docsRoot>/product/features/` - feature-level PRD stubs created by `aios create feature`.
- `<docsRoot>/design/` - UI/UX design notes for user flows, screens, states, and accessibility.
- `<docsRoot>/architecture/` - system architecture.
- `<docsRoot>/adr/` - architecture decision records.
- `<docsRoot>/tasks/` - active implementation-ready tasks.
- `<docsRoot>/tasks/index.md` - lightweight task routing index.
- `<docsRoot>/tasks/done/` - completed task archive with original filenames preserved.
- `<docsRoot>/plans/` - active implementation plans.
- `<docsRoot>/plans/index.md` - lightweight plan routing index.
- `<docsRoot>/plans/done/` - completed implementation plan archive with original filenames preserved.
- `<docsRoot>/reviews/` - review reports for implemented tasks or changes.
- `<docsRoot>/api/` - API contracts or integration notes.
- `<docsRoot>/context/context-map.md` - context routing guide.
- `<docsRoot>/context/development-start.md` - first-run guide for AI-native development.
- `.aios/` - local AIOS workflow kit with prompts, commands, references, templates, workflows, config, and optional portable skills.
- `frontend/`, `backend/`, `mobile/`, or `src/` - optional app placeholders based on selected project shape.

## First Use

1. Run `aios config` and confirm `docsRoot`.
2. In full mode, ask Codex to read `AGENTS.md` and `.aios/prompts/00-discover-product.md`, interview you, and fill `<docsRoot>/product/vision.md`. In lite mode, ask Codex to use `AGENTS.md`, `<docsRoot>/context/context-map.md`, and the product discovery workflow manually.
3. Review the vision, then generate the PRD with `.aios/prompts/01-generate-prd.md` in full mode or the PRD workflow manually in lite mode.
4. Generate or write `<docsRoot>/product/prd.md`.
5. Generate or write `<docsRoot>/architecture/architecture.md`.
6. Generate or write `<docsRoot>/design/design.md` when the project has user-facing UI.
7. Record important technical decisions in `<docsRoot>/adr/`.
8. Create small active tasks directly under `<docsRoot>/tasks/`.
9. Ask the agent to implement one task at a time.
10. Save review evidence in `<docsRoot>/reviews/`, fill Done Summary, then move completed tasks to `<docsRoot>/tasks/done/` and related plans to `<docsRoot>/plans/done/` before release planning.

Run `aios next` from the project root to see the next recommended step.
