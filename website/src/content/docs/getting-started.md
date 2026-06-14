---
title: Getting Started
description: Install AIOS, create or adopt a project, and understand the first workflow.
---

AI-Native Development OS (AIOS) gives a project a repeatable AI-ready workflow: product context, architecture notes, ADRs, small implementation tasks, reusable skills, templates, references, reviews, and validation.

The CLI helps create and maintain those files. It is only for setup, validation, and generating AIOS template files. It does not generate application code, run Codex for you, install your app dependencies, apply database migrations, or publish releases. Use Codex or another AI agent directly for AI-native development.

## Installation

Install the CLI globally to access the `aios` command from anywhere:

```bash
npm install -g @donihadimas/aios
aios --help
```

Requirements:
- Node.js 20 or newer.
- npm for global install.

Check the installed version:

```bash
aios -v
```

## Choose A Setup Path

For most users, start with the guided setup wizard:

```bash
aios
```

The wizard will guide you through:
- Creating a blank AIOS project or starting from a starter.
- Adopting an existing project without overwriting existing files.
- Choosing the project shape: fullstack, frontend, backend, mobile, library, or docs-only.
- Choosing full setup with `.aios/` workflow kit or lite setup with docs plus `.aios/config.json` only.
- Choosing where project docs should live (e.g. `docs/`, `.aios/project-docs/`).
- Installing AIOS skills into native agent folders (for Codex, Qwen Code, OpenCode, Antigravity) or keeping them portable.
- Optionally generating RTK/Caveman integration rules.

Use **Full AIOS setup** for most projects to get the complete `.aios/` directory containing prompts, references, templates, and workflows.

Use **Lite setup** only when you want the docs structure without the local workflow kit. Lite is useful for a project that already has its own prompt/skill system.

## Command Quickstart

If you prefer a non-interactive flow, you can use direct commands.

Create and validate a new project:

```bash
aios init demo-project
aios validate demo-project
aios next demo-project
cd demo-project
```

Adopt an existing project:

```bash
cd existing-project
aios adopt
aios validate
```

Create planning and review documents:

```bash
aios create feature "Habit reminders"
aios create design "Habit reminders"
aios create openapi "Habit API"
aios create migration "Create habits table"
aios create security "Habit API"
aios create adr "Use server date for completion"
aios create task "Implement habit API"
aios create review "Habit API"
aios create release "0.3.1"
```

Start from a lightweight AI docs only starter:

```bash
aios starter fullstack-saas demo-saas
aios validate demo-saas
```

## Manual Setup

You can still use AIOS without the CLI:

1. Copy `project-skeleton/` into a new project.
2. Ask your agent to use `prompts/00-discover-product.md` and `skills/product-discovery/SKILL.md` to interview you and fill `docs/product/vision.md`.
3. Review the vision, then ask your agent to use `prompts/01-generate-prd.md` and `skills/prd-generator/SKILL.md`.
4. Generate architecture, design notes for user-facing UI, ADRs, tasks, and review docs before coding.
5. Implement one small task at a time.
6. Save review evidence in `docs/reviews/` and run validation before marking the task done.

## What To Do First

After setup, open the generated `README.md`, `AGENTS.md`, and `docs/context/development-start.md`. These files explain the local project structure and tell the agent how to route context.

Then run:

```bash
aios next
```

`aios next` is read-only. It prints the next recommended step based on the project files that already exist.
