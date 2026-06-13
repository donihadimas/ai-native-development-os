# Prompt: Plan Implementation

Resolve `.aios/config.json` first if it exists. Use its `docsRoot` and `projectShape`; otherwise use `docs` and infer project shape from the repo.

Use `.aios/skill-router.md` to route through `context-management`, then `implementation-planner` in full mode. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, active task, affected files, and the same planning checklist manually. Use `.aios/templates/implementation-plan.template.md` when available to produce a short implementation plan before coding.

Read only:

- active task,
- context map,
- related PRD/ADR/API docs named by the task,
- affected files and nearby tests found by search.

Before writing the plan, apply the `implementation-planner` Clarification Gate. If acceptance criteria or behavior expectations are missing or contradictory, ask focused questions first.

Do not code until the plan identifies affected files, risks, and tests.

End with what the user should review in the plan and the next step: approve the plan, then implement only the selected task.
