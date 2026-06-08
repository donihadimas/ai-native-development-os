# Prompt: Plan Database Migration

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `context-management`, then `database-migration`. Use `.aios/references/database-standards.md` and `.aios/templates/migration-plan.template.md` to create a migration plan in `<docsRoot>/database/migrations/`.

Read only:

- active task or feature PRD,
- related architecture section,
- related ADRs if persistence behavior depends on a technical decision,
- existing schema, migration, or database notes.

Do not implement or apply the migration yet. End with rollout risks, rollback notes, validation checks, and open questions.
