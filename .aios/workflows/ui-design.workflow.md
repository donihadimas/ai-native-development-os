# UI/UX Design Workflow

## Input

- PRD or feature PRD.
- Product vision when experience intent is unclear.
- Architecture notes when UI boundaries depend on system shape.
- API contracts when data exchange is involved.
- Existing design notes or UI conventions.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `ui-ux-design`, `.aios/templates/design.template.md`, and `.aios/references/frontend-principles.md`.
- Lite mode or missing config: use `AGENTS.md`, product docs, and available design guidance.
- If RTK is enabled, use it for noisy diffs or generated artifact comparisons unless exact full output is required.
- If Caveman is enabled, use concise style for operational updates only; keep design artifacts complete.

## Workflow Handoffs

Use this workflow when the primary feature or new-project workflow includes user-facing UI, product-facing interactions, user flows, screens, states, accessibility, or frontend design decisions.

- Start from `workflows/new-feature.workflow.md` or `workflows/new-project.workflow.md` when the UI belongs to broader product scope; return there after design review.
- Use `ui-ux-design` with `.aios/references/frontend-principles.md` and `.aios/templates/design.template.md` for the design artifact.
- Route to `workflows/api-contract.workflow.md` when screens depend on request, response, error, auth, or integration behavior.
- Route to `workflows/security-review.workflow.md` when the UI handles auth, permissions, secrets, payments, billing, checkout, sensitive data, or risky user actions.
- Use `Skill: task` after design is reviewed; frontend tasks should link back to the accepted design, and task status is updated to `Status: Done` in-place.
- Use `Skill: verify` and `workflows/review.workflow.md` for each implementation task after design approval.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` and `projectShape`.
2. Confirm the feature has user-facing UI or product-facing interaction.
3. Read the accepted PRD or feature PRD and relevant architecture/API notes.
4. Route through `ui-ux-design`.
5. Create or update `<docsRoot>/design/design.md` using `.aios/templates/design.template.md` when available.
6. Have the user review user flow, screens, interface states, accessibility, and data/API dependencies.
7. Link accepted design notes from frontend or product-facing tasks.
8. Break design into small implementation tasks only after design review.

## Output

- Design document in `<docsRoot>/design/`.
- Reviewable user flow and screen inventory.
- Interface state and accessibility notes.
- Data/API dependency notes.
- Task breakdown guidance.

## Done Criteria

- User flow and screens are clear.
- Loading, empty, error, success, and disabled states are covered.
- Data/API dependencies are explicit.
- Accessibility expectations are named.
- User has reviewed design before implementation tasks are treated as ready.

## Full Mode Flow

Use `ui-ux-design` skill when UI/UX design is the current step. Read `.aios/templates/design.template.md`, `.aios/references/frontend-principles.md`, and `.aios/references/api-standards.md` when data exchange matters.

## Lite Mode Flow

Use `AGENTS.md`, product docs, and available design guidance. Follow the same UI/UX design checklist manually.

## After This Flow

Have the user review and accept the design. After approval, generate frontend or product-facing tasks with acceptance criteria and testing expectations, then implement one selected task with `Skill: task`.

