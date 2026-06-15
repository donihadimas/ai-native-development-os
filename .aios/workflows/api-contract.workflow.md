# API Contract Workflow

## Input

- Feature PRD or task.
- Architecture constraints.
- Related ADRs if any.
- Existing API notes or OpenAPI files.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `.aios/skill-router.md`, `.aios/references/api-standards.md`, and `.aios/templates/openapi.template.yaml`.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, `<docsRoot>/api/`, and any available API standards or OpenAPI template.
- If RTK is enabled, use it for noisy diffs or generated contract comparisons unless exact full output is required.
- If Caveman is enabled, use concise style for progress updates only; keep API contract notes complete.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for documentation paths.
2. Confirm the feature requires app integration.
3. Read acceptance criteria and user-visible behavior.
4. Route through `api-contract-design` using `.aios/skill-router.md` when available, or the same API contract checklist manually in lite mode.
5. Create or update `<docsRoot>/api/openapi.yaml` using `.aios/templates/openapi.template.yaml` when available, or the available OpenAPI/API notes structure in lite mode.
6. Link the API contract from implementation tasks.
7. Implement provider endpoint behavior against the contract when the project has a provider side.
8. Implement client integration against the same contract when the project has a client side.
9. Add contract, integration, or manual checks that prove participating sides agree.

## Output

- API contract in `<docsRoot>/api/`.
- Provider task linked to the contract when applicable.
- Client task linked to the contract when applicable.
- Test or verification notes for contract alignment.

## Done Criteria

- Contract exists before implementation starts.
- Request, response, error, and auth expectations are explicit.
- Implementation tasks link to the same contract.
- Contract changes are reviewed when they affect existing clients.

## Next Action

Have the user review the contract for request, response, auth, errors, and compatibility. After approval, link the contract from provider/client tasks, then implement provider behavior before dependent client integration when possible.
