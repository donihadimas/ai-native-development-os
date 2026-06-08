# AIOS Skill Router

Use this router before choosing a workflow. Match the user request to the smallest relevant skill, prompt, reference, and workflow. Do not load every skill by default.

## Setup Resolution

1. Read `.aios/config.json` when it exists.
2. Resolve `docsRoot` from config; use `docs` only when config is missing.
3. Resolve `projectShape` before choosing code folders:
   - `fullstack`: `frontend/` and `backend/`
   - `frontend`: `frontend/`
   - `backend`: `backend/`
   - `mobile`: `mobile/`
   - `library`: `src/`
   - `docs`: project docs only
4. Resolve skill access from `skillDelivery`:
   - `native`: invoke the matching native agent skill by name.
   - `portable`: read `.aios/skills/<skill-name>/SKILL.md`.
   - `both`: prefer native skill invocation and use `.aios/skills/<skill-name>/SKILL.md` as readable fallback.

## Routing Rules

- Product idea, product vision, user/problem clarification: `product-discovery`.
- Generate or improve PRD: `prd-generator`.
- Generate architecture: `architecture-design`.
- Create or update ADR: `adr-generator`.
- Break down feature or PRD into tasks: `task-breakdown`.
- Plan implementation before coding: `implementation-planner`.
- Implement code: `implementation-planner` first, then the active task and affected code.
- Generate or evaluate tests: `testing`.
- Review code or diff: `code-review`.
- Design or update API contract: `api-contract-design`.
- Implement or review backend API behavior: `backend-api-development`.
- Plan database schema, data, index, seed, or rollback changes: `database-migration`.
- Review authentication, authorization, validation, secrets, payments, or other security-sensitive work: `security-review`.
- Prepare release notes, changelog, rollback, or post-release checks: `release-management`.

## Rules

- Prefer the active task and `<docsRoot>/context/context-map.md` before broader documents.
- Use only the matched skill and directly relevant references.
- If more than one skill matches, start with the planning or contract skill before implementation.
- Record uncertainty as open questions instead of guessing important product, architecture, security, or dependency decisions.
- Do not treat this router as permission to modify files without an implementation plan.
