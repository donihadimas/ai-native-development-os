# Command: Plan Migration

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/workflows/database-migration.workflow.md`, `.aios/prompts/10-plan-database-migration.md`, and the `database-migration` skill through `.aios/skill-router.md`; read `skill-router.md` Artifact Routing and Active Task Discovery before opening task files. In lite mode, use available database standards and migration guidance without assuming `.aios/` exists.

Read:

- active task or feature PRD
- related architecture and ADRs
- existing schema or migration notes
- `.aios/templates/migration-plan.template.md` when available

If the active task or feature PRD is not explicit, list direct task filenames in `<docsRoot>/tasks/` first and open only the top 1-3 likely candidates. Do not open every task file or search `<docsRoot>/tasks/done/` to discover the migration target.

Before creating the migration plan, apply the skill's Clarification Gate. If current state, desired change, compatibility, rollout, rollback, or validation is unclear, ask focused questions first.

Create a migration plan in `<docsRoot>/database/migrations/`. Do not apply a migration.

End with what the user should review and the next step: approve the migration plan, then create or update the implementation task that applies it safely.
