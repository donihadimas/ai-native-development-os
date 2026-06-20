# TASK-027: Rework Landing Hero Into OS Workbench

## Status

Done

## Objective

Rework the website landing hero so the first viewport presents AIOS as an operating system for AI-assisted development workflows, not a generic AI SaaS landing page.

## Background

The current homepage hero includes product name, value proposition, install command, CTAs, and a terminal preview. It works, but the composition can still feel marketing-oriented. The hero should more directly show the AIOS workflow: setup, context, product docs, architecture, tasks, implementation, review, and validation.

## Scope

### In Scope

- Update `website/src/components/landing/Hero.astro`.
- Update `website/src/components/landing/TerminalPreview.astro` if needed.
- Adjust homepage hero copy in `website/src/content/docs/index.mdx` only if needed.
- Keep install command visible above the fold.
- Present a workflow or workbench visual that includes real AIOS commands, files, or lifecycle steps.
- Preserve links to First Ten Minutes, Building Blocks, and GitHub.
- Ensure the hero works on mobile and desktop.

### Out of Scope

- Do not redesign all landing sections.
- Do not add heavy animation, 3D, or external visual dependencies.
- Do not create fake metrics, testimonials, or badges.
- Do not change sidebar navigation.

## Affected Areas

- Frontend: `website/src/components/landing/Hero.astro`, `website/src/components/landing/TerminalPreview.astro`, optionally `website/src/content/docs/index.mdx`
- Backend: N/A
- Shared docs: N/A
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `docs/plans/TASK-026-031-website-technical-field-manual-plan.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`, `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`
- Related architecture section: `docs/architecture/architecture.md#Overview`
- Blocking tasks: TASK-026 recommended first

## Acceptance Criteria

- [x] The hero clearly communicates AIOS as a workflow layer for AI-assisted development.
- [x] The install command remains visible above the fold.
- [x] The hero visual contains concrete AIOS artifacts, commands, or workflow stages.
- [x] Hero copy avoids vague AI marketing language.
- [x] CTAs remain clear and route to First Ten Minutes, Building Blocks, and GitHub.
- [x] The hero layout does not overlap or overflow on mobile.
- [x] The hero follows the visual system from TASK-026.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Inspect homepage at desktop and mobile widths, confirm command text wraps safely, and confirm first viewport shows product identity and workflow signal.

## Implementation Notes

- Prefer a compact workbench/terminal composition over a decorative illustration.
- Use real commands such as `aios`, `aios init`, `aios adopt`, and `aios next`.
- Keep display text concise.
- Avoid adding visible instructions that explain how to use the UI beyond normal docs copy.

## Done Summary

- Files changed: `website/src/components/landing/Hero.astro`, `website/src/components/landing/TerminalPreview.astro`
- Tests run: `astro build` — 23 pages built successfully
- Acceptance criteria status: All 7/7 passed
- Risks: None. Terminal preview uses HTML entities for curly braces to avoid Astro expression conflicts.
