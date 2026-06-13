# Development Start

Use this guide after creating or adopting a project with AIOS.

Run `aios config` first when path locations, project shape, selected agents, workflow mode, or skill delivery mode are unclear. In generated projects, `docsRoot` may be `docs`, `.aios/project-docs`, or a custom path.

If `.aios/config.json` exists, use its `mode`:

- `full`: use `.aios/skill-router.md`, `.aios/prompts/`, `.aios/templates/`, `.aios/references/`, and `.aios/workflows/`.
- `lite`: use project docs, `AGENTS.md`, this context guide, and any root or agent-provided AIOS instructions available to you. Do not assume `.aios/` exists.

If `.aios/config.json` is missing, treat the project as lite mode and use `docs` as `docsRoot`.

## First Steps

1. Fill `<docsRoot>/product/vision.md` with the problem, target users, MVP scope, and success metrics.
2. In full mode, ask Codex to use `.aios/prompts/01-generate-prd.md` to generate `<docsRoot>/product/prd.md`. In lite mode, ask Codex to use `AGENTS.md`, the context map, and the PRD workflow manually.
3. Review the PRD yourself: scope, non-goals, acceptance criteria, open questions, and Mermaid product flow.
4. After the PRD is accepted, ask Codex to use `.aios/prompts/02-generate-architecture.md` in full mode, or the architecture workflow manually in lite mode, to generate `<docsRoot>/architecture/architecture.md`.
5. Review the architecture and create ADRs when technical decisions need a durable record.
6. After architecture and ADRs are accepted, create implementation tasks in `<docsRoot>/tasks/`.
7. Implement one task at a time.
8. Review, test, and prepare release notes before marking work done.

## Flow Checkpoints

- Vision done: generate PRD next.
- PRD done: user reviews and approves PRD, then generate architecture.
- Architecture done: user reviews technical direction, then create ADRs for important decisions.
- ADRs done: break work into small tasks.
- Task ready: implement one task, then test and review.

If native agent skills are installed, use the agent's skill system first. If portable mode is active in full mode, use `.aios/skill-router.md` to open the matching `.aios/skills/*/SKILL.md`. In lite mode, follow the same workflow sequence manually with the available project docs.

Generator workflows may ask clarification questions before writing PRD, architecture, ADR, task, API, migration, security, test, or release documents. Answering those questions is part of the normal AIOS flow and helps avoid generic artifacts.

## Useful Commands

```bash
aios next
aios config
aios prompt list
aios prompt show generate-prd
aios agent list
aios agent install . --agents codex --skills core
aios integration status
aios integration add rtk . --dry-run
aios integration add caveman . --mode lite
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
If full mode is active, read .aios/skill-router.md and use .aios/commands/generate-prd.md to generate <docsRoot>/product/prd.md.
If lite mode is active, follow the PRD workflow manually using the available project docs and do not assume .aios workflow files exist.
If integrations are enabled, use RTK only for noisy command output and Caveman-style brevity only for operational updates.
If the PRD inputs are incomplete, ask me focused clarification questions before writing the final file.
After generating the PRD, tell me exactly what I should review and what the next step is if I approve it.
```

## Lite Mode Prompts

Use these when `.aios/` is not installed:

```text
Read AGENTS.md, docs/context/context-map.md, and docs/product/vision.md.
Generate docs/product/prd.md using the AIOS PRD structure if available.
Include acceptance criteria, risks, open questions, a Mermaid product flow, a review checklist, and the next step after my approval.
```

```text
Read AGENTS.md, docs/context/context-map.md, docs/product/prd.md, and docs/architecture/architecture.md if it exists.
Create or update small implementation tasks in docs/tasks/.
End with the recommended first task, what I should review, and the next step before coding.
```
