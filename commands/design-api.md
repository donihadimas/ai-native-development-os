# Command: Design API

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/workflows/api-contract.workflow.md`, `.aios/prompts/09-design-api-contract.md`, and the `api-contract-design` skill through `.aios/skill-router.md`; read `skill-router.md` Artifact Routing for matching references and templates. In lite mode, use available API standards and templates without assuming `.aios/` exists.

Read:

- relevant PRD or feature task
- related architecture section
- existing API contracts in `<docsRoot>/api/`
- `.aios/templates/openapi.template.yaml` when available

Before creating the contract, apply the skill's Clarification Gate. If consumer/provider responsibilities, request/response fields, auth, or errors are unclear, ask focused questions first.

Create or update an OpenAPI contract in `<docsRoot>/api/` before app integration.

End with what the user should review and the next step: approve the contract, link provider/client tasks to it, then implement provider behavior before dependent client integration when possible.
