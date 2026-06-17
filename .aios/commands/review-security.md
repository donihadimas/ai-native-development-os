# Command: Review Security

Resolve `.aios/config.json` first when it exists. In full mode, use `.aios/prompts/11-review-security.md` and the `security-review` skill through `.aios/skill-router.md`. In lite mode, use available security guidance without assuming `.aios/` exists.

Read:

- active task, diff, or release candidate
- affected files
- API contracts
- security principles
- test and review evidence

Before creating the review, apply the skill's Clarification Gate. If trust boundaries, roles, sensitive data, inputs, auth, or validation evidence are unclear, ask focused questions first.

Create a security review in `<docsRoot>/security/` and clearly mark approval or revision required.

End with the next step: fix blocking findings or ask the user to explicitly accept residual risk before release planning.
