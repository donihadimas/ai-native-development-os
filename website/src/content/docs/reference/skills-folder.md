---
title: Skills Folder
description: Catalog of AIOS skills and when to use each one.
---

The `skills/` folder contains reusable operating procedures for AI agents. Each skill defines inputs, process, outputs, quality checks, and clarification gates for a specific job.

## What Skills Are

Skills are the "how to do it right" layer. They tell the agent what to check, what to produce, when to ask questions, and when to stop for human review.

## Skills vs Templates vs Prompts vs Workflows

| Concept | What It Is | Example |
| --- | --- | --- |
| **Skills** | Detailed operating procedures | `skills/prd-generator/SKILL.md` |
| **Templates** | Document formats and structures | `.aios/templates/prd.template.md` |
| **Prompts** | Numbered workflow steps that route the agent | `.aios/prompts/01-generate-prd.md` |
| **Workflows** | Multi-step development sequences | `.aios/workflows/new-feature.workflow.md` |

Skills contain the detailed process. Templates define the output shape. Prompts route the agent to the right skill. Workflows orchestrate the full sequence.

## Native vs Portable Skill Locations

| Location | When It Exists | Purpose |
| --- | --- | --- |
| `skills/` | Always (canonical source) | Reusable skill definitions |
| `.aios/skills/` | Full mode install | Portable copy for any agent |
| `.agents/skills/` | Native delivery to Codex/generic | Agent auto-discovery |
| `.qwen/skills/` | Native delivery to Qwen Code | Agent auto-discovery |
| `.opencode/skills/` | Native delivery to OpenCode | Agent auto-discovery |
| `.agent/skills/` | Native delivery to Antigravity | Agent auto-discovery |

Use `--skill-delivery portable|native|both` when running `aios init`, `aios adopt`, or `aios starter`.

## Skill Types

### Generator/Planning Skills

These skills may ask clarification questions before writing final artifacts. They have a Clarification Gate that checks whether inputs are clear enough.

### Execution/Review Skills

These skills require an active task, diff, validation evidence, or review target. They implement work or evaluate changes.

## Skills by Lifecycle Stage

### Discovery and Product Planning

#### product-discovery

**Purpose:** Interview the user and transform a rough idea into a clear product vision.

**When to use:** When the product idea is still rough, target users are unclear, or MVP scope needs narrowing.

**Expected inputs:** Raw product idea, known users, constraints, existing notes.

**Expected outputs:** `<docsRoot>/product/vision.md`

**Related templates:** `vision.template.md`

**Related prompts:** `00-discover-product.md`

**Related commands:** `discover-product.md`

**Related workflows:** `new-project.workflow.md`, `new-feature.workflow.md`

**Clarification gate:** Yes - interviews user with 3-6 focused questions before writing vision.

**Example prompt:**
```
Use the product-discovery skill to interview me about my product idea
and fill docs/product/vision.md.
```

#### prd-generator

**Purpose:** Generate a PRD with testable acceptance criteria from the product vision.

**When to use:** After the product vision is approved and ready to expand into requirements.

**Expected inputs:** `<docsRoot>/product/vision.md`

**Expected outputs:** `<docsRoot>/product/prd.md`

**Related templates:** `prd.template.md`

**Related prompts:** `01-generate-prd.md`

**Related commands:** `generate-prd.md`

**Related workflows:** `new-project.workflow.md`, `new-feature.workflow.md`

**Clarification gate:** Yes - checks whether vision and requirements are clear enough before writing PRD.

**Example prompt:**
```
Use the prd-generator skill to create a PRD from docs/product/vision.md.
Save it to docs/product/prd.md using the prd.template.md template.
```

### Architecture and Decisions

#### architecture-design

**Purpose:** Propose technical direction, component structure, and data flow.

**When to use:** After the PRD is approved and architecture decisions are needed.

**Expected inputs:** `<docsRoot>/product/prd.md`

**Expected outputs:** `<docsRoot>/architecture/architecture.md`

**Related templates:** `architecture.template.md`

**Related prompts:** `02-generate-architecture.md`

**Related commands:** `generate-architecture.md`

**Related workflows:** `new-project.workflow.md`, `new-feature.workflow.md`

**Clarification gate:** Yes - checks whether technical constraints and preferences are clear.

**Example prompt:**
```
Use the architecture-design skill to create architecture context
from docs/product/prd.md. Save to docs/architecture/architecture.md.
```

#### adr-generator

**Purpose:** Record one architecture decision with context, alternatives, and consequences.

