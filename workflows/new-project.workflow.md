# New Project Workflow

## Input

- Raw product idea or product vision.
- Known constraints, target users, and preferred stack if already chosen.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `Skill: spec`, `Skill: arch`, `Skill: task`, `Skill: verify`.
- Lite mode or missing config: use `AGENTS.md`, project docs, and available AIOS instructions.
- If RTK is enabled, use it for noisy command output unless exact full output is required.
- If Caveman is enabled, use concise style for operational updates only; keep formal artifacts complete.

## Workflow Handoffs

Use this workflow as the primary route for a raw idea, new project setup, first PRD, initial architecture, or early AIOS lifecycle. It should create enough durable context before any implementation workflow begins.

- Use `Skill: spec` for initial product discovery and PRD creation.
- Use `Skill: arch` for initial system architecture and ADR generation.
- Use `workflows/ui-design.workflow.md` and `ui-ux-design` when the project has user-facing UI or product-facing interactions.
- Use `workflows/api-contract.workflow.md` and `api-contract-design` when initial tasks require app integration, provider/client boundaries, webhooks, or external services.
- Use `workflows/database-migration.workflow.md` and `database-migration` when initial scope requires persistence design, migration plans, or seed data.
- Use `workflows/security-review.workflow.md` when initial scope includes auth, permissions, secrets, payments, billing, subscriptions, checkout, webhooks, or sensitive data.
- Use `Skill: task` to create small tasks and implement them one at a time; update task status to `Status: Done` in-place.
- Use `workflows/new-feature.workflow.md` for the first feature implementation after the project foundation is accepted.

## Process

1. Resolve `.aios/config.json`; use `docsRoot`, `projectShape`, selected agents, and skill delivery mode.
2. Interview the user with `Skill: spec` when the idea is rough, then create or fill `<docsRoot>/product/vision.md`.
3. User reviews the vision problem, target users, MVP scope, non-goals, success metrics, assumptions, constraints, and open questions.
4. Generate `<docsRoot>/product/prd.md` using `Skill: spec`, including a product-level Mermaid flow chart.
5. User reviews the PRD scope, non-goals, acceptance criteria, open questions, and Mermaid flow.
6. Generate `<docsRoot>/architecture/architecture.md` using `Skill: arch` only after PRD review.
7. User reviews architecture and identifies decisions that need ADRs.
8. Create initial ADRs for important decisions using `Skill: arch`.
9. Create or update `<docsRoot>/design/design.md` with `ui-ux-design` when the project has user-facing UI or product-facing interactions.
10. User reviews design before frontend or product-facing implementation tasks are treated as ready.
11. Break the reviewed PRD, architecture, ADRs, API contracts, and design into small tasks using `Skill: task`.
12. Initialize app code with the chosen stack outside the AIOS core when needed.
13. Plan one task at a time using `Skill: task`, implement, and update status to `Status: Done` in-place.
14. Add or update tests using `Skill: verify`.
15. Review each change using `workflows/review.workflow.md`.

## Flow Checkpoints

- After raw idea: interview user and fill vision.
- After vision: user reviews vision, then generate PRD next.
- After PRD: user reviews PRD, then generate architecture.
- After architecture: user reviews technical direction, then create ADRs for important decisions.
- After ADRs: design UI/UX for user-facing work and create API contracts or migration plans when needed.
- After design/API/migration planning: generate small implementation tasks.
- After task generation: implement one task at a time.
- After implementation: test, review, complete the Done Summary, and mark task `Status: Done` in-place.

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

Use core skills (`spec`, `arch`, `task`, `verify`) one lifecycle step at a time.

## Lite Mode Flow

Use `AGENTS.md` and project docs as primary context. Follow the same sequence manually: vision, PRD, architecture, ADRs, design, tasks, implementation, tests, review.

## After This Flow

If the PRD is not accepted yet, review and approve the PRD first. If PRD and architecture are accepted, create ADRs for important decisions, add design/API/migration planning when the project needs it, then generate small implementation tasks.

