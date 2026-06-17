# Prompt: Review Code

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `code-review` in full mode. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, active task, diff, and available review template. Use `.aios/templates/review-report.template.md` when available.

Read only:

- diff or changed files,
- active task and acceptance criteria,
- related ADRs or architecture docs when relevant,
- testing evidence.

Before writing the review, apply the `code-review` Clarification Gate. If the diff, task intent, acceptance criteria, or test evidence are missing, ask for the missing inputs or label the review as limited.

Findings must come first, ordered by severity. Approve only when acceptance criteria and testing expectations are satisfied.

End with the next step: fix blocking findings and re-review, or update the task done summary and proceed to release planning when approved.
