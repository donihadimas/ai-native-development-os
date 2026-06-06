---
name: prd-generator
description: Use when generating a product requirements document from a vision, product idea, or feature proposal.
---

# PRD Generator

## Goal

Create a clear PRD that gives product intent, requirements, acceptance criteria, risks, and open questions for later architecture and task planning.

## When to Use

Use this skill when:

- `docs/product/prd.md` needs to be created,
- a feature needs requirements before implementation,
- acceptance criteria are unclear,
- product scope needs to be separated from non-goals.

## Inputs

Expected inputs:

- product vision or feature idea,
- known constraints,
- target users,
- existing PRD sections if updating.

## Outputs

Expected outputs:

- `docs/product/prd.md` or feature PRD section,
- functional requirements,
- non-functional requirements,
- acceptance criteria,
- risks,
- open questions.

## Process

Step-by-step process:

1. Read the vision or feature idea.
2. Identify target users and user stories.
3. Define goals and non-goals.
4. Write functional requirements with stable IDs.
5. Add non-functional requirements that matter for the product.
6. Convert requirements into testable acceptance criteria.
7. Record risks and open questions.
8. Use `templates/prd.template.md` for structure.

## Rules

Hard rules:

- Do not include implementation details unless they are true product constraints.
- Do not write acceptance criteria that cannot be tested.
- Do not ignore non-goals.
- Do not mark open questions as decisions.

## Quality Checklist

Before finishing, verify:

- [ ] Target users are named.
- [ ] Goals and non-goals are explicit.
- [ ] Requirements have clear priority or importance.
- [ ] Acceptance criteria are testable.
- [ ] Risks and open questions are captured.

## Failure Modes

Watch out for:

- mixing PRD with architecture,
- broad requirements without acceptance criteria,
- hidden assumptions,
- over-scoped MVP,
- missing user value.

## Example Prompt

```text
Use the prd-generator skill to create docs/product/prd.md from docs/product/vision.md.
```
