# Security Principles

## Assume External Input Is Hostile

Validate and sanitize input from users, clients, webhooks, jobs, files, and third-party services.

## Protect Secrets

Never store secrets in source code. Use environment-specific secret management and avoid logging sensitive values.

## Enforce Authorization Server-Side

Frontend checks improve UX, but backend authorization must protect data and actions.

## Minimize Access

Use least privilege for users, services, tokens, databases, and third-party integrations.

## Production Defaults

Use secure defaults for authentication, authorization, input validation, secret handling, logging, dependency updates, and operational access. Security-sensitive changes need explicit review evidence before release.
