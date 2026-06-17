# Prompt: Generate PRD

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `context-management`, then `prd-generator` in full mode. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, and available PRD instructions/templates. Use `.aios/templates/prd.template.md` when available to generate or update `<docsRoot>/product/prd.md`.

Read only:

- `<docsRoot>/product/vision.md`,
- existing `<docsRoot>/product/prd.md` if updating,
- relevant user-provided notes.

Before generating the final PRD, apply the `prd-generator` Clarification Gate. If the inputs are too thin for testable acceptance criteria, ask focused product questions first.

Include a product-level Mermaid chart that shows the user journey or feature flow. Do not use it for technical architecture.

Do not design architecture or implementation tasks yet. End with open questions, risks, a review checklist, and a clear next step: the user should review the PRD, then generate architecture with `.aios/prompts/02-generate-architecture.md` when available or the architecture workflow in lite mode.
