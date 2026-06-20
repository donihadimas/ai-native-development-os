# Workflows

Workflows describe end-to-end development sequences. They connect skills and templates into practical manual and assisted flows from idea to release.

In generated projects, workflows should resolve `.aios/config.json` first. Use `docsRoot`, `projectShape`, and `mode` for routing.

- Full mode: read `.aios/skill-router.md` first, then open only the prompt, template, reference, and workflow files selected for the current step. Do not preload whole `.aios/` folders.
- Lite mode or missing config: use `AGENTS.md`, project docs, and root or agent-provided AIOS instructions when available. Do not assume `.aios/` exists.

Every workflow should end with a clear next recommended action.

Each workflow includes three mode-specific sections:

- **Full Mode Flow**: what `.aios/` kit resources to use.
- **Lite Mode Flow**: what to use when `.aios/` is not available, without assuming it exists.
- **After This Flow**: what to do next after completing the workflow.

V2 adds API contract workflow so frontend and backend tasks can share an explicit contract before implementation.

V2.x adds UI/UX design, database migration, and security review workflows, and expands release workflow for release notes, changelog drafts, rollback notes, and post-release checks.
