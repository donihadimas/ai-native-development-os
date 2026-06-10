---
title: How AIOS Works
description: The core concepts and philosophy behind the AI-Native Development OS.
---

AIOS is a workflow layer for AI-assisted development. It gives your coding agent durable files to read instead of relying on chat memory.

## The Core Problem

AI coding agents are strong at local implementation, but they can lose the larger picture when a project grows:

- Product requirements are scattered across chat history.
- Architecture decisions are remembered informally.
- Tasks are too large to verify.
- Frontend, backend, API contracts, and test expectations drift apart.
- Review and acceptance criteria are skipped when the output looks plausible.

AIOS fixes this by making files the source of truth. The agent reads the right document for the current step, uses reusable skills for the procedure, and works on one verifiable task at a time.

## The Main Layers

AIOS has five reusable layers:

| Layer | Purpose |
| --- | --- |
| Skills | Reusable operating procedures for agents, such as PRD generation, implementation planning, code review, testing, and release management. |
| Templates | Standard formats for PRDs, ADRs, tasks, reviews, API contracts, migrations, test plans, and release notes. |
| References | Stable engineering principles for context, frontend, backend, APIs, databases, testing, security, and response style. |
| Workflows | Step-by-step flows for new projects, features, bugfixes, refactors, reviews, releases, security reviews, and migrations. |
| Project Skeleton | The AI-ready project structure that gives every new project a common documentation and context layout. |

## `.aios/` Versus `docs/`

When you run `aios init` or `aios adopt`, the full setup creates two kinds of files:

- `.aios/` is the local workflow kit. It tells the agent **how** to work: skills, templates, prompts, references, workflows, command prompts, and integration rules.
- `docs/` is the project context. It tells the agent **what** to build: vision, PRD, architecture, ADRs, tasks, API contracts, reviews, and context maps.

This split is important. You can reuse the same workflow kit across projects while each project keeps its own product and architecture context.

## What The CLI Does

The CLI is a helper, not an application generator. It can:

- create or adopt an AI-ready project structure,
- install or repair the local `.aios/` kit,
- create numbered document stubs,
- install selected skills into native agent folders,
- manage optional RTK/Caveman rules,
- validate expected files,
- print the next recommended step.

It does not write application features, run the coding agent, install app dependencies, apply database migrations, or publish releases.

## Why This Works Better Than Chat Alone

Chat history is useful, but it is not a reliable project memory. AIOS turns important context into files that can be reviewed, versioned, and reused.

The practical pattern is:

1. Capture the product idea in `docs/product/vision.md`.
2. Generate or refine a PRD with acceptance criteria.
3. Record architecture and ADRs.
4. Break work into small tasks.
5. Give the agent one task and the minimum relevant context.
6. Review the diff against the task before moving on.
