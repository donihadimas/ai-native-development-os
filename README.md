# AI-Native Development OS

AI-Native Development OS is a reusable workflow foundation for building software with AI coding agents. It gives a solo fullstack developer a consistent way to move from idea to product docs, architecture, ADRs, small tasks, implementation, review, testing, and release.

This repository is not an application framework, SaaS starter, dashboard, or AI agent. It is a portable operating system for AI-assisted development: reusable skills, templates, references, workflows, project skeletons, and a small helper CLI.

## What It Is For

Use this project when you want to:

- start new frontend/backend projects with an AI-ready documentation structure,
- keep Codex or another coding agent grounded in explicit product and engineering context,
- avoid repeating the same prompts and project setup across projects,
- split implementation into small verifiable tasks,
- keep review, testing, and acceptance criteria visible before marking work done,
- publish or reuse the workflow as a small CLI-assisted toolkit.

## Current Status

- V1 manual workflow is complete and usable by copying `project-skeleton/` and using the prompts, skills, templates, references, and workflows directly.
- V2 assisted workflow is implemented as a focused Node.js CLI in `cli/`.
- The CLI is designed for publishing as `@donihadimas/aios`.
- V2.x remains intentionally deferred for stack-specific starters, database migration workflow, dedicated security-review workflow, GitHub Actions automation, and release automation.

## What Is Included

- `skills/` - reusable operating procedures for AI agents.
- `templates/` - document templates for PRD, architecture, ADR, task, review, testing, implementation plans, and OpenAPI contracts.
- `references/` - stable engineering principles and standards.
- `workflows/` - end-to-end development flows.
- `prompts/` - thin prompt wrappers that route agents to the right artifacts.
- `project-skeleton/` - a copy-ready AI-ready project structure.
- `cli/` - the `aios` helper CLI for skeleton creation, adoption, document generation, numbering, and validation.
- `.github/` - manual issue and pull request templates.
- `validation/` - validation reports and smoke-test evidence.

## Quickstart: Manual Use

Use the manual flow when you want full control and do not need the CLI.

1. Copy `project-skeleton/` into a new project directory.
2. Open the new project with Codex or another coding agent.
3. Fill `docs/product/vision.md` with the product idea.
4. Use `prompts/01-generate-prd.md` and `skills/prd-generator/SKILL.md` to create `docs/product/prd.md`.
5. Generate architecture, ADRs, and task breakdowns before coding.
6. Implement one small task at a time.
7. Save review evidence in `docs/reviews/`, run tests, and summarize before marking work done.

## Quickstart: CLI Assisted Use

After publishing, install the CLI globally:

```bash
npm install -g @donihadimas/aios
```

Create and validate a new project:

```bash
aios init demo-project
aios validate demo-project
cd demo-project
```

Adopt an existing project without overwriting existing files:

```bash
cd existing-project
aios adopt
aios validate
```

Create planning and review documents:

```bash
aios feature "Habit reminders"
aios adr "Use server date for completion"
aios task "Implement habit API"
aios review "Habit API"
```

## Generated Project Shape

```text
project/
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
│       └── context-map.md
├── frontend/
└── backend/
```

## Publishing The CLI

The CLI lives in `cli/` and is packaged separately from the repository root.

Before publishing:

```bash
cd cli
npm test
npm pack --dry-run
```

The package build copies `project-skeleton/` and `templates/` into bundled runtime assets through `cli/scripts/sync-assets.mjs`, then compiles TypeScript. See `validation/npm-publish-readiness-report.md` for the latest publish-readiness evidence.

## Operating Principles

- Docs are the source of truth.
- Skills beat one-off prompts.
- Route context instead of dumping context.
- Keep tasks small enough to verify.
- Humans own architecture, security, dependency, and product decisions.
- Frontend and backend share the same product, architecture, ADR, task, review, and API context.
- Work is not done until acceptance criteria, tests, review, and summary are complete.

## Boundaries

The CLI only creates, copies, numbers, renders, and validates files. It does not generate application code, choose a framework, run Codex, install app dependencies, manage database migrations, create GitHub Actions, or publish releases.

Future V2.x work may add stack-specific starters, database migration workflow, dedicated security-review workflow, release automation, and GitHub Actions after the current CLI-assisted workflow is validated in real projects.
