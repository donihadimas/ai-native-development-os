---
title: Prompts Folder
description: Catalog of numbered workflow prompts in the .aios/prompts/ folder.
---

The `prompts/` folder contains numbered workflow prompts that route your AI agent through the AIOS lifecycle. Each prompt is a thin wrapper that tells the agent which context files to read, which skill to use, and where to save the output.

## Prompts vs Commands vs Skills

| Concept | What It Is | Example |
| --- | --- | --- |
| **Prompts** | Numbered workflow steps (00-13) that route the agent | `.aios/prompts/01-generate-prd.md` |
| **Commands** | Named prompt shortcuts for common workflows | `.aios/commands/generate-prd.md` |
| **Skills** | Full operating procedures with detailed process | `.aios/skills/prd-generator/SKILL.md` |

Prompts are thin routing wrappers. Skills contain the detailed operating procedure. Commands are named shortcuts that point to prompts or skills.

## Prompt Catalog

| # | Prompt | Lifecycle Stage | Purpose |
| --- | --- | --- | --- |
| 00 | `00-discover-product.md` | Discovery | Interview user and fill product vision |
| 01 | `01-generate-prd.md` | Planning | Generate PRD with acceptance criteria |
| 02 | `02-generate-architecture.md` | Design | Create architecture context and direction |
| 03 | `03-generate-adr.md` | Design | Record an architecture decision |
| 04 | `04-generate-tasks.md` | Planning | Split PRD into implementation tasks |
| 05 | `05-plan-implementation.md` | Planning | Create implementation plan for one task |
| 06 | `06-implement-task.md` | Delivery | Implement one active task |
| 07 | `07-review-code.md` | Quality | Review code changes against criteria |
| 08 | `08-generate-tests.md` | Quality | Design test plans and validation evidence |
| 09 | `09-design-api-contract.md` | Design | Design API contracts |
| 10 | `10-plan-database-migration.md` | Delivery | Plan database schema changes |
| 11 | `11-review-security.md` | Quality | Check security risks |
| 12 | `12-plan-release.md` | Release | Prepare release notes and changelog |
| 13 | `13-design-ui-ux.md` | Design | Design user flows and interface states |

## Detailed Reference

### 00 - 00-discover-product.md

**Lifecycle stage:** Discovery

**Purpose:** Interview the user about their product idea and fill the vision document.

**Prerequisite docs:** Raw user idea or notes.

**Output artifact:** `<docsRoot>/product/vision.md`

**Related skill:** `product-discovery`

**Related template:** `.aios/templates/vision.template.md`

**Review gate:** Yes - user must approve vision before PRD generation.

### 01 - 01-generate-prd.md

**Lifecycle stage:** Planning

**Purpose:** Expand the vision into a structured PRD with user stories and acceptance criteria.

**Prerequisite docs:** `<docsRoot>/product/vision.md`

**Output artifact:** `<docsRoot>/product/prd.md`

**Related skill:** `prd-generator`

**Related template:** `.aios/templates/prd.template.md`

**Review gate:** Yes - user must approve PRD before architecture.

### 02 - 02-generate-architecture.md

**Lifecycle stage:** Design

**Purpose:** Propose technical direction, component structure, and data flow.

**Prerequisite docs:** `<docsRoot>/product/prd.md`

**Output artifact:** `<docsRoot>/architecture/architecture.md`

**Related skill:** `architecture-design`

**Related template:** `.aios/templates/architecture.template.md`

**Review gate:** Yes - user must approve architecture before tasks.

### 03 - 03-generate-adr.md

**Lifecycle stage:** Design

**Purpose:** Record one architecture decision with context, alternatives, and consequences.

**Prerequisite docs:** Decision context, architecture doc.

**Output artifact:** `<docsRoot>/adr/ADR-XXX-title.md`

**Related skill:** `adr-generator`

**Related template:** `.aios/templates/adr.template.md`

**Review gate:** No - records a decision the user has already made.

### 04 - 04-generate-tasks.md

**Lifecycle stage:** Planning

**Purpose:** Split the PRD into small, numbered implementation tasks.

**Prerequisite docs:** `<docsRoot>/product/prd.md`, `<docsRoot>/architecture/architecture.md`

**Output artifact:** `<docsRoot>/tasks/TASK-NNN-<slug>.md`

**Related skill:** `task-breakdown`

**Related template:** `.aios/templates/task.template.md`

