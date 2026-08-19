# Security Review Workflow

## Input

- Active task, diff, or release candidate.
- API contracts and affected files.
- Related architecture, ADRs, and security principles.
- Test and review evidence.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `Skill: verify`, `.aios/references/security-principles.md`, and `.aios/templates/security-review-report.template.md`.
- Lite mode or missing config: use `AGENTS.md`, affected files, and available security principles.
- If RTK is enabled, use it for noisy diffs, logs, and test output unless exact full output is required.
- If Caveman is enabled, use concise style for progress updates only; keep security findings and residual risk complete.

## Workflow Handoffs

Use this workflow when a primary feature, bugfix, refactor, API contract, migration, review, or release workflow touches security-sensitive behavior.

- Run this workflow before marking work done when changes touch authentication, authorization, permissions, validation, secrets, payments, billing, subscriptions, checkout, webhooks, personally sensitive data, or trust boundaries.
- Use `Skill: verify` with `.aios/references/security-principles.md` for standards and `.aios/templates/security-review-report.template.md` for the report.
- Route to `workflows/api-contract.workflow.md` when security findings require contract changes for auth, errors, webhooks, or integration boundaries.
- Route to `workflows/database-migration.workflow.md` when findings require data model, retention, access, seed, or rollback changes.
- Return to the primary feature, bugfix, refactor, API, or migration workflow when blocking findings require implementation changes.
- Continue to `workflows/review.workflow.md` or `workflows/release.workflow.md` only after blocking security findings are resolved or residual risk is explicitly accepted.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for review documentation.
2. Confirm whether the change touches security-sensitive behavior.
3. Route through `Skill: verify` with security focus.
4. Inspect trust boundaries, roles, inputs, secrets, and integrations.
5. Create `<docsRoot>/security/name-security-review.md` using `.aios/templates/security-review-report.template.md` when available.
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

## Full Mode Flow

Use `Skill: verify` with security checks when security review is the current step. Read `.aios/references/security-principles.md` and `.aios/templates/security-review-report.template.md` for report creation.

## Lite Mode Flow

Use `AGENTS.md`, affected files, and available security principles. Follow the same security review checklist manually.

## After This Flow

If blocking findings exist, fix them before release. If only residual risk remains, have the user explicitly accept or reject the risk, then continue to release planning or code review.

