# API Standards

## Contract Before Integration

When app integration is involved, define or update the API contract before client implementation.

## Consistent Shape

Use consistent request, response, error, pagination, filtering, and authentication conventions within a project.

## Explicit Errors

Errors should be predictable, typed or coded where possible, and useful to both users and developers.

## Backward Compatibility

Avoid breaking existing clients without a migration path. Document breaking changes clearly.

## Contract Location

Generated projects store contracts under `<docsRoot>/api/`, where `docsRoot` comes from `.aios/config.json` or defaults to `docs`.
