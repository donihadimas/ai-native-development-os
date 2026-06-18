---
title: Workflows Folder
description: Catalog of multi-step workflow files in the .aios/workflows/ folder.
---

The `workflows/` folder contains multi-step development sequences that connect skills, templates, references, and project docs into end-to-end flows. Each workflow tells the agent what steps to follow for a specific type of work.

## What Workflows Are

Workflows are the "what to do in what order" layer. They orchestrate skills and templates through a lifecycle: gather input, plan, implement, review, and validate.

## Workflow Catalog

| File | Purpose |
| --- | --- |
| `README.md` | Overview of available workflows |
| `api-contract.workflow.md` | Design API contracts before implementation |
| `bugfix.workflow.md` | Fix bugs with reproduction and verification |
| `database-migration.workflow.md` | Plan and execute database schema changes |
| `new-feature.workflow.md` | Implement a new feature end-to-end |
| `new-project.workflow.md` | Start a new project from scratch |
| `refactor.workflow.md` | Refactor code without changing behavior |
| `release.workflow.md` | Prepare and execute a release |
| `review.workflow.md` | Review code changes against requirements |
| `security-review.workflow.md` | Review security-sensitive changes |
| `ui-design.workflow.md` | Design user flows and interface states |

## Choosing the Right Workflow

| Situation | Workflow |
| --- | --- |
| Starting a new project | `new-project.workflow.md` |
| Building a new feature | `new-feature.workflow.md` |
| Fixing a reported bug | `bugfix.workflow.md` |
| Refactoring existing code | `refactor.workflow.md` |
| Reviewing a pull request or diff | `review.workflow.md` |
| Preparing a release | `release.workflow.md` |
| Changing database schema | `database-migration.workflow.md` |
| Designing an API contract | `api-contract.workflow.md` |
| Reviewing security-sensitive code | `security-review.workflow.md` |
| Designing user-facing UI | `ui-design.workflow.md` |

## Detailed Reference

### README.md

**Purpose:** Lists available workflows and explains their role in the kit.

**When to use:** Reference file for understanding what workflows are available.

**Prerequisite docs:** None - informational only.

**Skills involved:** None - informational only.

**Expected outputs:** None.

**Next action:** Choose the appropriate workflow for your current situation.

### api-contract.workflow.md

**Purpose:** Design API endpoints, request/response schemas, and error handling before implementation.

**When to use:** When building or changing APIs that frontend or external consumers depend on.

**Prerequisite docs:** PRD, architecture doc.

**Skills involved:** `api-contract-design`, `backend-api-development`

**Expected outputs:** API contract in `<docsRoot>/api/`

**Next action:** Review contract with stakeholders, then create implementation tasks.

### bugfix.workflow.md

**Purpose:** Fix bugs with clear reproduction, root cause analysis, and verification.

**When to use:** When a bug is reported, a test fails, or unexpected behavior is observed.

**Prerequisite docs:** Bug report or reproduction steps, affected code, nearby tests.

**Skills involved:** `testing`, `implementation-planner`, `task-implementation`, `code-review`

**Expected outputs:** Bugfix task, code changes, test evidence, review doc.

**Next action:** Verify the fix resolves the original issue, then close the bug.

### database-migration.workflow.md

**Purpose:** Plan and execute database schema changes with safety checks and rollback notes.

**When to use:** When adding tables, columns, indexes, or changing data models.

**Prerequisite docs:** Current schema, migration requirements, architecture doc.

**Skills involved:** `database-migration`, `task-implementation`

**Expected outputs:** Migration plan in `<docsRoot>/database/migrations/`, migration code.

**Next action:** Review migration plan, then execute in a safe order.

### new-feature.workflow.md

**Purpose:** Implement a new feature end-to-end from idea to reviewed code.

**When to use:** When building a new user-facing or system feature.

**Prerequisite docs:** Feature idea or user request, existing PRD, architecture, design notes.

**Skills involved:** `prd-generator`, `architecture-design`, `adr-generator`, `ui-ux-design`, `api-contract-design`, `task-breakdown`, `implementation-planner`, `task-implementation`, `code-review`, `testing`

**Expected outputs:** Updated PRD, architecture, ADRs, design, API contract, tasks, code changes, reviews.

**Next action:** Review the complete feature, then move to the next feature or release.

### new-project.workflow.md

**Purpose:** Start a new project with full AIOS structure and workflow kit.

**When to use:** When creating a project from scratch.

**Prerequisite docs:** Product idea or vision.

**Skills involved:** `product-discovery`, `prd-generator`, `architecture-design`

**Expected outputs:** AI-ready project skeleton, vision doc, PRD, architecture, design doc (if UI involved), initial ADRs, initial task list.

**Next action:** Run `aios next` to see the recommended next step.

### refactor.workflow.md

**Purpose:** Refactor code without changing external behavior.

**When to use:** When improving code structure, readability, or performance without feature changes.

**Prerequisite docs:** Refactoring goal, affected code, existing tests.

**Skills involved:** `implementation-planner`, `task-implementation`, `code-review`, `testing`

**Expected outputs:** Refactoring tasks, code changes, test evidence.

**Next action:** Verify all tests pass, behavior unchanged, then review the refactor.

### release.workflow.md

**Purpose:** Prepare release documentation, changelog, and deployment checklist.

**When to use:** When shipping completed features to production.

**Prerequisite docs:** Completed tasks, review evidence, test evidence.

**Skills involved:** `release-management`

**Expected outputs:** Release notes, changelog entry, deployment checklist.

**Next action:** Review scope, evidence, and rollback plan. Get explicit human approval, then publish or deploy outside AIOS.

### review.workflow.md

**Purpose:** Review code changes against task acceptance criteria and identify risks.

**When to use:** When reviewing a pull request, branch diff, or completed task.

**Prerequisite docs:** Diff, task file, related ADRs.

**Skills involved:** `code-review`

**Expected outputs:** Review report in `<docsRoot>/reviews/`.

**Next action:** Address findings, then approve or request changes.

### security-review.workflow.md

**Purpose:** Review security-sensitive code for authentication, authorization, and input validation risks.

**When to use:** Before release or when touching security-sensitive code.

**Prerequisite docs:** Changed files, security principles.

**Skills involved:** `security-review`

**Expected outputs:** Security review in `<docsRoot>/security/`.

**Next action:** Address findings, then proceed with release.

### ui-design.workflow.md

**Purpose:** Design user flows, screens, interface states, and accessibility.

**When to use:** When building user-facing features that need design decisions.

**Prerequisite docs:** PRD, architecture doc.

**Skills involved:** `ui-ux-design`

**Expected outputs:** Design doc in `<docsRoot>/design/`.

**Next action:** Review design with stakeholders, then create implementation tasks.

## Full Mode vs Lite Mode

| Mode | Behavior |
| --- | --- |
| **Full mode** | Uses `.aios/skill-router.md`, prompts, templates, references, and workflows from `.aios/` |
| **Lite mode** | Uses `AGENTS.md`, context map, and available root or agent-provided instructions without `.aios/` |

In full mode, the agent reads the workflow file and follows the skill-router to find the right prompts and templates. In lite mode, the agent follows the same sequence manually using the context map and available guidance.

## Related Pages

- [Recommended Workflow](/guides/workflow) - Guided path through the common workflow
- [AI Agent Simulation](/guides/ai-agent-simulation) - How to prompt the agent through workflows
- [Skills](/guides/skills) - Reusable procedures that workflows invoke
- [Templates](/guides/templates) - Document formats used by workflows
- [Building Blocks](/guides/building-blocks) - What each AIOS artifact type does
