# Prompt: Generate ADR

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `adr-generator` in full mode. In lite mode or when `.aios/` is missing, use the available ADR skill/template or follow the same ADR structure manually. Use `.aios/templates/adr.template.md` when available to create `<docsRoot>/adr/ADR-XXX-title.md`.

Read only:

- the decision request,
- related PRD or architecture sections,
- existing ADRs only when checking for conflicts or supersession.

Before generating the ADR, apply the `adr-generator` Clarification Gate. If decision topic, alternatives, or consequences are unclear, ask focused questions first.

Do not overwrite previous ADRs. Create a new ADR when a decision changes.

End with what the user should review, whether the decision is ready to accept, and the next step: update architecture or tasks that depend on this ADR.
