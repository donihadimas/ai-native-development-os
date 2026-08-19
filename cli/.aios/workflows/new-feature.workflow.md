# New Feature Workflow

## Input

- Feature idea or user request.
- Existing PRD, architecture, design notes, ADRs, API contracts, and task list.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: route through `.aios/skill-router.md` and use `.aios/` prompts, templates, references, and workflows.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, active product docs, and available root or agent-provided AIOS instructions.
- If RTK is enabled, use it for noisy command output unless exact full output is required.
- If Caveman is enabled, use concise style for operational updates only; keep PRD, design, ADR, architecture, API, migration, security, release, and review artifacts complete.

## Workflow Handoffs

Use this workflow as the primary route for new product behavior, including payments, billing, subscriptions, checkout, onboarding, integrations, settings, reporting, and user-facing capabilities.

- Use `prd-generator` when the feature scope or acceptance criteria need to be added to the PRD or a feature PRD.
- Use `architecture-design` and `adr-generator` when the feature changes system boundaries, technology decisions, data ownership, provider choices, or cross-cutting constraints.
- Use `.aios/workflows/api-contract.workflow.md` and `api-contract-design` before implementation when the feature touches API shape, webhooks, client/server integration, external providers, auth expectations, errors, or compatibility.
- Use `.aios/workflows/database-migration.workflow.md` and `database-migration` before implementation when the feature changes schema, indexes, seed data, retention, rollback, or persisted state.
- Use `.aios/workflows/ui-design.workflow.md` and `ui-ux-design` before frontend implementation when the feature has user-facing screens, flows, states, or accessibility concerns.
- Use `.aios/workflows/security-review.workflow.md` and `security-review` before marking work done when the feature touches authentication, authorization, permissions, secrets, payments, billing, subscriptions, checkout, webhooks, or personally sensitive data.
- Use `task-breakdown`, then `implementation-planner`, then `task-implementation` for one implementation task at a time; archive completed tasks under `<docsRoot>/tasks/done/`.
- For the current selected skill only, read the prompt first, then use `skill-router.md` Artifact Routing to add references or templates only when they govern the artifact being created.
- Use `testing` to define or evaluate validation evidence, then `.aios/workflows/review.workflow.md` and `code-review` before completion.

Example: for "implement payment", keep this workflow as the primary route, add or update the feature PRD, define the payment API or webhook contract, create migration/security plans when needed, split frontend/backend/provider tasks, implement one task at a time, test, then review.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` and `projectShape`.
2. Update or extend the PRD for the feature.
3. Check whether architecture changes are needed.
4. Create or update ADRs for important decisions.
5. Define or update API contract notes in `<docsRoot>/api/` when app integration is involved.
6. Create or update database migration plans when persistence changes.
7. Create or update security review scope when the feature is security-sensitive.
8. Create or update `<docsRoot>/design/design.md` when the feature has user-facing UI or product-facing interactions.
9. Have the user review PRD, design, API, migration, and security plans before dependent implementation tasks are treated as ready.
10. Break the feature into small tasks.
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

Use `.aios/skill-router.md` to select this workflow first, then use supporting skills and adjacent workflows from the handoff list above one step at a time. Use `skill-router.md` Artifact Routing just-in-time: read the selected step's prompt first, add references only when they govern the decision, and add templates only when creating or updating the artifact. Follow `.aios/workflows/` for end-to-end sequencing.

## Lite Mode Flow

Use `AGENTS.md`, `<docsRoot>/context/context-map.md`, and active product docs as primary context. Do not assume `.aios/skill-router.md`, `.aios/templates/`, or `.aios/references/` exist. Follow the same process sequence manually: PRD update, architecture check, ADRs, design, tasks, implementation, tests, review.

## After This Flow

If the feature changes product scope, have the user review the updated PRD or feature PRD first. If UI, API, data, or architecture changes are needed, create the design doc, contract, migration plan, or ADR before implementation. Otherwise select one task and run implementation planning before coding.
