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
5. Resolve optional integrations from `integrations`:
   - `rtk.enabled`: read `.aios/integrations/rtk.md` before noisy terminal commands.
   - `caveman.enabled`: read `.aios/integrations/caveman.md` before status/debug-loop responses.

## Workflow Routing

Choose the primary workflow before choosing individual skills. A workflow may route to several supporting skills; do not jump straight to implementation when a workflow prerequisite applies.

- New capability, user-facing feature, integration, payment, billing, subscription, checkout, onboarding, settings, reporting, or other product behavior: use `.aios/workflows/new-feature.workflow.md`.
- Bug, regression, failing test, incorrect behavior, crash, broken build, flaky behavior, or production incident: use `.aios/workflows/bugfix.workflow.md`.
- New project, product discovery, first PRD, initial architecture, or project setup sequence: use `.aios/workflows/new-project.workflow.md`.
- API shape, client/server contract, webhook contract, external integration contract, request/response/error/auth design: use `.aios/workflows/api-contract.workflow.md`.
- Database schema, data migration, seed, index, rollback, retention, or persistence change: use `.aios/workflows/database-migration.workflow.md`.
- Authentication, authorization, permissions, secrets, payments, billing, subscription, checkout, webhooks, personally sensitive data, or other security-sensitive behavior: use the primary feature or bugfix workflow first, then run `.aios/workflows/security-review.workflow.md` before marking work done.
- User flows, screens, UI states, accessibility, product-facing interaction, or frontend design before implementation: use `.aios/workflows/ui-design.workflow.md`.
- Refactor, cleanup, architecture-preserving restructuring, performance tuning without product behavior change: use `.aios/workflows/refactor.workflow.md`.
- Code review, release-candidate review, diff review, or validation of completed work: use `.aios/workflows/review.workflow.md`.
- Release notes, changelog, rollback notes, deployment checks, or post-release verification: use `.aios/workflows/release.workflow.md`.

Example: "implement payment" is a new feature. Start with `.aios/workflows/new-feature.workflow.md`, then route to API contract design, database migration planning when persistence changes, security review because payments are sensitive, implementation planning, task implementation, testing, and code review.

## Skill Routing Rules

- Product idea, product vision, user interview, user/problem clarification: `product-discovery`.
- Generate or improve PRD: `prd-generator`.
- Generate architecture: `architecture-design`.
- Design user flows, screens, UI states, or product-facing interactions before frontend work: `ui-ux-design`.
- Create or update ADR: `adr-generator`.
- Break down feature or PRD into tasks: `task-breakdown`.
- Plan implementation before coding: `implementation-planner`.
- Implement an active task: `implementation-planner` first when no usable plan exists, then `task-implementation`.
- Generate or evaluate tests: `testing`.
- Review code or diff: `code-review`.
- Design or update API contract: `api-contract-design`.
- Implement or review backend API behavior: `backend-api-development`.
- Plan database schema, data, index, seed, or rollback changes: `database-migration`.
- Review authentication, authorization, validation, secrets, payments, or other security-sensitive work: `security-review`.
- Prepare release notes, changelog, rollback, or post-release checks: `release-management`.

## Rules

- Prefer the active task and `<docsRoot>/context/context-map.md` before broader documents.
- Use only the matched workflow, supporting skills, and directly relevant references.
- If more than one skill matches, start with the planning or contract skill before implementation.
- For generator skills, apply the skill's Clarification Gate before writing final files.
- Use `.aios/references/context-budget.md` when command output, logs, or diffs could dominate context.
- Use `.aios/references/response-style.md` when concise communication is helpful, but keep formal artifacts complete.
- Record uncertainty as open questions instead of guessing important product, architecture, security, or dependency decisions.
- Do not treat this router as permission to modify files without an implementation plan.
