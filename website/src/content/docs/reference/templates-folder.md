---
title: Templates Folder
description: Catalog of document templates in the .aios/templates/ folder.
---

The `templates/` folder contains document templates that give every project the same documentation shape. Templates shape output; they do not decide product or architecture by themselves.

## What Templates Are

Templates are the "what the output should look like" layer. They define the structure for PRDs, ADRs, tasks, reviews, migrations, and releases so agent output is consistent and reviewable.

## Templates vs Prompts vs Skills vs Workflows

| Concept | What It Is | Example |
| --- | --- | --- |
| **Templates** | Document formats and structures | `.aios/templates/prd.template.md` |
| **Prompts** | Numbered workflow steps that route the agent | `.aios/prompts/01-generate-prd.md` |
| **Skills** | Full operating procedures with detailed process | `.aios/skills/prd-generator/SKILL.md` |
| **Workflows** | Multi-step development sequences | `.aios/workflows/new-feature.workflow.md` |

Templates define the output shape. Prompts route the agent to the right template. Skills contain the detailed process. Workflows orchestrate the full sequence.

## Template Catalog

| Template | Purpose |
| --- | --- |
| `README.md` | Overview of available templates |
| `vision.template.md` | Product vision from discovery |
| `prd.template.md` | Product requirements document |
| `design.template.md` | UI/UX design document |
| `architecture.template.md` | Architecture overview |
| `adr.template.md` | Architecture decision record |
| `task.template.md` | Implementation task |
| `implementation-plan.template.md` | Implementation planning |
| `review-report.template.md` | Code review findings |
| `test-plan.template.md` | Test strategy and checklist |
| `openapi.template.yaml` | API contract definition |
| `migration-plan.template.md` | Database migration plan |
| `security-review-report.template.md` | Security review findings |
| `release-note.template.md` | Release notes |
| `changelog.template.md` | Changelog draft |

## Detailed Reference

### README.md

**Purpose:** Lists available templates and explains their role in the workflow kit.

**Generated location:** None - informational only.

**Related CLI command:** None.

**Related skill:** None.

**Review expectation:** None - informational only.

### vision.template.md

**Purpose:** Structure for capturing the product vision from discovery interviews.

**Generated location:** `<docsRoot>/product/vision.md`

**Related CLI command:** None - filled by agent during product discovery.

**Related skill:** `product-discovery`

**Review expectation:** User must review and approve vision before PRD generation.

### prd.template.md

**Purpose:** Structure for product requirements, scope, non-goals, users, and acceptance criteria.

**Generated location:** `<docsRoot>/product/features/<name>.prd.md` (via CLI) or `<docsRoot>/product/prd.md` (via agent)

**Related CLI command:** `aios create feature <name>`

**Related skill:** `prd-generator`

**Review expectation:** User must review and approve PRD before architecture.

### design.template.md

**Purpose:** Structure for UI/UX design including user flows, screens, interface states, and accessibility.

**Generated location:** `<docsRoot>/design/<slug>-design.md` (via CLI) or `<docsRoot>/design/design.md` (via agent)

**Related CLI command:** `aios create design <name>`

**Related skill:** `ui-ux-design`

**Review expectation:** User must review design before implementation tasks.

### architecture.template.md

**Purpose:** Structure for architecture overview, constraints, components, and risks.

**Generated location:** `<docsRoot>/architecture/architecture.md`

**Related CLI command:** None - filled by agent during architecture design.

**Related skill:** `architecture-design`

**Review expectation:** User must review architecture before task breakdown.

### adr.template.md

**Purpose:** Structure for one architecture decision with context, alternatives, and consequences.

**Generated location:** `<docsRoot>/adr/ADR-XXX-title.md`

**Related CLI command:** `aios create adr <name>`

**Related skill:** `adr-generator`

**Review expectation:** Records a decision the user has already made.

### task.template.md

**Purpose:** Structure for a small implementation task with acceptance criteria, affected files, and validation.

**Generated location:** `<docsRoot>/tasks/TASK-NNN-<slug>.md`

**Related CLI command:** `aios create task <name>`

**Related skill:** `task-breakdown`

**Review expectation:** User reviews task list before implementation begins.

### implementation-plan.template.md

**Purpose:** Structure for planning implementation before coding.

**Generated location:** Inline or `<docsRoot>/tasks/` (associated with task)

**Related CLI command:** None - filled by agent before implementation.

**Related skill:** `implementation-planner`

**Review expectation:** Plan is reviewed as part of task implementation.

### review-report.template.md

**Purpose:** Structure for code review findings, evidence, risks, and approval state.

**Generated location:** `<docsRoot>/reviews/review-NNN-<slug>.md`

**Related CLI command:** `aios create review <name>`

**Related skill:** `code-review`

**Review expectation:** Review findings inform user decision.

### test-plan.template.md

**Purpose:** Structure for test strategy, verification checklist, and validation evidence.

**Generated location:** `<docsRoot>/reviews/` or inline with task

**Related CLI command:** None - filled by agent during testing.

**Related skill:** `testing`

**Review expectation:** Test evidence supports task completion.

### openapi.template.yaml

**Purpose:** Structure for API contract definition with endpoints, schemas, and error handling.

**Generated location:** `<docsRoot>/api/<slug>.openapi.yaml` (via CLI) or `<docsRoot>/api/<contract>.yaml` (via agent)

**Related CLI command:** `aios create openapi <name>`

**Related skill:** `api-contract-design`

**Review expectation:** User must review API contract before implementation.

### migration-plan.template.md

**Purpose:** Structure for database migration plan, rollback notes, and safety checks.

**Generated location:** `<docsRoot>/database/migrations/`

**Related CLI command:** `aios create migration <name>`

**Related skill:** `database-migration`

**Review expectation:** User must review migration plan before execution.

### security-review-report.template.md

**Purpose:** Structure for security review findings and mitigations.

**Generated location:** `<docsRoot>/security/`

**Related CLI command:** `aios create security <name>`

**Related skill:** `security-review`

**Review expectation:** Security findings inform user decision.

### release-note.template.md

**Purpose:** Structure for release summary, validation, rollout, and rollback notes.

**Generated location:** `<docsRoot>/releases/<slug>-release.md` (via CLI) or `<docsRoot>/releases/release-NNN-<slug>.md` (via agent)

**Related CLI command:** `aios create release <name>`

**Related skill:** `release-management`

**Review expectation:** User must review and approve before publishing.

### changelog.template.md

**Purpose:** Structure for changelog draft tracking release history.

**Generated location:** `<docsRoot>/releases/CHANGELOG.md`

**Related CLI command:** `aios create release <name>`

**Related skill:** `release-management`

**Review expectation:** User reviews changelog as part of release process.

## Related Pages

- [Templates Guide](/guides/templates) - How to use templates with agents
- [Command Guide](/guides/command-guide) - Choose the right command for your situation
- [Commands Folder](/reference/commands-folder) - Named prompts that invoke templates
- [Prompts Folder](/reference/prompts-folder) - Numbered prompts that route to templates
- [Skills](/guides/skills) - Reusable procedures that fill templates
- [AI Agent Simulation](/guides/ai-agent-simulation) - How to prompt the agent through the lifecycle
- [Building Blocks](/guides/building-blocks) - What each AIOS artifact type does
