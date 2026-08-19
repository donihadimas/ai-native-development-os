# Engineering Principles

## Optimize for Verified Progress

Prefer small, reviewable changes with explicit acceptance criteria. A task is not complete until behavior is implemented, verified, and summarized.

## Make the Simple Path Safe

Default to clear structure, explicit names, and boring solutions. Add abstraction only after repeated behavior proves the need.

Simple should still be production-aware: validate inputs, handle failures, preserve data, avoid hidden coupling, and make behavior observable where it matters.

## Preserve Local Context

Search existing code and docs before adding new patterns. Work with the current architecture instead of bypassing it.

## Keep Human Decisions Human

Architecture, security, dependencies, data model changes, and product trade-offs require human approval when consequences are non-obvious.

## Document Durable Knowledge

Write down decisions, contracts, and constraints that future tasks need. Avoid documenting temporary implementation noise. Explain WHY, not WHAT.

## Architecture & Layer Separation

- **UI Layer**: Must not contain business logic.
- **Application/UseCase Layer**: Orchestrates business logic.
- **Domain Layer**: Must not depend on infrastructure. Keep entities pure and value objects immutable.
- **Infrastructure Layer**: Must never contain business rules. Database access only through repositories.
- **Dependency Direction**: Always point inward (UI -> Application -> Domain -> Infrastructure). Never reverse dependencies.
- **Modularization**: Modules communicate through contracts. Avoid cyclic dependencies, minimize coupling, and maximize cohesion.

## Core Engineering Rules

- Follow SOLID principles.
- Prefer composition over inheritance.
- Apply DRY only after duplication appears multiple times. Follow KISS.
- Avoid premature optimization and overengineering. Write code for maintainability first.
- Prefer readability over cleverness. Minimize technical debt. Every abstraction must solve a real problem.

## Code Readability & File Organization

- **Naming**: Use meaningful names that reveal intent. Avoid abbreviations. Avoid single-letter variables except loop counters.
- **Organization**: One responsibility per file, class, or component. Keep files reasonably small and split large modules.

## Function & Naming Conventions

- **Functions**: Single responsibility. Prefer pure functions. Keep functions focused and small. Minimize parameters. Avoid side effects. Prefer early return and avoid deep nesting.
- **Naming Conventions**: Use Verbs for functions, Nouns for classes. Booleans must start with `is/has/can/should`. Avoid generic names like `data`, `value`, `temp`, `item` (use `invoiceAmount`, `activeSubscription` instead).

## AI-Specific Rules

- **Never** invent APIs, package names, or framework features.
- Verify imports exist before writing them. Prefer official documentation.
- Use stable APIs and avoid deprecated ones.
- Match project architecture and do not change unrelated code.
- Explain trade-offs for major decisions. Flag assumptions explicitly when requirements are incomplete.
