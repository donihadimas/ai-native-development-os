# AIOS CLI

`aios` is the small CLI for AI-Native Development OS. It helps you create an AI-ready project skeleton, generate common planning documents from templates, and validate that a project has the expected AI workflow structure.

It does not replace Codex or another coding agent. The CLI only creates, copies, numbers, renders, and validates files. Your agent still does the product thinking, planning, implementation, testing, and review with the generated docs as context.

## Install

After the package is published:

```bash
npm install -g ai-native-development-os-cli
aios --help
```

Requirements:

- Node.js 20 or newer.
- npm for global install.

## 10-Minute Quickstart

Create a new AI-ready project:

```bash
aios init demo-project
aios validate demo-project
cd demo-project
```

Create the first planning artifacts:

```bash
aios adr "Use server date for habit completion"
aios task "Implement habit API"
aios review "Habit API"
aios feature "Habit reminders"
```

Open the project in your IDE and ask Codex to start from the generated docs:

```text
Read AGENTS.md and docs/context/context-map.md. Then read docs/tasks/TASK-001-implement-habit-api.md and create an implementation plan before coding.
```

## Recommended Workflow

```text
aios init <project-name>
↓
Fill docs/product/vision.md
↓
Use Codex with the PRD/architecture prompts from the AI Dev OS
↓
aios adr <decision-name>
↓
aios task <task-name>
↓
Codex plans and implements one task
↓
aios review <name>
↓
Codex reviews the diff against acceptance criteria
↓
aios validate
```

## Commands

### `aios init <project-name>`

Copies the bundled AI-ready project skeleton into a new directory.

```bash
aios init my-saas
```

Behavior:

- Creates `my-saas/`.
- Refuses to overwrite an existing non-empty directory.
- Includes `AGENTS.md`, optional `CLAUDE.md`, shared docs, `frontend/`, and `backend/` placeholders.

### `aios validate [project-path]`

Checks whether a project has the expected AI-ready structure.

```bash
aios validate
aios validate my-saas
```

It checks for:

- `AGENTS.md`
- `docs/context/context-map.md`
- `docs/product/vision.md`
- `docs/product/prd.md`
- `docs/architecture/architecture.md`
- `docs/adr/`
- `docs/tasks/`
- `docs/api/`
- `frontend/`
- `backend/`

### `aios feature <feature-name>`

Creates a feature PRD stub from the PRD template.

```bash
aios feature "Team invitations"
```

Output:

```text
docs/product/features/team-invitations.prd.md
```

### `aios adr <decision-name>`

Creates the next numbered ADR from the ADR template.

```bash
aios adr "Use JWT access tokens"
```

Output:

```text
docs/adr/ADR-001-use-jwt-access-tokens.md
```

If ADR files already exist, the CLI uses the next available number.

### `aios task <task-name>`

Creates the next numbered implementation task from the task template.

```bash
aios task "Implement login endpoint"
```

Output:

```text
docs/tasks/TASK-001-implement-login-endpoint.md
```

Use this for small, specific, Codex-sized tasks.

### `aios review <name>`

Creates a review report stub from the review template.

```bash
aios review "Login endpoint"
```

Output:

```text
docs/reviews/login-endpoint-review.md
```

## Generated Project Structure

A project created with `aios init` looks like this:

```text
my-project/
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── docs/
│   ├── product/
│   │   ├── vision.md
│   │   └── prd.md
│   ├── architecture/
│   │   └── architecture.md
│   ├── adr/
│   ├── tasks/
│   ├── api/
│   └── context/
│       └── context-map.md
├── frontend/
└── backend/
```

## How To Use With Codex

The CLI prepares files. Codex should still follow the AI Dev OS workflow.

For PRD generation:

```text
Read AGENTS.md and docs/product/vision.md. Generate docs/product/prd.md using the PRD template and keep acceptance criteria testable.
```

For task implementation:

```text
Read AGENTS.md, docs/context/context-map.md, and the active task in docs/tasks/. Create a short implementation plan before editing files. Do not modify unrelated files.
```

For review:

```text
Review the diff against the active task acceptance criteria. Findings first, then test evidence, risks, and approval or revision required.
```

## What The CLI Does Not Do

`aios` does not:

- generate application code,
- run Codex or any AI agent,
- choose a frontend/backend framework,
- install dependencies for your app,
- manage database migrations,
- create GitHub workflows,
- publish releases,
- bypass human review.

That restraint is intentional. The CLI keeps setup fast while preserving the core AI Dev OS principle: human-owned decisions, small tasks, and verifiable work.

## Local Development

Clone this repository, then from `cli/`:

```bash
npm install
npm test
npm run build
npm run aios -- init ../demo-project
```

## Publishing Checklist

Before publishing to npm:

```bash
npm test
npm pack --dry-run
```

The package must include:

- `dist/src/`
- `assets/project-skeleton/`
- `assets/templates/`
- `README.md`
- `LICENSE`

The package should not include source tests or `dist/test/`.

## Troubleshooting

### `aios: command not found`

Make sure the package is installed globally:

```bash
npm install -g ai-native-development-os-cli
```

Or run it locally from a package install:

```bash
./node_modules/.bin/aios --help
```

### `Refusing to overwrite non-empty directory`

`aios init` will not overwrite existing work. Choose a new project name or move the existing directory first.

### `AI-ready structure is incomplete`

Run `aios validate` from the project root, or pass the project path explicitly:

```bash
aios validate path/to/project
```

Then create or restore the missing files listed in the output.
