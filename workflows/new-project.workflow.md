# New Project Workflow

## Input

- Raw product idea or product vision.
- Known constraints, target users, and preferred stack if already chosen.

## Process

1. Resolve `.aios/config.json`; use `docsRoot`, `projectShape`, selected agents, and skill delivery mode.
2. Create or fill `<docsRoot>/product/vision.md` using `.aios/skill-router.md` and `product-discovery`.
3. Generate `<docsRoot>/product/prd.md` using `prd-generator`.
4. Generate `<docsRoot>/architecture/architecture.md` using `architecture-design`.
5. Create initial ADRs for important decisions using `adr-generator`.
6. Break the PRD into small tasks using `task-breakdown`.
7. Initialize app code with the chosen stack outside the AIOS core when needed.
8. Implement one task at a time using `implementation-planner` before coding.
9. Add or update tests using `testing`.
10. Review each change using `code-review`.

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
