# Prompt: Generate Architecture

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `context-management`, then `architecture-design`. Use `.aios/templates/architecture.template.md` to generate or update `<docsRoot>/architecture/architecture.md`.

Read only:

- `<docsRoot>/product/prd.md`,
- `<docsRoot>/product/vision.md` if PRD context is incomplete,
- related ADRs only if updating an existing architecture.

Before generating the final architecture, apply the `architecture-design` Clarification Gate. If project shape, stack, data, API, auth, or deployment expectations are unclear, ask focused questions first.

List ADR candidates instead of hiding major decisions in the architecture doc.
