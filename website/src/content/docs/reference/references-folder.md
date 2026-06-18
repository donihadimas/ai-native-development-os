---
title: References Folder
description: Catalog of stable engineering principle files in the .aios/references/ folder.
---

The `references/` folder contains stable engineering principles that guide your AI agent's behavior. These are not task-specific requirements - they are durable rules that stay constant across tasks.

## What References Are

References are the "how to think" layer. They tell the agent what good engineering looks like: how to route context, how to write tests, how to handle security, how to style responses, and what decisions remain human-owned.

## Reference Catalog

| File | Purpose |
| --- | --- |
| `README.md` | Overview of available references |
| `api-standards.md` | API design principles and conventions |
| `architecture-principles.md` | Architecture decision guidance |
| `backend-api-standards.md` | Backend API implementation standards |
| `backend-principles.md` | Backend engineering principles |
| `context-budget.md` | Context size management rules |
| `context-principles.md` | Context routing and escalation rules |
| `database-standards.md` | Database design and migration standards |
| `engineering-principles.md` | General engineering principles |
| `frontend-principles.md` | Frontend engineering principles |
| `response-style.md` | Response formatting and style rules |
| `security-principles.md` | Security review and implementation rules |
| `testing-principles.md` | Test design and validation rules |
| `workflow-modes.md` | Full vs lite mode routing rules |

## When to Read References vs Task Docs

| Read This | When |
| --- | --- |
| **References** | At the start of a new task type, when the agent needs general engineering guidance |
| **Task file** | For the specific objective, acceptance criteria, and affected files |
| **PRD** | When the task scope or requirements are unclear |
| **Architecture/ADR** | When technical direction or decisions are unclear |
| **Code** | When implementing or debugging |

Do not dump every reference into context by default. Only read the references relevant to the current task.

## Detailed Reference

### README.md

**Purpose:** Lists available references and explains their role in the workflow kit.

**When to read:** When exploring what references are available.

**Related skills/workflows:** None - informational only.

**Human-owned decisions:** None.

### api-standards.md

**Purpose:** API design principles including naming, versioning, error handling, and response formats.

**When to read:** When designing or reviewing API endpoints.

**Related skills/workflows:** `api-contract-design`, `backend-api-development`

**Human-owned decisions:** API versioning strategy, public vs internal API boundaries.

### architecture-principles.md

**Purpose:** Guidance on architectural decisions, component boundaries, and system design.

**When to read:** When proposing or reviewing architecture changes.

**Related skills/workflows:** `architecture-design`, `adr-generator`

**Human-owned decisions:** Technology choices, system boundaries, deployment architecture.

### backend-api-standards.md

**Purpose:** Backend-specific API implementation standards including validation, authentication, and error responses.

**When to read:** When implementing backend API endpoints.

**Related skills/workflows:** `backend-api-development`, `api-contract-design`

**Human-owned decisions:** Authentication provider, rate limiting strategy, caching approach.

### backend-principles.md

**Purpose:** General backend engineering principles including error handling, logging, and performance.

**When to read:** When implementing backend services or infrastructure.

**Related skills/workflows:** `backend-api-development`, `database-migration`

**Human-owned decisions:** Infrastructure choices, scaling strategy, monitoring approach.

### context-budget.md

**Purpose:** Rules for managing context size and preventing context overflow.

**When to read:** When the agent has too many files open or context is getting large.

**Related skills/workflows:** `context-management`, all implementation tasks

**Human-owned decisions:** None - this is a routing rule, not a product decision.

### context-principles.md

**Purpose:** Context routing rules - what to read, when to escalate, how to stay focused.

**When to read:** At the start of any implementation task.

**Related skills/workflows:** `context-management`, all implementation tasks

**Human-owned decisions:** None - this is a routing rule, not a product decision.

### database-standards.md

**Purpose:** Database design standards including schema patterns, naming conventions, and migration safety.

**When to read:** When designing schemas or planning migrations.

**Related skills/workflows:** `database-migration`

**Human-owned decisions:** Database technology choice, schema ownership, data retention policy.

### engineering-principles.md

**Purpose:** General engineering principles including code quality, maintainability, and simplicity.

**When to read:** When implementing any code change.

**Related skills/workflows:** `implementation-planner`, `task-implementation`

**Human-owned decisions:** Code style preferences, tooling choices, refactoring priorities.

### frontend-principles.md

**Purpose:** Frontend engineering principles including component design, state management, and accessibility.

**When to read:** When implementing frontend features.

**Related skills/workflows:** `ui-ux-design`, `task-implementation`

**Human-owned decisions:** UI framework choice, component library, design system.

### response-style.md

**Purpose:** Response formatting rules for different contexts (formal vs concise).

**When to read:** When the agent needs to adjust response style based on integration settings.

**Related skills/workflows:** `caveman` integration, all operational communication

**Human-owned decisions:** None - style rules adapt to integration settings.

### security-principles.md

**Purpose:** Security review principles including authentication, authorization, secrets, and input validation.

**When to read:** When reviewing security-sensitive code or preparing for release.

**Related skills/workflows:** `security-review`

**Human-owned decisions:** Security policy, compliance requirements, threat model.

### testing-principles.md

**Purpose:** Test design principles including what to test, how to structure tests, and validation evidence.

**When to read:** When designing tests or reviewing test coverage.

**Related skills/workflows:** `testing`, `task-implementation`

**Human-owned decisions:** Test coverage targets, testing strategy, quality gates.

### workflow-modes.md

**Purpose:** Routing rules for full mode vs lite mode behavior.

**When to read:** When the agent needs to adapt behavior based on project configuration.

**Related skills/workflows:** `context-management`, all skills

**Human-owned decisions:** None - mode is determined by project config.

## Context Routing Pattern

Use this order for most requests:

1. `.aios/config.json` for mode, docsRoot, and projectShape
2. `AGENTS.md` for agent behavior
3. `<docsRoot>/context/context-map.md` for where project knowledge lives
4. The active PRD, ADR, task, or review document
5. The relevant reference files for the current task type
6. Only then inspect source files that need to change

Do not read all references at once. Read only what the current task requires.

## Related Pages

- [Building Blocks](/guides/building-blocks) - What each AIOS artifact type does
- [AI Agent Simulation](/guides/ai-agent-simulation) - How to prompt the agent through the lifecycle
- [Skills](/guides/skills) - Reusable procedures that references guide
- [Templates](/guides/templates) - Document formats used by the workflow
