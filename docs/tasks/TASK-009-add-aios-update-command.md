# TASK-009: Add AIOS Update Command

## Status

Planned

## Objective

Add an `aios update [project-path]` command that helps existing adopted projects receive newly added AIOS workflow assets, skills, prompts, templates, workflows, and safe config defaults without overwriting user-modified files.

## Background

Projects that already adopted AIOS can currently use `aios kit install` to backfill missing `.aios/` files and `aios agent install` to install selected native skills. That works for some cases, but it is not obvious as an update workflow and does not give users a single summary of what is new, already present, locally changed, or recommended for manual review.

Recent additions such as the `task-implementation` skill show the need for a clear upgrade path from one AIOS version to the next.

## Scope

### In Scope

- Add `aios update [project-path]`.
- Add `--dry-run` so users can preview update actions.
- Read `.aios/config.json` to resolve mode, docs root, selected agents, selected skills, skill delivery, and integrations.
- In full mode, add newly bundled `.aios/` kit files that are missing locally.
- Add newly bundled default/core skills to `.aios/config.json` when safe.
- Install newly selected native skills when skill delivery is `native` or `both`.
- Report files that exist locally and differ from bundled upstream assets as skipped or requiring review.
- Preserve existing user-modified files by default.
- Recommend follow-up validation, such as `aios validate`.
- Add CLI tests for dry-run, missing asset backfill, config skill update, and non-overwrite behavior.

### Out of Scope

- Do not force overwrite local `.aios/` files.
- Do not merge local edits into changed upstream Markdown assets automatically.
- Do not update arbitrary app code or project docs content.
- Do not install external RTK or Caveman tools.
- Do not publish or fetch remote changelog data; use bundled package assets only.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: CLI docs, website CLI reference
- API contract: N/A
- Database: N/A
- CLI: `cli/src/index.ts`, `cli/src/core.ts`, CLI tests, bundled assets

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: N/A
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`, `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`, `docs/adr/ADR-003-configurable-project-shapes-and-modes.md`
- Related architecture section: `docs/architecture/architecture.md#CLI Architecture`, `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: None

## Acceptance Criteria

- [ ] `aios update [project-path]` is available in CLI help.
- [ ] `aios update --dry-run [project-path]` reports planned additions without writing files.
- [ ] Full-mode projects receive missing bundled `.aios/` files without overwriting existing local files.
- [ ] Lite-mode projects do not receive the full `.aios/` kit unless their config is changed out of lite mode.
- [ ] The command updates `.aios/config.json` with safe newly bundled default/core skills when they are missing from `selectedSkills`.
- [ ] Native skill delivery installs missing selected native skills according to `selectedAgents`, `selectedSkills`, and `agentScope`.
- [ ] Existing local files that differ from bundled assets are reported as skipped or needing review.
- [ ] The output summarizes added, skipped existing, config updates, native skill updates, review-needed items, and the next validation step.
- [ ] Existing `kit install`, `agent install`, `integration repair`, and `validate` behavior continues to pass.

## Testing Expectations

- Unit tests: update helper classifies missing, existing-identical, and existing-different assets.
- Unit tests: config update helper adds newly bundled core/default skills without removing user-selected skills.
- Integration tests: command dry-run does not write files.
- Integration tests: command backfills a missing bundled skill or prompt in a temp full-mode project.
- Integration tests: command preserves a locally edited file and reports it as review-needed.
- Regression tests: existing CLI command tests still pass.
- Manual checks: run `aios update --dry-run` and `aios update` on an older adopted project if available.

## Implementation Notes

- Reuse `installAiosKit`, `installAgentSkills`, `availableSkills`, `expandSkillSelection`, and `writeProjectConfig` where possible.
- Consider adding a shared update result type with `planned`, `created`, `skipped`, `configUpdated`, `nativeCreated`, and `reviewNeeded`.
- Keep comparison simple and deterministic: missing files can be copied; existing files should not be overwritten.
- If bundled defaults add a new core skill, append it to `selectedSkills` only when the project already uses a default/core-like skill set or when the skill is required for current AIOS workflow commands.
- Keep output human-readable and concise.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
