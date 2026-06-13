# Command: Generate Tasks

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/prompts/04-generate-tasks.md` and the `task-breakdown` skill through `.aios/skill-router.md`. In lite mode, use available task breakdown instructions and templates without assuming `.aios/` exists.

Read:

- `AGENTS.md`
- `<docsRoot>/context/context-map.md`
- relevant PRD or feature PRD
- related ADRs if mentioned
- `.aios/templates/task.template.md` when available

Before creating task files, apply the skill's Clarification Gate. If scope, ownership, acceptance criteria, dependencies, or tests are unclear, ask focused questions first.

Create small implementation-ready tasks in `<docsRoot>/tasks/` with acceptance criteria and testing expectations.

End with:

- the recommended first task,
- what the user should review before implementation,
- the next step after user approval: implement one selected task with `implementation-planner`.
