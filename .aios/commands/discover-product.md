# Command: Discover Product Vision

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/prompts/00-discover-product.md` and the `product-discovery` skill through `.aios/skill-router.md`. In lite mode, use available product discovery guidance and templates without assuming `.aios/` exists.

Use this before PRD generation when the user only has a rough idea.

Read:

- `AGENTS.md`
- `<docsRoot>/context/context-map.md` when available
- `<docsRoot>/product/vision.md` if it exists
- `.aios/templates/vision.template.md` when available

Interview the user first if the vision is too thin. Ask 3-6 focused questions about:

- primary user,
- painful problem or job-to-be-done,
- smallest useful MVP,
- non-goals,
- success metrics,
- constraints.

Create or update `<docsRoot>/product/vision.md`. Keep it concise, reviewable, and useful as the input for PRD generation.

End with:

- what the user should review in the vision,
- whether the vision is ready for PRD generation,
- the next step after user approval: generate `<docsRoot>/product/prd.md` with `.aios/prompts/01-generate-prd.md` when available or the PRD workflow in lite mode.

