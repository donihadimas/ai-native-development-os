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

## Workflow Handoffs

Use this workflow when the primary workflow needs an API contract. It is usually a supporting workflow for `.aios/workflows/new-feature.workflow.md` or `.aios/workflows/bugfix.workflow.md`, not a replacement for them.

- Start here directly only when the user explicitly asks to design or update an API contract.
- Return to the primary feature or bugfix workflow after the contract is reviewed.
- Use `api-contract-design` for the contract shape and `.aios/references/api-standards.md` for standards.
- Use `security-review` when the contract touches auth, permissions, secrets, payments, billing, subscriptions, checkout, webhooks, or personally sensitive data.
- Use `database-migration` when the contract requires persisted data or schema changes.
- Use `backend-api-development` for provider behavior after the contract is accepted.
- Read `.aios/prompts/09-design-api-contract.md`, `.aios/references/api-standards.md`, `.aios/references/backend-api-standards.md`, and `.aios/templates/openapi.template.yaml` when available.
- Use `testing` and `code-review` to prove provider/client compatibility before completion.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for documentation paths.
2. Confirm the feature requires app integration.
3. Read acceptance criteria and user-visible behavior.
4. Route through `api-contract-design` using `.aios/skill-router.md` when available, or the same API contract checklist manually in lite mode.
5. Create or update `<docsRoot>/api/openapi.yaml` using `.aios/templates/openapi.template.yaml` when available, or the available OpenAPI/API notes structure in lite mode.
6. Route to security review or migration planning when the contract requires sensitive behavior or persisted data changes.
7. Link the API contract from implementation tasks.
8. Return to the primary feature or bugfix workflow before implementation planning.
9. Implement provider endpoint behavior against the contract when the project has a provider side.
10. Implement client integration against the same contract when the project has a client side.
11. Add contract, integration, or manual checks that prove participating sides agree.

## Output

- API contract in `<docsRoot>/api/`.
- Security or migration planning notes when the contract requires them.
- Provider task linked to the contract when applicable.
- Client task linked to the contract when applicable.
- Test or verification notes for contract alignment.

## Done Criteria

- Contract exists before implementation starts.
- Request, response, error, and auth expectations are explicit.
- Sensitive API behavior has security review scope before implementation.
- Implementation tasks link to the same contract.
- Contract changes are reviewed when they affect existing clients.

## Full Mode Flow

Use `.aios/skill-router.md` to select this workflow when API design is the current step, then use `api-contract-design`. Read `.aios/prompts/09-design-api-contract.md`, `.aios/references/api-standards.md`, `.aios/references/backend-api-standards.md`, and `.aios/templates/openapi.template.yaml` for contract creation. Return to the primary workflow after review.

## Lite Mode Flow

Use `AGENTS.md`, `<docsRoot>/context/context-map.md`, `<docsRoot>/api/`, and any available API standards or OpenAPI template. Do not assume `.aios/skill-router.md` or `.aios/templates/` exist. Follow the same API contract checklist manually.

## After This Flow

Have the user review the contract for request, response, auth, errors, and compatibility. After approval, link the contract from provider/client tasks, then implement provider behavior before dependent client integration when possible.
