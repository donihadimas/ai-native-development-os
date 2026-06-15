# Prompt: Generate Tests

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `testing` in full mode. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, active task, affected files, and nearby tests. Use `.aios/templates/test-plan.template.md` when available.

Read only:

- active task,
- acceptance criteria,
- affected files,
- existing nearby tests,
- bug reproduction steps if any.

Before creating tests, apply the `testing` Clarification Gate. If expected behavior, pass/fail criteria, or test conventions are unclear, ask focused questions first.

Create or propose tests that verify behavior: happy path, error path, edge cases, and regressions where relevant.

End with what test evidence the user should expect and the next step: run the tests, fix failures, then review the implementation.
