# API Contract Workflow

## Input

- Feature PRD or task.
- Architecture constraints.
- Related ADRs if any.
- Existing API notes or OpenAPI files.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for documentation paths.
2. Confirm the feature requires app integration.
3. Read acceptance criteria and user-visible behavior.
4. Use `.aios/skill-router.md` to route through `api-contract-design`.
5. Create or update `<docsRoot>/api/openapi.yaml` using `.aios/templates/openapi.template.yaml`.
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
