# Backend Principles

## Protect Domain Rules

Business rules should live in clear service or domain boundaries, not be scattered across controllers, routes, or UI assumptions.

## Validate Inputs at Boundaries

Validate external input before it reaches domain logic. Treat clients, webhooks, and jobs as untrusted boundaries.

## Keep Side Effects Explicit

Database writes, external calls, emails, payments, and background jobs should be visible and testable.

## Design Errors Deliberately

Return stable error responses and log enough context to debug without leaking secrets.

## Avoid Framework Lock-In

Use framework features pragmatically, but keep core behavior understandable outside the framework.
