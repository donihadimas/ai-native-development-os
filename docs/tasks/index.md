# Task Index

Use this index before opening task files. Open task bodies only after selecting the relevant task.

## Active Queue (AIOS Core Modernization Roadmap)

### Phase 0: Prune Redundancy & Unify Layers (P0 - Immediate)

| Task | Status | Path | Notes |
| --- | --- | --- | --- |
| TASK-039 | Done | `docs/tasks/TASK-039-prune-redundant-meta-layers.md` | Deleted redundant `commands/` and `prompts/` directories. |
| TASK-040 | Done | `docs/tasks/TASK-040-consolidate-core-lifecycle-skills.md` | Consolidated 16 skills into 4 core lifecycle skills (`spec`, `arch`, `task`, `verify`). |
| TASK-041 | Done | `docs/tasks/TASK-041-streamline-root-agent-instructions.md` | Streamlined `AGENTS.md` and `CLAUDE.md` to <30 lines. |
| TASK-042 | Done | `docs/tasks/TASK-042-eliminate-done-archiving-and-fix-link-decay.md` | Eliminated `done/` folder archiving to prevent broken markdown links. |

### Phase 1: Deterministic Verification & Dependencies (P1 - Short Term)

| Task | Status | Path | Notes |
| --- | --- | --- | --- |
| TASK-043 | Planned | `docs/tasks/TASK-043-implement-deterministic-cli-verification.md` | Build `aios verify` test, lint, and diff runner. |
| TASK-044 | Planned | `docs/tasks/TASK-044-dynamic-skill-invocation-without-router-preload.md` | Remove mandatory `skill-router.md` pre-loading. |
| TASK-045 | Planned | `docs/tasks/TASK-045-add-task-graph-dependency-resolution.md` | Support `depends_on` task graphs and DAG resolution. |
| TASK-046 | Planned | `docs/tasks/TASK-046-cleanup-empty-starters-and-quality-checklists.md` | Clean up doc-only starters and repetitive checklists. |

### Phase 2: Bounded Execution & Git Worktrees (P2 - Medium Term)

| Task | Status | Path | Notes |
| --- | --- | --- | --- |
| TASK-047 | Planned | `docs/tasks/TASK-047-implement-git-worktree-task-isolation.md` | Add Git worktree isolation (`.aios/worktrees/task-XXX`). |
| TASK-048 | Planned | `docs/tasks/TASK-048-implement-bounded-execution-and-auto-rollback.md` | Enforce retry bounds and automatic failure rollback. |

### Phase 3 & 4: Dynamic Indexing, Adapters & Telemetry (P3 - Long Term)

| Task | Status | Path | Notes |
| --- | --- | --- | --- |
| TASK-049 | Planned | `docs/tasks/TASK-049-implement-dynamic-ast-repo-map-indexer.md` | Implement dynamic AST repository map indexer (`aios map`). |
| TASK-050 | Planned | `docs/tasks/TASK-050-implement-multi-tool-agent-config-exporter.md` | Multi-tool agent config exporter for Cursor, Cline, etc. (`aios export`). |
| TASK-051 | Planned | `docs/tasks/TASK-051-implement-agent-telemetry-and-metrics-logging.md` | Local task execution metrics and telemetry logger (`aios stats`). |

### Existing Queue

| Task | Status | Path | Notes |
| --- | --- | --- | --- |
| TASK-016 | Blocked | `docs/tasks/TASK-016-validate-website-docs-navigation-and-build.md` | Website validation task blocked by related guide tasks. |

## Completed Archive

Completed task bodies live directly under `docs/tasks/` (or historical archive `docs/tasks/done/`).

| Task Range | Status | Path |
| --- | --- | --- |
| TASK-001 - TASK-015 | Done | `docs/tasks/done/` |
| TASK-017 - TASK-036 | Done | `docs/tasks/done/` |
| TASK-037 | Done | `docs/tasks/done/TASK-037-add-ponytail-integration.md` |
| TASK-038 | Done | `docs/tasks/done/TASK-038-add-guided-integration-repo-links.md` |

## Routing Rules

- Prefer this index before listing or opening task files.
- Active task discovery should use direct files under `docs/tasks/`.
- Update this index when creating, completing, blocking, or archiving tasks.
