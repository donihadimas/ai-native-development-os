# AI-Native Development OS

![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)

AI-Native Development OS is a reusable workflow foundation for building software with AI coding agents. It gives a solo fullstack developer a consistent way to move from idea to product docs, architecture, ADRs, small tasks, implementation, review, testing, and release.

This repository is not an application framework, SaaS starter, dashboard, or AI agent. It is a portable operating system for AI-assisted development: reusable skills, templates, references, workflows, project skeletons, and a small helper CLI. The CLI is only for setup, validation, and generating AIOS template files; AI-native development happens through Codex or another AI agent inside the project.

## 📑 Table of Contents

- [🎯 What It Is For](#-what-it-is-for)
- [📊 Current Status](#-current-status)
- [📦 What Is Included](#-what-is-included)
- [📥 Install](#-install)
- [🧭 Guided Setup](#-guided-setup)
- [⚡ Command Quickstart](#-command-quickstart)
- [🔄 Recommended Workflow](#-recommended-workflow)
- [🤖 How To Use With Codex](#-how-to-use-with-codex)
- [🛠️ CLI Commands](#️-cli-commands)
- [📂 Generated Project Structure](#-generated-project-structure)
- [⚖️ Operating Principles](#️-operating-principles)
- [🚧 Boundaries](#-boundaries)
- [🚢 Publishing The CLI](#-publishing-the-cli)
- [📜 License](#-license)

## 🎯 What It Is For

Use this project when you want to:

- start new fullstack, frontend-only, backend-only, mobile, library, or docs-only projects with an AI-ready documentation structure,
- keep Codex or another coding agent grounded in explicit product and engineering context,
- avoid repeating the same prompts and project setup across projects,
- split implementation into small verifiable tasks,
- keep review, testing, and acceptance criteria visible before marking work done,
- publish or reuse the workflow as a small CLI-assisted toolkit.

## 📊 Current Status

- V1 manual workflow is complete and usable by copying `project-skeleton/` and using the prompts, skills, templates, references, and workflows directly.
- V2 assisted workflow is implemented as a focused Node.js CLI in `cli/`.
- V2.x workflow extensions are implemented for AI docs only starters, database migration planning, security review, release preparation, OpenAPI generation, and GitHub Actions dry-run automation.
- Ready-to-use project generation is implemented: `aios init`, `starter`, and `adopt` install a local `.aios/` workflow kit by default.
- V3-lite setup is implemented for interactive CLI setup, configurable docs location, native agent skill install, and optional RTK/Caveman/Ponytail integration rules.
- The CLI is published as `@donihadimas/aios`.

## 📦 What Is Included

- `skills/` - reusable operating procedures for AI agents.
- `templates/` - document templates for PRD, design, architecture, ADR, task, review, testing, implementation plans, OpenAPI contracts, migration plans, security reviews, release notes, and changelog drafts.
- `references/` - stable engineering principles and standards.
- `workflows/` - end-to-end development flows.
- `prompts/` - thin prompt wrappers that route agents to the right artifacts.
- `skill-router.md`, `commands/`, and `integrations/` - routing rules, portable command prompts, and optional external-tool rules for local AI workflows.
- `project-skeleton/` - a copy-ready AI-ready project structure.
- `starters/` - AI docs only starter shells for V2.x stack-oriented project setup.
- `cli/` - the `aios` helper CLI for skeleton and starter creation, adoption, document generation, numbering, and validation.
- `.github/` - manual issue and pull request templates plus lightweight CI, smoke test, and release dry-run workflows.
- `validation/` - validation reports and smoke-test evidence.

## 📥 Install

After the package is published, install the CLI globally:

```bash
npm install -g @donihadimas/aios
aios --help
```

Requirements:
- Node.js 20 or newer.
- npm for global install.

## 🧭 Guided Setup

For most users, start with the guided setup wizard:

```bash
aios
```

The wizard can help you:

- create a blank AIOS project or start from a starter,
- adopt an existing project without overwriting existing files,
- choose the project shape: fullstack, frontend, backend, mobile, library, or docs-only,
- choose full setup or lite setup,
- choose where project docs should live: `docs/`, `.aios/project-docs/`, or a custom path,
- install selected AIOS skills into native agent folders for Codex, Qwen Code, OpenCode, Antigravity, or generic agents,
- choose skill delivery: native agent folders, portable `.aios/skills`, or both,
- optionally generate RTK/Caveman/Ponytail integration rules,
- review a setup summary before files are written.

Use **Full AIOS setup** for most projects. It creates `.aios/` with prompts, references, templates, workflows, commands, integrations, config, and optionally skills. Use **Lite setup** only when you want project docs without the local workflow kit.

Use **native skills** when your coding agent can read project skill folders, such as `.agents/skills`, `.qwen/skills`, `.opencode/skills`, or `.agent/skills`. Native delivery keeps `.aios/` compact. Use portable delivery when you want all skills to live inside `.aios/skills`.

Optional integrations are rules-first. AIOS can generate local RTK/Caveman/Ponytail guidance without installing external tools. External installers only run after explicit confirmation.

## ⚡ Command Quickstart

Use the command quickstart when you already know the setup you want or need a non-interactive flow.

Create and validate a new project:

```bash
aios init demo-project
aios validate demo-project
aios next demo-project
cd demo-project
```

`aios init` installs a local `.aios/` workflow kit by default. Use `--lite` when you want minimal project docs without the local workflow kit; lite still writes `.aios/config.json` so agents can resolve `mode`, `docsRoot`, and `projectShape`. Run `aios` without arguments for the guided setup wizard.

Native agent skill install keeps `.aios/` compact and installs selected skills into agent-specific folders:

```bash
aios init demo-native --agents codex,qwen --skills core --skill-delivery native
aios agent install demo-native --agents opencode,antigravity --skills testing
```

Create planning and review documents:

```bash
aios create feature "Habit reminders"
aios create openapi "Habit API"
aios create migration "Create habits table"
aios create security "Habit API"
aios create adr "Use server date for completion"
aios create task "Implement habit API"
aios create review "Habit API"
aios create release "0.3.1"
```

Start from a lightweight V2.x starter:

```bash
aios starter fullstack-saas demo-saas
aios validate demo-saas
```

Adopt an existing project without overwriting existing files:

```bash
cd existing-project
aios adopt
aios validate
```

Create planning and review documents:

```bash
aios create feature "Habit reminders"
aios create design "Habit reminders"
aios create openapi "Habit API"
aios create migration "Create habits table"
aios create security "Habit API"
aios create adr "Use server date for completion"
aios create task "Implement habit API"
aios create review "Habit API"
aios create release "0.3.0"
```

### Manual Use

Use the manual flow when you want full control and do not need the CLI.

1. Copy `project-skeleton/` into a new project directory.
2. Open the new project with Codex or another coding agent.
3. Use `prompts/00-discover-product.md` and `skills/product-discovery/SKILL.md` to interview the user and fill `docs/product/vision.md`.
4. Review the vision, then use `prompts/01-generate-prd.md` and `skills/prd-generator/SKILL.md` to create `docs/product/prd.md`.
5. Generate architecture, design notes for user-facing UI, ADRs, and task breakdowns before coding.
6. Implement one small task at a time.
7. Save review evidence in `docs/reviews/`, run tests, and summarize before marking work done.

## 🔄 Recommended Workflow

```text
aios init <project-name>
↓
aios next <project-name>
↓
Use product-discovery to interview user and fill docs/product/vision.md
↓
Use Codex with the prompts from .aios/prompts/
↓
aios create adr <decision-name>
↓
aios create task <task-name>
↓
Codex plans and implements one task
↓
aios create review <name>
↓
Codex reviews the diff against acceptance criteria
↓
aios validate
```

For an existing project, replace the first step with `aios adopt`.

## 🤖 How To Use With Codex

The CLI prepares files. Codex should still follow the AI Dev OS workflow.

For PRD generation:

```text
If docs/product/vision.md is still thin, read AGENTS.md and .aios/prompts/00-discover-product.md, interview me, and fill the vision first. Then read .aios/prompts/01-generate-prd.md and generate docs/product/prd.md using .aios/templates/prd.template.md.
```

For task implementation:

```text
Read AGENTS.md, docs/context/context-map.md, .aios/skill-router.md, and the active task in docs/tasks/. Use implementation-planner before editing, then task-implementation to implement, validate acceptance criteria, and update the task Done Summary when complete. Do not modify unrelated files.
```

For review:

```text
Review the diff against the active task acceptance criteria. Findings first, then test evidence, risks, and approval or revision required.
```

## 🛠️ CLI Commands

- `aios init <project-name> [--lite] [--shape <shape>] [--docs-root <path>] [--agents <list>] [--skills <set>] [--skill-delivery <mode>]`: Copies the bundled AI-ready project skeleton into a new directory and installs the local workflow kit.
- `aios validate [project-path] [--lite]`: Checks whether a project has the expected AI-ready structure.
- `aios starter <starter-name> <project-name>`: Copies a bundled AI docs only starter into a new directory.
- `aios adopt [project-path]`: Adds the AI Dev OS structure and local `.aios/` workflow kit to an existing project without overwriting existing files.
- `aios kit install [project-path]`: Installs or repairs the local `.aios/` workflow kit.
- `aios agent list`: Lists supported native agent targets and available AIOS skills.
- `aios agent install [project-path]`: Installs selected AIOS skills into native agent skill folders.
- `aios integration list / status / add / remove / doctor / repair`: Manages optional external integrations like `rtk`, `caveman`, and `ponytail`.
- `aios config [project-path]`: Prints the resolved AIOS project config.
- `aios prompt list / show`: Lists or prints portable AIOS command prompts.
- `aios next [project-path]`: Prints the next recommended development step without changing files.
- `aios create feature <name>`: Creates a feature PRD stub from the PRD template.
- `aios create adr <name>`: Creates the next numbered ADR.
- `aios create task <name>`: Creates the next numbered implementation task.
- `aios create review <name>`: Creates a review report stub.
- `aios create design <name>`: Creates a UI/UX design document stub.
- `aios create openapi <name>`: Creates an OpenAPI contract stub.
- `aios create migration <name>`: Creates the next numbered database migration plan.
- `aios create security <name>`: Creates a security review report stub.
- `aios create release <name>`: Creates a release note and changelog draft.

## 📂 Generated Project Structure

A project created with `aios init` looks like this:

```text
📁 my-project/
├── 📄 AGENTS.md
├── 📄 CLAUDE.md
├── 📄 README.md
├── 📁 docs/
│   ├── 📁 product/
│   │   ├── 📄 vision.md
│   │   ├── 📄 prd.md
│   │   └── 📁 features/
│   ├── 📁 architecture/
│   │   └── 📄 architecture.md
│   ├── 📁 design/
│   │   └── 📄 design.md
│   ├── 📁 adr/
│   ├── 📁 tasks/
│   ├── 📁 reviews/
│   ├── 📁 api/
│   └── 📁 context/
│       ├── 📄 context-map.md
│       └── 📄 development-start.md
├── 📁 .aios/
│   ├── 📄 config.json
│   ├── 📄 skill-router.md
│   ├── 📁 commands/
│   ├── 📁 integrations/
│   ├── 📁 skills/        # portable or both skill delivery mode
│   ├── 📁 prompts/
│   ├── 📁 references/
│   ├── 📁 templates/
│   └── 📁 workflows/
├── 📁 .agents/           # optional native Codex/generic skills
├── 📁 .qwen/             # optional native Qwen Code skills
├── 📁 .opencode/         # optional native OpenCode skills
├── 📁 .agent/            # optional native Antigravity skills
├── 📁 frontend/
└── 📁 backend/
```

## ⚖️ Operating Principles

- Docs are the source of truth.
- Skills beat one-off prompts.
- Route context instead of dumping context.
- Keep tasks small enough to verify.
- Humans own architecture, security, dependency, and product decisions.
- Frontend and backend share the same product, architecture, ADR, task, review, and API context.
- Work is not done until acceptance criteria, tests, review, and summary are complete.

## 🚧 Boundaries

The CLI only creates, copies, numbers, renders, recommends next steps, validates files, and optionally manages AIOS integration rules. It does not generate application code, run Codex, install app dependencies, apply database migrations, or publish releases.

The included starters are AI docs only shells. GitHub Actions are intentionally limited to tests, smoke checks, and npm package dry-runs.

## 🚢 Publishing The CLI

The CLI lives in `cli/` and is packaged separately from the repository root. Before publishing:

```bash
cd cli
npm test
npm pack --dry-run
```

For the full release process, including versioning, npm publish, Git tags, GitHub Releases, and rollback notes, see `RELEASE.md`. For the step-by-step publish checklist, see `validation/npm-publish-readiness-checklist.md`.

## 📜 License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md) files for more details.
