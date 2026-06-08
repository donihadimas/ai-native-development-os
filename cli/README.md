# AIOS CLI

`aios` is the small CLI for AI-Native Development OS. It helps you create an AI-ready project with a local `.aios/` workflow kit, generate common planning documents from templates, and validate that a project has the expected AI workflow structure.

It does not replace Codex or another coding agent. The CLI only creates, copies, numbers, renders, and validates files. Your agent still does the product thinking, planning, implementation, testing, and review with the generated docs as context.

## Install

After the package is published:

```bash
npm install -g @donihadimas/aios
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
aios next demo-project
cd demo-project
```

By default, generated projects include `.aios/` with skills, prompts, references, templates, and workflows. Use `--lite` only when you want a minimal structure without the local workflow kit.

Run `aios` without arguments to use the interactive wizard. The wizard can create a new project, adopt an existing project, choose docs location, and install selected skills into native agent folders.

For a compact `.aios/` with native skills:

```bash
aios init demo-native --agents codex,qwen --skills core --skill-delivery native
aios agent-install demo-native --agents opencode,antigravity --skills testing
```

Or start from a lightweight V2.x starter:

```bash
aios starter fullstack-saas demo-saas
aios validate demo-saas
aios next demo-saas
cd demo-saas
```

Create the first planning artifacts:

```bash
aios feature "Habit reminders"
aios openapi "Habit API"
aios migration "Create habits table"
aios security "Habit API"
aios adr "Use server date for habit completion"
aios task "Implement habit API"
aios review "Habit API"
aios release "0.3.0"
```

Or adopt an existing project:

```bash
cd existing-project
aios adopt
aios validate
```

Open the project in your IDE and ask Codex to start from the generated docs:

```text
Read AGENTS.md, docs/context/context-map.md, .aios/skill-router.md, and docs/tasks/TASK-001-implement-habit-api.md. Use the matching native agent skill when installed, otherwise use the portable .aios skill. Create an implementation plan before coding.
```

## Recommended Workflow

