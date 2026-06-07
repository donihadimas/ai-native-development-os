---
name: adr-generator
description: Use when recording an important technical decision, trade-off, or constraint as an Architecture Decision Record.
---

# ADR Generator

## Goal

Create concise ADRs that preserve decision context, alternatives, consequences, and related documents.

## When to Use

Use this skill when:

- a technical decision affects architecture,
- a dependency or framework choice is made,
- a database/API/auth/security decision has long-term impact,
- a previous decision needs to be superseded.

## Inputs

Expected inputs:

- decision topic,
- current context,
- chosen option,
- alternatives considered,
- known consequences,
- related PRD, architecture, or task links.

## Outputs

Expected outputs:

- `docs/adr/ADR-XXX-title.md`,
- clear status,
- decision and consequences,
- related documents.

## Process

Step-by-step process:

1. Confirm the decision is important enough for an ADR.
2. Summarize the context and forces.
3. State the decision directly.
4. List meaningful alternatives considered.
5. Document positive, negative, and neutral consequences.
6. Link related docs and tasks.
7. Use `templates/adr.template.md` for structure.

## Rules

Hard rules:

- Do not use ADRs for minor implementation details.
- Do not present a decision without alternatives.
- Do not hide trade-offs.
- Do not overwrite old ADRs; supersede them with a new ADR when needed.

## Quality Checklist

Before finishing, verify:

- [ ] Status is set.
- [ ] Context explains why the decision matters.
- [ ] Decision is explicit.
- [ ] Alternatives are meaningful.
- [ ] Consequences are honest.
- [ ] Related documents are linked.

## Failure Modes

Watch out for:

- ADRs that read like announcements,
- missing alternatives,
- vague consequences,
- decisions that should remain human-approved,
- duplicated or conflicting ADRs.

## Example Prompt

```text
Use the adr-generator skill to create an ADR for choosing token-based authentication.
```
