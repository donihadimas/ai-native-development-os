# TASK-029: Improve Docs Page Reading Experience

## Status

Done

## Objective

Improve the reading experience of guide and reference pages so long AIOS documentation is easier to scan, compare, and revisit.

## Background

AIOS documentation includes long catalog and reference pages with tables, code blocks, headings, related links, and lifecycle explanations. The site should support repeated technical reading, not only a polished homepage. This task focuses on docs page styling and readability.

## Scope

### In Scope

- Update `website/src/styles/custom.css`.
- Improve table styling for readability.
- Improve code block and inline code styling.
- Improve headings, dividers, link states, and content rhythm.
- Improve badge-like inline file path presentation where feasible through CSS.
- Keep Starlight's core content model.
- Verify important guide and reference pages remain readable.

### Out of Scope

- Do not rewrite page content broadly.
- Do not create new components unless CSS alone cannot solve a repeated readability problem.
- Do not replace Starlight markdown rendering.
- Do not perform final responsive QA for all pages; that is covered by TASK-031.

## Affected Areas

- Frontend: `website/src/styles/custom.css`
- Backend: N/A
- Shared docs: N/A unless small Markdown adjustments are required for readability
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `docs/plans/TASK-026-031-website-technical-field-manual-plan.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: N/A
- Blocking tasks: TASK-026

## Acceptance Criteria

- [x] Tables are easier to scan in both dark and light themes.
- [x] Code blocks and inline code fit the Technical Field Manual direction.
- [x] Headings and content spacing improve readability without making docs feel sparse.
- [x] Links and focus states remain clear and accessible.
- [x] Long content pages remain readable without text overlap or horizontal overflow.
- [x] Styling applies consistently to guide and reference pages.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Inspect `/guides/skills`, `/reference/skills-folder`, `/reference/workflows-folder`, and `/reference/templates-folder` in dark and light themes.

## Implementation Notes

- Prefer CSS targeting Starlight markdown content classes.
- Keep density appropriate for technical docs.
- Avoid overly decorative styling that competes with content.
- Watch table overflow behavior on small screens.

## Done Summary

- Files changed: `website/src/styles/custom.css`
- Tests run: `astro build` — 23 pages built successfully
- Acceptance criteria status: All 6/6 passed
- Risks: None. CSS targets Starlight markdown content classes without replacing core rendering.
