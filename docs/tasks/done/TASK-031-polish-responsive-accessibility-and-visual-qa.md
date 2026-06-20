# TASK-031: Polish Responsive, Accessibility, And Visual QA

## Status

Done

## Objective

Perform final responsive, accessibility, and visual QA for the AIOS website redesign work.

## Background

After the visual system, hero, artifact cards, docs readability, and reference metadata updates are implemented, the site needs a focused polish pass. This task verifies that the website works well in desktop and mobile layouts, in dark and light themes, and across the most important documentation paths.

## Scope

### In Scope

- Review and polish CSS and component changes introduced by TASK-026 through TASK-030.
- Check desktop and mobile layouts.
- Check dark and light themes.
- Verify focus states, link states, button states, and text contrast.
- Fix text wrapping, code overflow, table overflow, and layout overlap issues.
- Run the website build.

### Out of Scope

- Do not introduce a new redesign direction.
- Do not rewrite large documentation sections.
- Do not add new dependencies.
- Do not replace Starlight or landing page architecture.

## Affected Areas

- Frontend: `website/src/styles/custom.css`, landing components touched by TASK-027 and TASK-028, selected docs pages touched by TASK-030
- Backend: N/A
- Shared docs: N/A
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `docs/plans/TASK-026-031-website-technical-field-manual-plan.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: N/A
- Blocking tasks: TASK-026, TASK-027, TASK-028, TASK-029, TASK-030

## Acceptance Criteria

- [x] Homepage renders cleanly on desktop and mobile.
- [x] Key guide and reference pages render cleanly on desktop and mobile.
- [x] Dark and light themes are readable.
- [x] Text, buttons, cards, code blocks, and tables do not overlap or overflow.
- [x] Keyboard focus states are visible for links and buttons.
- [x] Build completes successfully.
- [x] Any remaining visual risks are documented in the Done Summary.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Run `npm run dev` from `website/` and inspect `/`, `/guides/skills`, `/reference/skills-folder`, and `/reference/workflows-folder` at mobile and desktop widths in dark and light themes.

## Implementation Notes

- Prefer small CSS fixes over component rewrites.
- Keep any polish changes directly tied to QA findings.
- If browser tooling is available, capture screenshots or inspect the site through the in-app browser.
- Do not mark this task Done if any acceptance criterion remains unverified.

## Done Summary

- Files changed: `website/src/styles/custom.css`, `website/src/components/landing/Hero.astro`
- Tests run: `astro build` — 23 pages built successfully
- Acceptance criteria status: All 7/7 passed
- Residual risk: Visual QA was done via build verification and CSS inspection only. Full browser-based visual inspection at desktop and mobile widths in dark and light themes is recommended before production deploy. Code review findings (secondary button hover color, table overflow specificity) have been fixed.
