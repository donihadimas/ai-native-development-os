# Command: Generate PRD

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/prompts/01-generate-prd.md` and the `prd-generator` skill through `.aios/skill-router.md`. In lite mode, use available PRD instructions and templates without assuming `.aios/` exists.

Read:

- `AGENTS.md`
- `<docsRoot>/context/context-map.md`
- `<docsRoot>/product/vision.md`
- `.aios/templates/prd.template.md` when available

Before creating the final PRD, apply the skill's Clarification Gate. If product intent, scope, target users, success metrics, or constraints are vague, use product discovery first with `.aios/commands/discover-product.md` when available or ask focused questions before writing the PRD.

Create or update `<docsRoot>/product/prd.md`. Keep acceptance criteria testable, include a product-level Mermaid flow chart, and record open questions.

End with:

- what the user should review in the PRD,
- whether the PRD is ready for architecture,
- the next step after user approval: generate `<docsRoot>/architecture/architecture.md` with `.aios/prompts/02-generate-architecture.md` when available or the architecture workflow in lite mode.
