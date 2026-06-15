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
13. Plan one task at a time using `implementation-planner`, then implement and close status with `task-implementation`.
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
- After implementation: test and review before marking done.

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

## Next Action

If the PRD is not accepted yet, review and approve the PRD first. If PRD and architecture are accepted, create ADRs for important decisions, add design/API/migration planning when the project needs it, then generate small implementation tasks.
