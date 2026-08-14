# AIOS Skill Router

Use this router to match user intent directly to the appropriate lifecycle skill and workflow. Do not preload unneeded skills or references.

## 4 Core Lifecycle Skills

| Intent / Phase | Core Skill | Primary Responsibilities | Artifacts |
| --- | --- | --- | --- |
| **Discovery & Requirements** | `spec` | Product discovery, user problems, MVP scope, PRDs, feature specs. | `docs/product/vision.md`, `docs/product/prd.md` |
| **Architecture & Decisions** | `arch` | System architecture, component boundaries, data models, ADRs. | `docs/architecture/architecture.md`, `docs/adr/ADR-XXX.md` |
| **Breakdown & Implementation** | `task` | Task breakdown, implementation plans, minimal-correct code edits. | `docs/tasks/TASK-XXX.md`, `docs/plans/TASK-XXX-plan.md` |
| **Testing & Verification** | `verify` | Automated test runs, diff inspection, code review, security checks. | Test suites, acceptance criteria checks, `docs/reviews/` |

## Domain-Optional Skills

- **`api-contract-design`**: OpenAPI / REST contract design before frontend/backend integration.
- **`database-migration`**: Schema migrations, indexes, and rollback strategies.
- **`ui-ux-design`**: Wireframes, component states, and accessibility design.
- **`release-management`**: Release notes and changelog preparation.

## Direct Routing Rules

1. **New Feature**: Route `spec` -> `arch` (if new architecture) -> `task` (breakdown & code) -> `verify`.
2. **Bugfix / Refactor**: Route `task` (plan & fix) -> `verify` (test suite & regression check).
3. **Architecture Decision**: Route `arch` -> `task` -> `verify`.
4. **Pre-commit Verification**: Run test suite via `verify` before completing tasks.
