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
- `<docsRoot>/tasks/` - tasks managed in-place with `Status: Done`.
- `<docsRoot>/tasks/index.md` - lightweight task routing index.
- `<docsRoot>/plans/` - active implementation plans managed in-place.
- `<docsRoot>/plans/index.md` - lightweight plan routing index.
- `<docsRoot>/reviews/` - review reports for implemented tasks or changes.
- `<docsRoot>/api/` - API contracts or integration notes.
- `.aios/` - local AIOS workflow kit with references, templates, workflows, config, and optional portable skills.
- `frontend/`, `backend/`, `mobile/`, or `src/` - optional app placeholders based on selected project shape.

## First Use

1. Run `aios config` and confirm `docsRoot`.
2. Read `AGENTS.md` and use `Skill: spec` (product workflow) to fill `<docsRoot>/product/vision.md`.
3. Review the vision, then generate or update `<docsRoot>/product/prd.md`.
4. Generate or write `<docsRoot>/architecture/architecture.md` using `Skill: arch`.
5. Generate or write `<docsRoot>/design/design.md` when the project has user-facing UI.
6. Record important technical decisions in `<docsRoot>/adr/`.
7. Create small active tasks directly under `<docsRoot>/tasks/` using `Skill: task`.
8. Ask the agent to implement one task at a time.
9. Save review evidence in `<docsRoot>/reviews/`, fill Done Summary, and update task status to `Status: Done` in-place before release planning.

Run `aios next` from the project root to see the next recommended step.

