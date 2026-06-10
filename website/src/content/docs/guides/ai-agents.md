---
title: Using with AI Agents
description: How to effectively command Codex, Qwen, OpenCode, and other agents.
---

AIOS is tool-agnostic. It works best when the agent is asked to read the minimum relevant context and execute one reusable skill or one task at a time.

## Native Skills vs Portable Skills

When you run `aios`, it asks if you want to install skills to **native agent folders**.

- **Native folders** place selected skills in agent-specific folders such as `.agents/skills`, `.qwen/skills`, `.opencode/skills`, or `.agent/skills`.
- **Portable folders** keep skills inside `.aios/skills` so any agent can read them as Markdown.
- **Both** keeps portable copies and installs native copies for supported agents.

Use native delivery when your agent automatically discovers skills. Use portable delivery when you want the workflow kit to be self-contained.

## A Good Agent Request

A strong request usually includes:

- the active file or task,
- the specific skill or template to use,
- the acceptance criteria,
- the files that are allowed to change,
- the validation command to run.

Avoid saying "build the whole feature" without a task file. That gives the agent too much room to invent missing requirements.

## Prompting Examples For Codex

### 1. Generating a Feature

Assuming you ran `aios create feature "Habit Reminders"`:

> **Prompt:** "Read `AGENTS.md` and the PRD. Then read the feature stub in `docs/product/features/`. Please expand it using the feature template in `.aios/templates/`."

### 2. Executing a Specific Skill

If you want to run a code review using the built-in skill:

> **Prompt:** "Please read the skill instructions at `.aios/skills/code-review/SKILL.md`. Execute this skill on the recent changes I made to `src/components/Button.tsx` and output the review in `docs/reviews/`."

### 3. Implementing a Task

Assuming you ran `aios create task "Implement Login API"`:

> **Prompt:** "Read `docs/tasks/003-implement-login-api.md`. Create a short implementation plan first. Then implement the code exactly as described. Do not modify unrelated files."

### 4. Asking For Validation

After the agent makes changes:

> **Prompt:** "Run the validation commands listed in the task. If something fails, debug the smallest relevant surface and update the review document with exact evidence."

## The Agent Instructions File

Your workspace root contains an `AGENTS.md` file. A good coding agent will read this file when analyzing the workspace. It contains rules such as:

- Do not modify unrelated files.
- Do not introduce dependencies without approval.
- Do not store secrets in source code.
- Create a short implementation plan for non-trivial changes.
- Do not mark work done before acceptance criteria and validation are satisfied.

If your AI starts drifting, remind it:

> "Please review `AGENTS.md` and strictly follow the operating principles."

## Context Routing Pattern

Use this order for most requests:

1. `AGENTS.md` for agent behavior.
2. `docs/context/context-map.md` for where project knowledge lives.
3. The active PRD, ADR, task, or review document.
4. The relevant `.aios/skills`, `.aios/templates`, or `.aios/references` file.
5. Only then inspect source files that need to change.
