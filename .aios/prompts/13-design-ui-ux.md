# Prompt: Design UI/UX

Resolve `.aios/config.json` first if it exists. Use its `docsRoot` and `projectShape`; otherwise use `docs` and infer project shape from the repo.

Use `.aios/skill-router.md` to route through `context-management`, then `ui-ux-design` in full mode. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, PRD or feature PRD, architecture notes, API docs when relevant, and available design guidance. Use `.aios/templates/design.template.md` when available to create or update `<docsRoot>/design/design.md`.

Read only:

- relevant PRD or feature PRD,
- product vision if design intent is unclear,
- related architecture section when UI boundaries depend on system shape,
- API contract notes if data exchange is involved,
- existing design notes if updating.

Before generating the final design, apply the `ui-ux-design` Clarification Gate. If user flow, screens, interface states, data dependencies, or accessibility expectations are unclear, ask focused questions first.

Do not implement app code yet. End with what the user should review and the next step: approve the design, then generate frontend or product-facing tasks with `.aios/prompts/04-generate-tasks.md` when available or the task-breakdown workflow in lite mode.
