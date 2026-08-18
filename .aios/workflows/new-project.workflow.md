# New Project Workflow

## Input

- Raw product idea or product vision.
- Known constraints, target users, and preferred stack if already chosen.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `.aios/skill-router.md`, `.aios/prompts/`, `.aios/templates/`, `.aios/references/`, and `.aios/workflows/`.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, project docs, and available root or agent-provided AIOS instructions. Do not assume `.aios/` exists.
- If RTK is enabled, use it for noisy command output unless exact full output is required.
- If Caveman is enabled, use concise style for operational updates only; keep formal artifacts complete.

## Workflow Handoffs

Use this workflow as the primary route for a raw idea, new project setup, first PRD, initial architecture, or early AIOS lifecycle. It should create enough durable context before any implementation workflow begins.

- Use `product-discovery`, then `prd-generator`, then `architecture-design` for the initial product and system foundation.
- Use `adr-generator` when the architecture creates durable decisions or trade-offs.
- Use `.aios/workflows/ui-design.workflow.md` and `ui-ux-design` when the project has user-facing UI or product-facing interactions.
- Use `.aios/workflows/api-contract.workflow.md` and `api-contract-design` when initial tasks require app integration, provider/client boundaries, webhooks, or external services.
- Use `.aios/workflows/database-migration.workflow.md` and `database-migration` when initial scope requires persistence design, migration plans, or seed data.
- Use `.aios/workflows/security-review.workflow.md` when initial scope includes auth, permissions, secrets, payments, billing, subscriptions, checkout, webhooks, or sensitive data.
- For the current lifecycle step only, read the selected prompt first, then use `skill-router.md` Artifact Routing to add references or templates only when they govern the artifact being created.
- Use `task-breakdown` to create small tasks only after the relevant PRD, architecture, ADR, design, API, migration, and security inputs are reviewed.
- Use `.aios/workflows/new-feature.workflow.md` for the first feature implementation after the project foundation is accepted.

## Process

1. Resolve `.aios/config.json`; use `docsRoot`, `projectShape`, selected agents, and skill delivery mode.
2. Interview the user with `product-discovery` when the idea is rough, then create or fill `<docsRoot>/product/vision.md` using `.aios/prompts/00-discover-product.md` when available, or the same product discovery questions manually in lite mode.
3. User reviews the vision problem, target users, MVP scope, non-goals, success metrics, assumptions, constraints, and open questions.
4. Generate `<docsRoot>/product/prd.md` using `prd-generator`, including a product-level Mermaid flow chart.
5. User reviews the PRD scope, non-goals, acceptance criteria, open questions, and Mermaid flow.
6. Generate `<docsRoot>/architecture/architecture.md` using `architecture-design` only after PRD review.
7. User reviews architecture and identifies decisions that need ADRs.
8. Create initial ADRs for important decisions using `adr-generator`.
9. Create or update `<docsRoot>/design/design.md` with `ui-ux-design` when the project has user-facing UI or product-facing interactions.
10. User reviews design before frontend or product-facing implementation tasks are treated as ready.
11. Break the reviewed PRD, architecture, ADRs, API contracts, and design into small tasks using `task-breakdown`.
12. Initialize app code with the chosen stack outside the AIOS core when needed.
13. Plan one task at a time using `implementation-planner`, then implement, close status, and archive completed tasks with `task-implementation`.
14. Add or update tests using `testing`.
15. Review each change using `code-review`.

## Flow Checkpoints

- After raw idea: interview user and fill vision.
- After vision: user reviews vision, then generate PRD next.
- After PRD: user reviews PRD, then generate architecture.
- After architecture: user reviews technical direction, then create ADRs for important decisions.
- After ADRs: design UI/UX for user-facing work and create API contracts or migration plans when needed.
- After design/API/migration planning: generate small implementation tasks.
- After task generation: implement one task at a time.
- After implementation: test, review, complete the Done Summary, then archive the task under `<docsRoot>/tasks/done/`.

## Output

- Vision document.
- PRD.
- Architecture document.
- Design document when user-facing UI is involved.
- Initial ADRs.
- Initial task list.
- AI-ready project skeleton matching the selected project shape.

## Done Criteria

- Product intent is clear.
- Architecture supports the initial PRD.
- Initial decisions are recorded.
- First tasks have acceptance criteria and testing expectations.
- Agent can start a task without reading the entire repo.

## Full Mode Flow

Use `.aios/skill-router.md` to select this workflow first, then use skills and adjacent workflows from the handoff list above one lifecycle step at a time. Use `skill-router.md` Artifact Routing just-in-time: read the selected step's prompt first, add references only when they govern the decision, and add templates only when creating or updating the artifact. Use `.aios/workflows/` for end-to-end sequencing.

## Lite Mode Flow

Use `AGENTS.md`, `<docsRoot>/context/context-map.md`, and project docs as primary context. Do not assume `.aios/skill-router.md`, `.aios/templates/`, or `.aios/references/` exist. Follow the same sequence manually: vision, PRD, architecture, ADRs, design, tasks, implementation, tests, review.

## After This Flow

If the PRD is not accepted yet, review and approve the PRD first. If PRD and architecture are accepted, create ADRs for important decisions, add design/API/migration planning when the project needs it, then generate small implementation tasks.
