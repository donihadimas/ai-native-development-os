# Command: Review Security

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/workflows/security-review.workflow.md`, `.aios/prompts/11-review-security.md`, and the `security-review` skill through `.aios/skill-router.md`; read `skill-router.md` Artifact Routing and Active Task Discovery before opening task files. In lite mode, use available security guidance without assuming `.aios/` exists.

Read:

- active task, diff, or release candidate
- affected files
- API contracts
- security principles
- test and review evidence

If the active task or review target is not explicit, list direct task filenames in `<docsRoot>/tasks/` first and open only the top 1-3 likely candidates. Do not open every task file or search `<docsRoot>/tasks/done/` unless reviewing completed work.

Before creating the review, apply the skill's Clarification Gate. If trust boundaries, roles, sensitive data, inputs, auth, or validation evidence are unclear, ask focused questions first.

Create a security review in `<docsRoot>/security/` and clearly mark approval or revision required.

End with the next step: fix blocking findings or ask the user to explicitly accept residual risk before release planning.
