---
title: Commands Folder
description: Catalog of portable command prompts in the .aios/commands/ folder.
---

The `commands/` folder contains portable prompt shortcuts for common AIOS workflows. These are Markdown files that tell your AI agent what to do, not shell commands you run in a terminal.

## Commands vs CLI Commands

| Concept | What It Is | Where It Lives |
| --- | --- | --- |
| CLI commands | Terminal actions like `aios init`, `aios create task` | Run in your shell |
| Command prompts | Markdown instructions for AI agents | `.aios/commands/*.md` |

When you run `aios prompt list`, it shows the command prompts available in your project. When you run `aios prompt show <name>`, it prints the content of a specific command prompt.

## Command Prompt Catalog

| Command Prompt | Purpose |
| --- | --- |
| `discover-product.md` | Interview the user and fill the product vision |
| `generate-prd.md` | Generate a PRD with acceptance criteria |
| `generate-architecture.md` | Create architecture context and technical direction |
| `create-adr.md` | Record an architecture decision, trade-off, and consequence |
| `generate-tasks.md` | Split a PRD into small implementation tasks |
| `generate-tests.md` | Design test plans and validation evidence |
| `plan-implementation.md` | Create a short implementation plan before coding |
| `implement-task.md` | Implement one active task and update status |
| `review-code.md` | Review code changes against requirements and risks |
| `review-security.md` | Check authentication, authorization, and security risks |
| `design-ui.md` | Design user flows, screens, and interface states |
| `design-api.md` | Design API contracts before frontend/backend work |
| `plan-migration.md` | Plan database schema, data, and rollback changes |
| `plan-release.md` | Prepare release notes, changelog, and deployment checks |

## Detailed Reference

### discover-product.md

**When to use:** Before PRD generation, when the user only has a rough idea.

**Reads:** `AGENTS.md`, context map, existing vision doc, vision template.

**Does:** Interviews the user with 3-6 focused questions about users, problems, MVP, non-goals, metrics, and constraints. Fills `docs/product/vision.md`.

**Related skill:** `product-discovery`

### generate-prd.md

**When to use:** After the product vision is approved.

**Reads:** Product vision, PRD template.

**Does:** Expands the vision into a structured PRD with user stories, acceptance criteria, scope, and non-goals.

**Related skill:** `prd-generator`

### generate-architecture.md

**When to use:** After the PRD is approved.

**Reads:** PRD, architecture template.

**Does:** Proposes technical direction, component structure, data flow, and key decisions.

**Related skill:** `architecture-design`

### create-adr.md

**When to use:** When you have a specific technical decision to record.

**Reads:** Decision context, ADR template.

**Does:** Records one architecture decision with context, alternatives, consequences, and related documents.

**Related skill:** `adr-generator`

### generate-tasks.md

**When to use:** After architecture is settled.

**Reads:** PRD, architecture doc, task template.

**Does:** Splits the PRD into numbered tasks with acceptance criteria, affected files, and dependencies.

**Related skill:** `task-breakdown`

### generate-tests.md

**When to use:** When you need test plans or validation evidence.

**Reads:** Task, acceptance criteria, test plan template.

**Does:** Designs test plans and documents validation evidence.

**Related skill:** `testing`

### plan-implementation.md

**When to use:** Before implementing a specific task.

**Reads:** Active task, implementation plan template.

**Does:** Identifies affected files, dependencies, risks, and test approach.

**Related skill:** `implementation-planner`

### implement-task.md

**When to use:** When implementing one active task.

**Reads:** Active task, implementation plan, affected code, nearby tests.

**Does:** Writes code, runs validation, updates task status, and reports results.

**Related skill:** `task-implementation`

### review-code.md

**When to use:** After implementing a task or reviewing a diff.

**Reads:** Diff, task acceptance criteria, related ADRs.

**Does:** Reviews changes against requirements, identifies risks, and documents findings.

**Related skill:** `code-review`

### review-security.md

**When to use:** Before release or when touching security-sensitive code.

**Reads:** Changed files, security principles.

**Does:** Checks authentication, authorization, secrets, input validation, and web risks.

**Related skill:** `security-review`

### design-ui.md

**When to use:** When building user-facing features.

**Reads:** PRD, architecture, design template.

**Does:** Designs user flows, screens, interface states, and accessibility.

**Related skill:** `ui-ux-design`

### design-api.md

**When to use:** When building APIs or backend services.

**Reads:** PRD, architecture, API standards.

**Does:** Designs API contracts with endpoints, request/response schemas, and error handling.

**Related skill:** `api-contract-design`

### plan-migration.md

**When to use:** When changing database schema or data.

**Reads:** Current schema, migration plan template.

**Does:** Plans schema changes, data migration, index updates, and rollback notes.

**Related skill:** `database-migration`

### plan-release.md

**When to use:** When preparing a release.

**Reads:** Completed tasks, changelog template, release note template.

**Does:** Prepares release notes, changelog entries, and deployment checks.

**Related skill:** `release-management`

## Related Pages

- [CLI Commands](/reference/cli) - Terminal commands like `aios prompt list` and `aios prompt show`
- [Building Blocks](/guides/building-blocks) - What each AIOS artifact type does
- [Skills](/guides/skills) - Reusable agent procedures that command prompts invoke
- [Templates](/guides/templates) - Document formats used by command prompts
