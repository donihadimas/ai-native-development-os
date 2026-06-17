# Implementation Plan: Add Adopt Subproject Safety Warning

## Task

- Task file: `docs/tasks/TASK-001-add-adopt-subproject-safety-warning.md`
- Objective: Add an interactive warning when `aios adopt` appears to target a subproject instead of the intended repository root.

## Context Read

- `workflows/new-feature.workflow.md`
- `docs/product/prd.md`
- `docs/architecture/architecture.md`
- `docs/adr/ADR-002-cli-as-helper-not-orchestrator.md`
- `docs/adr/ADR-003-configurable-project-shapes-and-modes.md`
- `templates/task.template.md`
- `templates/implementation-plan.template.md`
- Relevant CLI code around `interactiveAdopt`, `commandAdopt`, and tests.

## Affected Files

- `cli/src/index.ts`
- `cli/test/commands.test.ts` or `cli/test/core.test.ts`
- Optional docs update if wording changes: `cli/README.md`

## Approach

1. Add a small helper that inspects the selected adopt target and returns warning data when:
   - the target has subproject/package signals, and
   - a parent directory has stronger repository-root or AIOS-root signals.
2. In `interactiveAdopt`, after resolving the target and before the final `Adopt AIOS into this project now?` confirmation, show the warning and ask whether to continue with the selected target.
3. Keep `commandAdopt` unchanged for non-interactive usage so scripts are not blocked.
4. Add tests for the helper using temporary directories:
   - nested `repo/cli/package.json` with parent `repo/AGENTS.md` warns,
   - root `repo/AGENTS.md` does not warn,
   - selected target already containing `.aios/config.json` does not warn as accidental.
5. Run `npm.cmd test` from `cli/`.

## Data Flow / Behavior Changes

Before:

```text
interactiveAdopt -> ask path -> setup options -> summary -> confirm -> commandAdopt
```

After:

```text
interactiveAdopt -> ask path -> setup options -> summary
  -> if target looks like subproject, show warning and ask whether to continue
  -> confirm -> commandAdopt
```

Direct commands stay unchanged:

```text
aios adopt path/to/project -> commandAdopt
```

## Risks

- Heuristic could warn for valid monorepo package adoption.
- Too many warnings could annoy advanced users.
- Interactive prompts are harder to test end-to-end than pure command helpers.

Mitigation: keep the warning non-blocking, conservative, and helper-tested.

## Test Plan

- `npm.cmd test` from `cli/`
- Manual smoke check from a nested package folder:
  - run `aios`,
  - choose adopt,
  - path `.`,
  - verify warning appears before confirmation.

## Rollback Notes

Revert the helper, interactive prompt call, and related tests. Since non-interactive `commandAdopt` remains unchanged, rollback should not affect existing scripted behavior.
