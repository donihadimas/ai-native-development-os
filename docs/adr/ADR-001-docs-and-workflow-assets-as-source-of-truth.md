# ADR-001: Use Docs and Workflow Assets as Source of Truth

## Status

Accepted

## Context

AI-assisted development often loses continuity when requirements, decisions, and prompts live only in chat history. AIOS needs a durable structure that can be reviewed, versioned, copied into projects, and consumed by different AI agents.

## Decision

AIOS will use repository files as the source of truth:

- `docs/` stores project-specific product, architecture, ADR, task, review, API, and context documents.
- `.aios/` stores local workflow assets copied from AIOS: commands, prompts, templates, references, workflows, integrations, and optionally skills.
- Native agent folders may receive skill copies, but the Markdown source remains the canonical reusable asset.

## Alternatives Considered

- Chat-only workflow: rejected because context is hard to review, reuse, and validate.
- SaaS dashboard as the primary source: deferred because it would add operational complexity before the file-based workflow is proven.
- Tool-specific agent configuration only: rejected because AIOS should remain portable across agents.

## Consequences

### Positive

- Project context can be versioned and reviewed.
- Agents can be routed to specific files instead of receiving large context dumps.
- The same workflow can be copied, adopted, or packaged across projects.

### Negative

- Docs can drift if changes do not update the relevant artifacts.
- More files exist in generated/adopted projects.

### Neutral / Trade-Offs

- AIOS favors explicit workflow artifacts over invisible automation.
- Human review remains required for product and engineering decisions.

## Related Documents

- PRD: `docs/product/prd.md`
- Architecture: `docs/architecture/architecture.md`
- Tasks: `docs/tasks/`
