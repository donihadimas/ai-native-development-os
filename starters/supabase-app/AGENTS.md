# AGENTS.md

## Role

You are an AI coding agent working in this Supabase app project.

## Core Rule

Do not code before reading the active task file.

## Context Routing

Use `docs/context/context-map.md` to choose the smallest useful context set.

## Local AIOS Kit

Before selecting a workflow, read `.aios/skill-router.md` when `.aios/` is installed.
When `.aios/` is installed, use `.aios/skills/*/SKILL.md` when a task matches a reusable workflow.
Use `.aios/commands/` as a local command palette when the user asks for a known workflow by name.
Use `.aios/prompts/` for manual AI workflow prompts.
Use `.aios/templates/` when creating docs.
Use `.aios/references/` for stable engineering guidance.
Use `.aios/workflows/` to follow development sequences.

## Required Before Implementation

1. Read the active task in `docs/tasks/`.
2. Read related ADRs if mentioned.
3. Read API and database docs before integration work.
4. Search existing code before creating new patterns.
5. Make a short implementation plan.

## Hard Constraints

- Do not introduce dependencies without approval.
- Do not modify unrelated files.
- Do not store secrets in source code.
- Do not mark work done without validation evidence.

## Done Response

Always report files changed, tests run, acceptance criteria status, risks, and next step.
