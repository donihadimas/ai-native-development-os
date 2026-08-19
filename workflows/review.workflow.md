# Review Workflow

## Input

- Diff or changed files.
- Active task and acceptance criteria.
- Test evidence.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `Skill: verify` and `.aios/templates/review-report.template.md`.
- Lite mode or missing config: use `AGENTS.md`, the diff, active task, and available review template.
- If RTK is enabled, use it for noisy diffs and test logs unless exact full output is required.
- If Caveman is enabled, use concise style for status updates only; keep review findings complete.

## Workflow Handoffs

Use this workflow after feature, bugfix, refactor, migration, security, or API work has a diff and validation evidence. This workflow evaluates completion; it should not replace the primary implementation workflow.

- Use `Skill: verify` for correctness, regression, maintainability, architecture, security, performance, tests, and documentation checks.
- Return to `workflows/new-feature.workflow.md`, `workflows/bugfix.workflow.md`, or `workflows/refactor.workflow.md` when blocking findings require implementation changes.
- Route to `workflows/security-review.workflow.md` when review uncovers security-sensitive behavior without adequate security evidence.
- Route to `workflows/api-contract.workflow.md` or `workflows/database-migration.workflow.md` when review finds missing contract or migration planning.
- Use `Skill: verify` when validation evidence is missing or does not prove the acceptance criteria.
- Continue to `workflows/release.workflow.md` only after blocking findings are resolved and the user-facing or releasable scope is clear.

## Process

1. Read the active task and acceptance criteria.
2. Inspect the diff.
3. Read related ADRs or architecture docs only when needed.
4. Verify tests or manual checks match the behavior changed.
5. Review correctness, security, architecture, duplication, maintainability, performance, testing, and documentation using `Skill: verify`.
6. Write findings ordered by severity.
7. Decide whether the change is approved or requires revision.

## Output

- Review report.
- Actionable findings.
- Risk summary.
- Approval or revision-required decision.

## Done Criteria

- Findings are specific and actionable.
- Blocking issues are clearly separated from suggestions.
- Acceptance criteria status is clear.
- Testing gaps are named.

## Full Mode Flow

Use `Skill: verify` when review is the current step. Read `.aios/templates/review-report.template.md`, `.aios/references/engineering-principles.md`, `.aios/references/testing-principles.md`, and `.aios/references/security-principles.md` when sensitive behavior is involved.

## Lite Mode Flow

Use `AGENTS.md`, the diff, active task, and available review template. Follow the same review sequence manually.

## After This Flow

If blocking findings exist, fix them and re-run review. If approved, update the task Done Summary, update task status to `Status: Done` in-place, and move to release planning when user-visible behavior changed.

