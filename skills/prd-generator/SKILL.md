---
name: prd-generator
description: Use when generating a product requirements document from a vision, product idea, or feature proposal.
---

# PRD Generator

## Goal

Create a clear PRD that gives product intent, requirements, acceptance criteria, risks, open questions, a product-level Mermaid flow chart, and the next workflow step for later architecture and task planning.

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

## Clarification Gate

Before writing the PRD, check whether these are clear enough:

- target users,
- user problem and desired outcome,
- MVP scope,
- non-goals,
- functional requirements or feature list,
- success metrics,
- constraints, risks, or assumptions.

If the inputs are too thin to create testable acceptance criteria, stop and ask the user 4-7 focused questions before generating the final PRD. Ask about missing product intent first, then scope and success criteria. You may produce a draft only when assumptions are explicit and the user asked for a draft.

## Outputs

Expected outputs:

- `docs/product/prd.md` or feature PRD section,
- functional requirements,
- non-functional requirements,
- product-level Mermaid flow chart,
- acceptance criteria,
- risks,
- open questions,
- review checklist and next step guidance.

## Process

Step-by-step process:

1. Read the vision or feature idea.
2. Identify target users and user stories.
3. Define goals and non-goals.
4. Add a Mermaid `flowchart` that shows the product journey, user workflow, or high-level feature flow.
5. Write functional requirements with stable IDs.
6. Add non-functional requirements that matter for the product.
7. Convert requirements into testable acceptance criteria.
8. Record risks and open questions.
9. Add a review checklist for the user.
10. End with the next workflow step: user reviews PRD, then generate architecture with `architecture-design`.
11. Use `templates/prd.template.md` for structure.

## Rules

Hard rules:

- Do not include implementation details unless they are true product constraints.
- Do not use the Mermaid chart for technical architecture; keep it product-level.
- Do not write acceptance criteria that cannot be tested.
- Do not ignore non-goals.
- Do not mark open questions as decisions.
- Do not tell the user to create implementation tasks before PRD review and architecture review.

## Quality Checklist

Before finishing, verify:

- [ ] Target users are named.
- [ ] Goals and non-goals are explicit.
- [ ] Mermaid chart reflects the product or user flow.
- [ ] Requirements have clear priority or importance.
- [ ] Acceptance criteria are testable.
- [ ] Risks and open questions are captured.
- [ ] Next step tells the user what to do after PRD review.

## Failure Modes

Watch out for:

- mixing PRD with architecture,
- broad requirements without acceptance criteria,
- hidden assumptions,
- over-scoped MVP,
- missing user value,
- ending without a clear next step.

## Example Prompt

```text
Use the prd-generator skill to create docs/product/prd.md from docs/product/vision.md.
```
