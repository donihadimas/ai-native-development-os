# Command: Plan Migration

Resolve `.aios/config.json` first. Use `.aios/prompts/10-plan-database-migration.md` and the `database-migration` skill through `.aios/skill-router.md`.

Read:

- active task or feature PRD
- related architecture and ADRs
- existing schema or migration notes
- `.aios/templates/migration-plan.template.md`

Before creating the migration plan, apply the skill's Clarification Gate. If current state, desired change, compatibility, rollout, rollback, or validation is unclear, ask focused questions first.

Create a migration plan in `<docsRoot>/database/migrations/`. Do not apply a migration.
