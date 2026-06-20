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

## Workflow Handoffs

Use this workflow when the primary feature, bugfix, API contract, or refactor workflow needs a database change. It plans schema, data, index, seed, retention, rollout, and rollback work before implementation.

- Return to `.aios/workflows/new-feature.workflow.md` or `.aios/workflows/bugfix.workflow.md` after the migration plan is reviewed.
- Use `database-migration` for migration planning and `.aios/references/database-standards.md` for standards.
- Use `.aios/workflows/api-contract.workflow.md` and `api-contract-design` when schema changes affect request, response, webhook, or compatibility behavior.
- Use `.aios/workflows/security-review.workflow.md` and `security-review` when persisted data is sensitive or affects auth, permissions, payments, billing, subscriptions, or personally sensitive data.
- Use `implementation-planner`, then `task-implementation`, only after rollout, rollback, and validation checks are clear; archive completed migration tasks under `<docsRoot>/tasks/done/`.
- Read `.aios/prompts/10-plan-database-migration.md`, `.aios/references/database-standards.md`, and `.aios/templates/migration-plan.template.md` when available.
- Use `testing` and `.aios/workflows/review.workflow.md` to verify pre-migration and post-migration behavior.

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

## Full Mode Flow

Use `.aios/skill-router.md` to select this workflow when data change planning is the current step, then use the database-migration skill. Read `.aios/prompts/10-plan-database-migration.md`, `.aios/references/database-standards.md`, and `.aios/templates/migration-plan.template.md` for migration plan creation. Return to the primary workflow after review.

## Lite Mode Flow

Use `AGENTS.md`, `<docsRoot>/context/context-map.md`, existing schema notes, and available database standards. Do not assume `.aios/skill-router.md` or `.aios/templates/` exist. Follow the same migration planning checklist manually.

## After This Flow

Have the user review compatibility, rollout, rollback, and validation checks. After approval, create or update the implementation task that applies the migration safely, then run pre-migration and post-migration validation.
