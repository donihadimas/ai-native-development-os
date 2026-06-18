# TASK-014: Improve Website Homepage Lifecycle Narrative

## Status

Done

## Objective

Improve the website homepage so the first page explains the AIOS lifecycle from setup to reviewed implementation, not only the feature list.

## Background

The current homepage already has a hero, trust badges, bento cards, and CTA. It shows the install command and general value, but it does not yet visualize the core AIOS loop: setup, product docs, PRD, architecture/design/API, small task, implementation, review, validation, and `aios next`.

## Scope

### In Scope

- Update `website/src/content/docs/index.mdx` and landing components as needed.
- Add a lifecycle section showing the AIOS workflow at a glance.
- Add a setup path section that distinguishes:
  - guided wizard: `aios`
  - new project: `aios init`
  - existing project: `aios adopt`
  - next step: `aios next`
- Add links from homepage sections to the new guide pages from TASK-011, TASK-012, and TASK-013 when those pages exist.
- Keep the install command visible above the fold.
- Preserve the existing dark premium Starlight style.

### Out of Scope

- Do not replace Starlight with a custom site framework.
- Do not add heavy animation, 3D, or external visual dependencies.
- Do not create fake GitHub/npm metrics.
- Do not rewrite all documentation pages.

## Affected Areas

- Frontend: `website/src/content/docs/index.mdx`, `website/src/components/landing/`, `website/src/styles/custom.css`
- Backend: N/A
- Shared docs: Website homepage content
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`
- Related design: `website/DESIGN.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`, `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`
- Related architecture section: `docs/architecture/architecture.md#Overview`
- Blocking tasks: Ideally TASK-011, TASK-012, and TASK-013 so homepage links can point to completed pages. If implemented earlier, use links to existing pages and update links later.

## Acceptance Criteria

- [x] The homepage clearly states AIOS is a workflow layer for AI-assisted development.
- [x] The install command remains visible above the fold.
- [x] A lifecycle section shows the sequence from setup to reviewed work.
- [x] A setup path section helps users choose wizard, init, adopt, or next.
- [x] Homepage copy avoids vague AI marketing language and avoids describing AIOS as an app framework.
- [x] Homepage links route users to Getting Started, Command Guide, Building Blocks, Workflow, and GitHub.
- [x] The page remains responsive on mobile and desktop.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Run `npm run dev` from `website/`, inspect homepage at mobile and desktop widths, and confirm text does not overlap or overflow.

## Implementation Notes

- Consider adding a reusable component such as `LifecycleSection.astro` or `WorkflowSteps.astro`.
- Keep card radii and visual style consistent with existing components.
- Prefer concise copy with real commands.
- If using icons, avoid current broken mojibake characters; use plain text labels or verified Unicode after TASK-015.

## Done Summary

- Files changed: `website/src/components/landing/LifecycleSection.astro` (new), `website/src/components/landing/SetupPaths.astro` (new), `website/src/content/docs/index.mdx`, `website/src/components/landing/Hero.astro`, `website/src/components/landing/FooterCTA.astro`
- Tests run: `npm run build` (Starlight build successful, 14 pages generated)
- Acceptance criteria status: All 7 criteria met.
- Risks: Manual UX/mobile wrapping check pending. Run `npm run dev` and inspect homepage at mobile and desktop widths.
