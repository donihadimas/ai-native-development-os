---
name: TASK-052-implement-graphify-optional-integration
status: Done
depends_on: ["TASK-049", "TASK-050"]
---

# TASK-052: Implement Graphify Optional Integration

## Goal

Add Graphify as a platform-agnostic, opt-in integration to the AIOS ecosystem to enable codebase relationship mappings and dependency queries.

## Acceptance Criteria

1. [x] Extend `IntegrationName` type in `cli/src/core.ts` to include `"graphify"`.
2. [x] Define Graphify repository link and metadata in `INTEGRATION_REPO` and `INTEGRATION_DESCRIPTION`.
3. [x] Create rule template file at `integrations/graphify.md` with guidelines on using `graphify query` and `graphify ingest`.
4. [x] Implement OS-agnostic command detection and installer in `installCommand` supporting `uv`, `pipx`, and standard `pip` fallbacks.
5. [x] Integrate dynamic auto-ingestion inside `aios map` command when Graphify integration is enabled.
6. [x] Pass all tests including a new unit test for Graphify integration.
