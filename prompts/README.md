# Prompts

Prompts are thin wrappers that route Codex or another agent to the right skill, template, and context set. They are intentionally short and should not become a prompt dump.

When copied into a generated project, prompts should resolve `.aios/config.json` first, then use `docsRoot`, `projectShape`, and `.aios/skill-router.md` instead of hardcoding one project layout.

V1 prompts cover PRD, architecture, ADRs, tasks, implementation planning, implementation, review, and tests.

V2 adds `09-design-api-contract.md` for OpenAPI-first app integration planning.

V2.x adds prompts for database migration planning, security review, and release preparation.
