<!-- AIOS:BEGIN -->

## AIOS Managed Section

Do not edit this AIOS section directly. It is managed by AI-Native Development OS and may be refreshed by `aios adopt` or `aios kit install`.

Project-specific instructions may be added below `<!-- AIOS:END -->`. User instructions below the AIOS section are valid and should be followed as long as they do not conflict with AIOS safety, context-routing, and verification rules.

## Role

You are an AI coding agent working in this repository.

## Core Rule

For implementation work, do not code before reading the active task file and routing the request through AIOS.
Active task discovery must use direct files in `<docsRoot>/tasks/` only. Treat `<docsRoot>/tasks/done/` as completed-task archive, not active work, unless the user asks for release planning, audit, or completed-task review.
Active plan discovery must use direct files in `<docsRoot>/plans/` only. Treat `<docsRoot>/plans/done/` as completed-plan archive, not active planning, unless the user asks for audit, traceability, or completed-task review.
When task or plan indexes exist, read `<docsRoot>/tasks/index.md` or `<docsRoot>/plans/index.md` before listing or opening task/plan bodies.

## Context Routing

If `.aios/config.json` exists, read it first and resolve `mode`, `docsRoot`, `projectShape`, `skillDelivery`, selected skills, and enabled integrations before opening project docs. If config is missing, treat the project as lite mode, use `docs` as `docsRoot`, and infer project shape from folders. Use `<docsRoot>/context/context-map.md` to decide which documents to read. Do not read the whole repository by default.

## Local AIOS Kit

When `.aios/` exists, treat it as the authoritative local workflow kit. In full mode, read `.aios/skill-router.md` before choosing any workflow, skill, prompt, template, or reference.
Use `.aios/commands/` as the local command palette when the user asks for a known workflow by name; follow the command's routing instructions before acting.
Use `.aios/prompts/` for manual AI workflow prompts when a prompt matches the requested lifecycle step.
Use `.aios/templates/` when creating docs.
Use `.aios/references/` for stable engineering guidance.
Use `.aios/workflows/` to follow development sequences; do not skip a relevant workflow when `.aios/skill-router.md` routes to it.
If `skillDelivery` is `native`, use the matching native agent skill. If a required native skill is unavailable, stop and report the missing skill instead of silently bypassing AIOS.
If `skillDelivery` is `portable`, read and follow `.aios/skills/<skill-name>/SKILL.md` when the router selects a reusable workflow.
If `skillDelivery` is `both`, prefer the native skill and use `.aios/skills/<skill-name>/SKILL.md` as the readable fallback.
In lite mode, use `AGENTS.md`, `<docsRoot>/context/context-map.md`, active project docs, and any root-level AIOS skills/templates/references/workflows available to the agent. Do not assume `.aios/` exists.
If `.aios/config.json` enables `integrations.rtk`, use `.aios/integrations/rtk.md` and `.aios/references/context-budget.md` for noisy command output unless exact full output is required.
If `.aios/config.json` enables `integrations.caveman`, use `.aios/integrations/caveman.md` and `.aios/references/response-style.md` for concise operational updates and debug loops only. Keep formal PRDs, ADRs, architecture, security reviews, migration plans, and release notes complete.
If `.aios/config.json` enables `integrations.ponytail`, use `.aios/integrations/ponytail.md` for minimal-correct-code implementation choices after reading the task and affected code.
Use `projectShape` from `.aios/config.json` to decide whether code lives in `frontend/`, `backend/`, `mobile/`, `src/`, or docs only.
When a generator skill has a Clarification Gate, ask focused questions before writing final files if the input is vague.
Every workflow response should end with what the user should review and the next recommended action.

## Required Before Implementation

1. Resolve `mode`, `docsRoot`, and `projectShape` from `.aios/config.json`; default to lite mode and `docs` only when config is missing.
2. Read the active task directly under `<docsRoot>/tasks/`; do not search `<docsRoot>/tasks/done/` unless completed-task history is requested.
3. Read related ADRs if the task mentions them.
4. Use `<docsRoot>/context/context-map.md` to choose the smallest relevant context set.
5. In full mode, read `.aios/skill-router.md`, select the matching command/workflow/skill, and follow that AIOS guidance before planning or editing.
6. Read summaries, headings, and relevant PRD or architecture sections only when acceptance criteria or constraints are unclear.
7. Search existing code before creating new abstractions.
8. Identify affected files.
9. Make a short implementation plan.
10. Keep active implementation plans directly under `<docsRoot>/plans/`; when the related task or task range is complete, move the plan to `<docsRoot>/plans/done/` without renaming it.
11. When a task is complete, set status to `Done`, fill `Done Summary`, verify acceptance criteria, then move the task file to `<docsRoot>/tasks/done/` without renaming it.

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
- Use Ponytail minimal-correct-code guidance only after understanding the active task and affected code.

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
