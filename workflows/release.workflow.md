# Release Workflow

## Input

- Completed tasks.
- Test summary.
- Review summary.
- Deployment target or release context.
- Changelog or previous release notes if available.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for release documentation.
2. Confirm all included tasks are done.
3. Confirm acceptance criteria and tests are reported.
4. Summarize user-visible changes.
5. Summarize technical changes and risks.
6. Use `.aios/skill-router.md` to route through `release-management`.
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
