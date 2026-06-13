---
title: Project Structure
description: The generated folder structure of an AI-Native Development OS workspace.
---

A full project created with `aios init` or updated with `aios adopt` is organized around two ideas:

- `docs/` stores product and project context.
- `.aios/` stores reusable workflow assets for agents.

## Full Setup

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
│   ├── design/
│   │   └── design.md
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
│   ├── integrations/
│   ├── skills/
│   ├── prompts/
│   ├── references/
│   ├── templates/
│   └── workflows/
├── .agents/
├── .qwen/
├── .opencode/
├── .agent/
├── frontend/
└── backend/
```

## The `.aios` Directory

This is the local workflow kit. It tells agents **how** to work.

| Path | Purpose |
| --- | --- |
| `.aios/config.json` | Project-level AIOS config, such as docs root and enabled integrations. |
| `.aios/skill-router.md` | Routing rules for which skill to use for which task. |
| `.aios/commands/` | Portable command prompts for common actions. |
| `.aios/integrations/` | Optional RTK/Caveman rules. |
| `.aios/skills/` | Portable skill files when skill delivery is portable or both. |
| `.aios/prompts/` | Thin prompts that route the agent to docs, skills, and templates. |
| `.aios/references/` | Stable engineering principles and standards. |
| `.aios/templates/` | Document templates for product, design, architecture, tasks, reviews, and releases. |
| `.aios/workflows/` | Multi-step development workflows. |

## The `docs` Directory

This is the project context. It tells agents **what** to build.

| Path | Purpose |
| --- | --- |
| `docs/product/vision.md` | The raw product idea and high-level goal. |
| `docs/product/prd.md` | Structured requirements, scope, non-goals, users, and acceptance criteria. |
| `docs/product/features/` | Feature-level requirements. |
| `docs/design/` | UI/UX design notes for user flows, screens, states, accessibility, and data dependencies. |
| `docs/architecture/` | Architecture overview and component decisions. |
| `docs/adr/` | Architecture Decision Records. |
| `docs/tasks/` | Small implementation tasks for agents to execute one at a time. |
| `docs/reviews/` | Review reports and validation evidence. |
| `docs/api/` | API contracts and endpoint design notes. |
| `docs/context/` | Context map and development starting points. |

## Native Agent Folders

These folders are optional and appear when native skill delivery is selected:

| Path | Agent Target |
| --- | --- |
| `.agents/` | Codex or generic agent skill folders. |
| `.qwen/` | Qwen Code skills. |
| `.opencode/` | OpenCode skills. |
| `.agent/` | Antigravity skills. |

## Lite Setup

Lite setup creates the base documentation structure without the full `.aios/` workflow kit. It still writes `.aios/config.json` with `mode: "lite"` so agents can resolve docs root and project shape. Use it only when a project already has its own workflow assets and you only need AI-ready docs.

```bash
aios init demo-docs --lite
```

Full setup is the recommended default.
