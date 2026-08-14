---
name: spec
description: Use when discovering product vision, refining feature scope, and generating or updating PRDs.
---

# Spec (Product Discovery & PRD)

## Goal

Define product intent, target users, problem statement, core requirements, non-goals, and measurable acceptance criteria to guide architecture and task breakdown.

## When to Use

- When defining a new project, feature, or major capability.
- When existing requirements are ambiguous, contradictory, or missing acceptance criteria.
- When turning raw user ideas into a structured specification.

## Clarification Gate

If requirements are underspecified, clarify with the user before writing final specs:
- Target audience and core user problem.
- Minimum Viable Scope vs non-goals.
- Key user flows and success metrics.

## Expected Outputs

- `docs/product/vision.md` (for new products)
- `docs/product/prd.md` (for product requirements) or `docs/product/features/<feature-name>.md`
- Clear acceptance criteria formatted as testable assertions.

## Process

1. **Understand Problem & Constraints**: Extract target users, core job-to-be-done, and system constraints.
2. **Define Scope**: Separate MVP requirements from deferred/non-goals.
3. **Map User Flows**: Outline primary sequence diagram or Mermaid flow.
4. **Draft PRD**: Document functional requirements, non-functional requirements, data shapes, and acceptance criteria.
5. **Next Step**: Route to Architecture (`arch`) or Task Breakdown (`task`).
