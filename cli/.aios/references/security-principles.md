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

## Comprehensive Security Rules (OWASP)

- **Authentication vs Authorization**: Verify authorization separately from authentication. Ensure checks exist for every protected action.
- **Data Protection**: Never hardcode secrets. Never log passwords or stack traces. Use secure cookies and explicit rate limiting.
- **Injection & XSS**: Never concatenate SQL. Always escape output before rendering in the DOM. Sanitize all rich text payloads (e.g. DOMPurify).
- **Server-to-Client Leakage**: For SSR or full-stack frameworks, explicitly sanitize payloads sent from the server. Never leak `.env` variables or full database objects to the client bundle. Only send the exact fields required by the UI.
