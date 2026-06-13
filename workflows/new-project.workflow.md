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
2. Create or fill `<docsRoot>/product/vision.md` using `product-discovery` through `.aios/skill-router.md` when available, or the same product discovery questions manually in lite mode.
3. Generate `<docsRoot>/product/prd.md` using `prd-generator`, including a product-level Mermaid flow chart.
4. User reviews the PRD scope, non-goals, acceptance criteria, open questions, and Mermaid flow.
5. Generate `<docsRoot>/architecture/architecture.md` using `architecture-design` only after PRD review.
6. User reviews architecture and identifies decisions that need ADRs.
7. Create initial ADRs for important decisions using `adr-generator`.
8. Break the reviewed PRD and architecture into small tasks using `task-breakdown`.
9. Initialize app code with the chosen stack outside the AIOS core when needed.
10. Implement one task at a time using `implementation-planner` before coding.
11. Add or update tests using `testing`.
12. Review each change using `code-review`.

## Flow Checkpoints

- After vision: generate PRD next.
- After PRD: user reviews PRD, then generate architecture.
- After architecture: user reviews technical direction, then create ADRs for important decisions.
- After ADRs: generate small implementation tasks.
- After task generation: implement one task at a time.
- After implementation: test and review before marking done.

## Output

- Vision document.
- PRD.
- Architecture document.
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

If the PRD is not accepted yet, review and approve the PRD first. If PRD and architecture are accepted, create ADRs for important decisions, then generate small implementation tasks.
