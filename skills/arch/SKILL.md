---
name: arch
description: Use when designing system architecture, defining components, data models, and recording Architecture Decision Records (ADRs).
---

# Arch (Architecture & ADR)

## Goal

Design maintainable system architecture, component boundaries, data models, integration contracts, and document trade-offs as Architecture Decision Records (ADRs).

## When to Use

- When designing system structure from a PRD.
- When making non-trivial technical decisions (e.g. database choice, framework, auth model).
- When introducing or altering architectural patterns.

## Expected Outputs

- `docs/architecture/architecture.md` (System architecture specification)
- `docs/adr/ADR-XXX-<title>.md` (Architecture Decision Records)
- Mermaid component and data flow diagrams.

## Process

1. **Review Requirements**: Read relevant PRD and constraints.
2. **Design Boundaries**: Define components, responsibilities, API interfaces, and data models.
3. **Record Decisions**: When choosing between alternatives, create an ADR documenting: Context, Decision, Consequences, and Alternatives considered.
4. **Identify Risks**: Note performance, security, and scalability bottlenecks.
5. **Next Step**: Route to Task Breakdown (`task`).
