# Prompt: Review Security

Resolve `.aios/config.json` first if it exists. Use its `docsRoot`; otherwise use `docs`.

Use `.aios/skill-router.md` to route through `context-management`, then `security-review` in full mode. In lite mode or when `.aios/` is missing, use `AGENTS.md`, the context map, affected files, related contracts, and available security principles. Use `.aios/references/security-principles.md` and `.aios/templates/security-review-report.template.md` when available to create a focused security review in `<docsRoot>/security/`.

Read only:

- active task or release candidate,
- affected files or diff,
- related API contracts,
- related ADRs or architecture sections,
- available test and review evidence.

Before generating the security review, apply the `security-review` Clarification Gate. If trust boundaries, roles, sensitive data, inputs, auth, or validation evidence are unclear, ask focused questions first.

Do not approve security-sensitive work unless findings, residual risk, and required mitigations are explicit. End with the next step: fix blocking findings or ask the user to explicitly accept residual risk before release planning.
