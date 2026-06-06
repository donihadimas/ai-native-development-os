# Backend API Standards

## Contract Alignment

Backend API behavior should match the contract in `docs/api/`. If implementation reveals the contract is wrong, update and review the contract before continuing frontend integration.

## Boundary Validation

Validate path parameters, query parameters, headers, request bodies, authentication state, and authorization scope at the API boundary.

## Stable Error Semantics

Use consistent error codes, messages, and status categories. Avoid leaking internal exception details to clients.

## Clear Behavior Ownership

Keep transport handling, domain behavior, persistence, and external side effects understandable as separate responsibilities even when a framework encourages mixing them.

## Test Expectations

API changes should include tests or documented checks for happy path, validation failures, authorization failures, not-found behavior, and contract compatibility when relevant.
