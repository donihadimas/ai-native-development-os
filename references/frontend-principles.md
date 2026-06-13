# Frontend Principles

## Build Around User Tasks

UI structure should reflect user goals, not backend tables or implementation convenience.

Use `<docsRoot>/design/design.md` when it exists. Frontend implementation should match accepted user flows, screens, interface states, visual direction, typography, spacing, color, component patterns, responsive rules, and accessibility expectations before inventing new UI behavior.

## Treat Design Tokens As A Contract

When a design document defines typography, color, spacing, radius, elevation, or component states, treat those rules as implementation constraints. Reuse existing project tokens or UI primitives first, and update the design document before introducing a new visual pattern.

## Keep State Understandable

Prefer local state for local behavior and shared state only when multiple views truly need it.

## Validate Close to Interaction

Give users timely feedback and keep frontend validation aligned with backend rules.

## Make Loading and Failure States First-Class

Every async flow should define loading, empty, success, and error behavior.

## Respect API Contracts

Do not assume backend response shapes. Use `<docsRoot>/api/` when integration is involved, resolving `docsRoot` from `.aios/config.json` or defaulting to `docs`.
