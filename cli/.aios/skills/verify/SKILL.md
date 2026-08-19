---
name: verify
description: Use when running test suites, verifying acceptance criteria, performing code review, and conducting security audits.
---

# Verify (Testing, Code Review & Security)

## Goal

Validate that implemented code satisfies all task acceptance criteria, passes automated tests, adheres to code quality and security standards, and introduces no regressions.

## When to Use

- After task implementation code edits are drafted.
- When creating automated unit, integration, or regression tests.
- When performing a code review or security audit before merging.

## Expected Outputs

- Passing test suites and linter runs.
- Verified acceptance criteria checkboxes (`- [x]`).
- Concise completion summary with: files changed, tests run, acceptance criteria status, and risks.
- `docs/reviews/REVIEW-XXX.md` (only if a formal review artifact is requested).

## Process

1. **Automated Verification**:
   - Execute project test runner (e.g. `npm test`, `pytest`, `cargo test`, `go test`).
   - Run linters and typechecks.
2. **Acceptance Criteria Check**:
   - Verify each task acceptance criterion against concrete code and test behavior.
3. **Security & Quality Check**:
   - Inspect auth boundaries, input validation, secrets handling, and edge cases.
4. **Task Completion**:
   - Mark task `Status: Done` in-place in `docs/tasks/`.
   - Fill the Done Summary section.
