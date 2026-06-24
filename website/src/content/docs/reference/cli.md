---
title: CLI Commands
description: Reference for the aios helper CLI.
---

The `aios` CLI is only for setup, validation, and generating AIOS template files. It prepares AI-ready files and workflow artifacts. It does not generate application code or run the coding agent; use Codex or another AI agent directly for AI-native development.

Run help at any time:

```bash
aios --help
```

## Project Setup

- `aios`
  Opens the guided setup wizard.
- `aios init <project-name> [--lite] [--shape <shape>] [--docs-root <path>] [--agents <list>] [--skills <set>] [--skill-delivery <mode>] [--yes]`
  Copies the bundled AI-ready project skeleton into a new directory and installs the local workflow kit.
- `aios adopt [project-path] [--lite] [--shape <shape>] [--docs-root <path>] [--agents <list>] [--skills <set>] [--skill-delivery <mode>] [--yes]`
  Adds the AI Dev OS structure and local `.aios/` workflow kit to an existing project without overwriting files.
- `aios starter <starter-name> <project-name> [--lite] [--shape <shape>] [--docs-root <path>] [--agents <list>] [--skills <set>] [--skill-delivery <mode>] [--yes]`
  Copies a bundled AI docs only starter into a new directory.

Project shapes:

- `fullstack`
- `frontend`
- `backend`
- `mobile`
- `library`
- `docs`

## Validation & Info

- `aios validate [project-path] [--lite]`
  Checks whether a project has the expected AI-ready structure.
- `aios next [project-path]`
  Prints the next recommended development step without changing files.
- `aios config [project-path]`
  Prints the resolved AIOS project config.
- `aios -v` or `aios --version`
  Shows the installed AIOS CLI version.
- `aios --help`
  Shows the full command help.

## Toolkit Management

- `aios kit install [project-path]`
  Installs or repairs the local `.aios/` workflow kit.
- `aios agent list`
  Lists supported native agent targets and available AIOS skills.
- `aios agent install [project-path] [--agents <list>] [--skills <set>] [--scope repo|user] [--dry-run]`
  Installs selected AIOS skills into native agent skill folders.
- `aios prompt list [project-path]`
  Lists available local AIOS command prompts.
- `aios prompt show <name> [project-path]`
  Prints a local AIOS command prompt, such as `discover-product` or `generate-prd`.

## Integrations

- `aios integration list`
  Lists optional external integrations supported by AIOS.
- `aios integration status [project-path]`
  Shows project config, local rules, and detected external tool status.
- `aios integration add <rtk|caveman|ponytail|all> [project-path] [--install] [--mode lite|full|ultra] [--agents <list>] [--dry-run] [--yes]`
  Enables optional integration rules. External install only runs with explicit confirmation.
- `aios integration remove <rtk|caveman|ponytail|all> [project-path] [--scope project|user|both] [--dry-run] [--yes]`
  Removes local rules or offers external uninstall.
- `aios integration doctor [project-path]`
  Checks integration config, local rules, external detection, and recommended fixes.
- `aios integration repair [project-path]`
  Repairs missing local integration rules for enabled integrations.

## Document Generators

- `aios create feature <name>`: Creates a feature PRD stub from the PRD template.
- `aios create adr <name>`: Creates the next numbered ADR.
- `aios create task <name>`: Creates the next numbered implementation task.
- `aios create review <name>`: Creates a review report stub.
- `aios create design <name>`: Creates a UI/UX design document stub.
- `aios create openapi <name>`: Creates an OpenAPI contract stub.
- `aios create migration <name>`: Creates the next numbered database migration plan.
- `aios create security <name>`: Creates a security review report stub.
- `aios create release <name>`: Creates a release note and changelog draft.

## Common Options

- `--lite`
  Creates or validates base project docs without the local `.aios` workflow kit. Lite still writes `.aios/config.json` with `mode: "lite"` for routing.
- `--docs-root <path>`
  Puts generated docs somewhere other than `docs/`.
- `--agents codex,qwen,opencode,antigravity,generic`
  Selects native skill targets.
- `--skills core|planning|delivery|all|name,name`
  Selects which skills to install.
- `--skill-delivery portable|native|both`
  Chooses where skills live.
- `--yes`
  Confirms actions once the command has enough information.
