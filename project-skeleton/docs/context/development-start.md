# Development Start

Use this guide after creating or adopting a project with AIOS.

Run `aios config` first when path locations, project shape, selected agents, workflow mode, or skill delivery mode are unclear. In generated projects, `docsRoot` may be `docs`, `.aios/project-docs`, or a custom path.

If `.aios/config.json` exists, use its `mode`:

- `full`: read `.aios/skill-router.md`, then open only the specific prompt, template, reference, and workflow files selected for the current lifecycle step. Do not preload whole `.aios/` folders.
- `lite`: use project docs, `AGENTS.md`, this context guide, and any root or agent-provided AIOS instructions available to you. Do not assume `.aios/` exists.

If `.aios/config.json` is missing, treat the project as lite mode and use `docs` as `docsRoot`.

## First Steps

1. Start with product discovery. In full mode, ask Codex to route through `.aios/skill-router.md` and use only the selected product discovery prompt to interview you and fill `<docsRoot>/product/vision.md`. In lite mode, ask Codex to use `AGENTS.md`, this context guide, and the product discovery workflow manually.
2. Review the vision yourself: problem, target users, MVP scope, non-goals, success metrics, assumptions, constraints, and open questions.
3. In full mode, ask Codex to route through `.aios/skill-router.md` and use only the selected PRD prompt, references, and template to generate `<docsRoot>/product/prd.md`. In lite mode, ask Codex to use `AGENTS.md`, the context map, and the PRD workflow manually.
4. Review the PRD yourself: scope, non-goals, acceptance criteria, open questions, and Mermaid product flow.
5. After the PRD is accepted, ask Codex to route through `.aios/skill-router.md` and use only the selected architecture prompt, references, and template in full mode, or the architecture workflow manually in lite mode, to generate `<docsRoot>/architecture/architecture.md`.
6. For user-facing UI, ask Codex to route through `.aios/skill-router.md` and use only the selected UI/UX prompt, references, and template in full mode, or the UI/UX design workflow manually in lite mode, to generate `<docsRoot>/design/design.md`.
7. Review the architecture and design, then create ADRs when technical decisions need a durable record.
8. After architecture, design, and ADRs are accepted, create implementation tasks in `<docsRoot>/tasks/`.
9. Implement one task at a time.
10. Review, test, and prepare release notes before marking work done.

## Flow Checkpoints

- Raw idea: interview user with product discovery, then fill vision.
- Vision done: user reviews vision, then generate PRD next.
- PRD done: user reviews and approves PRD, then generate architecture.
- Architecture done: user reviews technical direction, then create UI/UX design for user-facing work.
- Design done: user reviews screens, states, accessibility, and data dependencies.
- ADRs done: create design/API/migration plans when needed, then break work into small tasks.
- Task ready: implement one task, then test and review.

In full mode, read `.aios/skill-router.md` before choosing a workflow or skill. If `skillDelivery` is `native`, use the matching native agent skill and report a missing required skill instead of bypassing AIOS. If `skillDelivery` is `portable`, open only the matching `.aios/skills/<skill-name>/SKILL.md`. If `skillDelivery` is `both`, prefer the native skill and use the matching portable skill only as fallback. In lite mode, follow the same workflow sequence manually with the available project docs.

Generator workflows may ask clarification questions before writing PRD, design, architecture, ADR, task, API, migration, security, test, or release documents. Answering those questions is part of the normal AIOS flow and helps avoid generic artifacts.

## Useful Commands

```bash
aios next
aios config
aios prompt list
aios prompt show discover-product
aios prompt show generate-prd
aios agent list
aios agent install . --agents codex --skills core
aios integration status
aios integration add rtk . --dry-run
aios integration add caveman . --mode lite
aios create feature "Feature name"
aios create design "Feature name"
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
If the vision is still placeholder or thin, use .aios/commands/discover-product.md to interview me and fill <docsRoot>/product/vision.md.
If the vision is accepted and full mode is active, read .aios/skill-router.md, select only the current PRD workflow assets, and use .aios/commands/generate-prd.md to generate <docsRoot>/product/prd.md.
If lite mode is active, follow the product discovery or PRD workflow manually using the available project docs and do not assume .aios workflow files exist.
If integrations are enabled, use RTK only for noisy command output and Caveman-style brevity only for operational updates.
If the PRD inputs are incomplete, ask me focused clarification questions before writing the final file.
After generating the PRD, tell me exactly what I should review and what the next step is if I approve it.
```

## Lite Mode Prompts

Use these when `.aios/` is not installed:

```text
Read AGENTS.md, docs/context/context-map.md, and docs/product/vision.md.
If docs/product/vision.md is still thin, interview me with product discovery questions and fill it first.
Generate docs/product/prd.md using the AIOS PRD structure if available.
Include acceptance criteria, risks, open questions, a Mermaid product flow, a review checklist, and the next step after my approval.
```

```text
Read AGENTS.md, docs/context/context-map.md, docs/product/prd.md, and docs/architecture/architecture.md if it exists.
Create or update small implementation tasks in docs/tasks/.
End with the recommended first task, what I should review, and the next step before coding.
```
