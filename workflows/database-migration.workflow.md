# Database Migration Workflow

## Input

- Active task or feature PRD.
- Architecture and database constraints.
- Related ADRs.
- Existing schema or migration notes.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for documentation paths.
2. Confirm the feature requires a database change.
3. Read acceptance criteria and persistence behavior.
4. Use `.aios/skill-router.md` to route through `database-migration`.
5. Create `<docsRoot>/database/migrations/MIGRATION-XXX-title.md` using `.aios/templates/migration-plan.template.md`.
6. Link the migration plan from related API, implementation, and release tasks.
7. Implement the migration only after rollout and rollback steps are clear.
8. Add validation checks for pre-migration and post-migration state.

## Output

- Migration plan in `<docsRoot>/database/migrations/`.
- Linked implementation or API tasks.
- Rollout and rollback notes.
- Validation checks.

## Done Criteria

- Schema and data impact are explicit.
- Rollout and rollback steps are documented.
- Compatibility risks are named.
- Validation checks are defined before implementation.
