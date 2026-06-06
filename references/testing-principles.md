# Testing Principles

## Test Behavior, Not Implementation Details

Tests should prove user-visible or contract-visible behavior. Avoid brittle tests that only mirror internals.

## Tie Tests to Acceptance Criteria

Every implementation task should identify which acceptance criteria are covered by tests or manual checks.

## Cover Meaningful Paths

Include happy path, error path, edge cases, and regression checks when relevant.

## Keep Tests Maintainable

Tests should be readable, deterministic, and focused. A test that is hard to trust creates drag instead of safety.

## Report Evidence

Done summaries must include what tests were run and what was not run.
