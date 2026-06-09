# Prompt: Generate PRD

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `context-management`, then `prd-generator`. Use `.aios/templates/prd.template.md` to generate or update `<docsRoot>/product/prd.md`.

Read only:

- `<docsRoot>/product/vision.md`,
- existing `<docsRoot>/product/prd.md` if updating,
- relevant user-provided notes.

Before generating the final PRD, apply the `prd-generator` Clarification Gate. If the inputs are too thin for testable acceptance criteria, ask focused product questions first.

Do not design architecture or implementation tasks yet. End with open questions and risks.
