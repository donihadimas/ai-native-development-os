---
title: Building Blocks
description: A beginner-friendly map of every AIOS artifact type and when to use each one.
---

AIOS is a file-based workflow layer for AI coding agents. It gives your agent durable files to read instead of relying on chat memory. Each artifact type has a specific job. This page explains what each one does and when you should reach for it.

## Two Kinds of Files

When you set up AIOS, two directories appear:

| Directory | What It Holds | Purpose |
| --- | --- | --- |
| `.aios/` | Skills, templates, prompts, references, workflows, commands, integrations | Tells the agent **how** to work |
| `docs/` | Vision, PRD, design notes, architecture, ADRs, tasks, reviews, API contracts, context maps | Tells the agent **what** to build |

You can reuse the same `.aios/` workflow kit across projects. Each project keeps its own `docs/` context.

## Artifact Types

| Artifact | What It Is | Example |
| --- | --- | --- |
| **CLI Commands** | Named actions you run from the terminal. They create files, install kits, or validate projects. | `aios create task` |
| **Command Prompts** | Markdown instructions in `.aios/commands/` that tell the agent what to do when you invoke a command. | `.aios/commands/generate-prd.md` |
| **Numbered Prompts** | Step-by-step workflow prompts in `.aios/prompts/`. Numbered from 00 to 13 for the full development lifecycle. | `.aios/prompts/01-generate-prd.md` |
| **Skills** | Reusable operating procedures for agents. They define inputs, process, outputs, and quality checks for a specific job. | `product-discovery`, `code-review` |
| **Templates** | Standard document formats. Fill them in to produce PRDs, ADRs, tasks, reviews, and other artifacts. | `prd.template.md` |
| **Workflows** | Step-by-step flows that orchestrate skills and templates for a lifecycle phase. | `new-feature.workflow.md` |
| **References** | Stable engineering principles the agent should follow. They stay constant across tasks. | `testing-principles.md` |
| **Project Docs** | Product vision, architecture, ADRs, tasks, reviews, and context maps in `docs/`. | `docs/product/prd.md` |
| **Native Agent Folders** | Agent-specific skill copies (optional). The Markdown source remains canonical. | `.agents/skills/`, `.qwen/skills/`, `.opencode/skills/`, `.agent/skills/` |

## CLI Commands vs Prompts vs Skills

These three are easy to confuse:

- **CLI Commands** run from your terminal. They create files, install assets, or validate projects. They do not write application code.
- **Command Prompts** are Markdown files that tell the agent what procedure to follow when you invoke a command.
- **Skills** are reusable agent procedures. You ask the agent to execute a skill (like `product-discovery` or `code-review`) and it follows the steps defined in the skill file.

## When You Want X, Use Y

| I Want To... | Use This |
| --- | --- |
| Start a new project | `aios init <project-name>` or `aios starter <starter-name> <project-name>` |
| Understand how AIOS works | This guide and [How It Works](/guides/how-it-works) |
| Clarify a raw product idea | `product-discovery` skill or prompt `00-discover-product.md` |
| Write a PRD | `prd-generator` skill or prompt `01-generate-prd.md` |
| Design architecture | `architecture-design` skill or prompt `02-generate-architecture.md` |
| Record a decision | `adr-generator` skill or prompt `03-generate-adr.md` |
| Break work into tasks | `task-breakdown` skill or prompt `04-generate-tasks.md` |
| Plan implementation | `implementation-planner` skill or prompt `05-plan-implementation.md` |
| Implement a task | `task-implementation` skill or prompt `06-implement-task.md` |
| Review code changes | `code-review` skill or prompt `07-review-code.md` |
| Write tests | `testing` skill or prompt `08-generate-tests.md` |
| Design an API contract | `api-contract-design` skill or prompt `09-design-api-contract.md` |
| Plan a database migration | `database-migration` skill or prompt `10-plan-database-migration.md` |
| Do a security review | `security-review` skill or prompt `11-review-security.md` |
| Prepare a release | `release-management` skill or prompt `12-plan-release.md` |
| Design UI/UX | `ui-ux-design` skill or prompt `13-design-ui-ux.md` |

## Related Pages

- [Getting Started](/getting-started) - Set up AIOS in your project
- [How It Works](/guides/how-it-works) - Core concepts and philosophy
- [Skills](/guides/skills) - Reusable agent procedures
- [Templates](/guides/templates) - Standard document formats
- [Workflow](/guides/workflow) - Step-by-step development flows
- [Integrations](/guides/integrations) - RTK and Caveman rules
- [CLI Commands](/reference/cli) - Full command reference
- [Project Structure](/reference/structure) - File and folder layout
