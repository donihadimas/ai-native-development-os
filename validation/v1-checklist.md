# V1 Acceptance Checklist

## FR-001 Repository Structure

- [ ] `skills/` exists.
- [ ] `templates/` exists.
- [ ] `references/` exists.
- [ ] `workflows/` exists.
- [ ] `prompts/` exists.
- [ ] `project-skeleton/` exists.
- [ ] V2 extension areas exist: `cli/`, `starters/`, `.github/`.
- [ ] Major directories have README or clear documentation.

## FR-002 Skill System

- [ ] Every V1 skill has `SKILL.md`.
- [ ] Every skill has standard metadata.
- [ ] Every skill includes goal, when to use, inputs, outputs, process, rules, checklist, failure modes, and example prompt.
- [ ] Skills are English and stack-agnostic.

## FR-003 Template System

- [ ] Vision template exists.
- [ ] PRD template exists.
- [ ] Architecture template exists.
- [ ] ADR template exists.
- [ ] Task template exists.
- [ ] Implementation plan template exists.
- [ ] Review report template exists.
- [ ] Test plan template exists.

## FR-004 Reference System

- [ ] References are separated from skills and workflows.
- [ ] References are reusable across project types.
- [ ] References avoid project-specific decisions.

## FR-005 Workflow System

- [ ] New project workflow exists.
- [ ] New feature workflow exists.
- [ ] Bugfix workflow exists.
- [ ] Refactor workflow exists.
- [ ] Review workflow exists.
- [ ] Release workflow exists.
- [ ] V2 roadmap workflow exists.
- [ ] Each workflow has input, process, output, and done criteria.

## FR-006 Project Skeleton

- [ ] Skeleton supports frontend/backend separation.
- [ ] Skeleton includes shared docs.
- [ ] Skeleton includes `AGENTS.md`.
- [ ] Skeleton includes optional `CLAUDE.md`.
- [ ] Skeleton includes `docs/context/context-map.md`.
- [ ] Skeleton includes README.
- [ ] Skeleton does not force a specific app framework.

## FR-007 Codex Compatibility

- [ ] `AGENTS.md` provides clear agent instructions.
- [ ] Task files are designed to be small.
- [ ] Skill files are discoverable by directory structure.
- [ ] Prompts mention which files Codex should read.
- [ ] Workflows avoid unsupported tool-specific assumptions.

## FR-008 Context Management

- [ ] `context-management` skill exists.
- [ ] `context-principles.md` exists.
- [ ] Skeleton context map exists.
- [ ] AGENTS references context routing.
- [ ] Prompts avoid whole-repo reads.

## FR-009 FE/BE Project Support

- [ ] Shared docs live outside frontend/backend.
- [ ] Task template supports frontend and backend scope.
- [ ] API contract notes can live in `docs/api/`.
- [ ] ADR can define cross-cutting decisions.
- [ ] Workflows recommend splitting FE and BE tasks when needed.

## FR-010 Review and Testing

- [ ] Review skill exists.
- [ ] Testing skill exists.
- [ ] Task template includes testing expectations.
- [ ] Implementation plan includes test plan.
- [ ] AGENTS instructs agents to report tests run.
- [ ] Review checklist includes security, architecture, duplication, maintainability, correctness, and testing.