```text
aios init <project-name>
↓
aios next <project-name>
↓
Fill docs/product/vision.md
↓
Use Codex with the prompts from .aios/prompts/
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

For V2.x workflow docs, add only the pieces the project needs:

```text
aios openapi <api-name>
aios migration <migration-name>
aios security <review-name>
aios release <release-name>
```

For an existing project, replace the first step with:

```text
cd <existing-project>
↓
aios adopt
↓
aios validate
```

## Commands

### `aios init <project-name> [--lite] [--docs-root <path>] [--agents <list>] [--skills <set>] [--skill-delivery <mode>]`

Copies the bundled AI-ready project skeleton into a new directory and installs the local `.aios/` workflow kit.

```bash
aios init my-saas
aios init my-saas-lite --lite
aios init my-saas-native --agents codex,qwen --skills core --skill-delivery native
aios init my-saas-clean --docs-root .aios/project-docs
```

Behavior:

- Creates `my-saas/`.
- Refuses to overwrite an existing non-empty directory.
- Includes `AGENTS.md`, optional `CLAUDE.md`, shared docs, `frontend/`, `backend/`, and `.aios/` by default.
- `--lite` skips `.aios/` and preserves the older minimal behavior.
- `--docs-root` stores project docs somewhere other than `docs/`.
- `--skill-delivery` accepts `portable`, `native`, or `both`.
- `--agents` accepts `codex`, `qwen`, `opencode`, `antigravity`, and `generic`.
- `--skills` accepts `core`, `planning`, `delivery`, `all`, or a comma-separated skill list.

### `aios validate [project-path] [--lite]`

Checks whether a project has the expected AI-ready structure.

```bash
aios validate
aios validate my-saas
aios validate my-saas-lite --lite
```

It checks for:

- `AGENTS.md`
- `docs/context/context-map.md`
- `docs/context/development-start.md`
- `docs/product/vision.md`
- `docs/product/prd.md`
- `docs/product/features/`
- `docs/architecture/architecture.md`
- `docs/adr/`
- `docs/tasks/`
- `docs/reviews/`
- `docs/api/`
- `frontend/`
- `backend/`
- required `.aios/` workflow kit files unless `--lite` is provided
- native agent skill files when `.aios/config.json` uses native repo-scope skill delivery

It also reports warnings, without failing validation, when optional V2.x paths are missing:

- `docs/security/`
- `docs/releases/`
- `docs/database/migrations/`
- OpenAPI files in `docs/api/`

Warnings are guidance only. Add these folders when the project needs security reviews, release notes, migration plans, or OpenAPI contracts.

### `aios starter <starter-name> <project-name> [--lite] [--docs-root <path>] [--agents <list>] [--skills <set>] [--skill-delivery <mode>]`

Copies a bundled AI docs only starter into a new directory and installs the local `.aios/` workflow kit.

```bash
aios starter fullstack-saas my-saas
aios starter fullstack-saas my-saas-lite --lite
```

Available starters:

- `flutter-mobile`
- `nextjs-web`
- `node-api`
- `nestjs-api`
- `laravel-api`
- `supabase-app`
- `fullstack-saas`

Behavior:

- Creates `my-saas/`.
- Refuses to overwrite an existing non-empty directory.
- Includes stack-oriented placeholders, AI-ready docs, and `.aios/` by default.
- Does not include framework code or dependencies.
- `--lite` skips `.aios/`.

### `aios adopt [project-path] [--lite] [--docs-root <path>] [--agents <list>] [--skills <set>] [--skill-delivery <mode>]`

Adds the AI Dev OS structure and local `.aios/` workflow kit to an existing project without overwriting existing files.

```bash
cd existing-project
aios adopt
aios validate
```

You can also pass a path:

```bash
aios adopt path/to/existing-project
aios validate path/to/existing-project
```

Behavior:

- Creates missing AI Dev OS docs and folders.
- Installs missing `.aios/` workflow kit files by default.
- Skips files that already exist.
- Does not overwrite your existing `README.md`, source code, docs, frontend, or backend folders.
- Adds `frontend/` and `backend/` placeholders if they are missing so the project validates against the generic AI-ready structure.
- `--lite` skips `.aios/`.

Use `adopt` when a project already exists and `init` would be too destructive.

### `aios install-kit [project-path]`

Installs or repairs the local `.aios/` workflow kit without overwriting existing files.

```bash
aios install-kit
aios install-kit path/to/project
```

Use this when a project was created in lite mode or when `.aios/` needs to be refreshed with missing assets.

### `aios agent-list`

Lists supported native agent targets and available AIOS skills.

```bash
aios agent-list
```

Supported agent targets:

- `codex` -> repo `.agents/skills`, user `~/.agents/skills`
- `generic` -> repo `.agents/skills`, user `~/.agents/skills`
- `qwen` -> repo `.qwen/skills`, user `~/.qwen/skills`
- `opencode` -> repo `.opencode/skills`, user `~/.config/opencode/skills`
- `antigravity` -> repo `.agent/skills`

### `aios agent-install [project-path]`

Installs selected AIOS skills into native agent skill folders.

```bash
aios agent-install . --agents codex,qwen --skills core
aios agent-install . --agents opencode --skills testing --dry-run
aios agent-install . --agents generic --skills all --scope user
```

Behavior:

- Skips existing skill folders by default.
- Uses `--overwrite` only when you intentionally want to replace existing installed skills.
- Uses `--dry-run` to preview target files without writing.
- Updates `.aios/config.json` after a real install.

### `aios config [project-path]`

Prints the resolved AIOS project config.

```bash
aios config
aios config my-saas
```

### `aios command-list [project-path]`

Lists portable AIOS command prompts available in `.aios/commands/`.

```bash
aios command-list
aios command-list my-saas
```

Output:

```text
Available AIOS commands:
- generate-prd
- implement-task
- review-code
```

### `aios command <name> [project-path]`

Prints one portable AIOS command prompt. This is useful when an agent does not support native slash commands.

```bash
aios command generate-prd
aios command review-code my-saas
```

The command is read-only. It prints the Markdown prompt so you can paste or reference it in Codex or another AI agent.

### `aios next [project-path]`

Prints the next recommended development step without changing files.

```bash
aios next
aios next my-saas
```

It checks whether vision, PRD, architecture, and tasks are ready, then points the user to the next local prompt or command.

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

### `aios openapi <api-name>`

Creates an OpenAPI contract stub.

```bash
aios openapi "Login API"
```

Output:

```text
docs/api/login-api.openapi.yaml
```

### `aios migration <migration-name>`

Creates the next numbered database migration plan.

```bash
aios migration "Create users table"
```

Output:

```text
docs/database/migrations/MIGRATION-001-create-users-table.md
```

This command does not apply a database migration.

### `aios security <review-name>`

Creates a security review report stub.

```bash
aios security "Login API"
```

Output:

```text
docs/security/login-api-security-review.md
```

### `aios release <release-name>`

Creates a release note and creates a changelog draft when one does not already exist.

```bash
aios release "0.3.0"
```

Output:

```text
docs/releases/0-3-0-release.md
docs/releases/CHANGELOG.md
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
│   │   ├── prd.md
│   │   └── features/
│   ├── architecture/
│   │   └── architecture.md
│   ├── adr/
│   ├── tasks/
│   ├── reviews/
│   ├── api/
│   └── context/
│       ├── context-map.md
│       └── development-start.md
├── .aios/
│   ├── config.json
│   ├── skill-router.md
│   ├── commands/
│   ├── skills/        # portable or both skill delivery mode
│   ├── prompts/
│   ├── references/
│   ├── templates/
│   └── workflows/
├── .agents/           # optional Codex/generic native skills
├── .qwen/             # optional Qwen Code native skills
├── .opencode/         # optional OpenCode native skills
├── .agent/            # optional Antigravity native skills
├── frontend/
└── backend/
```

## How To Use With Codex

The CLI prepares files. Codex should still follow the AI Dev OS workflow.

For PRD generation:

```text
Read AGENTS.md, docs/product/vision.md, and .aios/prompts/01-generate-prd.md. Generate docs/product/prd.md using .aios/templates/prd.template.md and keep acceptance criteria testable.
```

For task implementation:

```text
Read AGENTS.md, docs/context/context-map.md, .aios/skill-router.md, and the active task in docs/tasks/. Use native agent skills when installed, otherwise use .aios/skills. Create a short implementation plan before editing files. Do not modify unrelated files.
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
- apply database migrations,
- publish releases,
- bypass human review,
- infer your existing architecture automatically.

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
- `assets/aios-kit/`
- `assets/project-skeleton/`
- `assets/templates/`
- `assets/starters/`
- `README.md`
- `LICENSE`

The package should not include source tests or `dist/test/`.

## Troubleshooting

### `aios: command not found`

Make sure the package is installed globally:

```bash
npm install -g @donihadimas/aios
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

### I already have a project. Should I use `init` or `adopt`?

Use `adopt`:

```bash
cd existing-project
aios adopt
```

Use `init` only for new project directories.
