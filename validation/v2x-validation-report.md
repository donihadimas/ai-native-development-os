# V2.x Validation Report

## Summary

V2.x has been implemented as lightweight workflow extensions on top of the existing V2 CLI. Generated projects now include a local `.aios/` workflow kit by default, making them self-contained for AI-native development. The implementation preserves the product boundary: no app code generation, no dependency installation, no database migration execution, and no automatic publishing.

V3-lite setup improvements are also validated: interactive setup entrypoints, configurable docs location, and native agent skill installation while keeping `.aios/` compact when native skills are selected.

Instruction-layer cleanup has also been validated: generated `AGENTS.md`, command prompts, workflow prompts, context maps, starter guides, references, and workflows now resolve `.aios/config.json` before choosing document paths or skill access mode. Generator skills now include Clarification Gates so agents ask focused questions before writing final artifacts when input is too vague.

## Acceptance Criteria Status

| Requirement | Status | Evidence |
| --- | --- | --- |
| Ready-to-use local kit | Pass | Root workflow assets are copied into generated projects as `.aios/`. |
| Skill router | Pass | `skill-router.md` is installed as `.aios/skill-router.md` for intent-to-skill routing. |
| Command palette | Pass | `commands/` is installed as `.aios/commands/`, and `aios prompt list` / `aios prompt show` expose portable prompts. |
| Configurable docs root | Pass | `.aios/config.json` stores docs root and commands write to the configured location. |
| Configurable project shape | Pass | `--shape` supports fullstack, frontend, backend, mobile, library, and docs-only layouts. |
| Native agent skills | Pass | `aios agent install` installs selected skills into Codex/generic, Qwen, OpenCode, and Antigravity repo folders. |
| Compact native setup | Pass | Native skill delivery skips `.aios/skills` and relies on agent-native skill folders. |
| Default full setup | Pass | `aios init`, `starter`, and `adopt` install `.aios/` by default. |
| Lite mode | Pass | `--lite` skips `.aios/` for `init`, `starter`, `adopt`, and `validate`. |
| Install kit command | Pass | `aios kit install` installs or repairs `.aios/` without overwriting existing files. |
| Next step command | Pass | `aios next` reports the next recommended step without changing files. |
| AI docs only starters | Pass | Seven starter shells exist under `starters/` with AI-ready docs and stack placeholders. |
| CLI starter command | Pass | `aios starter <starter-name> <project-name>` copies starters and refuses non-empty targets. |
| Database migration workflow | Pass | Skill, workflow, template, prompt, and `aios create migration` command exist. |
| Security review workflow | Pass | Skill, workflow, template, prompt, and `aios create security` command exist. |
| Release preparation | Pass | Release-management skill, release/changelog templates, release workflow updates, and `aios create release` command exist. |
| OpenAPI generation | Pass | `aios create openapi` creates `docs/api/<slug>.openapi.yaml`. |
| Validation | Pass | `aios validate` requires base structure and `.aios/` by default, while V2.x document folders remain warnings. |
| GitHub Actions | Pass | CI, manual smoke test, and release dry-run workflows exist. |
| Config-aware generated instructions | Pass | AGENTS, skill router, commands, prompts, context maps, references, and workflows use `docsRoot`, `projectShape`, and skill delivery mode. |
| Clarification Gates | Pass | Generator skills, prompts, commands, and onboarding docs instruct agents to ask focused questions before generating final files from vague input. |

## Automated Test Evidence

Command run from `cli/`:

```bash
npm test
npm pack --dry-run
```

Result:

- 35 tests passed.
- 0 tests failed.
- Package dry-run succeeded and included `assets/aios-kit/`, `assets/project-skeleton/`, `assets/starters/`, and `assets/templates/`.
- `git diff --check` passed with no whitespace errors.

## Manual Smoke Coverage

Covered by CLI tests and manual workflow definition:

- `aios starter flutter-mobile demo-mobile`
- `aios starter fullstack-saas demo-saas`
- `aios init demo-project`
- `aios init demo-project --lite`
- `aios kit install`
- `aios next`
- `aios prompt list`
- `aios prompt show generate-prd`
- `aios agent list`
- `aios agent install --agents codex,qwen --skills core`
- `aios init --docs-root .aios/project-docs`
- `aios init --shape frontend`
- `aios create openapi "Habit API"`
- `aios create migration "Create habits table"`
- `aios create security "Habit API"`
- `aios create release "0.3.0"`
- `aios validate`
- generated `.aios/commands/*` route through `.aios/skill-router.md`
- generated context maps use the configured `docsRoot`
- generator prompts apply Clarification Gates before final PRD, architecture, ADR, task, API, migration, security, test, and release documents

## Result

V2.x is ready for real-project validation.
