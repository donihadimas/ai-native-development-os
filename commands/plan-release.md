# Command: Plan Release

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/prompts/12-plan-release.md` and the `release-management` skill through `.aios/skill-router.md`. In lite mode, use available release guidance and templates without assuming `.aios/` exists.

Read:

- completed tasks
- review reports
- test evidence
- changelog or release notes if present

Before creating release docs, apply the skill's Clarification Gate. If scope, validation evidence, breaking changes, rollback, or post-release checks are unclear, ask focused questions first.

Create release documentation in `<docsRoot>/releases/`. Do not publish or deploy automatically.

End with what the user should review and the next step: explicit human approval before publishing or deploying outside AIOS.
