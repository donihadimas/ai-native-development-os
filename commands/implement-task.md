# Command: Implement Task

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/prompts/06-implement-task.md` and the `implementation-planner` skill through `.aios/skill-router.md`. In lite mode, use `AGENTS.md`, the context map, active task, affected code, and nearby tests without assuming `.aios/` exists.

Read:

- `AGENTS.md`
- `<docsRoot>/context/context-map.md`
- active task in `<docsRoot>/tasks/`
- affected files and nearby tests

Before coding, apply the implementation-planner Clarification Gate. If acceptance criteria or expected behavior are unclear, ask focused questions first.

Implement only the active task. Run relevant validation and report files changed, tests run, acceptance criteria status, risks, and next recommended step.
