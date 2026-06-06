# V1 Validation

This directory records manual validation for the AI-Native Development OS V1 foundation.

## Validation Scenario

Simulated project: Personal Habit Tracker

Goal: Confirm the project skeleton and V1 artifacts can support an end-to-end AI-native workflow without a CLI.

## Steps

1. Copy `project-skeleton/` into a temporary project.
2. Fill `docs/product/vision.md` using `skills/product-discovery` and `templates/vision.template.md`.
3. Generate `docs/product/prd.md` using `skills/prd-generator` and `templates/prd.template.md`.
4. Generate `docs/architecture/architecture.md` using `skills/architecture-design` and `templates/architecture.template.md`.
5. Create one ADR using `skills/adr-generator` and `templates/adr.template.md`.
6. Create one backend task and one frontend task using `skills/task-breakdown` and `templates/task.template.md`.
7. Create an implementation plan using `skills/implementation-planner` and `templates/implementation-plan.template.md`.
8. Create a test plan using `skills/testing` and `templates/test-plan.template.md`.
9. Create a review report using `skills/code-review` and `templates/review-report.template.md`.

## Expected Result

- The skeleton can stand alone as an AI-ready project.
- Context routing prevents reading the whole repository.
- Every generated artifact has a clear source template and skill.
- The first implementation task is small, scoped, and testable.

## Pain Points to Watch

- Repeated manual copying of templates.
- Need for real-project validation before expanding the V2.x roadmap.
- Whether OpenAPI workflow should remain generic or gain stack-specific adapters later.
- Whether security checklist coverage is enough before adding a security-review skill in V2.
