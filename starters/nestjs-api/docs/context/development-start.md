# Development Start

Use this guide after creating or adopting a project with AIOS.

## First Steps

1. Fill `docs/product/vision.md` with the problem, target users, MVP scope, and success metrics.
2. Ask Codex to use `.aios/prompts/01-generate-prd.md` to generate `docs/product/prd.md`.
3. Ask Codex to use `.aios/prompts/02-generate-architecture.md` to generate `docs/architecture/architecture.md`.
4. Create ADRs when technical decisions need a durable record.
5. Create the first implementation task in `docs/tasks/`.
6. Implement one task at a time.
7. Review, test, and prepare release notes before marking work done.

Run `aios config` when path locations or skill delivery mode are unclear. If native agent skills are installed, use the agent's skill system first; otherwise use portable skills in `.aios/skills/`.

## Useful Commands

```bash
aios next
aios config
aios command-list
aios command generate-prd
aios agent-list
aios agent-install . --agents codex --skills core
aios feature "Feature name"
aios adr "Decision name"
aios task "Task name"
aios review "Review name"
aios openapi "API name"
aios migration "Migration name"
aios security "Review name"
aios release "Release name"
```

## First Codex Prompt

```text
Read AGENTS.md, docs/context/context-map.md, and docs/product/vision.md.
Then read .aios/skill-router.md and use .aios/commands/generate-prd.md to generate docs/product/prd.md.
```
