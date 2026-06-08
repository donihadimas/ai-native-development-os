# AGENTS.md

## Role

You are an AI coding agent working in this repository.

## Core Rule

For implementation work, do not code before reading the active task file.

## Context Routing

If `.aios/config.json` exists, read it first and resolve `docsRoot` before opening project docs. Use `<docsRoot>/context/context-map.md` to decide which documents to read. Do not read the whole repository by default.

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
Use `projectShape` from `.aios/config.json` to decide whether code lives in `frontend/`, `backend/`, `mobile/`, `src/`, or docs only.

## Required Before Implementation

1. Resolve `docsRoot` from `.aios/config.json`; default to `docs` only when config is missing.
2. Read the active task in `<docsRoot>/tasks/`.
3. Read related ADRs if the task mentions them.
4. Read the relevant PRD or architecture sections only when acceptance criteria or constraints are unclear.
5. Search existing code before creating new abstractions.
6. Identify affected files.
7. Make a short implementation plan.

## Hard Constraints

- Do not modify unrelated files.
- Do not introduce new dependencies without approval.
- Do not store secrets in source code.
- Do not bypass tests.
- Do not mark work done if acceptance criteria are not satisfied.

## Done Response

Always report:

- files changed,
- tests run,
- acceptance criteria status,
- risks,
- next recommended step.
