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

Write down decisions, contracts, and constraints that future tasks need. Avoid documenting temporary implementation noise.
