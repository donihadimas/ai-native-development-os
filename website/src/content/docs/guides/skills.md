---
title: Skills
description: What AIOS skills are, where they live, and how to use them with coding agents.
---

Skills are reusable Markdown procedures for AI agents. They turn repeated instructions into durable project assets.

Instead of writing a long prompt every time you need a PRD, review, test plan, migration plan, or release note, you ask the agent to execute the relevant skill.

## Included Skills

AIOS includes skills for the common development lifecycle:

| Skill | Use It For |
| --- | --- |
| `product-discovery` | Clarifying a raw product idea before writing formal requirements. |
| `prd-generator` | Turning product context into a structured PRD with testable acceptance criteria. |
| `architecture-design` | Producing architecture context and technical direction. |
| `ui-ux-design` | Designing user flows, screens, interface states, and accessibility before frontend work. |
| `adr-generator` | Recording one architecture decision, trade-off, and consequence. |
| `task-breakdown` | Splitting large work into small implementation tasks. |
| `implementation-planner` | Creating a short implementation plan before code changes. |
| `backend-api-development` | Designing and implementing backend API work with contracts and validation. |
| `api-contract-design` | Drafting API contracts before frontend/backend implementation. |
| `database-migration` | Planning database migrations with safety checks and rollback notes. |
| `testing` | Designing test plans and validation evidence. |
| `code-review` | Reviewing diffs against requirements, risks, and tests. |
| `security-review` | Checking security risks before release. |
| `release-management` | Preparing release notes, changelog drafts, and rollout checks. |
| `context-management` | Choosing the minimum useful context for an agent request. |

## Where Skills Live

In a full setup, skills can be delivered in three modes:

| Mode | Location | Best For |
| --- | --- | --- |
| Portable | `.aios/skills/` | Any agent that can read Markdown files. |
| Native | `.agents/skills`, `.qwen/skills`, `.opencode/skills`, or `.agent/skills` | Agents that discover skills from local folders. |
| Both | Portable and native copies | Teams that want portability and native agent discovery. |

Use portable mode when you want the project to contain every workflow asset. Use native mode when the agent supports skill auto-discovery and you want `.aios/` to stay smaller.

## Install Or List Skills

List supported agent targets and available skills:

```bash
aios agent list
```

Install selected skills:

```bash
aios agent install . --agents codex,qwen --skills core --skill-delivery native
```

Install all selected skills during project creation:

```bash
aios init demo-project --agents codex,qwen --skills all --skill-delivery both
```

## How To Ask An Agent To Use A Skill

Use direct, file-based instructions:

```text
Read AGENTS.md, docs/context/context-map.md, and .aios/skills/code-review/SKILL.md.
Review the current diff against docs/tasks/003-implement-login-api.md.
Write findings first, then validation evidence and residual risks.
```

The important part is not the exact wording. The important part is that the agent knows which procedure to follow, which task to evaluate, and where to write the result.

## Skill Safety Rules

- Use one skill at a time unless the task explicitly requires a larger workflow.
- Keep the active task small enough to review.
- Give the agent the relevant docs, not the whole repository.
- Record output in the expected docs folder when the skill produces an artifact.
- Human review still owns product, architecture, security, and dependency decisions.
