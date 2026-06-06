# AI-Native Development OS

AI-Native Development OS is a reusable manual workflow foundation for building software with AI coding agents. It gives a solo fullstack developer a consistent way to turn ideas into product docs, architecture, ADRs, small implementation tasks, reviews, tests, and releases.

This repository is not an application framework, CLI, SaaS product, or prompt dump. It is a portable operating system for AI-assisted development.

## V1 Manual Flow

V1 is a complete manual foundation that works with Codex in an IDE and remains mostly tool-agnostic:

- reusable skills for common AI development work,
- document templates for product and engineering artifacts,
- stable engineering references,
- step-by-step workflows,
- thin prompt wrappers,
- a copy-ready frontend/backend project skeleton,
- extension points for future automation in V2.

Use V1 when you want full control and prefer to copy templates manually.

## V2 Assisted Flow

V2 adds light automation without turning the OS into an orchestration engine:

- `cli/` provides the `aios` CLI for skeleton copying, doc creation, numbering, and validation.
- `aios adopt` adds the AI Dev OS structure to existing projects without overwriting files.
- `templates/openapi.template.yaml` provides a starting API contract.
- `skills/api-contract-design` and `workflows/api-contract.workflow.md` help synchronize frontend and backend before implementation.
- `skills/backend-api-development` and `references/backend-api-standards.md` provide a generic backend API adapter without choosing a framework.

V2 still does not include stack-specific starter apps, GitHub automation, database migration workflow, release automation, or a dedicated security-review workflow.

## Quickstart

### V1 Manual

1. Copy `project-skeleton/` into a new project directory.
2. Open the new project with Codex or another coding agent.
3. Fill `docs/product/vision.md` with the product idea.
4. Use `prompts/01-generate-prd.md` and `skills/prd-generator/SKILL.md` to create `docs/product/prd.md`.
5. Generate architecture, ADRs, and task breakdowns before coding.
6. Implement one small task at a time.
7. Review, test, and summarize every change before marking it done.

### V2 Assisted

1. Install the CLI after it is published:

```bash
npm install -g ai-native-development-os-cli
```

2. Create and validate a project:

```bash
aios init demo-project
aios validate demo-project
cd demo-project
```

For an existing project:

```bash
cd existing-project
aios adopt
aios validate
```

3. Create docs from templates:

```bash
aios adr "Use server date for completion"
aios task "Implement habit API"
aios review "Habit API"
aios feature "Habit reminders"
```

## Repository Map

- `AGENTS.md` - root instructions for AI agents working in this OS repo.
- `skills/` - reusable agent operating procedures.
- `templates/` - reusable document formats.
- `references/` - stable engineering principles and standards.
- `workflows/` - end-to-end development flows.
- `prompts/` - thin command-style prompts that route agents to the right skills and templates.
- `project-skeleton/` - copy-ready generic fullstack project shell.
- `cli/` - V2 helper CLI for copying, rendering, numbering, and validation.
- `starters/`, `.github/` - future V2.x placeholders.
- `validation/` - manual V1 validation scenario and checklist.

## Operating Principles

- Docs are the source of truth.
- Skills beat one-off prompts.
- Route context instead of dumping context.
- Keep tasks small enough to verify.
- Humans own architecture, security, dependency, and product decisions.
- Frontend and backend share the same product, architecture, ADR, task, and API context.
- Work is not done until acceptance criteria, tests, review, and summary are complete.

## V2.x Boundary

Future V2.x work may add stack-specific starters, database migration workflow, security-review workflow, release automation, and GitHub integration after the CLI and API-contract workflow are validated in real use.
