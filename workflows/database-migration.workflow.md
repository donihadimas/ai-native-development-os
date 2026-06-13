# Database Migration Workflow

## Input

- Active task or feature PRD.
- Architecture and database constraints.
- Related ADRs.
- Existing schema or migration notes.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `.aios/skill-router.md`, `.aios/references/database-standards.md`, and `.aios/templates/migration-plan.template.md`.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, existing schema notes, and available database standards.
- If RTK is enabled, use it for noisy schema diffs, migration logs, or test output unless exact full output is required.
- If Caveman is enabled, use concise style for operational updates only; keep migration plans complete.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for documentation paths.
2. Confirm the feature requires a database change.
3. Read acceptance criteria and persistence behavior.
4. Route through `database-migration` using `.aios/skill-router.md` when available, or the same migration planning checklist manually in lite mode.
5. Create `<docsRoot>/database/migrations/MIGRATION-XXX-title.md` using `.aios/templates/migration-plan.template.md` when available, or the available migration plan structure in lite mode.
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

## Next Action

Have the user review compatibility, rollout, rollback, and validation checks. After approval, create or update the implementation task that applies the migration safely, then run pre-migration and post-migration validation.
