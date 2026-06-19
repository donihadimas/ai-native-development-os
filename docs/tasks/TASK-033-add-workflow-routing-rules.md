# TASK-033: Add Workflow Routing Rules

## Status

Done

## Objective

Make AIOS routing explicit enough that an AI agent can choose the right workflow first, then follow the workflow's related skill sequence for requests such as implementing a payment feature.

## Background

The skill router currently maps requests mostly to skills. This helps individual steps, but ambiguous requests like "implement payment" need workflow-level routing so agents can start with the new-feature workflow, then add API contract, database migration, security review, task implementation, testing, and review steps as needed.

## Scope

### In Scope

- Add workflow-selection rules to `skill-router.md`.
- Update new-feature, bugfix, and API contract workflows to explicitly name related workflow and skill handoffs.
- Leave generated `.aios/` copies unchanged; they should be refreshed by install/update flows.

### Out of Scope

- CLI behavior changes.
- New dependencies.
- Stack-specific payment implementation.
- Website content changes.

## Affected Areas

- Frontend: none
- Backend: none
- Shared docs: AIOS router and workflow assets
- API contract: workflow guidance only
- Database: workflow guidance only

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: none
- Related ADR: none
- Related architecture section: none
- Blocking tasks: none

## Acceptance Criteria

- [x] Router includes explicit workflow routing before skill routing.
- [x] Payment, billing, subscription, authentication, authorization, secrets, and permission-sensitive requests route through a primary workflow plus mandatory security review.
- [x] API, database, UI, release, refactor, review, and bugfix cases name the workflow and key supporting skills.
- [x] New-feature workflow explains how to chain API contract, database migration, UI design, security review, implementation planning, task implementation, testing, and code review.
- [x] Bugfix and API contract workflows explain adjacent handoffs without bypassing the selected workflow.
- [x] Generated `.aios/` copies are not changed manually.

## Testing Expectations

- Unit tests: not required for Markdown-only routing changes.
- Integration tests: not required.
- Regression tests: targeted `rg` checks for workflow routing and payment routing language.
- Manual checks: read the payment example path and confirm it selects new-feature first, then related workflows/skills.

## Implementation Notes

- Keep the router concise enough for agents to scan.
- Do not create app-specific payment implementation guidance.

## Done Summary

- Files changed: `skill-router.md`, `workflows/new-feature.workflow.md`, `workflows/bugfix.workflow.md`, `workflows/api-contract.workflow.md`, `docs/tasks/TASK-033-add-workflow-routing-rules.md`
- Tests run: targeted `rg` checks for workflow routing and payment routing language; `git diff --name-only -- .aios` check confirming generated `.aios/` copies are not changed.
- Acceptance criteria status: All satisfied.
- Risks: Workflow selection remains instruction-based; a host agent must still read and follow `AGENTS.md` and `.aios/skill-router.md`.
