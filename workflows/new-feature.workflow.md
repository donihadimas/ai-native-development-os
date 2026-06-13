# New Feature Workflow

## Input

- Feature idea or user request.
- Existing PRD, architecture, ADRs, and task list.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: route through `.aios/skill-router.md` and use `.aios/` prompts, templates, references, and workflows.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, active product docs, and available root or agent-provided AIOS instructions.
- If RTK is enabled, use it for noisy command output unless exact full output is required.
- If Caveman is enabled, use concise style for operational updates only; keep PRD, ADR, architecture, and review artifacts complete.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` and `projectShape`.
2. Update or extend the PRD for the feature.
3. Check whether architecture changes are needed.
4. Create or update ADRs for important decisions.
5. Define or update API contract notes in `<docsRoot>/api/` when app integration is involved.
6. Break the feature into small tasks.
7. Split tasks by affected project area when complexity is medium or high.
8. Plan implementation for one task.
9. Implement the task.
10. Add or update tests.
11. Review the diff.
12. Update docs when behavior or decisions changed.

## Output

- Updated PRD or feature section.
- ADRs if needed.
- API notes if needed.
- Implementation-ready tasks.
- Tested and reviewed change.

## Done Criteria

- Feature scope is clear.
- Acceptance criteria are met.
- API changes are documented before integration work.
- Tests or manual checks are reported.
- Review does not identify blocking findings.

## Next Action

If the feature changes product scope, have the user review the updated PRD or feature PRD first. If API, data, or architecture changes are needed, create the contract, migration plan, or ADR before implementation. Otherwise select one task and run implementation planning before coding.
