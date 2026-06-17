# TASK-010: Add AIOS Update Accept Flow

## Status

Done

## Objective

Add an explicit accept flow for `aios update` so users can apply bundled AIOS asset changes after review without manually copying files.

## Background

`aios update` currently backfills missing assets safely and reports existing local `.aios/` files that differ from bundled upstream assets as review-needed. That preserves user modifications, but the next step is too manual: users must inspect diffs and copy accepted files themselves.

The update workflow should stay non-destructive by default while offering a deterministic, user-invoked path to accept bundled `.aios/` asset changes. It should also reduce noise from line-ending-only differences.

## Scope

### In Scope

- Add an explicit accept mode for `aios update`, such as `--accept`.
- Support accepting all review-needed bundled `.aios/` assets.
- Support accepting a specific kit section, such as `--accept workflows`.
- Preserve default `aios update` behavior as non-destructive.
- Keep `--dry-run` compatible with accept mode by reporting what would be overwritten.
- Distinguish content differences from line-ending-only differences in update output.
- Avoid reporting line-ending-only differences as manual review-needed items when possible.
- Add CLI tests for accept mode, dry-run accept mode, scoped accept, non-overwrite default behavior, and line-ending-only classification.

### Out of Scope

- Do not automatically merge Markdown edits.
- Do not update arbitrary project docs or application code.
- Do not accept or overwrite files outside the managed `.aios/` kit.
- Do not accept native agent skill overwrites in this task.
- Do not fetch remote changelog or package metadata.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: CLI help, task/plan docs if command syntax changes
- API contract: N/A
- Database: N/A
- CLI: `cli/src/index.ts`, `cli/src/core.ts`, CLI tests

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: N/A
- Related ADR: `docs/adr/ADR-001-docs-and-workflow-assets-as-source-of-truth.md`, `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`, `docs/adr/ADR-003-configurable-project-shapes-and-modes.md`
- Related architecture section: `docs/architecture/architecture.md#CLI Architecture`, `docs/architecture/architecture.md#Workflow Kit Strategy`
- Blocking tasks: `docs/tasks/TASK-009-add-aios-update-command.md`

## Acceptance Criteria

- [x] `aios update --accept [project-path]` applies bundled `.aios/` asset changes that were previously reported as review-needed.
- [x] `aios update --accept workflows [project-path]` or equivalent section-scoped syntax only applies review-needed workflow assets.
- [x] `aios update --dry-run --accept [project-path]` reports planned overwrites without writing files.
- [x] Default `aios update [project-path]` still does not overwrite existing differing files.
- [x] Accept mode only copies bundled AIOS kit entries into `.aios/` and does not modify project docs, app code, or native agent skill folders.
- [x] Line-ending-only differences are reported separately or ignored as review-needed noise.
- [x] Output clearly summarizes added, skipped existing, accepted, review-needed, line-ending-only/normalized items, and the next validation step.
- [x] Existing `update`, `repair`, `kit install`, `agent install`, `integration repair`, and `validate` behavior continues to pass.

## Testing Expectations

- Unit tests: classify missing, identical, content-different, and line-ending-only assets.
- Unit tests: accept helper copies only allowed `.aios/` kit files and respects section filters.
- Integration tests: `aios update --accept` overwrites a differing bundled `.aios/` asset.
- Integration tests: `aios update --dry-run --accept` does not write files.
- Integration tests: section-scoped accept only updates matching section assets.
- Regression tests: default `aios update` preserves locally edited files and reports review-needed content differences.
- Manual checks: run `aios update`, `aios update --dry-run --accept`, and section-scoped accept on a temp adopted project with edited `.aios/` assets.

## Implementation Notes

- Prefer a shared classification result for kit assets, with states such as `missing`, `identical`, `contentDifferent`, and `lineEndingOnly`.
- Reuse `AIOS_KIT_ENTRIES` and existing update traversal logic rather than adding a second asset walker.
- Keep accept behavior deterministic: copy bundled source asset to the local `.aios/` target; do not attempt a merge.
- Treat `--accept` without a section as "accept all review-needed `.aios/` kit assets".
- Consider accepting comma-separated sections if it stays simple; otherwise keep this task to one section argument.
- Document the command in help output with careful wording that accept mode overwrites only managed `.aios/` kit assets.

## Done Summary

- Files changed: `cli/src/core.ts`, `cli/src/index.ts`, `cli/test/commands.test.ts`
- Tests run: 77/77 pass (`npm test` from `cli/`)
- Acceptance criteria status: All 8 criteria met
- Risks: Users may run `--accept` without reviewing the review-needed list first; CLI help clearly warns that accept mode overwrites managed `.aios/` kit assets.
