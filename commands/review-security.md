# Command: Review Security

Resolve `.aios/config.json` first. Use `.aios/prompts/11-review-security.md` and the `security-review` skill through `.aios/skill-router.md`.

Read:

- active task, diff, or release candidate
- affected files
- API contracts
- security principles
- test and review evidence

Before creating the review, apply the skill's Clarification Gate. If trust boundaries, roles, sensitive data, inputs, auth, or validation evidence are unclear, ask focused questions first.

Create a security review in `<docsRoot>/security/` and clearly mark approval or revision required.