**When to use:** When you have a specific technical decision to document.

**Expected inputs:** Decision context, architecture doc.

**Expected outputs:** `<docsRoot>/adr/ADR-XXX-title.md`

**Related templates:** `adr.template.md`

**Related prompts:** `03-generate-adr.md`

**Related commands:** `create-adr.md`

**Related workflows:** `new-feature.workflow.md`

**Clarification gate:** Yes - checks whether decision context, alternatives, and consequences are clear.

**Example prompt:**
```
Use the adr-generator skill to record this decision:
Use server date for completion. Save to docs/adr/.
```

### Design, API, Backend, and Data Planning

#### ui-ux-design

**Purpose:** Design user flows, screens, interface states, and accessibility.

**When to use:** When building user-facing features that need design decisions.

**Expected inputs:** `<docsRoot>/product/prd.md`, `<docsRoot>/architecture/architecture.md`

**Expected outputs:** `<docsRoot>/design/design.md`

**Related templates:** `design.template.md`

**Related prompts:** `13-design-ui-ux.md`

**Related commands:** `design-ui.md`

**Related workflows:** `ui-design.workflow.md`, `new-feature.workflow.md`

**Clarification gate:** Yes - checks whether user needs and constraints are clear.

**Example prompt:**
```
Use the ui-ux-design skill to design user flows for the login feature.
Save to docs/design/design.md.
```

#### api-contract-design

**Purpose:** Design API endpoints, request/response schemas, and error handling.

**When to use:** When building or changing APIs that consumers depend on.

**Expected inputs:** `<docsRoot>/product/prd.md`, `<docsRoot>/architecture/architecture.md`

**Expected outputs:** `<docsRoot>/api/<contract>.yaml`

**Related templates:** `openapi.template.yaml`

**Related prompts:** `09-design-api-contract.md`

**Related commands:** `design-api.md`

**Related workflows:** `api-contract.workflow.md`, `new-feature.workflow.md`

**Clarification gate:** Yes - checks whether API requirements and constraints are clear.

**Example prompt:**
```
Use the api-contract-design skill to design the API contract
for the habit reminders feature. Save to docs/api/.
```

#### backend-api-development

**Purpose:** Design and implement backend API behavior with contracts and validation.

**When to use:** When implementing backend services or API endpoints.

**Expected inputs:** API contract, architecture doc, task file.

**Expected outputs:** Backend code, API implementation.

**Related templates:** None - uses contract as input.

**Related prompts:** None

**Related commands:** None

**Related workflows:** `new-feature.workflow.md`

**Clarification gate:** No explicit gate; confirm contract and task behavior before implementation.

**Example prompt:**
```
Use the backend-api-development skill to implement the habit API
based on the contract in docs/api/habit-api.yaml.
```

#### database-migration

**Purpose:** Plan database schema changes with safety checks and rollback notes.

**When to use:** When adding tables, columns, indexes, or changing data models.

**Expected inputs:** Current schema, migration requirements, architecture doc.

**Expected outputs:** `<docsRoot>/database/migrations/`

**Related templates:** `migration-plan.template.md`

**Related prompts:** `10-plan-database-migration.md`

**Related commands:** `plan-migration.md`

**Related workflows:** `database-migration.workflow.md`

**Clarification gate:** Yes - checks whether schema changes and compatibility are clear.

**Example prompt:**
```
Use the database-migration skill to plan the habits table migration.
Save to docs/database/migrations/.
```

### Task Planning and Implementation

#### task-breakdown

**Purpose:** Split a PRD into small, numbered implementation tasks.

**When to use:** After architecture is settled and work needs to be divided into tasks.

**Expected inputs:** `<docsRoot>/product/prd.md`, `<docsRoot>/architecture/architecture.md`

**Expected outputs:** `<docsRoot>/tasks/TASK-NNN-<slug>.md`

**Related templates:** `task.template.md`

**Related prompts:** `04-generate-tasks.md`

**Related commands:** `generate-tasks.md`

**Related workflows:** `new-feature.workflow.md`

**Clarification gate:** Yes - checks whether PRD scope and architecture are clear enough to create tasks.

**Example prompt:**
```
Use the task-breakdown skill to split the PRD into implementation tasks.
Save each task to docs/tasks/.
```

#### implementation-planner

**Purpose:** Create a short implementation plan before coding.

**When to use:** Before implementing a specific task.

**Expected inputs:** Active task file, affected files.

**Expected outputs:** Implementation plan (inline or separate file)

**Related templates:** `implementation-plan.template.md`

