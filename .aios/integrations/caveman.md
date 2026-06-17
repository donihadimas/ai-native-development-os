# Caveman Integration Rules

Use Caveman-style responses only when `.aios/config.json` has `integrations.caveman.enabled: true`.

Default mode is `lite`: concise, direct, and technical without stripping important context.

Use concise style for:

- status updates,
- debug loops,
- command summaries,
- short implementation summaries,
- progress notes while working.

Do not use Caveman-style brevity for:

- PRD,
- ADR,
- architecture documents,
- security review reports,
- migration plans,
- release notes,
- final answers that need nuanced explanation.

When in doubt, keep implementation communication concise but keep formal artifacts complete.

