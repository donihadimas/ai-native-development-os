---
name: TASK-054-enhance-integration-installer-guidance-and-fix-graphify-extract
status: Done
depends_on: ["TASK-052"]
---

# TASK-054: Enhance Integration Installer Guidance and Fix Graphify Extract

## Goal

Improve user experience when adding integrations by providing clear auto-install and manual install guides when external tools are not detected, and fix Graphify CLI command invocation in `aios map` from `graphify ingest` to `graphify extract . --code-only`.

## Acceptance Criteria

1. [x] Fix Graphify auto-indexing in `commandMap` (`cli/src/index.ts`) to execute `graphify extract . --code-only` instead of invalid `graphify ingest`.
2. [x] Update `integrations/graphify.md` and `.aios/integrations/graphify.md` to reflect `graphify extract . --code-only`.
3. [x] Enhance `commandIntegrationAdd` output when external tools are not detected to output explicit manual install guide and automated install command (`aios integration add <name> --install --yes`).
4. [x] Verify all integration tests pass deterministically.

## Done Summary

- Files changed:
  - `cli/src/index.ts`
  - `cli/test/commands.test.ts`
  - `integrations/graphify.md`
  - `.aios/integrations/graphify.md`
  - `docs/tasks/TASK-054-enhance-integration-installer-guidance-and-fix-graphify-extract.md`
  - `docs/tasks/index.md`
- Tests run: `npm test` in `cli/` (all 108 tests passing)
- Acceptance criteria status: All criteria verified and met.
- Risks: None.
