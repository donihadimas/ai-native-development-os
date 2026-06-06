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
