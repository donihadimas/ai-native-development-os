# Prompts

Prompts are thin wrappers that route Codex or another agent to the right skill, template, and context set. They are intentionally short and should not become a prompt dump.

When copied into a generated project, prompts should resolve `.aios/config.json` first, then use `mode`, `docsRoot`, and `projectShape` instead of hardcoding one project layout. Full mode should use `.aios/skill-router.md`; lite mode should use `AGENTS.md`, the context map, active project docs, and available root or agent-provided instructions without assuming `.aios/` workflow files exist.

Generator prompts should apply the matched skill's Clarification Gate before writing final files. If the user's input is too vague for an accurate artifact, the agent should ask focused questions first.

V1 prompts cover PRD, architecture, ADRs, tasks, implementation planning, implementation, review, and tests.

V2 adds `09-design-api-contract.md` for OpenAPI-first app integration planning.

V2.x adds prompts for database migration planning, security review, and release preparation.
