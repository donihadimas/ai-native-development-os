# AI-Native Development OS

AI-Native Development OS is a reusable workflow foundation for building software with AI coding agents. It gives a solo fullstack developer a consistent way to move from idea to product docs, architecture, ADRs, small tasks, implementation, review, testing, and release.

This repository is not an application framework, SaaS starter, dashboard, or AI agent. It is a portable operating system for AI-assisted development: reusable skills, templates, references, workflows, project skeletons, and a small helper CLI.

## What It Is For

Use this project when you want to:

- start new fullstack, frontend-only, backend-only, mobile, library, or docs-only projects with an AI-ready documentation structure,
- keep Codex or another coding agent grounded in explicit product and engineering context,
- avoid repeating the same prompts and project setup across projects,
- split implementation into small verifiable tasks,
- keep review, testing, and acceptance criteria visible before marking work done,
- publish or reuse the workflow as a small CLI-assisted toolkit.

## Current Status

- V1 manual workflow is complete and usable by copying `project-skeleton/` and using the prompts, skills, templates, references, and workflows directly.
- V2 assisted workflow is implemented as a focused Node.js CLI in `cli/`.
- V2.x workflow extensions are implemented for AI docs only starters, database migration planning, security review, release preparation, OpenAPI generation, and GitHub Actions dry-run automation.
- Ready-to-use project generation is implemented: `aios init`, `starter`, and `adopt` install a local `.aios/` workflow kit by default.
- V3-lite setup is implemented for interactive CLI setup, configurable docs location, and native agent skill install for Codex, Qwen Code, OpenCode, Antigravity, and generic Agent Skills.
- The CLI is designed for publishing as `@donihadimas/aios`.
- V3 remains intentionally deferred for productized platform capabilities such as an interactive CLI, skill installer, health checker, dashboard, and GitHub Issues integration.

## What Is Included

- `skills/` - reusable operating procedures for AI agents.
- `templates/` - document templates for PRD, architecture, ADR, task, review, testing, implementation plans, OpenAPI contracts, migration plans, security reviews, release notes, and changelog drafts.
- `references/` - stable engineering principles and standards.
- `workflows/` - end-to-end development flows.
- `prompts/` - thin prompt wrappers that route agents to the right artifacts.
- `skill-router.md` and `commands/` - routing rules and portable command prompts for local AI workflows.
- `project-skeleton/` - a copy-ready AI-ready project structure.
- `starters/` - AI docs only starter shells for V2.x stack-oriented project setup.
- `cli/` - the `aios` helper CLI for skeleton and starter creation, adoption, document generation, numbering, and validation.
- `.github/` - manual issue and pull request templates plus lightweight CI, smoke test, and release dry-run workflows.
- `validation/` - validation reports and smoke-test evidence.
- `RELEASE.md` - GitHub release and npm publish procedure.

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
aios next demo-project
cd demo-project
```

`aios init` installs a local `.aios/` workflow kit by default, so the generated project is self-contained for Codex. Use `--lite` only when you want the old minimal skeleton behavior. Run `aios` without arguments for the interactive wizard.

Native agent skill install keeps `.aios/` compact and installs selected skills into agent-specific folders:

```bash
aios init demo-native --agents codex,qwen --skills core --skill-delivery native
aios agent-install demo-native --agents opencode,antigravity --skills testing
```

Use `--docs-root .aios/project-docs` when you want project docs under `.aios/` instead of the default `docs/`.
Use `--shape frontend|backend|mobile|library|docs` when a project should not create both `frontend/` and `backend/`.

Adopt an existing project without overwriting existing files:

```bash
cd existing-project
aios adopt
aios validate
```

Create planning and review documents:

```bash
aios feature "Habit reminders"
aios openapi "Habit API"
aios migration "Create habits table"
aios security "Habit API"
aios adr "Use server date for completion"
aios task "Implement habit API"
aios review "Habit API"
aios release "0.3.0"
```

Start from a lightweight V2.x starter:

```bash
aios starter fullstack-saas demo-saas
aios validate demo-saas
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
│       ├── context-map.md
│       └── development-start.md
├── .aios/
│   ├── config.json
│   ├── skill-router.md
│   ├── commands/
│   ├── skills/        # present in portable or both skill delivery mode
│   ├── prompts/
│   ├── references/
│   ├── templates/
│   └── workflows/
├── .agents/           # optional native Codex/generic skills
├── .qwen/             # optional native Qwen Code skills
├── .opencode/         # optional native OpenCode skills
├── .agent/            # optional native Antigravity skills
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

The package build creates bundled `assets/aios-kit/` from the root workflow assets (`skill-router.md`, `commands/`, `skills/`, `prompts/`, `references/`, `templates/`, and `workflows/`), then copies `project-skeleton/`, `templates/`, and `starters/` through `cli/scripts/sync-assets.mjs`. See `validation/npm-publish-readiness-report.md` for the latest publish-readiness evidence.

For the full release process, including versioning, npm publish, Git tags, GitHub Releases, and rollback notes, see `RELEASE.md`.

## Operating Principles

- Docs are the source of truth.
- Skills beat one-off prompts.
- Route context instead of dumping context.
- Keep tasks small enough to verify.
- Humans own architecture, security, dependency, and product decisions.
- Frontend and backend share the same product, architecture, ADR, task, review, and API context.
- Work is not done until acceptance criteria, tests, review, and summary are complete.

## Boundaries

The CLI only creates, copies, numbers, renders, recommends next steps, and validates files. It does not generate application code, run Codex, install app dependencies, apply database migrations, or publish releases.

The included starters are AI docs only shells. GitHub Actions are intentionally limited to tests, smoke checks, and npm package dry-runs.
