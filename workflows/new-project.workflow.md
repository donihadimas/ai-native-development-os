# New Project Workflow

## Input

- Raw product idea or product vision.
- Known constraints, target users, and preferred stack if already chosen.

## Process

1. Create or fill `docs/product/vision.md` using `skills/product-discovery`.
2. Generate `docs/product/prd.md` using `skills/prd-generator`.
3. Generate `docs/architecture/architecture.md` using `skills/architecture-design`.
4. Create initial ADRs for important decisions using `skills/adr-generator`.
5. Break the PRD into small tasks using `skills/task-breakdown`.
6. Initialize frontend and backend folders with the chosen stack outside the AI Dev OS core.
7. Implement one task at a time using `skills/implementation-planner` before coding.
8. Add or update tests using `skills/testing`.
9. Review each change using `skills/code-review`.

## Output

- Vision document.
- PRD.
- Architecture document.
- Initial ADRs.
- Initial task list.
- AI-ready project skeleton with frontend and backend areas.

## Done Criteria

- Product intent is clear.
- Architecture supports the initial PRD.
- Initial decisions are recorded.
- First tasks have acceptance criteria and testing expectations.
- Agent can start a task without reading the entire repo.
