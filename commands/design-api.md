# Command: Design API

Resolve `.aios/config.json` first. Use `.aios/prompts/09-design-api-contract.md` and the `api-contract-design` skill through `.aios/skill-router.md`.

Read:

- relevant PRD or feature task
- related architecture section
- existing API contracts in `<docsRoot>/api/`
- `.aios/templates/openapi.template.yaml`

Before creating the contract, apply the skill's Clarification Gate. If consumer/provider responsibilities, request/response fields, auth, or errors are unclear, ask focused questions first.

Create or update an OpenAPI contract in `<docsRoot>/api/` before app integration.
