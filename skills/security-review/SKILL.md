---
name: security-review
description: Use when reviewing authentication, authorization, secrets, input validation, web risks, or payment-sensitive changes.
---

# Security Review

## Goal

Review security-sensitive changes with clear findings, mitigations, and release risk before work is marked done.

## When to Use

Use this skill when:

- a change touches authentication or authorization,
- user input, files, webhooks, or payments are involved,
- secrets or environment variables are added,
- API endpoints expose sensitive data,
- a release needs a focused security pass.

## Inputs

Expected inputs:

- active task or review target,
- diff or affected files,
- related PRD acceptance criteria,
- API contracts,
- architecture, ADRs, and security principles.

## Clarification Gate

Before writing a security review, check whether these are clear enough:

- review target or diff,
- trust boundaries,
- user roles and permissions,
- sensitive data involved,
- inputs and external integrations,
- auth/session/token behavior,
- release or risk tolerance.

If the security-sensitive surface is unclear, stop and ask the user 3-6 focused questions before generating the review report. Do not approve security-sensitive work with missing auth, authorization, or validation evidence.

## Outputs

Expected outputs:

- security review report in `docs/security/`,
- prioritized findings,
- mitigation checklist,
- residual risk summary,
- approval or revision required decision.

## Process

Step-by-step process:

1. Resolve the active task or review target without reading every task body when the target is not explicit. Use `docs/tasks/index.md` when available, then direct task filenames under `docs/tasks/`, and exclude `docs/tasks/done/` unless reviewing completed work.
2. Read only the selected active task or review target, affected files, and relevant contracts.
3. Identify trust boundaries, roles, inputs, secrets, and external integrations.
4. Review authentication, authorization, validation, output encoding, rate limits, and audit needs.
5. Create a report using `templates/security-review-report.template.md`.
6. Mark findings by severity and link them to concrete remediation.
7. Record residual risk and whether release should proceed.
8. Escalate architecture, dependency, or policy decisions to the human owner.

## Rules

Hard rules:

- Do not approve security-sensitive work without checking auth and validation.
- Do not open every task file to discover the security review target, and do not search `docs/tasks/done/` unless reviewing completed work.
- Do not store secrets in source code.
- Do not expose internal errors or sensitive data in responses.
- Do not assume client-side checks replace server-side enforcement.
- Do not invent compliance guarantees that were not verified.

## Quality Checklist

Before finishing, verify:

- [ ] Auth and authorization were reviewed.
- [ ] Input validation and output handling were reviewed.
- [ ] Secrets and environment handling were reviewed.
- [ ] High-risk integrations were named.
- [ ] Findings are actionable.
- [ ] Residual risk is explicit.

## Failure Modes

Watch out for:

- missing role checks,
- reading all task files before choosing the review target,
- trusting client input,
- leaking stack traces or tokens,
- webhook or payment replay risks,
- security reports with vague recommendations.

## Example Prompt

```text
Use the security-review skill to review the auth endpoint changes and save findings in docs/security/auth-endpoints-security-review.md.
```
