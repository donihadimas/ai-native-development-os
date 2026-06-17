<!-- AIOS:BEGIN -->

## AIOS Managed Section

Do not edit this AIOS section directly. It is managed by AI-Native Development OS and may be refreshed by `aios adopt` or `aios kit install`.

Project-specific instructions may be added below `<!-- AIOS:END -->`. User instructions below the AIOS section are valid and should be followed as long as they do not conflict with AIOS safety, context-routing, and verification rules.

## Role

You are an AI coding agent working in this repository.

## Core Rule

For implementation work, do not code before reading the active task file.

## Context Routing

If `.aios/config.json` exists, read it first and resolve `mode`, `docsRoot`, and `projectShape` before opening project docs. If config is missing, treat the project as lite mode, use `docs` as `docsRoot`, and infer project shape from folders. Use `<docsRoot>/context/context-map.md` to decide which documents to read. Do not read the whole repository by default.

## Local AIOS Kit

In full mode, before selecting a workflow, read `.aios/skill-router.md` when `.aios/` is installed.
If `skillDelivery` is `native`, use the agent's native skill system first.
If `skillDelivery` is `portable`, use `.aios/skills/*/SKILL.md` when a task matches a reusable workflow.
If `skillDelivery` is `both`, prefer native skills and use `.aios/skills/*/SKILL.md` as the readable fallback.
Use `.aios/commands/` as a local command palette when the user asks for a known workflow by name.
Use `.aios/prompts/` for manual AI workflow prompts.
Use `.aios/templates/` when creating docs.
Use `.aios/references/` for stable engineering guidance.
Use `.aios/workflows/` to follow development sequences.
In lite mode, use `AGENTS.md`, `<docsRoot>/context/context-map.md`, active project docs, and any root-level AIOS skills/templates/references/workflows available to the agent. Do not assume `.aios/` exists.
If `.aios/config.json` enables `integrations.rtk`, use `.aios/integrations/rtk.md` and `.aios/references/context-budget.md` for noisy command output unless exact full output is required.
If `.aios/config.json` enables `integrations.caveman`, use `.aios/integrations/caveman.md` and `.aios/references/response-style.md` for concise operational updates and debug loops only. Keep formal PRDs, ADRs, architecture, security reviews, migration plans, and release notes complete.
Use `projectShape` from `.aios/config.json` to decide whether code lives in `frontend/`, `backend/`, `mobile/`, `src/`, or docs only.
When a generator skill has a Clarification Gate, ask focused questions before writing final files if the input is vague.
Every workflow response should end with what the user should review and the next recommended action.

## Required Before Implementation

1. Resolve `mode`, `docsRoot`, and `projectShape` from `.aios/config.json`; default to lite mode and `docs` only when config is missing.
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

<!-- AIOS:END -->

## Existing Agent Instructions

# AGENTS.md

## Role

You are an AI coding agent working in the AI-Native Development OS repository. Your job is to improve the reusable OS itself: skills, templates, references, workflows, prompts, and the project skeleton.

## Core Rule

Do not implement before understanding the active task or request. Keep changes small, purposeful, and aligned with `prd.md`.

## Context Routing

Use the minimum context needed:

1. Read the user request.
2. Read the relevant section of `prd.md` only when product scope or acceptance criteria are unclear.
3. Read the specific files you will change.
4. Search existing files before creating new patterns.
5. Avoid reading or rewriting unrelated areas.

If `.aios/config.json` enables integrations, use `.aios/integrations/` and `.aios/references/` for routing:

- Use RTK only for noisy command output and never when exact full output is requested.
- Use Caveman-style brevity only for operational updates, not formal PRD, ADR, architecture, security, migration, or release artifacts.

## Required Before Implementation

- Identify the artifact type being changed: skill, template, reference, workflow, prompt, skeleton, or documentation.
- Check the existing naming and structure for that artifact type.
- Make a short implementation plan for non-trivial changes.
- Confirm whether the change belongs in V1 or should remain a V2 placeholder.

## Hard Constraints

- Do not modify unrelated files.
- Do not introduce dependencies without approval.
- Do not add stack-specific starters to V1.
- Do not implement CLI behavior in V1.
- Do not store secrets in source code.
- Do not mark work done if acceptance criteria are not satisfied.

## Done Response

Always report:

- files changed,
- tests or validation run,
- acceptance criteria status,
- risks or follow-up work,
- next recommended step when useful.
