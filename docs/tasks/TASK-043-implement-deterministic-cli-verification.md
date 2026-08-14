# TASK-043: Implement Deterministic CLI Verification Runner (aios verify)

## Status

Done

## Objective

Build a deterministic CLI verification engine (`aios verify`) that executes test suites, linter checks, and validates git diffs against acceptance criteria, replacing trust-based LLM markdown self-reporting.

## Background

AIOS currently relies on the agent self-reporting completion by modifying Markdown checkboxes. Under the "AI Proposes, Tools Verify" paradigm, a deterministic CLI runner must validate code correctness and test results before work is considered complete.

## Scope

### In Scope

- Implement `aios verify` command in CLI.
- Automatically detect project test/lint runners (e.g. `npm test`, `pytest`, `cargo test`, `go test`, `dart test`).
- Parse test execution exit codes and summarize failures.
- Check git diff to report modified, added, and untracked files.
- Emit structured pass/fail terminal output.

### Out of Scope

- Worktree isolation (handled in TASK-047).
- Automatic execution bounded rollbacks (handled in TASK-048).

## Affected Areas

- CLI: `cli/src/verify.ts`, `cli/src/index.ts`, `cli/src/core.ts`
- Shared docs: `docs/architecture/`

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 1 / P1)
- Blocking tasks: TASK-039, TASK-041

## Acceptance Criteria

- [x] Running `aios verify` executes the project's test command and returns exit code 0 on success, non-zero on failure.
- [x] Output clearly displays test results, lint status, and git diff summary.
- [x] Agent instructions direct the agent to run `aios verify` before concluding tasks.
- [x] CLI unit and integration tests verify the command behavior.

## Testing Expectations

- Unit tests: Test detection of various test runners and diff parsing in `cli/test/verify.test.ts`.
- Manual checks: Run `aios verify` on sample projects with passing and failing tests.

## Done Summary

- Files changed: `cli/src/verify.ts`, `cli/src/core.ts`, `cli/src/index.ts`, `cli/test/verify.test.ts`.
- Tests run: `npm test` in `cli/` (87 passing tests).
- Acceptance criteria status: All criteria satisfied.
- Risks: None.
