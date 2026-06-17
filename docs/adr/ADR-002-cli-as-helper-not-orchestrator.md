# ADR-002: Keep the CLI as Helper, Not Orchestrator

## Status

Accepted

## Context

AIOS includes a CLI because repeated setup, template generation, native skill install, and validation are tedious by hand. However, turning the CLI into an autonomous development engine would blur responsibility between deterministic setup and AI-assisted coding.

## Decision

The `aios` CLI will remain a deterministic helper. It may:

- create or adopt project structure,
- install or repair `.aios/` assets,
- install native skill files,
- generate document stubs from templates,
- manage local integration rules,
- validate structure,
- recommend the next step.

It will not generate application code, run an AI agent, choose a framework, apply migrations, deploy, publish, or bypass human review.

## Alternatives Considered

- Full orchestration CLI: rejected because it increases risk and complexity before real-project workflow validation.
- No CLI: rejected because repeated manual setup creates friction and inconsistency.
- Agent-only setup: rejected because users still need deterministic filesystem operations and validation.

## Consequences

### Positive

- CLI behavior remains testable and predictable.
- AI agents stay responsible for reasoning and implementation.
- Human users retain ownership of architecture, dependencies, security, and release choices.

### Negative

- Users still need to open an AI agent and ask it to perform workflow steps.
- Some workflows require manual review between generated artifacts.

### Neutral / Trade-Offs

- The CLI can grow with file generation and validation, but not into autonomous coding.
- Future automation should be approved by new ADRs.

## Related Documents

- PRD: `docs/product/prd.md`
- Architecture: `docs/architecture/architecture.md`
- Tasks: `docs/tasks/`
