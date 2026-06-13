# Command: Design UI

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/prompts/13-design-ui-ux.md` and the `ui-ux-design` skill through `.aios/skill-router.md`. In lite mode, use available design guidance and templates without assuming `.aios/` exists.

Read:

- relevant PRD or feature PRD
- product vision when design intent is unclear
- related architecture section when UI boundaries depend on system shape
- API contracts in `<docsRoot>/api/` when data exchange is involved
- `.aios/templates/design.template.md` when available

Before creating the design document, apply the skill's Clarification Gate. If user flow, screens, interface states, data dependencies, or accessibility expectations are unclear, ask focused questions first.

Create or update `<docsRoot>/design/design.md` before frontend or product-facing implementation.

End with what the user should review and the next step: approve the design, then create frontend or product-facing implementation tasks.
