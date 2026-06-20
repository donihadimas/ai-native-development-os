# Command: Generate Tests

Resolve `.aios/config.json` first when it exists. In full mode, use the selected primary workflow, `.aios/prompts/08-generate-tests.md`, and the `testing` skill through `.aios/skill-router.md`; read `skill-router.md` Artifact Routing and Active Task Discovery before opening task files. In lite mode, use available testing guidance without assuming `.aios/` exists.

Read:

- active task acceptance criteria
- affected implementation files
- nearby existing tests

If the active task is not explicit, list task filenames first and open only the top 1-3 likely candidates. Do not open every task file to discover the active task.

Before creating tests, apply the skill's Clarification Gate. If expected behavior, pass/fail criteria, or test conventions are unclear, ask focused questions first.

Add or improve behavior-focused tests for happy paths, error paths, and edge cases.

End with what test evidence the user should expect and the next step: run tests, fix failures, then review the implementation.
