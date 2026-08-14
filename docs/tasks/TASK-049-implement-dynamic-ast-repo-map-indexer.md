# TASK-049: Implement Dynamic AST Repository Map Indexer (aios map)

## Status

Planned

## Objective

Create an automated code repository mapper (`aios map`) that extracts key symbols, exports, signatures, and file relationships into `.aios/repo-map.json`, replacing brittle manual `context-map.md` files.

## Background

Manually maintained `context-map.md` documents quickly become stale and incomplete as codebases grow. An automated AST/tree-sitter based indexer provides agents with high-density, accurate code structure snapshots at minimal token cost.

## Scope

### In Scope

- Implement `aios map` command in CLI.
- Parse key source files (TS, JS, Python, Go, Rust, Dart) to extract exports, classes, interfaces, and function signatures.
- Output a compact, token-efficient repository map at `.aios/repo-map.json`.
- Integrate repo-map retrieval into agent context assembly.

### Out of Scope

- Full semantic code search engines or remote vector embeddings.

## Affected Areas

- CLI: `cli/src/indexer.ts`, `cli/src/index.ts`
- Shared docs: Replace `docs/context/context-map.md` requirements with dynamic repo-map usage.

## Dependencies

- Related PRD: `prd.md`
- Related design: `review.md` (Phase 3 / P3)
- Blocking tasks: None

## Acceptance Criteria

- [ ] `aios map` scans project source directories and writes `.aios/repo-map.json`.
- [ ] Output represents files, symbols, and signatures concisely (<2,000 tokens for average projects).
- [ ] Agent instructions leverage `.aios/repo-map.json` for precise file targeting.
- [ ] Tests verify indexing on standard language samples.

## Testing Expectations

- Unit tests: Test symbol extraction for TypeScript/JavaScript, Python, and Go fixtures.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
