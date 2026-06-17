---
title: Templates
description: The document templates AIOS uses to keep planning, delivery, and review artifacts consistent.
---

Templates give every project the same documentation shape. They make agent output easier to review because PRDs, ADRs, tasks, reviews, migrations, and releases always follow a familiar structure.

## Included Templates

| Template | Output |
| --- | --- |
| `vision.template.md` | Product vision captured from product discovery before PRD generation. |
| `prd.template.md` | Product requirements, scope, non-goals, users, and acceptance criteria. |
| `design.template.md` | UI/UX design for user flows, screens, interface states, and accessibility. |
| `architecture.template.md` | Architecture overview, constraints, components, and risks. |
| `adr.template.md` | One architecture decision with alternatives and consequences. |
| `task.template.md` | A small implementation task with context, acceptance criteria, and validation. |
| `implementation-plan.template.md` | Step-by-step implementation planning before editing code. |
| `review-report.template.md` | Findings, evidence, risks, and approval state. |
| `test-plan.template.md` | Test strategy and verification checklist. |
| `openapi.template.yaml` | API contract stub for endpoint design. |
| `migration-plan.template.md` | Database migration plan, rollback, and safety notes. |
| `security-review-report.template.md` | Security review findings and mitigations. |
| `release-note.template.md` | Release summary, validation, rollout, and rollback notes. |
| `changelog.template.md` | Changelog draft for release history. |

## Create Documents From Templates

Use `aios create` commands to generate named document stubs:

```bash
aios create feature "Habit reminders"
aios create adr "Use server date for completion"
aios create task "Implement habit API"
aios create review "Habit API"
aios create openapi "Habit API"
aios create migration "Create habits table"
aios create security "Habit API"
aios create release "0.3.1"
```

Generated files are written under the configured docs root, usually `docs/`.

## Why Templates Matter

Templates prevent vague AI output. They ask for the same details every time:

- scope and non-goals,
- source-of-truth documents,
- acceptance criteria,
- validation steps,
- risk and rollback notes,
- evidence before done.

This matters most when a project has both frontend and backend work. The same PRD, ADR, task, and API contract should guide both sides.

## How To Use Templates With Agents

When asking an agent to fill a template, point to the exact template and source context:

```text
Read docs/product/vision.md and .aios/templates/prd.template.md.
Create docs/product/prd.md.
Keep acceptance criteria specific and testable.
Do not add implementation details that are not implied by the product context.
```

For implementation tasks:

```text
Read docs/product/prd.md, docs/architecture/architecture.md, and .aios/templates/task.template.md.
Create one small task for the login API.
Include acceptance criteria, validation commands, and files likely to change.
```

## Keep Templates Stable

Project teams can adapt templates, but avoid frequent churn. Templates are part of the workflow contract. If a template changes, update related skills, docs, and examples so agents keep producing compatible output.
