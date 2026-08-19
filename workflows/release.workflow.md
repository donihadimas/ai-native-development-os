# Release Workflow

## Input

- Completed tasks in `<docsRoot>/tasks/` with `Status: Done`.
- Selected completed implementation plans in `<docsRoot>/plans/` when traceability is needed.
- Test summary.
- Review summary.
- Deployment target or release context.
- Changelog or previous release notes if available.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `release-management` and release/changelog templates.
- Lite mode or missing config: use `AGENTS.md`, completed tasks, review evidence, and available release templates.
- If RTK is enabled, use it for noisy test, build, diff, and changelog output unless exact full output is required.
- If Caveman is enabled, use concise style for operational updates only; keep release notes, rollback, and approval evidence complete.

## Workflow Handoffs

Use this workflow when work is complete and the next step is release notes, changelog, deployment or publish checks, rollback planning, or post-release verification.

- Require tasks marked `Status: Done`, related plans, test evidence, and review evidence before release planning.
- Use `workflows/security-review.workflow.md` before release when included changes touch auth, permissions, secrets, payments, billing, subscriptions, checkout, webhooks, or sensitive data.
- Use `workflows/database-migration.workflow.md` when release scope includes migration rollout, rollback, or data repair.
- Use `release-management` for release notes, changelog, rollback notes, deployment checklist, and post-release checks.
- Return to the relevant feature, bugfix, refactor, security, or migration workflow if release readiness finds missing evidence or blockers.
- Do not deploy or publish automatically; record the human approval requirement.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for release documentation.
2. Confirm all included tasks are marked `Status: Done` in `<docsRoot>/tasks/`.
3. Confirm acceptance criteria and tests are reported.
4. Summarize user-visible changes.
5. Summarize technical changes and risks.
6. Route through `release-management`.
7. Create or update a changelog draft when the release changes public behavior.
8. Prepare deployment or publish checklist.
9. Prepare rollback notes.
10. Prepare post-release monitoring or verification notes.
11. Release only after human approval.

## Output

- Release notes in `<docsRoot>/releases/`.
- Changelog draft or update.
- Deployment checklist.
- Rollback notes.
- Post-release monitoring or verification notes.

## Done Criteria

- Included scope is explicit.
- Tests and review evidence are summarized.
- Changelog impact is documented.
- Known risks are documented.
- Rollback path is understood.
- Post-release checks are defined.
- Human approval is recorded outside the agent's assumptions.

## Full Mode Flow

Use `release-management` skill when release preparation is the current step. Read `.aios/templates/release-note.template.md`, `.aios/templates/changelog.template.md`, `.aios/references/engineering-principles.md`, and `.aios/references/testing-principles.md` for release standards.

## Lite Mode Flow

Use `AGENTS.md`, completed tasks, review evidence, and available release templates. Follow the same release checklist manually.

## After This Flow

Have the user review release scope, validation evidence, changelog impact, rollback plan, and post-release checks. After explicit approval, the user may publish or deploy outside AIOS automation.

