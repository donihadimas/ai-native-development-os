# TASK-004: Add Release Readiness Checklist

## Objective

Add a release readiness checklist for maintainers preparing the AIOS CLI package for npm publishing.

## Background

The CLI has build, test, sync-assets, and pack flows, but release preparation is spread across README sections and manual memory. A dedicated checklist will reduce publishing mistakes, especially after asset or workflow changes.

## Scope

### In Scope

- Add a release readiness checklist document under `validation/` or `docs/releases/`.
- Cover tests, build, asset sync, pack dry-run, tarball inspection, versioning, changelog, npm authentication, and post-pack cleanup.
- Link the checklist from CLI docs or root README if appropriate.

### Out of Scope

- Do not implement automatic publishing.
- Do not add a new CLI command unless separately approved.
- Do not change GitHub Actions release behavior.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: release/checklist docs
- API contract: N/A
- Database: N/A
- CLI: docs only unless link updates are needed

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: N/A
- Related ADR: `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`
- Related architecture section: `docs/architecture/architecture.md#Deployment and Release Strategy`
- Blocking tasks: None

## Acceptance Criteria

- [x] A release readiness checklist exists and is easy to find.
- [x] Checklist includes `npm test`, `npm run build`, `npm pack --dry-run`, and tarball inspection.
- [x] Checklist reminds maintainers to verify synced assets include new workflow files.
- [x] Checklist keeps publishing manual.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: `git diff --check`
- Manual checks: follow checklist headings against current package scripts.

## Implementation Notes

- Prefer `validation/npm-publish-readiness-checklist.md` or similar.
- Keep the checklist operational, not philosophical.

## Done Summary

- Files changed: `validation/npm-publish-readiness-checklist.md` (new), `README.md`, `cli/README.md`, `docs/tasks/TASK-004-add-release-readiness-checklist.md`
- Tests run: `git diff --check` (no whitespace errors)
- Acceptance criteria status: All 4 criteria met
- Risks: Checklist may drift from package scripts over time; review during future releases.
