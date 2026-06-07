# Architecture Principles

## Boundaries First

Each module should have a clear responsibility, stable interface, and limited knowledge of other modules.

## Decisions Need Context

Record important trade-offs as ADRs. A good ADR explains context, decision, alternatives, and consequences.

## Prefer Evolutionary Architecture

Start with the smallest architecture that satisfies the current requirements and leaves a safe path for expected growth.

## Separate Policy from Plumbing

Keep domain rules distinct from framework adapters, transport code, storage code, and presentation details.

## Design for Replacement

External services, infrastructure, and frameworks should be isolated enough that they can be replaced without rewriting business logic.
