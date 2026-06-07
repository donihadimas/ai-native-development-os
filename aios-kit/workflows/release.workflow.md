# Release Workflow

## Input

- Completed tasks.
- Test summary.
- Review summary.
- Deployment target or release context.
- Changelog or previous release notes if available.

## Process

1. Confirm all included tasks are done.
2. Confirm acceptance criteria and tests are reported.
3. Summarize user-visible changes.
4. Summarize technical changes and risks.
5. Use `skills/release-management` to prepare release notes.
6. Create or update a changelog draft when the release changes public behavior.
7. Prepare deployment or publish checklist.
8. Prepare rollback notes.
9. Prepare post-release monitoring or verification notes.
10. Release only after human approval.

## Output

- Release notes in `docs/releases/`.
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
