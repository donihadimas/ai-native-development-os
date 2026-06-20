# TASK-030: Add AIOS Metadata Patterns To Reference Pages

## Status

Done

## Objective

Add consistent metadata and artifact anatomy patterns to selected reference pages so users can quickly understand AIOS folders and files.

## Background

Reference pages such as Skills Folder and Workflows Folder contain useful catalog information, but they can become long. Adding consistent metadata patterns, folder trees, and quick-scan sections will make them feel more like an operating manual and less like plain Markdown dumps.

## Scope

### In Scope

- Update `website/src/content/docs/reference/skills-folder.md`.
- Update `website/src/content/docs/reference/workflows-folder.md`.
- Optionally update one additional high-value reference page if the same pattern is clearly reusable.
- Add quick-scan metadata such as purpose, location, related artifacts, and when to use.
- Add folder tree or artifact anatomy code blocks where helpful.
- Keep existing catalog content accurate.

### Out of Scope

- Do not rewrite every reference page in this task.
- Do not duplicate complete source files.
- Do not change actual skill or workflow source files.
- Do not add new sidebar entries unless a new page is created, which is not expected.

## Affected Areas

- Frontend: `website/src/content/docs/reference/skills-folder.md`, `website/src/content/docs/reference/workflows-folder.md`, optionally one related reference Markdown page
- Backend: N/A
- Shared docs: Website reference docs only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `docs/plans/TASK-026-031-website-technical-field-manual-plan.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`
- Related architecture section: `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: TASK-029 recommended first

## Acceptance Criteria

- [x] Skills Folder reference has a quick-scan metadata section or equivalent structure.
- [x] Workflows Folder reference has a quick-scan metadata section or equivalent structure.
- [x] Folder tree or artifact anatomy examples are included where useful.
- [x] Existing catalog entries remain accurate and complete.
- [x] The pages remain scannable and do not duplicate full source files.
- [x] Updated pages link to related guides, prompts, templates, workflows, or simulations where relevant.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Compare updated catalog pages against current source files using `rg --files` for skills and workflows, and inspect rendered pages for readability.

## Implementation Notes

- Use consistent labels such as Purpose, Location, Use When, Related Artifacts, and Next Step.
- Keep Markdown simple so Starlight renders it reliably.
- Prefer concise metadata over heavy prose.
- Preserve TASK-023 and TASK-025 acceptance criteria already completed.

## Done Summary

- Files changed: `website/src/content/docs/reference/skills-folder.md`, `website/src/content/docs/reference/workflows-folder.md`
- Tests run: `astro build` — 23 pages built successfully
- Acceptance criteria status: All 6/6 passed
- Risks: None. Metadata tables and folder trees are simple Markdown that Starlight renders reliably.
