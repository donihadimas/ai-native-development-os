# Command: Create ADR

Resolve `.aios/config.json` first when it exists. In full mode, use the active workflow that created the decision, `.aios/prompts/03-generate-adr.md`, and the `adr-generator` skill through `.aios/skill-router.md`; read `skill-router.md` Artifact Routing for matching references and templates. In lite mode, use available ADR instructions and templates without assuming `.aios/` exists.

Read:

- `AGENTS.md`
- related PRD or architecture section under `<docsRoot>/`
- `.aios/templates/adr.template.md` when available

Before creating the ADR, apply the skill's Clarification Gate. If the decision, alternatives, or consequences are unclear, ask focused questions first.

Create a focused ADR in `<docsRoot>/adr/`. Keep one decision per ADR.

End with what the user should review and the next step: update architecture or task dependencies that rely on this decision.
