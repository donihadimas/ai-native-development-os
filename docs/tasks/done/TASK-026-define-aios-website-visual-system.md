# TASK-026: Define AIOS Website Visual System

## Status

Done

## Objective

Define the website visual foundation so AIOS documentation feels like a Technical Field Manual / OS Workbench instead of a generic AI product site.

## Background

The current website uses Starlight with custom CSS, dark premium styling, and radial blue/purple/cyan glow. This creates a polished surface but can feel similar to many AI product websites. AIOS needs a more distinctive system-documentation identity that reflects workflows, artifacts, context routing, and verification.

## Scope

### In Scope

- Update website theme tokens in `website/src/styles/custom.css`.
- Define dark and light theme color variables.
- Define typography stack choices using system-safe fallbacks unless external fonts are separately approved.
- Define consistent styling direction for borders, surfaces, focus states, code blocks, badges, and semantic accents.
- Reduce generic purple/cyan glow and replace it with a restrained technical documentation background.
- Keep Starlight integration and existing site structure.

### Out of Scope

- Do not replace Starlight.
- Do not add new font or icon dependencies without approval.
- Do not rewrite landing page components beyond what is required for the token system.
- Do not rewrite documentation content.
- Do not implement full responsive QA; that is covered by TASK-031.

## Affected Areas

- Frontend: `website/src/styles/custom.css`, optionally `website/src/tailwind.css`
- Backend: N/A
- Shared docs: N/A
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `docs/plans/TASK-026-031-website-technical-field-manual-plan.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: None

## Acceptance Criteria

- [x] The website has a clear dark and light color system aligned with Technical Field Manual / OS Workbench direction.
- [x] Generic purple/cyan glow is removed or significantly reduced.
- [x] Semantic colors exist for action, navigation/info, decision/warning, and risk/danger.
- [x] Code, badge, border, surface, focus, and shadow variables are defined consistently.
- [x] Typography stack is explicitly defined without adding external dependencies.
- [x] Existing Starlight dark and light themes remain readable.
- [x] Changes are limited to visual foundation files unless a small component adjustment is required.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Inspect homepage and at least one guide/reference page in dark and light themes for contrast and readability.

## Implementation Notes

- Prefer Starlight CSS variable overrides before component-specific overrides.
- Keep card radius restrained, ideally 8px or less except where Starlight requires otherwise.
- Avoid one-note palettes dominated by purple, blue, beige, or slate.
- Keep comments minimal and only explain non-obvious theme decisions.

## Done Summary

- Files changed: `website/src/styles/custom.css`
- Tests run: `astro build` — 23 pages built successfully
- Acceptance criteria status: All 7/7 passed
- Risks: None. Typography uses system-safe fallbacks; no external font dependencies added.
