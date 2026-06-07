# Security Review Workflow

## Input

- Active task, diff, or release candidate.
- API contracts and affected files.
- Related architecture, ADRs, and security principles.
- Test and review evidence.

## Process

1. Confirm whether the change touches security-sensitive behavior.
2. Use `skills/security-review` to inspect trust boundaries, roles, inputs, secrets, and integrations.
3. Create `docs/security/name-security-review.md` using `templates/security-review-report.template.md`.
4. Prioritize findings by severity.
5. Require remediation for blocking findings before release.
6. Document residual risk and approval or revision required.

## Output

- Security review report in `docs/security/`.
- Actionable findings.
- Residual risk summary.
- Release decision.

## Done Criteria

- Auth, authorization, validation, and secrets are considered.
- Findings are specific and actionable.
- Residual risk is explicit.
- Security-sensitive releases have human approval.
