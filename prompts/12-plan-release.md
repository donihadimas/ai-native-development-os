# Prompt: Plan Release

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `context-management`, then `release-management`. Use `.aios/workflows/release.workflow.md`, `.aios/templates/release-note.template.md`, and `.aios/templates/changelog.template.md` to prepare release documentation in `<docsRoot>/releases/`.

Read only:

- completed tasks,
- review reports,
- test evidence,
- changelog or release notes if they exist,
- package or deployment instructions.

Do not publish or deploy automatically. End with release scope, validation evidence, rollback plan, post-release checks, and human approval status.
