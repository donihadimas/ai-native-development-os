# Command: Generate Tasks

Resolve `.aios/config.json` first when it exists. In full mode, use the selected primary workflow, `.aios/prompts/04-generate-tasks.md`, and the `task-breakdown` skill through `.aios/skill-router.md`; read `skill-router.md` Artifact Routing for matching references and templates. In lite mode, use available task breakdown instructions and templates without assuming `.aios/` exists.

Read:

- `AGENTS.md`
- `<docsRoot>/context/context-map.md`
- relevant PRD or feature PRD
- design notes in `<docsRoot>/design/` when UI or product-facing interaction is involved
- related ADRs if mentioned
- `.aios/templates/task.template.md` when available

Before creating task files, apply the skill's Clarification Gate. If scope, ownership, acceptance criteria, dependencies, or tests are unclear, ask focused questions first.

Create small implementation-ready tasks directly under `<docsRoot>/tasks/` with acceptance criteria and testing expectations. Do not create new work in `<docsRoot>/tasks/done/`; that folder is only for completed-task archive.

End with:

- the recommended first task,
- what the user should review before implementation,
- the next step after user approval: plan one selected task with `implementation-planner`, then implement it with `task-implementation`, and archive it to `<docsRoot>/tasks/done/` only after completion.
