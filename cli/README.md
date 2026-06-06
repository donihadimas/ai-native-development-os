# AIOS CLI

The AI-Native Development OS V2 CLI is a small helper for copying the project skeleton, creating docs from templates, and validating AI-ready structure.

It is intentionally not an orchestration engine. Codex or another coding agent still performs planning, implementation, testing, and review.

## Install Dependencies

```bash
cd cli
npm install
```

## Build and Test

```bash
npm run build
npm test
```

## Local Usage

From the repository root:

```bash
cd cli
npm run aios -- init ../demo-project
```

From inside `cli/` after building:

```bash
node dist/src/index.js init ../demo-project
node dist/src/index.js validate ../demo-project
```

## Commands

```bash
aios init <project-name>
aios feature <feature-name>
aios adr <decision-name>
aios task <task-name>
aios review <name>
aios validate [project-path]
```

## Behavior

- `init` copies `project-skeleton/` and refuses to overwrite a non-empty directory.
- `feature` creates `docs/product/features/<slug>.prd.md` from the PRD template.
- `adr` creates the next `docs/adr/ADR-XXX-<slug>.md`.
- `task` creates the next `docs/tasks/TASK-XXX-<slug>.md`.
- `review` creates `docs/reviews/<slug>-review.md`.
- `validate` checks the AI-ready project structure.

## V2 Boundary

The CLI only copies, renders, numbers, and validates files. It does not generate application code, run agents, edit GitHub, manage migrations, or choose a stack.
