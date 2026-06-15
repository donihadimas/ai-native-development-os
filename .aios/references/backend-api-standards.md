# Backend API Standards

## Contract Alignment

Backend API behavior should match the contract in `<docsRoot>/api/`. Resolve `docsRoot` from `.aios/config.json` or default to `docs`. If implementation reveals the contract is wrong, update and review the contract before continuing client integration.

Treat the contract as a production interface. Backward compatibility, predictable errors, auth behavior, and validation rules should be explicit before dependent frontend or integration work starts.

## Boundary Validation

Validate path parameters, query parameters, headers, request bodies, authentication state, and authorization scope at the API boundary.

Normalize inputs at the boundary and keep invalid data out of domain and persistence layers.

## Stable Error Semantics

Use consistent error codes, messages, and status categories. Avoid leaking internal exception details to clients.

Cover common production cases: validation failure, authentication required, authorization denied, not found, conflict, rate limit, upstream failure, and unexpected server error.

## Clear Behavior Ownership

Keep transport handling, domain behavior, persistence, and external side effects understandable as separate responsibilities even when a framework encourages mixing them.

Prefer maintainable boundaries over clever shortcuts. Shared business rules should not be duplicated across handlers, jobs, and clients.

## Production Readiness

Important API behavior should include logging, observability hooks, idempotency or retry notes when relevant, and safe handling of timeouts and upstream failures.

## Test Expectations

API changes should include tests or documented checks for happy path, validation failures, authorization failures, not-found behavior, and contract compatibility when relevant.
