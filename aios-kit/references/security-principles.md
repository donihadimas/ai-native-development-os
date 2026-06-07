# Security Principles

## Assume External Input Is Hostile

Validate and sanitize input from users, clients, webhooks, jobs, files, and third-party services.

## Protect Secrets

Never store secrets in source code. Use environment-specific secret management and avoid logging sensitive values.

## Enforce Authorization Server-Side

Frontend checks improve UX, but backend authorization must protect data and actions.

## Minimize Access

Use least privilege for users, services, tokens, databases, and third-party integrations.

## Security in V1

V1 includes security principles and review checklist coverage. A dedicated security-review skill and workflow are deferred to V2.
