# Prompt: Plan Implementation

Resolve `.aios/config.json` first if it exists. Use its `docsRoot` and `projectShape`; otherwise use `docs` and infer project shape from the repo.

Use `.aios/skill-router.md` to route through `context-management`, then `implementation-planner`. Use `.aios/templates/implementation-plan.template.md` to produce a short implementation plan before coding.

Read only:

- active task,
- context map,
- related PRD/ADR/API docs named by the task,
- affected files and nearby tests found by search.

Do not code until the plan identifies affected files, risks, and tests.
