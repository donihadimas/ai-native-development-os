# Database Standards

## Model Real Behavior

Design data around user workflows, invariants, and query patterns instead of premature normalization or convenience alone.

## Make Migrations Safe

Schema changes should consider backward compatibility, rollback, data volume, indexes, and production timing.

Prefer expand-and-contract changes for production systems when existing data or deployed clients may be affected.

## Protect Integrity

Use constraints, transactions, and validation to protect important invariants close to the data.

Do not rely only on UI or client validation for invariants that protect money, access, identity, ownership, or critical workflow state.

## Avoid Hidden Coupling

Keep database decisions visible in architecture docs or ADRs when they affect multiple modules.

## Operational Readiness

Plan indexes, query patterns, data volume, backups, rollback, and verification before applying risky changes. Migration plans should identify pre-checks and post-checks before implementation.

## Database Query & Schema Rules

- **Schema**: Normalize when appropriate. Version migrations explicitly. Always support rollback mechanisms.
- **Queries**: Index frequently queried columns. Avoid `SELECT *`.
- **Retrieval**: Always paginate collection returns to prevent unbounded memory usage.
- **Transactions**: Use transactions correctly to guarantee atomic operations across related tables.
