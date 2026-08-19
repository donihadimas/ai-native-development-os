# New Feature Workflow

## Input

- Feature idea or user request.
- Existing PRD, architecture, design notes, ADRs, API contracts, and task list.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `Skill: spec`, `Skill: arch`, `Skill: task`, `Skill: verify`.
- Lite mode or missing config: use `AGENTS.md`, active product docs, and available AIOS instructions.
- If RTK is enabled, use it for noisy command output unless exact full output is required.
- If Caveman is enabled, use concise style for operational updates only; keep PRD, design, ADR, architecture, API, migration, security, release, and review artifacts complete.

## Workflow Handoffs

Use this workflow as the primary route for new product behavior, including payments, billing, subscriptions, checkout, onboarding, integrations, settings, reporting, and user-facing capabilities.

- Use `Skill: spec` when the feature scope or acceptance criteria need to be added to the PRD or a feature PRD.
- Use `Skill: arch` when the feature changes system boundaries, technology decisions, data ownership, provider choices, or cross-cutting constraints.
- Use `workflows/api-contract.workflow.md` and `api-contract-design` before implementation when the feature touches API shape, webhooks, client/server integration, external providers, auth expectations, errors, or compatibility.
- Use `workflows/database-migration.workflow.md` and `database-migration` before implementation when the feature changes schema, indexes, seed data, retention, rollback, or persisted state.
- Use `workflows/ui-design.workflow.md` and `ui-ux-design` before frontend implementation when the feature has user-facing screens, flows, states, or accessibility concerns.
- Use `workflows/security-review.workflow.md` and `Skill: verify` before marking work done when the feature touches authentication, authorization, permissions, secrets, payments, billing, subscriptions, checkout, webhooks, or personally sensitive data.
- Use `Skill: task` for task breakdown, planning, and implementation for one task at a time; update task status to `Status: Done` in-place.
- Use `Skill: verify` to define or evaluate validation evidence, then `workflows/review.workflow.md` before completion.

Example: for "implement payment", keep this workflow as the primary route, add or update the feature PRD with `Skill: spec`, define the payment API or webhook contract, create migration/security plans when needed, split frontend/backend/provider tasks, implement one task at a time with `Skill: task`, test with `Skill: verify`, then review.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` and `projectShape`.
2. Update or extend the PRD for the feature using `Skill: spec`.
3. Check whether architecture changes are needed using `Skill: arch`.
4. Create or update ADRs for important decisions.
5. Define or update API contract notes in `<docsRoot>/api/` when app integration is involved.
6. Create or update database migration plans when persistence changes.
7. Create or update security review scope when the feature is security-sensitive.
8. Create or update `<docsRoot>/design/design.md` when the feature has user-facing UI or product-facing interactions.
9. Have the user review PRD, design, API, migration, and security plans before dependent implementation tasks are treated as ready.
10. Break the feature into small tasks using `Skill: task`.
11. Split tasks by affected project area when complexity is medium or high.
12. Plan implementation for one task.
13. Implement the task.
14. Add or update tests.
15. Review the diff.
16. Update docs when behavior or decisions changed.

## Output

- Updated PRD or feature section.
- ADRs if needed.
- API notes if needed.
- Migration plan if data changes are needed.
- Security review if sensitive behavior is involved.
- Design notes if UI or product-facing interaction is involved.
- Implementation-ready tasks.
- Tested and reviewed change.

## Done Criteria

- Feature scope is clear.
- Acceptance criteria are met.
- API changes are documented before integration work.
- Data changes have a migration or rollback plan before implementation.
- Security-sensitive changes have a security review before work is marked done.
- Tests or manual checks are reported.
- Review does not identify blocking findings.

## Full Mode Flow

Use core skills (`spec`, `arch`, `task`, `verify`) and supporting workflows one step at a time.

## Lite Mode Flow

Use `AGENTS.md` and active product docs as primary context. Follow the same process sequence manually: PRD update, architecture check, ADRs, design, tasks, implementation, tests, review.

## After This Flow

If the feature changes product scope, have the user review the updated PRD or feature PRD first. If UI, API, data, or architecture changes are needed, create the design doc, contract, migration plan, or ADR before implementation. Otherwise select one task and run implementation planning before coding.

