# AIOS Skill Router

Use this router before choosing a workflow. Match the user request to the smallest relevant skill, prompt, reference, and workflow. Do not load every skill by default.

## Routing Rules

- Product idea, product vision, user/problem clarification: use `skills/product-discovery/SKILL.md`.
- Generate or improve PRD: use `skills/prd-generator/SKILL.md`.
- Generate architecture: use `skills/architecture-design/SKILL.md`.
- Create or update ADR: use `skills/adr-generator/SKILL.md`.
- Break down feature or PRD into tasks: use `skills/task-breakdown/SKILL.md`.
- Plan implementation before coding: use `skills/implementation-planner/SKILL.md`.
- Implement code: use `skills/implementation-planner/SKILL.md` first, then the active task and affected code.
- Generate or evaluate tests: use `skills/testing/SKILL.md`.
- Review code or diff: use `skills/code-review/SKILL.md`.
- Design or update API contract: use `skills/api-contract-design/SKILL.md`.
- Implement or review backend API behavior: use `skills/backend-api-development/SKILL.md`.
- Plan database schema, data, index, seed, or rollback changes: use `skills/database-migration/SKILL.md`.
- Review authentication, authorization, validation, secrets, payments, or other security-sensitive work: use `skills/security-review/SKILL.md`.
- Prepare release notes, changelog, rollback, or post-release checks: use `skills/release-management/SKILL.md`.

## Rules

- Prefer the active task and context map before broader documents.
- Use only the matched skill and directly relevant references.
- If more than one skill matches, start with the planning or contract skill before implementation.
- Record uncertainty as open questions instead of guessing important product, architecture, security, or dependency decisions.
- Do not treat this router as permission to modify files without an implementation plan.
