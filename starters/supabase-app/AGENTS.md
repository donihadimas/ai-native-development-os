# AGENTS.md

## Role

You are an AI coding agent working in this Supabase app project.

## Core Rule

For implementation work, do not code before reading the active task file.

## Context Routing

If `.aios/config.json` exists, read it first and resolve `docsRoot` before opening project docs. Use `<docsRoot>/context/context-map.md` to choose the smallest useful context set.

## Local AIOS Kit

Before selecting a workflow, read `.aios/skill-router.md` when `.aios/` is installed.
If `skillDelivery` is `native`, use the agent's native skill system first.
If `skillDelivery` is `portable`, use `.aios/skills/*/SKILL.md` when a task matches a reusable workflow.
If `skillDelivery` is `both`, prefer native skills and use `.aios/skills/*/SKILL.md` as the readable fallback.
Use `.aios/commands/` as a local command palette when the user asks for a known workflow by name.
Use `.aios/prompts/` for manual AI workflow prompts.
Use `.aios/templates/` when creating docs.
Use `.aios/references/` for stable engineering guidance.
Use `.aios/workflows/` to follow development sequences.
Use `projectShape` from `.aios/config.json` to locate the app folder.

## Required Before Implementation

1. Resolve `docsRoot` from `.aios/config.json`; default to `docs` only when config is missing.
2. Read the active task in `<docsRoot>/tasks/`.
3. Read related ADRs if mentioned.
4. Read API and database docs before integration work.
5. Search existing code before creating new patterns.
6. Make a short implementation plan.

## Hard Constraints

- Do not introduce dependencies without approval.
- Do not modify unrelated files.
- Do not store secrets in source code.
- Do not mark work done without validation evidence.

## Done Response

Always report files changed, tests run, acceptance criteria status, risks, and next step.
