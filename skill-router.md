# AIOS Skill Router

Use this router before choosing a workflow. Match the user request to the smallest relevant workflow, skill, prompt, reference, and template. Do not load every skill or preload whole folders by default.

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

Choose the primary workflow before choosing individual skills. Keep that workflow as the controlling sequence while adding only the supporting skills required for the current step; do not jump straight to implementation when a workflow prerequisite applies.

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

## Artifact Routing

After selecting the workflow and skill, read the prompt for the current lifecycle step when it exists. Read references only when they govern the current decision or artifact. Read templates only when creating or updating that artifact. Do not preload future-step prompts, references, templates, or neighboring files in the same folder.

| Lifecycle step | Prompt | Skill | References | Template |
| --- | --- | --- | --- | --- |
| Product discovery | `.aios/prompts/00-discover-product.md` | `product-discovery` | `.aios/references/context-principles.md` | `.aios/templates/vision.template.md` |
| PRD generation | `.aios/prompts/01-generate-prd.md` | `prd-generator` | `.aios/references/context-principles.md` | `.aios/templates/prd.template.md` |
| Architecture design | `.aios/prompts/02-generate-architecture.md` | `architecture-design` | `.aios/references/architecture-principles.md`, `.aios/references/engineering-principles.md` | `.aios/templates/architecture.template.md` |
| ADR creation | `.aios/prompts/03-generate-adr.md` | `adr-generator` | `.aios/references/architecture-principles.md`, `.aios/references/engineering-principles.md` | `.aios/templates/adr.template.md` |
| Task breakdown | `.aios/prompts/04-generate-tasks.md` | `task-breakdown` | `.aios/references/context-principles.md`, `.aios/references/testing-principles.md` | `.aios/templates/task.template.md` |
| Implementation planning | `.aios/prompts/05-plan-implementation.md` | `implementation-planner` | `.aios/references/engineering-principles.md`, `.aios/references/testing-principles.md` | `.aios/templates/implementation-plan.template.md` |
| Task implementation | `.aios/prompts/06-implement-task.md` | `task-implementation` | `.aios/references/engineering-principles.md`, `.aios/references/testing-principles.md` | active task status fields |
| Code review | `.aios/prompts/07-review-code.md` | `code-review` | `.aios/references/engineering-principles.md`, `.aios/references/testing-principles.md`, `.aios/references/security-principles.md` when sensitive | `.aios/templates/review-report.template.md` |
| Test planning or evaluation | `.aios/prompts/08-generate-tests.md` | `testing` | `.aios/references/testing-principles.md` | `.aios/templates/test-plan.template.md` |
| API contract design | `.aios/prompts/09-design-api-contract.md` | `api-contract-design` | `.aios/references/api-standards.md`, `.aios/references/backend-api-standards.md` | `.aios/templates/openapi.template.yaml` |
| Database migration planning | `.aios/prompts/10-plan-database-migration.md` | `database-migration` | `.aios/references/database-standards.md` | `.aios/templates/migration-plan.template.md` |
| Security review | `.aios/prompts/11-review-security.md` | `security-review` | `.aios/references/security-principles.md` | `.aios/templates/security-review-report.template.md` |
| Release planning | `.aios/prompts/12-plan-release.md` | `release-management` | `.aios/references/engineering-principles.md`, `.aios/references/testing-principles.md` | `.aios/templates/release-note.template.md`, `.aios/templates/changelog.template.md` |
| UI/UX design | `.aios/prompts/13-design-ui-ux.md` | `ui-ux-design` | `.aios/references/frontend-principles.md`, `.aios/references/api-standards.md` when data exchange matters | `.aios/templates/design.template.md` |

Use `.aios/references/context-budget.md` for large logs, diffs, test output, or generated artifacts. Use `.aios/references/response-style.md` only for concise operational updates when enabled by config.

## Active Task Discovery

Use this sequence when implementation, testing, review, migration, release, or security work needs an active task:

1. If the user names a task ID, task title, or task file path, open only that task file.
2. If the IDE active file or recent conversation identifies a task file, use that file.
3. If no task is identified, list task filenames in `<docsRoot>/tasks/` without reading every task body.
4. If filenames are not enough, search task headings or status lines with query terms from the user request and open only the top 1-3 likely candidates.
5. If there is still no confident match, ask the user which task is active or whether a new task should be created.

Do not open every file in `<docsRoot>/tasks/` to discover the active task. Do not choose a completed task unless the user explicitly asks to review or continue it.

## Rules

- Prefer the active task and `<docsRoot>/context/context-map.md` before broader documents.
- Use only the matched workflow, supporting skills, and directly relevant references.
- If more than one skill matches, keep the primary workflow fixed and run only the current prerequisite skill before implementation.
- For generator skills, apply the skill's Clarification Gate before writing final files.
- Use `.aios/references/context-budget.md` when command output, logs, or diffs could dominate context.
- Use `.aios/references/response-style.md` when concise communication is helpful, but keep formal artifacts complete.
- Record uncertainty as open questions instead of guessing important product, architecture, security, or dependency decisions.
- Do not treat this router as permission to modify files without an implementation plan.
