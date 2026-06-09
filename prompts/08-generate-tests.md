# Prompt: Generate Tests

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `testing`. Use `.aios/templates/test-plan.template.md`.

Read only:

- active task,
- acceptance criteria,
- affected files,
- existing nearby tests,
- bug reproduction steps if any.

Before creating tests, apply the `testing` Clarification Gate. If expected behavior, pass/fail criteria, or test conventions are unclear, ask focused questions first.

Create or propose tests that verify behavior: happy path, error path, edge cases, and regressions where relevant.
