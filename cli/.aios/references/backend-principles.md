# Backend Principles

## Protect Domain Rules

Business rules should live in clear service or domain boundaries, not be scattered across controllers, routes, or UI assumptions.

## Validate Inputs at Boundaries

Validate external input before it reaches domain logic. Treat clients, webhooks, and jobs as untrusted boundaries.

## Keep Side Effects Explicit

Database writes, external calls, emails, payments, and background jobs should be visible and testable.

## Design Errors Deliberately

Return stable error responses and log enough context to debug without leaking secrets.

## Avoid Framework Lock-In

Use framework features pragmatically, but keep core behavior understandable outside the framework.

## Strict Language Rules

- **TypeScript**: Strict mode enabled. Never use `any`; prefer `unknown`. Use discriminated unions and exhaustive switch statements. Prefer `readonly` and avoid type assertions.
- **Go**: Always propagate context. Return explicit errors. Never panic in business logic. Keep interfaces near consumers and avoid global state.
- **Kotlin**: Prefer `val` and immutable collections. Avoid `!!`. Use `Result`, sealed interfaces, and coroutines correctly.

## Error Handling Rules

- Never swallow exceptions and never ignore errors. Handle every failure path.
- Use typed errors. Log useful information but never expose sensitive information.
- Use retry mechanisms only for transient failures. Set timeouts explicitly.

## Observability & Logging Rules

- **Logging**: Use structured logs. Include correlation IDs. Use appropriate log levels and avoid noisy logging. No sensitive information in logs.
- **Observability**: Implement metrics, tracing, health checks, readiness checks, and monitoring hooks.
