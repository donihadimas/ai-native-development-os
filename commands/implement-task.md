# Command: Implement Task

Resolve `.aios/config.json` first when it exists. In full mode, use the selected primary workflow, `.aios/prompts/06-implement-task.md`, `implementation-planner`, and `task-implementation` through `.aios/skill-router.md`; read `skill-router.md` Artifact Routing and Active Task Discovery before opening task files. In lite mode, use `AGENTS.md`, the context map, active task, affected code, nearby tests, and the task status rules without assuming `.aios/` exists.

Read:

- `AGENTS.md`
- `<docsRoot>/context/context-map.md`
- active task in `<docsRoot>/tasks/`
- affected files and nearby tests

If the active task is not explicit, list direct task filenames in `<docsRoot>/tasks/` first and open only the top 1-3 likely candidates. Do not open every task file or search `<docsRoot>/tasks/done/` to discover active work.

Before coding, apply the implementation-planner Clarification Gate. If acceptance criteria or expected behavior are unclear, ask focused questions first.

Implement only the active task. Run relevant validation, update the active task status and Done Summary when acceptance criteria are satisfied, then move the completed task file to `<docsRoot>/tasks/done/` without renaming it. If a related implementation plan exists directly under `<docsRoot>/plans/`, move it to `<docsRoot>/plans/done/` without renaming it when the task or task range it governs is complete. Report files changed, tests run, acceptance criteria status, risks, and next recommended step.
