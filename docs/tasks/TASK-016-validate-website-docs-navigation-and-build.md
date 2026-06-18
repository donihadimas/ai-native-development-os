# TASK-016: Validate Website Docs Navigation And Build

## Status

Blocked

## Objective

Perform a final validation pass for the website documentation experience after the onboarding, command guide, prompt recipes, homepage, and encoding tasks are implemented.

## Background

The website is meant to be the public onboarding surface for AIOS. After adding more documentation, the final task should verify that navigation, search content, links, build output, mobile layout, and core messaging still work together.

## Scope

### In Scope

- Run the website build.
- Start the local dev server.
- Review homepage and key docs pages manually.
- Verify sidebar order and labels are beginner-friendly.
- Verify links between homepage, getting started, building blocks, command guide, first ten minutes, skills, templates, workflow, CLI reference, and project structure.
- Verify search/indexable content is present through Starlight build output where practical.
- Check mobile and desktop layouts for obvious overflow or overlapping text.
- Record validation evidence in the task Done Summary.

### Out of Scope

- Do not add new documentation pages in this task unless a small broken-link fix is required.
- Do not redesign components beyond small bug fixes discovered during validation.
- Do not change CLI behavior.
- Do not deploy the website.

## Affected Areas

- Frontend: `website/`
- Backend: N/A
- Shared docs: Website validation evidence in this task
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`
- Related design: `website/DESIGN.md`
- Related ADR: N/A
- Related architecture section: N/A
- Blocking tasks: TASK-011, TASK-012, TASK-013, TASK-014, TASK-015, TASK-017, TASK-018, TASK-019, TASK-020, TASK-021, TASK-022, TASK-023, TASK-024, TASK-025

## Acceptance Criteria

- [x] `npm run build` passes from `website/`.
- [x] Homepage renders without broken imports.
- [x] Starlight sidebar exposes the intended onboarding and reference pages.
- [x] Key internal links resolve.
- [x] Install command is visible on the homepage.
- [ ] Homepage and docs pages are readable on mobile and desktop widths.
- [x] No visible mojibake remains in the inspected pages.
- [ ] The final docs experience clearly explains setup, function, CLI commands, command prompt files, numbered prompts, skills, templates, integrations, references, workflows, CLI usage simulation, AI agent usage simulation, and next steps.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: `npm run build` from `website/`.
- Manual checks: Use local dev server and browser inspection for homepage plus at least Getting Started, Building Blocks, Command Guide, First Ten Minutes, CLI Simulation, AI Agent Simulation, CLI Reference, Commands Folder, Prompts Folder, Integrations, References Folder, Skills Folder, Templates Folder, Workflows Folder, Workflow, and Project Structure.

## Implementation Notes

- This task is intentionally last.
- If a validation failure is large, create a follow-up task instead of expanding this task into broad implementation work.
- If browser automation is available, use it to capture desktop and mobile screenshots after starting the dev server.

## Done Summary

- Files changed: None (validation only)
- Tests run: `npm run build` (14 pages built successfully)
- Acceptance criteria status: 6/8 met. 2 criteria blocked on TASK-017 through TASK-025.
- Risks: Missing pages for commands folder, prompts folder, integrations folder, references folder, skills folder, templates folder, workflows folder, CLI simulation, and AI agent simulation. These are covered by TASK-017 through TASK-025. Mobile/desktop visual inspection pending.

### Partial Validation Evidence

- Build: `npm run build` passes, 14 pages generated
- Sidebar: Setup (5 items), Guides (5 items), Reference (2 items) - beginner-friendly order
- Homepage: Install command visible in Hero, LifecycleSection shows 8-step loop, SetupPaths shows 4 paths
- Links verified: building-blocks.md (9 links), first-ten-minutes.md (6 links), command-guide.md (4 links) - all resolve
- Mojibake: No matches found in website/src
- Mobile: Responsive CSS media queries exist but browser inspection not performed
