# Architecture: AI-Native Development OS

## Overview

AIOS is a file-based workflow system plus a small Node.js CLI. The repository contains reusable source assets at the root, a copy-ready project skeleton, AI docs only starters, validation evidence, website docs, and the CLI package. Generated or adopted projects can receive a local `.aios/` workflow kit and project docs under a configurable `docsRoot`.

The core architecture is intentionally not an application framework. It is a documentation and workflow layer that external AI agents can read and follow.

## Constraints

- Product constraints:
  - AIOS must remain useful across many project types.
  - The CLI must help with setup, generation, validation, and routing, not autonomous development.
  - Existing user instructions and files must be preserved during adopt.
- Technical constraints:
  - CLI is implemented in TypeScript/Node.js and published as `@donihadimas/aios`.
  - Filesystem operations must work on Windows and Unix-like environments.
  - Workflow assets are Markdown/YAML templates copied into projects.
- Operational constraints:
  - External integration install/uninstall must be explicit and platform-aware.
  - Package assets must be synced before pack/publish.
  - Tests should run from `cli/` and validate behavior against repository assets.

## Repository Architecture

```text
ai-native-development-os/
├── skills/              # reusable agent procedures
├── commands/            # portable command prompts
├── prompts/             # numbered workflow prompts
├── templates/           # document/template stubs
├── references/          # stable engineering guidance
├── workflows/           # end-to-end process docs
├── integrations/        # local RTK/Caveman rules
├── project-skeleton/    # default generated/adopted docs and agent files
├── starters/            # AI docs only starter shells
├── cli/                 # npm package source
├── docs/                # AIOS project docs for this repository
└── validation/          # validation reports and smoke-test evidence
```

## CLI Architecture

The CLI entrypoint is `cli/src/index.ts`; shared filesystem/config helpers live in `cli/src/core.ts`.

Primary responsibilities:

- Parse direct commands and interactive wizard choices.
- Normalize setup options into `.aios/config.json`.
- Copy skeletons, starters, and workflow kit assets.
- Create named docs from templates.
- Install or repair native agent skills.
- Manage optional integration rules.
- Validate required structure based on mode, docs root, skill delivery, and project shape.
- Recommend the next workflow step.

Package assets are copied into `cli/assets/` by `cli/scripts/sync-assets.mjs` before packaging.

## Project Shape Strategy

`projectShape` controls placeholder folders and validation:

- `fullstack`: `frontend/` and `backend/`
- `frontend`: `frontend/`
- `backend`: `backend/`
- `mobile`: `mobile/`
- `library`: `src/`
- `docs`: no app placeholder folders

`init` applies the selected shape after copying the skeleton. `adopt` preserves existing user folders but removes empty shape placeholders that were newly copied and are not required by the selected shape.

## Workflow Kit Strategy

Full mode installs a local `.aios/` kit:

```text
.aios/
├── config.json
├── skill-router.md
├── commands/
├── integrations/
├── prompts/
├── references/
├── templates/
└── workflows/
```

If skill delivery is `portable` or `both`, `.aios/skills/` is included. If skill delivery is `native`, skills are installed into native agent folders such as `.agents/skills/` for Codex/generic agents.

Lite mode writes `.aios/config.json` but skips the local workflow kit so projects can use their own prompt/skill system.

## Agent Instruction Strategy

`AGENTS.md` and `CLAUDE.md` contain an AIOS managed section bounded by:

```text
<!-- AIOS:BEGIN -->
<!-- AIOS:END -->
```

During adopt, existing user instructions are preserved below the managed section. The managed section can be refreshed safely without discarding project-specific instructions.

## Integration Strategy

RTK and Caveman are optional. AIOS stores integration intent in `.aios/config.json` and writes local rules under `.aios/integrations/`.

- RTK is for compacting noisy terminal output before it enters AI context.
- Caveman is for concise operational updates and debug loops.
- Formal artifacts such as PRDs, ADRs, architecture docs, migration plans, security reviews, and release notes must remain complete.
- Windows external auto-install is intentionally conservative; manual guidance is preferred when installer execution is not safe or supported.

## Testing Strategy

CLI tests use Node's built-in test runner and temporary directories. Coverage focuses on behavior:

- init/starter/adopt
- configurable project shapes and docs root
- full/lite mode validation
- native skill install and repair
- prompt list/show
- document generators
- integration rules and dry-runs
- next-step recommendations
- package path resolution and Windows-safe file URL handling

## Deployment and Release Strategy

The CLI package is built from TypeScript and packaged with synced assets:

```bash
cd cli
npm test
npm pack --dry-run
npm pack
```

Publishing remains manual. GitHub automation should stay focused on validation and dry-runs unless a future ADR explicitly approves guarded publishing.

## Observability Strategy

The CLI reports human-readable command output rather than telemetry. Validation output lists missing required files and optional V2.x warnings. Integration commands report rules status, external detection, installer guidance, and post-update state.

## Key Decisions

- [ADR-001](../adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md): Use docs and workflow assets as the source of truth.
- [ADR-002](../adr/ADR-002-cli-as-helper-not-orchestrator.md): Keep the CLI as a helper, not an autonomous orchestrator.
- [ADR-003](../adr/ADR-003-configurable-project-shapes-and-modes.md): Support configurable project shapes and full/lite modes.

## Risks

- Native agent folder formats may change and require adapter updates.
- Interactive wizard choices can still be misunderstood without clear descriptions.
- As workflow assets grow, validation must keep distinguishing required core files from optional V2.x artifacts.
- Existing adopted repositories may contain stale placeholders from older AIOS behavior.

## Review Checklist

- [ ] Architecture supports the accepted PRD scope.
- [ ] Major boundaries and responsibilities are clear.
- [ ] Security, testing, deployment, and data concerns are covered enough for the next tasks.
- [ ] ADR candidates are listed for important decisions.

## Next Step

Use the ADRs above as baseline decisions. Future CLI or workflow changes should update this architecture when they affect mode resolution, project shape behavior, skill delivery, integrations, validation, or package publishing.
