# API Contract Workflow

## Input

- Feature PRD or task.
- Architecture constraints.
- Related ADRs if any.
- Existing API notes or OpenAPI files.

## Process

1. Confirm the feature requires frontend/backend integration.
2. Read acceptance criteria and user-visible behavior.
3. Use `skills/api-contract-design` to define endpoints, requests, responses, errors, and auth expectations.
4. Create or update `docs/api/openapi.yaml` using `templates/openapi.template.yaml`.
5. Link the API contract from backend and frontend tasks.
6. Implement backend endpoint behavior against the contract.
7. Implement frontend integration against the same contract.
8. Add contract, integration, or manual checks that prove both sides agree.

## Output

- API contract in `docs/api/`.
- Backend task linked to the contract.
- Frontend task linked to the contract.
- Test or verification notes for contract alignment.

## Done Criteria

- Contract exists before implementation starts.
- Request, response, error, and auth expectations are explicit.
- FE and BE tasks link to the same contract.
- Contract changes are reviewed when they affect existing clients.
