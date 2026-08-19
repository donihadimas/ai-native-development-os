---
name: database-migration
description: Use when planning or reviewing database schema, data, index, seed, or rollback changes before implementation.
---

# Database Migration

## Goal

Plan database changes so schema, data compatibility, rollback, and production safety are explicit before implementation.

## When to Use

Use this skill when:

- a task changes database schema,
- data needs to be backfilled or transformed,
- indexes, constraints, or seed data may change,
- a release needs a migration and rollback plan,
- frontend or backend behavior depends on persisted data shape.

## Inputs

Expected inputs:

- active task or feature PRD,
- architecture and database constraints,
- related ADRs,
- existing schema or migration notes,
- affected API contracts and backend tasks.

## Clarification Gate

Before writing a migration plan, check whether these are clear enough:

- current schema or data shape,
- desired schema or data change,
- compatibility requirements,
- data volume or backfill needs,
- rollout order,
- rollback expectation,
- validation checks.

If destructive impact, compatibility, or rollback is unclear, stop and ask the user 4-7 focused questions before generating the migration plan.

## Outputs

Expected outputs:

- migration plan in `docs/database/migrations/`,
- schema and compatibility notes,
- rollout and rollback steps,
- data validation checks,
- risks and open questions.

## Process

Step-by-step process:

1. Resolve the active task without reading every task body when a feature PRD or task file is not explicit. Use `docs/tasks/index.md` when available, then direct task filenames under `docs/tasks/`, and exclude `docs/tasks/done/` unless completed-task history is requested.
2. Read only the selected active task, stated feature PRD section, or acceptance criteria.
3. Identify schema, data, index, seed, and compatibility impact.
4. Search existing migration or schema patterns before proposing changes.
5. Create a migration plan using `templates/migration-plan.template.md`.
6. Define rollout order, rollback path, and data validation checks.
7. Link the migration plan from related backend, API, and release tasks.
8. Record unresolved data decisions as open questions or ADR candidates.

## Rules

Hard rules:

- Do not apply a migration before the plan and rollback path are clear.
- Do not open every task file to discover the migration target, and do not search `docs/tasks/done/` for active work.
- Do not assume destructive changes are safe without compatibility notes.
- Do not ignore existing production data.
- Do not hide index, constraint, seed, or backfill impact.
- Do not make the reusable OS depend on a specific database engine.

## Quality Checklist

Before finishing, verify:

- [ ] Schema and data impact are explicit.
- [ ] Rollout order is documented.
- [ ] Rollback path is documented.
- [ ] Validation checks are listed.
- [ ] Related API/backend/release tasks link to the plan.
- [ ] Open questions are recorded.

## Failure Modes

Watch out for:

- destructive changes without backout,
- reading all task files before choosing the migration target,
- missing backfill or seed notes,
- indexes that affect write performance,
- API changes that drift from persisted data,
- migration plans that assume a specific stack without approval.

## Example Prompt

```text
Use the database-migration skill to plan docs/database/migrations/MIGRATION-001-create-habits-table.md before implementing the habit API persistence change.
```
