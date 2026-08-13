# Testing Principles

## Test Behavior, Not Implementation Details

Tests should prove user-visible or contract-visible behavior. Avoid brittle tests that only mirror internals.

## Tie Tests to Acceptance Criteria

Every implementation task should identify which acceptance criteria are covered by tests or manual checks.

## Cover Meaningful Paths

Include happy path, error path, edge cases, and regression checks when relevant.

## Keep Tests Maintainable

Tests should be readable, deterministic, and focused. A test that is hard to trust creates drag instead of safety.

## Production Confidence

High-risk behavior should have tests or documented checks for failure modes, permissions, data integrity, compatibility, and regression risk. Manual checks are acceptable only when automation is not practical yet, and the reason should be recorded.

## Report Evidence

Done summaries must include what tests were run and what was not run.

## Comprehensive Coverage Rules

- **Feature Completeness**: Every feature should have Unit Tests, Integration Tests, and Edge Case Tests.
- **Testing Priorities**: Test behavior, not implementation details.
- **Strict Coverage**: Do not consider a feature "Done" if the core business logic (utilities, reducers, custom hooks, domain layers) lacks unit tests. Ensure edge cases and error paths are covered, not just the happy path.
