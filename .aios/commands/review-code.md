# Command: Review Code

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/prompts/07-review-code.md` and the `code-review` skill through `.aios/skill-router.md`. In lite mode, use available review guidance without assuming `.aios/` exists.

Read:

- diff or changed files
- active task acceptance criteria
- related ADRs when relevant
- testing evidence

Before writing the review, apply the skill's Clarification Gate. If the diff, task intent, acceptance criteria, or test evidence are missing, ask for the missing inputs or clearly label the review as limited.

Return findings first, ordered by severity, then summarize residual risks and approval or revision required.

End with the next step: fix blocking findings and re-review, or update the task done summary and prepare release notes when approved.
