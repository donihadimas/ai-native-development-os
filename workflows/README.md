# Workflows

Workflows describe end-to-end development sequences. They connect skills and templates into practical manual and assisted flows from idea to release.

In generated projects, workflows should resolve `.aios/config.json` first. Use `docsRoot`, `projectShape`, and `mode` for routing.

- Full mode: use `.aios/skill-router.md`, `.aios/prompts/`, `.aios/templates/`, `.aios/references/`, and `.aios/workflows/`.
- Lite mode or missing config: use `AGENTS.md`, project docs, and root or agent-provided AIOS instructions when available. Do not assume `.aios/` exists.

Every workflow should end with a clear next recommended action.

V2 adds API contract workflow so frontend and backend tasks can share an explicit contract before implementation.

V2.x adds UI/UX design, database migration, and security review workflows, and expands release workflow for release notes, changelog drafts, rollback notes, and post-release checks.
