# Prompt: Implement Task

Read `AGENTS.md` first. Resolve `.aios/config.json` if it exists, then use `.aios/prompts/05-plan-implementation.md` in full mode if no plan exists. In lite mode, create the implementation plan manually from the active task before coding.

In full mode, use `.aios/skill-router.md`, `.aios/references/`, and `.aios/workflows/` when relevant. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, active task, affected code, and nearby tests.

Before coding, apply the implementation-planner Clarification Gate and then use `task-implementation` to execute the active task. If acceptance criteria or expected behavior are unclear, ask focused questions first.

Implement only the active task. Do not modify unrelated files.

Before finishing:

- run relevant tests or explain why they could not be run,
- verify acceptance criteria,
- update docs if behavior, API, or decisions changed,
- update the active task status or Done Summary when acceptance criteria are satisfied,
- summarize files changed, tests run, acceptance criteria status, risks, and next step.
