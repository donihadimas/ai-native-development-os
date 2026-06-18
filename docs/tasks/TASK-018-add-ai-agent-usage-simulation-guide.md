# TASK-018: Add AI Agent Usage Simulation Guide

## Status

Planned

## Objective

Add a website guide that simulates how a user works with an AI coding agent after the CLI has prepared AIOS files, including examples for product discovery, PRD generation, architecture, task implementation, review, and validation.

## Background

The CLI creates the files and workflow structure, but the AI agent performs the reasoning-heavy work: interviewing the user, filling the product vision, generating PRDs, proposing architecture, breaking down tasks, implementing code, testing, and reviewing. Users need a separate simulation that shows how to prompt the agent without confusing agent work with CLI work.

## Scope

### In Scope

- Create a new guide under `website/src/content/docs/guides/`.
- Start from the assumption that the user already ran the CLI setup from the CLI simulation guide.
- Show a simulated AI agent workflow:
  - read `AGENTS.md` and context map
  - use `product-discovery`
  - fill `docs/product/vision.md`
  - pause for user review
  - use `prd-generator`
  - create or fill architecture/design/API/ADR artifacts as needed
  - use `task-breakdown`
  - use `implementation-planner`
  - use `task-implementation`
  - use `code-review` and testing guidance
- Include copy-ready prompts for each phase.
- Explain when the agent should ask clarification questions.
- Explain when the user should review and approve before moving forward.
- Explain that the agent should work on one active task at a time.
- Link to skills, templates, workflows, using with AI agents, first ten minutes, and CLI simulation.
- Add the page to the Starlight sidebar.

### Out of Scope

- Do not implement a real sample app.
- Do not prescribe one application framework, database, or hosting provider.
- Do not claim the agent can make final architecture, security, dependency, or release decisions without human review.
- Do not change native skill files or root prompts.
- Do not combine this with command reference content.

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
- Blocking tasks: TASK-011 and TASK-013 are recommended so this page can link to building blocks and first-ten-minutes onboarding.

## Acceptance Criteria

- [ ] The guide clearly separates AI agent responsibilities from CLI responsibilities.
- [ ] The guide starts after CLI setup and references the CLI simulation guide for setup.
- [ ] The guide includes copy-ready prompts for product discovery, PRD generation, architecture/ADR, task breakdown, implementation planning, task implementation, review, and validation.
- [ ] The guide tells the user to review product vision before PRD generation.
- [ ] The guide tells the user to review PRD/architecture decisions before implementation tasks.
- [ ] The guide tells the agent to read the active task before coding.
- [ ] The guide reinforces one-task-at-a-time implementation.
- [ ] The guide is discoverable from the sidebar.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Read the prompt examples and confirm they use existing AIOS skill names, paths, and lifecycle boundaries.

## Implementation Notes

- Recommended filename: `website/src/content/docs/guides/ai-agent-simulation.md`.
- Use generic "AI agent" phrasing, with Codex examples where useful.
- Keep prompts concise but explicit:
  - context files to read
  - skill to use
  - expected output
  - review gate
- Avoid broad prompts like "build the whole app".

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
