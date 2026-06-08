# Prompt: Review Security

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `context-management`, then `security-review`. Use `.aios/references/security-principles.md` and `.aios/templates/security-review-report.template.md` to create a focused security review in `<docsRoot>/security/`.

Read only:

- active task or release candidate,
- affected files or diff,
- related API contracts,
- related ADRs or architecture sections,
- available test and review evidence.

Do not approve security-sensitive work unless findings, residual risk, and required mitigations are explicit.
