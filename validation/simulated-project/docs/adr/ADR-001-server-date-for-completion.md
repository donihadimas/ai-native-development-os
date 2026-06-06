# ADR-001: Use Server Date for Habit Completion

## Status

Accepted

## Context

The MVP needs a simple rule for determining whether a habit was completed today.

## Decision

Use server date for completion records in the MVP.

## Alternatives Considered

- User local date: better UX across time zones but requires timezone handling.
- Server date: simpler and deterministic for the MVP.

## Consequences

### Positive

- Simpler backend validation.
- Easier duplicate-completion prevention.

### Negative

- Users in different time zones may see date boundaries that feel wrong.

## Related Documents

- PRD: `docs/product/prd.md`
- Architecture: `docs/architecture/architecture.md`
