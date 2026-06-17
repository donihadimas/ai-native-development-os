# Implementation Plan: Dogfood AIOS Validation Cycle

## Task

- Task file: `docs/tasks/TASK-008-dogfood-aios-validation-cycle.md`
- Objective: Record one end-to-end AIOS self-use cycle and capture improvement opportunities.

## Context Read

- `docs/tasks/TASK-008-dogfood-aios-validation-cycle.md`
- `docs/product/vision.md`
- `docs/product/prd.md`
- `docs/architecture/architecture.md`
- `docs/adr/`
- Completed task, implementation plan, tests, and review evidence for the selected feature.

## Affected Files

- `validation/aios-dogfood-validation-report.md`
- Optional: `docs/reviews/<feature>-review.md`
- Optional: follow-up task files under `docs/tasks/`

## Approach

1. Choose one feature that has gone through planning and implementation.
2. Record which AIOS docs and workflow assets were used.
3. Record generated task/plan artifacts and implementation evidence.
4. Run validation commands and capture results.
5. Write pain points, improvement ideas, and recommended follow-up tasks.

## Data Flow / Behavior Changes

No runtime behavior changes. This task produces validation evidence for AIOS itself.

## Risks

- Report may become too generic if not tied to a real completed feature.
- Validation can be stale if written before implementation evidence exists.

## Test Plan

- `node dist/src/index.js validate ..`
- Include any feature-specific tests from the selected completed task.

## Rollback Notes

Remove the validation report and any follow-up task files created only for this dogfood cycle.
