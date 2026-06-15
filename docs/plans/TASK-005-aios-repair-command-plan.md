# Implementation Plan: Add AIOS Repair Command

## Task

- Task file: `docs/tasks/TASK-005-add-aios-repair-command.md`
- Objective: Add a single repair command for missing kit assets, native skills, and enabled integration rules.

## Context Read

- `docs/tasks/TASK-005-add-aios-repair-command.md`
- `cli/src/core.ts`
- `cli/src/index.ts`
- `cli/test/commands.test.ts`
- `docs/architecture/architecture.md#CLI Architecture`

## Affected Files

- `cli/src/index.ts`
- `cli/src/core.ts`
- `cli/test/commands.test.ts`
- `cli/README.md`
- `website/src/content/docs/reference/cli.md`

## Approach

1. Add help and command routing for `repair`.
2. Implement `commandRepair` that reads project config.
3. In full mode, call `installAiosKit` with existing config.
4. If skill delivery is `native` or `both`, call `installAgentSkills` with configured selected agents and skills.
5. Restore enabled integration rules using existing repair helpers or shared logic.
6. Return a concise repair summary and recommend `aios validate`.
7. Add tests that delete representative files and confirm repair restores them.

## Data Flow / Behavior Changes

Before:

```text
aios kit install
aios agent install
aios integration repair
```

After:

```text
aios repair
  -> repair kit
  -> repair native skills
  -> repair enabled integration rules
  -> recommend validate
```

## Risks

- Repair command may overlap with existing commands.
- Users may expect it to fix app code or optional docs.

## Test Plan

- `npm.cmd test` from `cli/`
- Manual: remove one `.aios/commands/*.md`, one native `SKILL.md`, and one integration rule, then run `aios repair`.

## Rollback Notes

Remove `repair` routing, implementation, docs, and tests. Existing specific repair commands remain available.
