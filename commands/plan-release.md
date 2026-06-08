# Command: Plan Release

Resolve `.aios/config.json` first. Use `.aios/prompts/12-plan-release.md` and the `release-management` skill through `.aios/skill-router.md`.

Read:

- completed tasks
- review reports
- test evidence
- changelog or release notes if present

Before creating release docs, apply the skill's Clarification Gate. If scope, validation evidence, breaking changes, rollback, or post-release checks are unclear, ask focused questions first.

Create release documentation in `<docsRoot>/releases/`. Do not publish or deploy automatically.
