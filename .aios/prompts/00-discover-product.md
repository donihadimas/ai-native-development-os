# Prompt: Discover Product Vision

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `context-management`, then `product-discovery` in full mode. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, the raw user idea, and available product discovery guidance. Use `.aios/templates/vision.template.md` when available to create or update `<docsRoot>/product/vision.md`.

Start with a lightweight interview when the product idea is rough. Ask 3-6 focused questions before writing the final vision if the primary user, painful problem, MVP scope, non-goals, success metrics, or constraints are unclear. Prefer multiple-choice questions when they reduce friction for a beginner.

Read only:

- raw user idea or notes,
- existing `<docsRoot>/product/vision.md` if updating,
- `<docsRoot>/context/context-map.md` when available.

Do not generate the PRD yet. Create or update `<docsRoot>/product/vision.md` with problem, users, value proposition, MVP scope, out-of-scope items, success metrics, constraints, assumptions, and open questions.

End with what the user should review in the vision and the next step: after the user accepts the vision, generate `<docsRoot>/product/prd.md` with `.aios/prompts/01-generate-prd.md` when available or the PRD workflow in lite mode.

