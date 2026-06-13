# Prompt: Plan Database Migration

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `context-management`, then `database-migration` in full mode. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, relevant product/architecture docs, existing schema notes, and available database standards. Use `.aios/references/database-standards.md` and `.aios/templates/migration-plan.template.md` when available to create a migration plan in `<docsRoot>/database/migrations/`.

Read only:

- active task or feature PRD,
- related architecture section,
- related ADRs if persistence behavior depends on a technical decision,
- existing schema, migration, or database notes.

Before generating the migration plan, apply the `database-migration` Clarification Gate. If current state, desired change, compatibility, rollout, rollback, or validation is unclear, ask focused questions first.

Do not implement or apply the migration yet. End with rollout risks, rollback notes, validation checks, open questions, what the user should review, and the next step: approve the plan, then create or update the implementation task that applies it safely.
