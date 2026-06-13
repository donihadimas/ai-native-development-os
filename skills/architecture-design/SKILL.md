---
name: architecture-design
description: Use when designing a system or feature architecture from a PRD before implementation tasks are created.
---

# Architecture Design

## Goal

Create an architecture document that explains system boundaries, data flow, frontend/backend responsibilities, API strategy, testing, deployment, observability, and constraints.

## When to Use

Use this skill when:

- a new project needs `docs/architecture/architecture.md`,
- a feature needs design before task breakdown,
- frontend and backend responsibilities must be aligned,
- important technical decisions need to be surfaced for ADRs.

## Inputs

Expected inputs:

- PRD,
- product vision,
- known technical constraints,
- existing ADRs if any,
- API or database requirements if known.

## Clarification Gate

Before writing architecture, check whether these are clear enough:

- project shape and major app areas,
- chosen or constrained stack,
- core capabilities from the PRD,
- data ownership and persistence needs,
- integration/API needs,
- auth and authorization expectations,
- deployment or operational constraints.

If major constraints are missing, stop and ask the user 3-7 focused questions before generating the final architecture. Do not choose stack-specific details unless the user has chosen them or the existing project already implies them.

## Outputs

Expected outputs:

- architecture document,
- candidate ADR list,
- key risks and constraints,
- testing and deployment strategy,
- review checklist and next step guidance.

## Process

Step-by-step process:

1. Read the PRD and identify required capabilities.
2. Define system boundaries and major components.
3. Assign frontend, backend, database, and integration responsibilities.
4. Define API, authentication, authorization, testing, deployment, and observability strategies at a high level.
5. Identify decisions that deserve ADRs.
6. Record constraints and risks.
7. Add a review checklist for the user.
8. End with the next workflow step: user reviews architecture, creates ADRs for important decisions, then uses `task-breakdown`.
9. Use `templates/architecture.template.md` for structure.

## Rules

Hard rules:

- Do not choose stack-specific details unless the project already chose a stack.
- Do not bury major trade-offs in prose; turn them into ADR candidates.
- Do not design beyond the PRD's current scope.
- Do not skip security and testing strategy.
- Do not create implementation tasks before the user reviews the architecture and ADR candidates.

## Quality Checklist

Before finishing, verify:

- [ ] Frontend and backend responsibilities are clear.
- [ ] API and database strategy are addressed.
- [ ] Authentication and authorization are considered.
- [ ] Testing and deployment strategy are present.
- [ ] ADR candidates are listed.
- [ ] Next step tells the user what to review and what to do after approval.

## Failure Modes

Watch out for:

- over-engineering,
- framework-driven design without product need,
- missing cross-cutting concerns,
- vague component boundaries,
- architecture that does not support the PRD,
- ending without a clear next step.

## Example Prompt

```text
Use the architecture-design skill to generate docs/architecture/architecture.md from the PRD.
```
