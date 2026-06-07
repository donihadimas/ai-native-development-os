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

## Outputs

Expected outputs:

- migration plan in `docs/database/migrations/`,
- schema and compatibility notes,
- rollout and rollback steps,
- data validation checks,
- risks and open questions.

## Process

Step-by-step process:

1. Read the active task and acceptance criteria.
2. Identify schema, data, index, seed, and compatibility impact.
3. Search existing migration or schema patterns before proposing changes.
4. Create a migration plan using `templates/migration-plan.template.md`.
5. Define rollout order, rollback path, and data validation checks.
6. Link the migration plan from related backend, API, and release tasks.
7. Record unresolved data decisions as open questions or ADR candidates.

## Rules

Hard rules:

- Do not apply a migration before the plan and rollback path are clear.
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
- missing backfill or seed notes,
- indexes that affect write performance,
- API changes that drift from persisted data,
- migration plans that assume a specific stack without approval.

## Example Prompt

```text
Use the database-migration skill to plan docs/database/migrations/MIGRATION-001-create-habits-table.md before implementing the habit API persistence change.
```
