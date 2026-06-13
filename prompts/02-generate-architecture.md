# Prompt: Generate Architecture

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `context-management`, then `architecture-design` in full mode. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, PRD, and available architecture instructions/templates. Use `.aios/templates/architecture.template.md` when available to generate or update `<docsRoot>/architecture/architecture.md`.

Read only:

- `<docsRoot>/product/prd.md`,
- `<docsRoot>/product/vision.md` if PRD context is incomplete,
- related ADRs only if updating an existing architecture.

Before generating the final architecture, apply the `architecture-design` Clarification Gate. If project shape, stack, data, API, auth, or deployment expectations are unclear, ask focused questions first.

List ADR candidates instead of hiding major decisions in the architecture doc.

End with a review checklist and a clear next step: the user should review architecture and ADR candidates, create ADRs for important decisions, then generate tasks with `.aios/prompts/04-generate-tasks.md` when available or the task-breakdown workflow in lite mode.
