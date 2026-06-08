# Prompt: Generate ADR

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `adr-generator`. Use `.aios/templates/adr.template.md` to create `<docsRoot>/adr/ADR-XXX-title.md`.

Read only:

- the decision request,
- related PRD or architecture sections,
- existing ADRs only when checking for conflicts or supersession.

Do not overwrite previous ADRs. Create a new ADR when a decision changes.
