# Command: Plan Implementation

Resolve `.aios/config.json` first when it exists. In full mode, use the selected primary workflow, `.aios/prompts/05-plan-implementation.md`, and the `implementation-planner` skill through `.aios/skill-router.md`; read `skill-router.md` Artifact Routing and Active Task Discovery before opening task files. In lite mode, use available planning guidance without assuming `.aios/` exists.

Read:

- `AGENTS.md`
- active task in `<docsRoot>/tasks/`
- relevant PRD or ADR only when needed
- affected files and nearby tests

If the active task is not explicit, read `<docsRoot>/tasks/index.md` first when it exists. If the index is missing or stale, list direct task filenames in `<docsRoot>/tasks/` and open only the top 1-3 likely candidates. Do not open every task file or search `<docsRoot>/tasks/done/` to discover active work.

Before writing the plan, apply the skill's Clarification Gate. If acceptance criteria or behavior expectations are missing or contradictory, ask focused questions first.

Write a short implementation plan before editing files. If saving a persistent plan, create it directly under `<docsRoot>/plans/` and update `<docsRoot>/plans/index.md` when it exists. Do not create active plans in `<docsRoot>/plans/done/`.

End with what the user should review and the next step: approve the plan, then implement only the selected task. After the task is completed and archived, move the related plan to `<docsRoot>/plans/done/` without renaming it.
