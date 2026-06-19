# AGENTS.md

## Role

You are an AI coding agent working in this Next.js web project.

## Core Rule

For implementation work, do not code before reading the active task file and routing the request through AIOS.

## Context Routing

If `.aios/config.json` exists, read it first and resolve `mode`, `docsRoot`, `projectShape`, `skillDelivery`, selected skills, and enabled integrations before opening project docs. If config is missing, treat the project as lite mode, use `docs` as `docsRoot`, and infer project shape from folders. Use `<docsRoot>/context/context-map.md` to choose the smallest useful context set.

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
Use `projectShape` from `.aios/config.json` to locate the app folder.
When a generator skill has a Clarification Gate, ask focused questions before writing final files if the input is vague.

## Required Before Implementation

1. Resolve `mode`, `docsRoot`, `projectShape`, and `skillDelivery` from `.aios/config.json`; default to lite mode and `docs` only when config is missing.
2. Read the active task in `<docsRoot>/tasks/`.
3. Read related ADRs if mentioned.
4. Use `<docsRoot>/context/context-map.md` to choose the smallest relevant context set.
5. In full mode, read `.aios/skill-router.md`, select the matching command/workflow/skill, and follow that AIOS guidance before planning or editing.
6. Read relevant product or architecture docs only when needed.
7. Search existing code before creating new patterns.
8. Make a short implementation plan.

## Hard Constraints

- Do not introduce dependencies without approval.
- Do not modify unrelated files.
- Do not store secrets in source code.
- Do not mark work done without validation evidence.

## Done Response

Always report files changed, tests run, acceptance criteria status, risks, and next step.