**Related prompts:** `05-plan-implementation.md`

**Related commands:** `plan-implementation.md`

**Related workflows:** All implementation workflows

**Clarification gate:** Yes - checks whether task scope and acceptance criteria are clear.

**Example prompt:**
```
Use the implementation-planner skill to plan the login API task.
```

#### task-implementation

**Purpose:** Implement one active task with code, tests, and validation.

**When to use:** When implementing one task at a time.

**Expected inputs:** Active task, implementation plan, affected code, nearby tests.

**Expected outputs:** Code changes, task status update.

**Related templates:** None - uses task template for status.

**Related prompts:** `06-implement-task.md`

**Related commands:** `implement-task.md`

**Related workflows:** All implementation workflows

**Clarification gate:** Yes - checks whether task objective and acceptance criteria are clear.

**Example prompt:**
```
Use the task-implementation skill to implement the login API task.
Run tests to verify.
```

### Testing, Review, Security, and Release

#### testing

**Purpose:** Design test plans and document validation evidence.

**When to use:** When designing tests or reviewing test coverage.

**Expected inputs:** Task file, acceptance criteria.

**Expected outputs:** Test plan or test evidence in review doc.

**Related templates:** `test-plan.template.md`

**Related prompts:** `08-generate-tests.md`

**Related commands:** `generate-tests.md`

**Related workflows:** All implementation workflows

**Clarification gate:** Yes - checks whether test scope and acceptance criteria are clear.

**Example prompt:**
```
Use the testing skill to design tests for the login API task.
```

#### code-review

**Purpose:** Review code changes against task acceptance criteria and identify risks.

**When to use:** After implementing a task or reviewing a diff.

**Expected inputs:** Diff, task file, related ADRs.

**Expected outputs:** `<docsRoot>/reviews/review-NNN-<slug>.md`

**Related templates:** `review-report.template.md`

**Related prompts:** `07-review-code.md`

**Related commands:** `review-code.md`

**Related workflows:** `review.workflow.md`, all implementation workflows

**Clarification gate:** Yes - checks whether diff, task, and review scope are clear.

**Example prompt:**
```
Use the code-review skill to review the recent changes
against the task acceptance criteria.
```

#### security-review

**Purpose:** Check authentication, authorization, secrets, input validation, and web risks.

**When to use:** Before release or when touching security-sensitive code.

**Expected inputs:** Changed files, security principles.

**Expected outputs:** `<docsRoot>/security/`

**Related templates:** `security-review-report.template.md`

**Related prompts:** `11-review-security.md`

**Related commands:** `review-security.md`

**Related workflows:** `security-review.workflow.md`

**Clarification gate:** Yes - checks whether trust boundaries and roles are clear.

**Example prompt:**
```
Use the security-review skill to review the authentication changes.
```

#### release-management

**Purpose:** Prepare release documentation, changelog, and deployment checklist.

**When to use:** When shipping completed features to production.

**Expected inputs:** Completed tasks, review evidence, test evidence.

**Expected outputs:** `<docsRoot>/releases/`

**Related templates:** `release-note.template.md`, `changelog.template.md`

**Related prompts:** `12-plan-release.md`

**Related commands:** `plan-release.md`

**Related workflows:** `release.workflow.md`

**Clarification gate:** Yes - checks whether release scope and evidence are clear.

**Example prompt:**
```
Use the release-management skill to prepare release notes
for version 0.3.1.
```

#### context-management

**Purpose:** Route the agent to the right context files based on the current task.

**When to use:** At the start of any implementation task.

**Expected inputs:** `.aios/config.json`, `AGENTS.md`, context map.

**Expected outputs:** Routed context for the current task.

**Related templates:** None - routing rule.

**Related prompts:** None - used by skill-router.

**Related commands:** None

**Related workflows:** All workflows

**Clarification gate:** No - routing rule, not a product decision.

**Example prompt:**
```
Use the context-management skill to route context for the login task.
```

## Related Pages

- [Skills Guide](/guides/skills) - How to use skills with agents
- [Prompts Folder](/reference/prompts-folder) - Numbered prompts that invoke skills
- [Commands Folder](/reference/commands-folder) - Named prompts that invoke skills
- [Templates Folder](/reference/templates-folder) - Document formats used by skills
- [Workflows Folder](/reference/workflows-folder) - Sequences that orchestrate skills
- [AI Agent Simulation](/guides/ai-agent-simulation) - How to prompt the agent through skills
- [Building Blocks](/guides/building-blocks) - What each AIOS artifact type does
