# Prompt: Generate Tasks

Resolve `.aios/config.json` first if it exists. Use its `docsRoot` and `projectShape`; otherwise use `docs` and infer project shape from the repo.

Use `.aios/skill-router.md` to route through `context-management`, then `task-breakdown`. Use `.aios/templates/task.template.md` to create implementation-ready tasks in `<docsRoot>/tasks/`.

Read only:

- relevant PRD sections,
- relevant architecture sections,
- related ADRs,
- API notes if app integration is involved.

Before creating task files, apply the `task-breakdown` Clarification Gate. If scope, ownership, acceptance criteria, dependencies, or tests are unclear, ask focused questions first.

Keep tasks small, single-objective, testable, and scoped.
