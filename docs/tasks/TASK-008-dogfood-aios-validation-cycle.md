# TASK-008: Dogfood AIOS Validation Cycle

## Objective

Run a documented end-to-end dogfood cycle using AIOS on this repository after the current workflow improvements land.

## Background

AIOS is now being used inside its own repository. A dogfood validation task should record whether the workflow actually helps: discovery docs, PRD, architecture, ADRs, task creation, planning, implementation, tests, review, and release readiness.

## Scope

### In Scope

- Select one completed or near-complete AIOS feature.
- Trace it through docs, task, plan, implementation, validation, and review evidence.
- Record pain points and follow-up tasks.
- Update validation evidence.

### Out of Scope

- Do not implement new product behavior as part of this task.
- Do not publish the package.
- Do not expand V3 scope.

## Affected Areas

- Frontend: N/A
- Backend: N/A
- Shared docs: `validation/`, `docs/reviews/`, possibly `docs/releases/`
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `docs/product/prd.md`
- Related design: N/A
- Related ADR: all accepted ADRs
- Related architecture section: `docs/architecture/architecture.md#Testing Strategy`
- Blocking tasks: At least one implementation task should be completed first.

## Acceptance Criteria

- [ ] A validation report records the AIOS dogfood cycle.
- [ ] Report lists docs used, tasks created, tests run, and review evidence.
- [ ] Report identifies friction points and follow-up tasks.
- [ ] CLI validation passes at the end of the cycle.

## Testing Expectations

- Unit tests: N/A unless the selected feature includes code.
- Integration tests: run project-relevant CLI tests if implementation occurred.
- Regression tests: `node dist/src/index.js validate ..`
- Manual checks: review generated docs for clarity and usefulness.

## Implementation Notes

- Good candidate feature: adopt shape cleanup, native skill repair, or adopt subproject warning.
- Keep the report honest; document confusion and rough edges.
- This is a process validation task, not a code task.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
