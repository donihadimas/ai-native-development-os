# Command: Review Code

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/workflows/review.workflow.md`, `.aios/prompts/07-review-code.md`, and the `code-review` skill through `.aios/skill-router.md`; read `skill-router.md` Artifact Routing and Active Task Discovery before opening task files. In lite mode, use available review guidance without assuming `.aios/` exists.

Read:

- diff or changed files
- active task acceptance criteria
- related ADRs when relevant
- testing evidence

If the active task is not explicit, list direct task filenames in `<docsRoot>/tasks/` first and open only the top 1-3 likely candidates. Do not open every task file or search `<docsRoot>/tasks/done/` unless reviewing completed work.

Before writing the review, apply the skill's Clarification Gate. If the diff, task intent, acceptance criteria, or test evidence are missing, ask for the missing inputs or clearly label the review as limited.

Return findings first, ordered by severity, then summarize residual risks and approval or revision required.

End with the next step: fix blocking findings and re-review, or update the task Done Summary, archive the completed task to `<docsRoot>/tasks/done/`, and prepare release notes when approved.
