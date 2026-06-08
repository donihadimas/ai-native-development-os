# Development Start

Use this guide after creating or adopting a project with AIOS.

Run `aios config` first when path locations, project shape, selected agents, or skill delivery mode are unclear. In generated projects, `docsRoot` may be `docs`, `.aios/project-docs`, or a custom path.

## First Steps

1. Fill `<docsRoot>/product/vision.md` with the problem, target users, MVP scope, and success metrics.
2. Ask Codex to use `.aios/prompts/01-generate-prd.md` to generate `<docsRoot>/product/prd.md`.
3. Ask Codex to use `.aios/prompts/02-generate-architecture.md` to generate `<docsRoot>/architecture/architecture.md`.
4. Create ADRs when technical decisions need a durable record.
5. Create the first implementation task in `<docsRoot>/tasks/`.
6. Implement one task at a time.
7. Review, test, and prepare release notes before marking work done.

If native agent skills are installed, use the agent's skill system first. If portable mode is active, use `.aios/skill-router.md` to open the matching `.aios/skills/*/SKILL.md`.

Generator workflows may ask clarification questions before writing PRD, architecture, ADR, task, API, migration, security, test, or release documents. Answering those questions is part of the normal AIOS flow and helps avoid generic artifacts.

## Useful Commands

```bash
aios next
aios config
aios prompt list
aios prompt show generate-prd
aios agent list
aios agent install . --agents codex --skills core
aios create feature "Feature name"
aios create adr "Decision name"
aios create task "Task name"
aios create review "Review name"
aios create openapi "API name"
aios create migration "Migration name"
aios create security "Review name"
aios create release "Release name"
```

## First Codex Prompt

```text
Read AGENTS.md and .aios/config.json.
Resolve docsRoot, then read <docsRoot>/context/context-map.md and <docsRoot>/product/vision.md.
Then read .aios/skill-router.md and use .aios/commands/generate-prd.md to generate <docsRoot>/product/prd.md.
If the PRD inputs are incomplete, ask me focused clarification questions before writing the final file.
```
