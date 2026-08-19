---
name: ui-ux-design
description: Use when designing user flows, screens, interface states, and UX constraints before frontend or product-facing implementation tasks.
---

# UI/UX Design

## Goal

Create a reviewable product-interface design document that translates PRD requirements into user flows, screens, interface states, visual direction, design-system baseline, accessibility expectations, and frontend task guidance without writing app code.

## When to Use

Use this skill when:

- a feature has user-facing UI,
- frontend tasks need clearer screen or flow guidance,
- loading, empty, error, and success states are unclear,
- typography, spacing, color, or component consistency needs a source of truth,
- user experience needs review before implementation,
- a project needs `<docsRoot>/design/design.md`.

## Inputs

Expected inputs:

- PRD or feature PRD,
- product vision,
- architecture notes when UI boundaries depend on system shape,
- API contract if data exchange is involved,
- existing design notes or UI conventions if present.
- existing design tokens, component library, or style guide if present.

## Clarification Gate

Before writing the design document, check whether these are clear enough:

- primary user flow,
- target users and usage context,
- screens or surfaces involved,
- core actions and decisions,
- data shown or collected,
- loading, empty, error, and success behavior,
- typography, color, spacing, responsive, and component conventions,
- accessibility or device constraints.

If the flow, screens, or state expectations are too vague for implementation-ready frontend tasks, stop and ask the user 3-6 focused questions before writing the final design artifact.

## Outputs

Expected outputs:

- `<docsRoot>/design/design.md`,
- user flow,
- screen inventory,
- interface states,
- visual direction,
- typography, color, spacing, and component consistency rules,
- interaction and validation notes,
- accessibility expectations,
- open questions,
- review checklist and next step guidance.

## Process

Step-by-step process:

1. Read the PRD or feature PRD and identify user goals.
2. Map the primary user flow from entry point to success outcome.
3. Define visual direction, hierarchy, density, and any existing design-system source.
4. Capture typography, color, spacing, radius, elevation, component, and responsive rules.
5. List screens, sections, dialogs, and important components.
6. Define loading, empty, error, success, disabled, focus, hover, and permission states.
7. Identify validation, accessibility, responsive, animation, and content expectations.
8. Link API or data dependencies when relevant.
9. Record open questions and risks.
10. End with the next workflow step: user reviews design, then task breakdown creates frontend or product-facing implementation tasks.
11. Use `templates/design.template.md` for structure.

## Rules

Hard rules:

- Do not write implementation code.
- Do not invent a visual brand system unless the user asks or existing docs define one.
- If visual details are not provided, define conservative defaults and label them as proposed for review.
- Reuse existing tokens, components, and UI library primitives before introducing new visual rules.
- Do not skip empty, loading, error, and success states.
- Do not create frontend implementation tasks before the user reviews the design.
- Keep design decisions product-facing; put architecture decisions in ADRs or architecture docs.

## Quality Checklist

Before finishing, verify:

- [ ] Primary user flow is clear.
- [ ] Visual direction is clear or explicitly proposed for review.
- [ ] Typography, color, spacing, radius, component, and responsive rules are defined or linked to an existing system.
- [ ] Screens and key interface states are listed.
- [ ] Accessibility and responsive expectations are considered.
- [ ] Data/API dependencies are named when relevant.
- [ ] Open questions are captured.
- [ ] Next step tells the user what to review and what to do after approval.

## Failure Modes

Watch out for:

- vague screen lists,
- missing error or empty states,
- design that contradicts PRD scope,
- hidden API assumptions,
- jumping straight into implementation.

## Example Prompt

```text
Use the ui-ux-design skill to create docs/design/design.md for the onboarding feature before frontend task breakdown.
```
