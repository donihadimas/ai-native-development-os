---
title: Command Guide
description: Choose the right aios command for your situation without reading the full CLI reference.
---

This guide helps you pick the right `aios` command based on what you want to do. For full syntax and options, see the [CLI Reference](/reference/cli).

## Start a New Project

| What You Want | Command |
| --- | --- |
| Guided setup wizard | `aios` |
| Create a project from scratch | `aios init <project-name>` |
| Create from a starter template | `aios starter <starter-name> <project-name>` |

```bash
aios init demo-project
aios starter fullstack-saas demo-saas
```

## Add AIOS to an Existing Project

| What You Want | Command |
| --- | --- |
| Add AIOS structure without overwriting | `aios adopt` |

```bash
aios adopt
aios adopt ./my-existing-project
```

`aios adopt` never overwrites existing files. It adds missing structure and installs the local `.aios/` workflow kit.

## Validate Your Setup

| What You Want | Command |
| --- | --- |
| Check if project has expected structure | `aios validate` |
| See what to do next | `aios next` |
| Print resolved config | `aios config` |

```bash
aios validate
aios next
```

`aios next` is read-only. It prints a recommendation without changing any files.

## Create Planning and Review Documents

All `aios create` commands generate document stubs from templates. They do not write application code.

| What You Want | Command |
| --- | --- |
| Feature PRD | `aios create feature <name>` |
| Architecture decision | `aios create adr <name>` |
| Implementation task | `aios create task <name>` |
| Code review report | `aios create review <name>` |
| UI/UX design doc | `aios create design <name>` |
| API contract | `aios create openapi <name>` |
| Database migration plan | `aios create migration <name>` |
| Security review report | `aios create security <name>` |
| Release notes | `aios create release <name>` |

```bash
aios create feature "Habit reminders"
aios create task "Implement login API"
aios create adr "Use server date for completion"
```

## Install or Inspect Skills

| What You Want | Command |
| --- | --- |
| Install or repair `.aios/` kit | `aios kit install` |
| List native agent targets | `aios agent list` |
| Install skills to native agent folders | `aios agent install` |
| List available prompts | `aios prompt list` |
| Show a specific prompt | `aios prompt show <name>` |

```bash
aios kit install
aios agent list
aios prompt list
aios prompt show discover-product
```

### Native vs Portable Skills

AIOS has two ways to deliver skills to your agent:

- **Portable**: Skills live in `.aios/skills/`. The project is self-contained. Any agent can read them.
- **Native**: Skills are copied into agent-specific folders like `.agents/skills/`, `.qwen/skills/`, or `.opencode/skills/`. The agent discovers them automatically.

Use `--skill-delivery portable|native|both` when running `aios init`, `aios adopt`, or `aios starter`.

## Manage Integrations

Integration commands are optional. They manage local rules for external tools like RTK (concise output) and Caveman (terse status updates).

| What You Want | Command |
| --- | --- |
| List available integrations | `aios integration list` |
| Check current status | `aios integration status` |
| Enable an integration | `aios integration add <name>` |
| Remove an integration | `aios integration remove <name>` |
| Diagnose issues | `aios integration doctor` |
| Repair missing rules | `aios integration repair` |

```bash
aios integration list
aios integration add rtk
aios integration doctor
```

Enabling an integration adds local rules to your project. External tool installation only runs with explicit confirmation.

## Command Safety Summary

| Command | What It Does | Risk |
| --- | --- | --- |
| `aios` | Opens setup wizard | Safe |
| `aios init` | Creates new project directory | Safe (fails if directory exists) |
| `aios adopt` | Adds structure to existing project | Safe (never overwrites) |
| `aios validate` | Checks structure | Read-only |
| `aios next` | Recommends next step | Read-only |
| `aios create ...` | Generates document stubs | Safe (creates new files only) |
| `aios kit install` | Installs or repairs `.aios/` | Safe (repairs missing files, skips existing) |
| `aios agent install` | Copies skills to agent folders | Safe (skips existing skill files) |
| `aios integration add` | Enables integration rules | Adds local rules, optional external install |

## Related Pages

- [CLI Reference](/reference/cli) - Full command syntax and options
- [Building Blocks](/guides/building-blocks) - What each AIOS artifact type does
- [Getting Started](/getting-started) - First steps with AIOS
