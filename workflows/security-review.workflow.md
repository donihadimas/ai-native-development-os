# Security Review Workflow

## Input

- Active task, diff, or release candidate.
- API contracts and affected files.
- Related architecture, ADRs, and security principles.
- Test and review evidence.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `.aios/skill-router.md`, `.aios/references/security-principles.md`, and `.aios/templates/security-review-report.template.md`.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, affected files, and available security principles.
- If RTK is enabled, use it for noisy diffs, logs, and test output unless exact full output is required.
- If Caveman is enabled, use concise style for progress updates only; keep security findings and residual risk complete.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for review documentation.
2. Confirm whether the change touches security-sensitive behavior.
3. Route through `security-review` using `.aios/skill-router.md` when available, or the same security review checklist manually in lite mode.
4. Inspect trust boundaries, roles, inputs, secrets, and integrations.
5. Create `<docsRoot>/security/name-security-review.md` using `.aios/templates/security-review-report.template.md` when available, or the available security review structure in lite mode.
6. Prioritize findings by severity.
7. Require remediation for blocking findings before release.
8. Document residual risk and approval or revision required.

## Output

- Security review report in `<docsRoot>/security/`.
- Actionable findings.
- Residual risk summary.
- Release decision.

## Done Criteria

- Auth, authorization, validation, and secrets are considered.
- Findings are specific and actionable.
- Residual risk is explicit.
- Security-sensitive releases have human approval.

## Next Action

If blocking findings exist, fix them before release. If only residual risk remains, have the user explicitly accept or reject the risk, then continue to release planning or code review.
