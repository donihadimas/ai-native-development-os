# Database Migration Workflow

## Input

- Active task or feature PRD.
- Architecture and database constraints.
- Related ADRs.
- Existing schema or migration notes.

## Process

1. Confirm the feature requires a database change.
2. Read acceptance criteria and persistence behavior.
3. Use `skills/database-migration` to define schema, data, index, seed, and compatibility impact.
4. Create `docs/database/migrations/MIGRATION-XXX-title.md` using `templates/migration-plan.template.md`.
5. Link the migration plan from related backend, API, and release tasks.
6. Implement the migration only after rollout and rollback steps are clear.
7. Add validation checks for pre-migration and post-migration state.

## Output

- Migration plan in `docs/database/migrations/`.
- Linked backend or API tasks.
- Rollout and rollback notes.
- Validation checks.

## Done Criteria

- Schema and data impact are explicit.
- Rollout and rollback steps are documented.
- Compatibility risks are named.
- Validation checks are defined before implementation.
