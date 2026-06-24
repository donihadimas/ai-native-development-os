# TASK-038: Add Guided Integration Repo Links

## Status

Done

## Objective

Add clear repository link guidance to the CLI guided integration flow for each supported optional integration.

## Background

The CLI already supports optional RTK, Caveman, and Ponytail integrations through `aios integration` commands and the guided setup wizard. The guided choices currently describe what each integration does, but they do not show the source repository link near the moment the user decides what to enable or install.

Showing the repo link helps users review external tools before enabling rules or running installers, especially because integration installers are optional external commands.

## Scope

### In Scope

- Add repository link metadata for each supported integration:
  - RTK: `https://github.com/rtk-ai/rtk`
  - Caveman: `https://github.com/JuliusBrussee/caveman`
  - Ponytail: `https://github.com/DietrichGebert/ponytail`
- Show the relevant repo link in guided CLI integration choices or nearby review text for:
  - optional integrations during guided `aios` setup,
  - guided `aios integration` add flow.
- Include repo links in non-interactive integration discovery output where it helps users review supported integrations, such as `aios integration list`.
- Keep installer execution behavior unchanged: external commands must still require explicit user intent and `--yes` where currently required.
- Add or update CLI tests that verify the repo links appear for all supported integration types.

### Out of Scope

- Do not add a new integration type.
- Do not change installer commands, detection behavior, status labels, or config schema.
- Do not introduce new dependencies.
- Do not redesign the guided setup wizard beyond concise choice/review copy.
- Do not update website documentation unless a test or existing docs drift requires a small matching change.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: `docs/tasks/index.md`
- CLI: `cli/src/index.ts`, `cli/test/commands.test.ts`
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `docs/product/prd.md` FR-013 and usability non-functional requirement.
- Related design: N/A
- Related ADR: N/A
- Related architecture section: N/A
- Blocking tasks: None

## Acceptance Criteria

- [x] `aios integration list` shows a repository link for RTK, Caveman, and Ponytail.
- [x] The guided optional integration setup choices or immediate review text show a repository link for RTK, Caveman, and Ponytail before the user can approve installer execution.
- [x] The guided `aios integration` add flow shows a repository link for RTK, Caveman, and Ponytail before the user can approve installer execution.
- [x] Existing install, dry-run, status, doctor, repair, and remove behavior remains unchanged.
- [x] Tests assert the expected repo links for all three integrations.

## Testing Expectations

- Unit tests: Update `cli/test/commands.test.ts` around integration list/add or guided integration assertions.
- Integration tests: N/A.
- Regression tests: Run `npm test` from `cli/`.
- Manual checks: If practical, run `aios integration list` and one guided integration add path to confirm the copy is readable.

## Implementation Notes

- Prefer a small shared metadata helper or record in `cli/src/index.ts` so labels, list output, and review text do not duplicate raw URLs in multiple places.
- Keep labels concise enough for interactive prompts.
- Treat repo links as review guidance only; do not automatically open a browser.
- This is a CLI usability task, not a new integration implementation.

## Done Summary

- Files changed: `cli/src/core.ts`, `cli/src/index.ts`, `cli/test/commands.test.ts`
- Tests run: `npm test` (79 tests passed)
- Acceptance criteria status: All satisfied.
- Risks: None known.