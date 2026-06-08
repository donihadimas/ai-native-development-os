# Frontend Principles

## Build Around User Tasks

UI structure should reflect user goals, not backend tables or implementation convenience.

## Keep State Understandable

Prefer local state for local behavior and shared state only when multiple views truly need it.

## Validate Close to Interaction

Give users timely feedback and keep frontend validation aligned with backend rules.

## Make Loading and Failure States First-Class

Every async flow should define loading, empty, success, and error behavior.

## Respect API Contracts

Do not assume backend response shapes. Use `<docsRoot>/api/` when integration is involved, resolving `docsRoot` from `.aios/config.json` or defaulting to `docs`.
