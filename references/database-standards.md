# Database Standards

## Model Real Behavior

Design data around user workflows, invariants, and query patterns instead of premature normalization or convenience alone.

## Make Migrations Safe

Schema changes should consider backward compatibility, rollback, data volume, indexes, and production timing.

## Protect Integrity

Use constraints, transactions, and validation to protect important invariants close to the data.

## Avoid Hidden Coupling

Keep database decisions visible in architecture docs or ADRs when they affect multiple modules.

## Defer Complex Workflow

Detailed migration-plan templates and database migration workflows belong in V2.
