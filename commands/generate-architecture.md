# Command: Generate Architecture

Resolve `.aios/config.json` first. Use `.aios/prompts/02-generate-architecture.md` and the `architecture-design` skill through `.aios/skill-router.md`.

Read:

- `AGENTS.md`
- `<docsRoot>/context/context-map.md`
- `<docsRoot>/product/prd.md`
- `.aios/templates/architecture.template.md`

Before creating the final architecture, apply the skill's Clarification Gate. If project shape, stack constraints, data, API, auth, or deployment expectations are unclear, ask focused questions first.

Create or update `<docsRoot>/architecture/architecture.md`. Include constraints, app boundaries from `projectShape`, API, data, auth, testing, deployment, and observability notes.
