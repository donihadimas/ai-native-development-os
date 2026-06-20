# TASK-021: Add Integrations Folder Catalog Reference

## Status

Done

## Objective

Expand website documentation so users understand every file in the AIOS `integrations/` folder and when optional integrations should be enabled.

## Background

The current integrations guide explains RTK and Caveman at a high level. It does not fully catalog the files in `integrations/` or explain how local integration rules relate to `.aios/config.json`, `.aios/integrations/`, and the `aios integration ...` commands.

## Scope

### In Scope

- Create or expand a website reference/guide page for the `integrations/` folder.
- Document each current file:
  - `README.md`
  - `rtk.md`
  - `caveman.md`
- For each integration file, explain:
  - purpose
  - when to enable it
  - what behavior it changes for agent guidance
  - what it must not be used for
  - related CLI commands
  - safety boundaries
- Explain rules-first behavior: AIOS can write local guidance without installing external tools.
- Link to CLI reference and command decision guide.
- Add or adjust sidebar entry if needed.

### Out of Scope

- Do not install or configure external RTK/Caveman tools.
- Do not change integration source files.
- Do not add new integrations.
- Do not weaken rules that keep formal artifacts complete.

## Affected Areas

- Frontend: `website/src/content/docs/guides/`, possibly `website/src/content/docs/reference/`, `website/astro.config.mjs`
- Backend: N/A
- Shared docs: Website documentation only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`, `docs/product/prd.md`
- Related design: `website/DESIGN.md`
- Related ADR: `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`
- Related architecture section: `docs/architecture/architecture.md#Integration Strategy`
- Blocking tasks: TASK-012 is recommended for command links.

## Acceptance Criteria

- [x] Every current file in `integrations/` is listed and explained.
- [x] RTK is documented as guidance for noisy command output and summarized operational traces.
- [x] Caveman is documented as concise operational update guidance, not formal artifact compression.
- [x] The page explains that integrations are optional and rules-first.
- [x] The page links integration files to `aios integration list/status/add/remove/doctor/repair`.
- [x] The page states that integrations must not store secrets or silently install external tools.
- [x] The page is discoverable from the sidebar or the existing integrations guide.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Compare the catalog against `rg --files integrations` and confirm no integration file is missing.

## Implementation Notes

- This may be implemented by expanding `website/src/content/docs/guides/integrations.md` if that remains readable.
- If the expanded content gets long, create `website/src/content/docs/reference/integrations-folder.md` and keep the guide page task-oriented.

## Done Summary

- Files changed: `website/src/content/docs/reference/integrations-folder.md` (new), `website/src/content/docs/guides/integrations.md` (added links), `website/astro.config.mjs` (sidebar)
- Tests run: `npm run build` (Starlight build successful, 19 pages generated)
- Acceptance criteria status: All 7 criteria met.
- Risks: None known.
