# TASK-035: Map Prompts References And Templates

## Status

Done

## Objective

Make AIOS routing explicit about when agents should read matching prompts, references, and templates after selecting a workflow and skill.

## Background

Workflow routing and handoffs now guide agents to the right primary workflow and supporting skills. The next gap is making prompt, reference, and template usage explicit enough that agents consistently load the right workflow prompt and standards instead of relying on inference.

## Scope

### In Scope

- Add prompt/reference/template routing rules to `skill-router.md`.
- Add concrete prompt/reference/template references to source workflows where the mapping is clear.
- Update source command prompts so they route through the selected workflow plus matching prompt/reference/template.
- Leave generated `.aios/` copies unchanged.

### Out of Scope

- CLI behavior changes.
- Generated `.aios/` edits.
- Website content changes.

## Acceptance Criteria

- [x] `skill-router.md` explains when prompts, references, and templates must be read.
- [x] Lifecycle steps have an explicit mapping to prompt, skill, reference, and template where assets exist.
- [x] Workflows mention matching prompts/references/templates for their handoff steps.
- [x] Command prompt files point agents to the relevant workflow plus prompt/reference/template.
- [x] Generated `.aios/` copies are not changed manually.

## Testing Expectations

- Regression tests: targeted search for prompt/reference/template routing language.
- Manual checks: confirm `git diff --name-only -- .aios` is empty.

## Done Summary

- Files changed: `skill-router.md`, `workflows/*.workflow.md`, `commands/*.md`, `docs/tasks/TASK-035-map-prompts-references-and-templates.md`
- Tests run: targeted checks for `Artifact Routing`, command routing references, workflow prompt/reference/template mentions, stale eager-loading wording, and `git diff --name-only -- .aios`.
- Acceptance criteria status: All satisfied.
- Risks: Generated `.aios/` copies remain stale until refreshed by update/install flow; routing remains instruction-based and depends on the host agent following repository rules.
- Follow-up: Token discipline wording was tightened so prompts are loaded for the current step, while references and templates are loaded only when they govern the current decision or artifact.
