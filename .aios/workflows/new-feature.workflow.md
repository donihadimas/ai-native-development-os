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

## Process

1. Resolve `.aios/config.json`; use `docsRoot` and `projectShape`.
2. Update or extend the PRD for the feature.
3. Check whether architecture changes are needed.
4. Create or update ADRs for important decisions.
5. Define or update API contract notes in `<docsRoot>/api/` when app integration is involved.
6. Create or update `<docsRoot>/design/design.md` when the feature has user-facing UI or product-facing interactions.
7. Have the user review design before frontend tasks are treated as ready.
8. Break the feature into small tasks.
9. Split tasks by affected project area when complexity is medium or high.
10. Plan implementation for one task.
11. Implement the task.
12. Add or update tests.
13. Review the diff.
14. Update docs when behavior or decisions changed.

## Output

- Updated PRD or feature section.
- ADRs if needed.
- API notes if needed.
- Design notes if UI or product-facing interaction is involved.
- Implementation-ready tasks.
- Tested and reviewed change.

## Done Criteria

- Feature scope is clear.
- Acceptance criteria are met.
- API changes are documented before integration work.
- Tests or manual checks are reported.
- Review does not identify blocking findings.

## Full Mode Flow

Use `.aios/skill-router.md` to select skills. Use `.aios/prompts/` for known workflow triggers. Use `.aios/templates/` when creating or updating PRD, ADR, design, API, or task documents. Use `.aios/references/` for engineering guidance. Follow `.aios/workflows/` for end-to-end sequencing.

## Lite Mode Flow

Use `AGENTS.md`, `<docsRoot>/context/context-map.md`, and active product docs as primary context. Do not assume `.aios/skill-router.md`, `.aios/templates/`, or `.aios/references/` exist. Follow the same process sequence manually: PRD update, architecture check, ADRs, design, tasks, implementation, tests, review.

## After This Flow

If the feature changes product scope, have the user review the updated PRD or feature PRD first. If UI, API, data, or architecture changes are needed, create the design doc, contract, migration plan, or ADR before implementation. Otherwise select one task and run implementation planning before coding.
