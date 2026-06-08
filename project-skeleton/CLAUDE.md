# CLAUDE.md

This file mirrors the repository's AI workflow for Claude-compatible agents. `AGENTS.md` remains the primary instruction source.

## Operating Rules

- Read `AGENTS.md` first.
- Read `.aios/config.json` if present and resolve `docsRoot`.
- Use `<docsRoot>/context/context-map.md` for context routing.
- Work from one active task in `<docsRoot>/tasks/`.
- Keep implementation changes small and verifiable.
- Report changed files, tests run, acceptance criteria status, and risks.
