# V2.x Validation Report

## Summary

V2.x has been implemented as lightweight workflow extensions on top of the existing V2 CLI. Generated projects now include a local `.aios/` workflow kit by default, making them self-contained for AI-native development. The implementation preserves the product boundary: no app code generation, no dependency installation, no database migration execution, and no automatic publishing.

V3-lite setup improvements are also validated: interactive setup entrypoints, configurable docs location, and native agent skill installation while keeping `.aios/` compact when native skills are selected.

## Acceptance Criteria Status

| Requirement | Status | Evidence |
| --- | --- | --- |
| Ready-to-use local kit | Pass | Root workflow assets are copied into generated projects as `.aios/`. |
| Skill router | Pass | `skill-router.md` is installed as `.aios/skill-router.md` for intent-to-skill routing. |
| Command palette | Pass | `commands/` is installed as `.aios/commands/`, and `aios command-list` / `aios command` expose portable prompts. |
| Configurable docs root | Pass | `.aios/config.json` stores docs root and commands write to the configured location. |
| Configurable project shape | Pass | `--shape` supports fullstack, frontend, backend, mobile, library, and docs-only layouts. |
| Native agent skills | Pass | `aios agent-install` installs selected skills into Codex/generic, Qwen, OpenCode, and Antigravity repo folders. |
| Compact native setup | Pass | Native skill delivery skips `.aios/skills` and relies on agent-native skill folders. |
| Default full setup | Pass | `aios init`, `starter`, and `adopt` install `.aios/` by default. |
| Lite mode | Pass | `--lite` skips `.aios/` for `init`, `starter`, `adopt`, and `validate`. |
| Install kit command | Pass | `aios install-kit` installs or repairs `.aios/` without overwriting existing files. |
| Next step command | Pass | `aios next` reports the next recommended step without changing files. |
| AI docs only starters | Pass | Seven starter shells exist under `starters/` with AI-ready docs and stack placeholders. |
| CLI starter command | Pass | `aios starter <starter-name> <project-name>` copies starters and refuses non-empty targets. |
| Database migration workflow | Pass | Skill, workflow, template, prompt, and `aios migration` command exist. |
| Security review workflow | Pass | Skill, workflow, template, prompt, and `aios security` command exist. |
| Release preparation | Pass | Release-management skill, release/changelog templates, release workflow updates, and `aios release` command exist. |
| OpenAPI generation | Pass | `aios openapi` creates `docs/api/<slug>.openapi.yaml`. |
| Validation | Pass | `aios validate` requires base structure and `.aios/` by default, while V2.x document folders remain warnings. |
| GitHub Actions | Pass | CI, manual smoke test, and release dry-run workflows exist. |

## Automated Test Evidence

Command run from `cli/`:

```bash
npm test
```

Result:

- 34 tests passed.
- 0 tests failed.

## Manual Smoke Coverage

Covered by CLI tests and manual workflow definition:

- `aios starter flutter-mobile demo-mobile`
- `aios starter fullstack-saas demo-saas`
- `aios init demo-project`
- `aios init demo-project --lite`
- `aios install-kit`
- `aios next`
- `aios command-list`
- `aios command generate-prd`
- `aios agent-list`
- `aios agent-install --agents codex,qwen --skills core`
- `aios init --docs-root .aios/project-docs`
- `aios init --shape frontend`
- `aios openapi "Habit API"`
- `aios migration "Create habits table"`
- `aios security "Habit API"`
- `aios release "0.3.0"`
- `aios validate`

## Result

V2.x is ready for real-project validation.
