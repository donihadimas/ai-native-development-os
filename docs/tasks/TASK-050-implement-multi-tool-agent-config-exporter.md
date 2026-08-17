# TASK-050: Implement Multi-Tool Agent Config Exporter (aios export)

## Status

Done

## Objective

Build a CLI tool export generator (`aios export --target <tool>`) to automatically compile the core AIOS instructions into tool-native configuration files for Cursor, Claude Code, Cline, Roo Code, Windsurf, and GitHub Copilot.

## Background

Rather than manually duplicating rules across multiple config formats, AIOS maintains a single source of truth and uses a CLI generator to export tailored rule files (e.g. `.cursorrules`, `.windsurfrules`, `.clinerules`, `.github/copilot-instructions.md`).

## Scope

### In Scope

- Implement `aios export` command with `--target [cursor|claude|cline|windsurf|copilot|all]`.
- Map core AIOS principles, task reading rules, and verification constraints into target-specific rule formats.
- Support auto-syncing during `aios update` or `aios adopt`.

### Out of Scope

- Modifying core tool-agnostic AGENTS.md rules.

## Affected Areas

- CLI: `cli/src/exporter.ts`, `cli/src/index.ts`
- Documentation: Tool integration guides.

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 3 / P3)
- Blocking tasks: TASK-041

## Acceptance Criteria

- [x] `aios export --target cursor` generates `.cursor/rules/` or `.cursorrules`.
- [x] `aios export --target cline` generates `.clinerules`.
- [x] `aios export --target copilot` generates `.github/copilot-instructions.md`.
- [x] `aios export --target all` generates all supported adapters.
- [x] CLI unit tests verify generated rule contents.

## Testing Expectations

- Unit tests: Assert exported file contents against expected rule templates in `cli/test/`.

## Done Summary

- Files changed:
  - `cli/src/exporter.ts`
  - `cli/src/core.ts`
  - `cli/src/index.ts`
  - `cli/test/exporter.test.ts`
  - `cli/test/commands.test.ts`
- Tests run: `npm test` (all 102 tests passed successfully)
- Acceptance criteria status: All met.
- Risks: None.

