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

## Outputs

Expected outputs:

- architecture document,
- candidate ADR list,
- key risks and constraints,
- testing and deployment strategy.

## Process

Step-by-step process:

1. Read the PRD and identify required capabilities.
2. Define system boundaries and major components.
3. Assign frontend, backend, database, and integration responsibilities.
4. Define API, authentication, authorization, testing, deployment, and observability strategies at a high level.
5. Identify decisions that deserve ADRs.
6. Record constraints and risks.
7. Use `templates/architecture.template.md` for structure.

## Rules

Hard rules:

- Do not choose stack-specific details unless the project already chose a stack.
- Do not bury major trade-offs in prose; turn them into ADR candidates.
- Do not design beyond the PRD's current scope.
- Do not skip security and testing strategy.

## Quality Checklist

Before finishing, verify:

- [ ] Frontend and backend responsibilities are clear.
- [ ] API and database strategy are addressed.
- [ ] Authentication and authorization are considered.
- [ ] Testing and deployment strategy are present.
- [ ] ADR candidates are listed.

## Failure Modes

Watch out for:

- over-engineering,
- framework-driven design without product need,
- missing cross-cutting concerns,
- vague component boundaries,
- architecture that does not support the PRD.

## Example Prompt

```text
Use the architecture-design skill to generate docs/architecture/architecture.md from the PRD.
```
