# TASK-013: Add Website First Ten Minutes And Agent Recipes

## Status

Planned

## Objective

Add a practical onboarding guide that shows a new user exactly what to do in the first ten minutes with AIOS and what to ask their AI coding agent.

## Background

The current getting started and agent pages explain setup and prompting, but users still need a compact "follow this path now" guide. The most helpful beginner experience is a concrete loop: install, initialize or adopt, run `aios next`, ask the agent to fill product vision, review, then continue to PRD and task creation.

## Scope

### In Scope

- Create a new guide under `website/src/content/docs/guides/`.
- Include two first-run paths:
  - New project
  - Existing project adoption
- Include exact terminal commands for both paths.
- Include copy-ready agent prompt recipes for:
  - product discovery
  - PRD generation
  - architecture or ADR
  - UI/UX design
  - task breakdown
  - implementation planning
  - task implementation
  - code review
  - validation/debug follow-up
- Explain when the user should stop and review before moving to the next artifact.
- Link to Skills, Templates, Recommended Workflow, and AI Agents pages.
- Add the page to the Starlight sidebar.

### Out of Scope

- Do not create a full tutorial app.
- Do not add framework-specific setup instructions.
- Do not claim the agent can complete product, architecture, security, or dependency decisions without user review.
- Do not modify root workflow prompts.

## Affected Areas

- Frontend: `website/src/content/docs/guides/`, `website/astro.config.mjs`
- Backend: N/A
- Shared docs: Website documentation only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `website/DESIGN.md`
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`, `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`
- Related architecture section: `docs/architecture/architecture.md#Agent Instruction Strategy`
- Blocking tasks: None

## Acceptance Criteria

- [ ] The guide gives a complete first-run path for a new project.
- [ ] The guide gives a complete first-run path for adopting an existing project.
- [ ] The guide includes copy-ready prompts for the common AIOS lifecycle steps.
- [ ] The guide explicitly tells the user when to review before continuing.
- [ ] The guide keeps AIOS framework-agnostic and does not create stack-specific starters.
- [ ] The guide uses real AIOS paths and commands that match current docs.
- [ ] The sidebar exposes the guide near Getting Started or Recommended Workflow.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Follow the guide mentally from a clean project and confirm every command or prompt points to an existing AIOS concept/page.

## Implementation Notes

- Recommended filename: `website/src/content/docs/guides/first-ten-minutes.md`.
- Keep the prompt recipes concise enough to copy into Codex.
- Avoid hardcoding a single agent if a generic phrasing works, but include Codex-oriented examples where helpful.
- Add callouts for "pause and review" after product vision, PRD, architecture/ADR, and task implementation.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
