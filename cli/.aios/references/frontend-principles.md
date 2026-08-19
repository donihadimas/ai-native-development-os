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

## Framework-Agnostic UI Rules

- **Component Composition**: Prefer composition over prop drilling.
- **State Management**: Avoid unnecessary state. Derive state whenever possible. Keep state close to where it's used.
- **Server vs Client**: (For frameworks like Next.js) Use Server Components by default. Client Components only when necessary. Keep server logic on the server and never expose secrets to the client bundle. Cache intentionally and avoid unnecessary hydration.
- **Mobile Patterns**: (For Android/Flutter) Prefer MVVM/MVI, repository pattern, dependency injection, and offline-first architectures. Use unidirectional data flow (e.g., StateFlow).

## Frontend Performance Rules

- **Rendering**: Minimize unnecessary rerenders. Memoize only when measured (e.g., `useMemo`/`useCallback` strictly for heavy computations or reference stability).
- **Data Loading**: Implement lazy loading, pagination, and streaming for heavy data. Avoid N+1 queries on the client or during SSR.
- **Allocations**: Avoid repeated object allocations in render paths. Cache only when beneficial. Measure before optimizing.

## Accessibility (A11y) Rules

- Use semantic HTML tags.
- Ensure full keyboard navigation support.
- Ensure screen reader support.
- Verify color contrast ratios.
- Use ARIA attributes only when semantic HTML is insufficient.

## Internationalization (i18n) Rules

- No hardcoded text strings in UI components.
- Use locale-aware formatting for dates, numbers, and currencies.
- Maintain timezone awareness across interactions.