**Review gate:** No - creates task list for user to prioritize.

### 05 - 05-plan-implementation.md

**Lifecycle stage:** Planning

**Purpose:** Create a short implementation plan for one specific task.

**Prerequisite docs:** Active task file

**Output artifact:** Implementation plan (inline or separate file)

**Related skill:** `implementation-planner`

**Related template:** `.aios/templates/implementation-plan.template.md`

**Review gate:** No - plan is reviewed as part of task implementation.

### 06 - 06-implement-task.md

**Lifecycle stage:** Delivery

**Purpose:** Implement one active task with code, tests, and validation.

**Prerequisite docs:** Active task, implementation plan, affected code

**Output artifact:** Code changes, task status update

**Related skill:** `task-implementation`

**Related template:** N/A (uses task template for status)

**Review gate:** Yes - user must review diff before moving to next task.

### 07 - 07-review-code.md

**Lifecycle stage:** Quality

**Purpose:** Review code changes against task acceptance criteria and identify risks.

**Prerequisite docs:** Diff, task file, related ADRs

**Output artifact:** `<docsRoot>/reviews/review-NNN-<slug>.md`

**Related skill:** `code-review`

**Related template:** `.aios/templates/review-report.template.md`

**Review gate:** No - review is an input for user decision.

### 08 - 08-generate-tests.md

**Lifecycle stage:** Quality

**Purpose:** Design test plans and document validation evidence.

**Prerequisite docs:** Task file, acceptance criteria

**Output artifact:** Test plan or test evidence in review doc

**Related skill:** `testing`

**Related template:** `.aios/templates/test-plan.template.md`

**Review gate:** No - test evidence supports task completion.

### 09 - 09-design-api-contract.md

**Lifecycle stage:** Design

**Purpose:** Design API endpoints, request/response schemas, and error handling.

**Prerequisite docs:** `<docsRoot>/product/prd.md`, `<docsRoot>/architecture/architecture.md`

**Output artifact:** `<docsRoot>/api/<contract>.md` or OpenAPI spec

**Related skill:** `api-contract-design`

**Related template:** `.aios/templates/openapi.template.yaml`

**Review gate:** Yes - user must approve contract before implementation.

### 10 - 10-plan-database-migration.md

**Lifecycle stage:** Delivery

**Purpose:** Plan schema changes, data migration, index updates, and rollback.

**Prerequisite docs:** Current schema, migration requirements

**Output artifact:** `<docsRoot>/database/migrations/`

**Related skill:** `database-migration`

**Related template:** `.aios/templates/migration-plan.template.md`

**Review gate:** Yes - user must approve migration plan before execution.

### 11 - 11-review-security.md

**Lifecycle stage:** Quality

**Purpose:** Check authentication, authorization, secrets, input validation, and web risks.

**Prerequisite docs:** Changed files, security principles

**Output artifact:** `<docsRoot>/security/`

**Related skill:** `security-review`

**Related template:** `.aios/templates/security-review-report.template.md`

**Review gate:** No - security findings are input for user decision.

### 12 - 12-plan-release.md

**Lifecycle stage:** Release

**Purpose:** Prepare release notes, changelog entries, and deployment checks.

**Prerequisite docs:** Completed tasks, changelog template

**Output artifact:** `<docsRoot>/releases/`

**Related skill:** `release-management`

**Related template:** `.aios/templates/release-note.template.md`, `.aios/templates/changelog.template.md`

**Review gate:** No - release notes are reviewed as part of release process.

### 13 - 13-design-ui-ux.md

**Lifecycle stage:** Design

**Purpose:** Design user flows, screens, interface states, and accessibility.

**Prerequisite docs:** `<docsRoot>/product/prd.md`, `<docsRoot>/architecture/architecture.md`

**Output artifact:** `<docsRoot>/design/design.md`

**Related skill:** `ui-ux-design`

**Related template:** `.aios/templates/design.template.md`

**Review gate:** Yes - user must approve design before implementation.

## Related Pages

- [Commands Folder](/reference/commands-folder) - Named prompt shortcuts vs numbered prompts
- [Skills](/guides/skills) - Detailed operating procedures that prompts invoke
- [Templates](/guides/templates) - Document formats used by prompts
- [AI Agent Simulation](/guides/ai-agent-simulation) - Walkthrough of using prompts in order
- [First Ten Minutes](/guides/first-ten-minutes) - Quick start with prompt examples
