# Release Workflow

## Input

- Completed tasks.
- Test summary.
- Review summary.
- Deployment target or release context.
- Changelog or previous release notes if available.

## Mode Routing

- Resolve `.aios/config.json` when it exists.
- Full mode: use `.aios/skill-router.md`, `.aios/workflows/release.workflow.md`, and release/changelog templates.
- Lite mode or missing config: use `AGENTS.md`, `<docsRoot>/context/context-map.md`, completed task summaries, review evidence, and available release templates.
- If RTK is enabled, use it for noisy test, build, diff, and changelog output unless exact full output is required.
- If Caveman is enabled, use concise style for operational updates only; keep release notes, rollback, and approval evidence complete.

## Process

1. Resolve `.aios/config.json`; use `docsRoot` for release documentation.
2. Confirm all included tasks are done.
3. Confirm acceptance criteria and tests are reported.
4. Summarize user-visible changes.
5. Summarize technical changes and risks.
6. Route through `release-management` using `.aios/skill-router.md` when available, or the same release checklist manually in lite mode.
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

Use `.aios/skill-router.md` to select the release-management skill. Use `.aios/templates/` for release notes and changelog drafts. Use `.aios/references/` for release standards.

## Lite Mode Flow

Use `AGENTS.md`, `<docsRoot>/context/context-map.md`, completed task summaries, review evidence, and available release templates. Do not assume `.aios/templates/` or `.aios/skill-router.md` exist. Follow the same release checklist manually.

## After This Flow

Have the user review release scope, validation evidence, changelog impact, rollback plan, and post-release checks. After explicit approval, the user may publish or deploy outside AIOS automation.
