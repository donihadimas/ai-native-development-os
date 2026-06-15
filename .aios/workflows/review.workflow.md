# Review Workflow

## Input

- Diff or changed files.
- Active task and acceptance criteria.
- Test evidence.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `.aios/skill-router.md`, `.aios/templates/review-report.template.md`, and code-review guidance.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, the diff, active task, and available review template.
- If RTK is enabled, use it for noisy diffs and test logs unless exact full output is required.
- If Caveman is enabled, use concise style for status updates only; keep review findings complete.

## Process

1. Read the active task and acceptance criteria.
2. Inspect the diff.
3. Read related ADRs or architecture docs only when needed.
4. Verify tests or manual checks match the behavior changed.
5. Review correctness, security, architecture, duplication, maintainability, performance, testing, and documentation.
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

## Next Action

If blocking findings exist, fix them and re-run review. If approved, update the task done summary and move to release planning when user-visible behavior changed.
