# Command: Generate Architecture

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/workflows/new-project.workflow.md` or `.aios/workflows/new-feature.workflow.md` as appropriate, `.aios/prompts/02-generate-architecture.md`, and the `architecture-design` skill through `.aios/skill-router.md`; read `skill-router.md` Artifact Routing for matching references and templates. In lite mode, use available architecture instructions and templates without assuming `.aios/` exists.

Read:

- `AGENTS.md`
- `<docsRoot>/context/context-map.md`
- `<docsRoot>/product/prd.md`
- `.aios/templates/architecture.template.md` when available

Before creating the final architecture, apply the skill's Clarification Gate. If project shape, stack constraints, data, API, auth, or deployment expectations are unclear, ask focused questions first.

Create or update `<docsRoot>/architecture/architecture.md`. Include constraints, app boundaries from `projectShape`, API, data, auth, testing, deployment, observability notes, ADR candidates, and next step guidance.

End with:

- what the user should review in the architecture,
- which decisions should become ADRs,
- the next step after user approval: create ADRs, then generate tasks with `.aios/prompts/04-generate-tasks.md` when available or the task-breakdown workflow in lite mode.
