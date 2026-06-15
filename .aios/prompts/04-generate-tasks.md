# Prompt: Generate Tasks

Resolve `.aios/config.json` first if it exists. Use its `docsRoot` and `projectShape`; otherwise use `docs` and infer project shape from the repo.

Use `.aios/skill-router.md` to route through `context-management`, then `task-breakdown` in full mode. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, PRD, architecture, design docs when user-facing UI is involved, ADRs, and available task template guidance. Use `.aios/templates/task.template.md` when available to create implementation-ready tasks in `<docsRoot>/tasks/`.

Read only:

- relevant PRD sections,
- relevant architecture sections,
- related design notes if the task is user-facing,
- related ADRs,
- API notes if app integration is involved.

Before creating task files, apply the `task-breakdown` Clarification Gate. If scope, ownership, acceptance criteria, dependencies, or tests are unclear, ask focused questions first.

Keep tasks small, single-objective, testable, and scoped.

End with a clear next step: the user should review the generated task list, pick one active task, then ask Codex to use `implementation-planner` before coding and `task-implementation` for execution.
