# API Standards

## Contract Before Integration

When app integration is involved, define or update the API contract before client implementation.

Contracts should be reviewed as production-facing interfaces: stable enough for clients, explicit enough for tests, and versioned or migrated when breaking behavior changes.

## Consistent Shape

Use consistent request, response, error, pagination, filtering, and authentication conventions within a project.

Prefer boring, documented conventions over endpoint-specific surprises. Keep naming, IDs, timestamps, and nullability consistent.

## Explicit Errors

Errors should be predictable, typed or coded where possible, and useful to both users and developers.

Do not leak internal exception details. Include enough machine-readable information for clients to handle validation, authorization, not-found, conflict, and rate-limit cases.

## Backward Compatibility

Avoid breaking existing clients without a migration path. Document breaking changes clearly.

For production APIs, consider additive changes first. When breaking changes are unavoidable, document rollout, deprecation, and client coordination.

## Operational Readiness

API behavior should be observable and support debugging. Important endpoints should have clear logging, metrics or traces where appropriate, and documented failure modes.

## Contract Location

Generated projects store contracts under `<docsRoot>/api/`, where `docsRoot` comes from `.aios/config.json` or defaults to `docs`.
