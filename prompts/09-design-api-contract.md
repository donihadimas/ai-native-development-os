# Prompt: Design API Contract

Resolve `.aios/config.json` first if it exists. Use its `docsRoot` and `projectShape`; otherwise use `docs` and infer project shape from the repo.

Use `.aios/skill-router.md` to route through `context-management`, then `api-contract-design`. Use `.aios/references/api-standards.md` and `.aios/templates/openapi.template.yaml` to create or update an API contract in `<docsRoot>/api/`.

Read only:

- relevant PRD or feature task,
- related architecture section,
- related ADRs if API behavior depends on a technical decision,
- existing API contract files in `<docsRoot>/api/`.

Before generating the contract, apply the `api-contract-design` Clarification Gate. If consumer/provider responsibilities, request/response fields, auth, or errors are unclear, ask focused questions first.

Do not implement app code yet. End with contract risks, open questions, and which implementation tasks should link to the contract.
