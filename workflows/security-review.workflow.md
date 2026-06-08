# Security Review Workflow

## Input

- Active task, diff, or release candidate.
- API contracts and affected files.
- Related architecture, ADRs, and security principles.
- Test and review evidence.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for review documentation.
2. Confirm whether the change touches security-sensitive behavior.
3. Use `.aios/skill-router.md` to route through `security-review`.
4. Inspect trust boundaries, roles, inputs, secrets, and integrations.
5. Create `<docsRoot>/security/name-security-review.md` using `.aios/templates/security-review-report.template.md`.
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
