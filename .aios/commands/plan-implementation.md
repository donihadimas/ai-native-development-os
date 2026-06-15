# Command: Plan Implementation

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/prompts/05-plan-implementation.md` and the `implementation-planner` skill through `.aios/skill-router.md`. In lite mode, use available planning guidance without assuming `.aios/` exists.

Read:

- `AGENTS.md`
- active task in `<docsRoot>/tasks/`
- relevant PRD or ADR only when needed
- affected files and nearby tests

Before writing the plan, apply the skill's Clarification Gate. If acceptance criteria or behavior expectations are missing or contradictory, ask focused questions first.

Write a short implementation plan before editing files.

End with what the user should review and the next step: approve the plan, then implement only the selected task.
