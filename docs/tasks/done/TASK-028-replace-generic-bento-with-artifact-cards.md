# TASK-028: Replace Generic Bento With Artifact Cards

## Status

Done

## Objective

Replace generic homepage feature cards with artifact-focused cards that teach users what AIOS is made of.

## Background

The current homepage bento section describes broad benefits such as reusable workflows, explicit context, and verifiable tasks. These are accurate, but they can feel abstract. AIOS will be more memorable if the homepage foregrounds concrete artifacts: `skills/`, `templates/`, `workflows/`, `tasks/`, ADRs, context maps, and `.aios/config.json`.

## Scope

### In Scope

- Update `website/src/content/docs/index.mdx`.
- Update `website/src/components/landing/BentoGrid.astro` if needed.
- Update `website/src/components/landing/FeatureCard.astro` if needed.
- Replace abstract feature cards with artifact cards.
- Add links from cards to relevant guide or reference pages where available.
- Use concise card copy with file paths, purposes, and expected user value.

### Out of Scope

- Do not create new reference pages in this task.
- Do not rewrite the lifecycle section.
- Do not add a new component library.
- Do not add nested cards or decorative card-heavy page sections beyond the existing landing structure.

## Affected Areas

- Frontend: `website/src/content/docs/index.mdx`, `website/src/components/landing/BentoGrid.astro`, `website/src/components/landing/FeatureCard.astro`
- Backend: N/A
- Shared docs: Website homepage content only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `docs/plans/TASK-026-031-website-technical-field-manual-plan.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: TASK-026 recommended first; TASK-027 can be implemented before or alongside this task

## Acceptance Criteria

- [x] Homepage cards focus on concrete AIOS artifacts rather than generic product claims.
- [x] Cards include artifacts such as `skills/`, `templates/`, `workflows/`, `tasks/`, ADRs, context maps, and `.aios/config.json`.
- [x] Each card explains what the artifact does in one concise description.
- [x] Relevant cards link to existing guide or reference pages.
- [x] Card styling follows the visual system from TASK-026.
- [x] The section remains responsive and scannable.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Inspect homepage desktop and mobile layouts, confirm links resolve, and confirm card text does not overflow.

## Implementation Notes

- Prefer file-path labels and short descriptions.
- Keep the section useful for new users and returning users.
- Avoid marketing-only language.
- Do not duplicate long reference content on the homepage.

## Done Summary

- Files changed: `website/src/content/docs/index.mdx`, `website/src/components/landing/FeatureCard.astro`
- Tests run: `astro build` — 23 pages built successfully
- Acceptance criteria status: All 6/6 passed
- Risks: None. Cards use existing BentoGrid component with no new dependencies.
