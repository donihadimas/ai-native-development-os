# AIOS Deep Audit

## Executive Summary

This document presents a comprehensive, evidence-based architectural audit of **AI-Native Development OS (AIOS)** ([prd.md](file:///a:/personal/ai-native-development-os/prd.md)).

AIOS was created to provide a structured, tool-agnostic development operating system for solo fullstack developers using AI coding agents (such as Antigravity, Codex, Cline, Roo Code, and Claude Code). Its core vision is to prevent "vibe coding"—unstructured, brittle, context-heavy AI interaction—by establishing clear document-driven lifecycles (PRD, Architecture, ADR, Tasks, Implementation, Review, Testing, Release).

### Key Audit Findings

1. **Over-engineered Meta-Ceremony**: AIOS suffers from severe multi-layer instruction duplication across 5 distinct abstraction layers (`commands/`, `prompts/`, `skills/`, `workflows/`, and `references/`). An agent attempting to perform a single task is routed through up to 6 meta-documents before writing code.
2. **Extreme Token Bloat**: Loading global instructions, skill routers, workflow steps, prompt instructions, skill instructions, and reference manuals consumes **8,000–14,000 tokens of meta-context per task** before the agent even inspects source code or project documentation.
3. **Passive & Non-Deterministic Verification**: AIOS relies heavily on the agent self-reporting completion (`Status: Done` in markdown files) rather than automated, deterministic tool-based verification.
4. **Fragile State Management**: Active work status is stored in mutable Markdown text files ([docs/tasks/](file:///a:/personal/ai-native-development-os/docs/tasks/)). Archiving completed tasks requires manual file movement to `done/` subdirectories, which creates sync lag, broken file references, and git noise.
5. **CLI & Artifact Disconnect**: The Node.js CLI ([cli/src/index.ts](file:///a:/personal/ai-native-development-os/cli/src/index.ts)) generates stub files and copies directory trees (`.aios/`), but does not participate in task execution, verification, agent runtime monitoring, or state enforcement.

---

## Current Architecture

The current AIOS architecture relies on a **file-system-driven, multi-layered instruction tree** intended to steer IDE-based agents.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           AI Coding Agent                               │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
              1. Reads Global Rules & Skill Router
                                   ▼
┌───────────────────────────────┬─────────────────────────────────────────┐
│ AGENTS.md / CLAUDE.md         │ .aios/skill-router.md                   │
└───────────────────────────────┴─────────────────────────────────────────┘
                                   │
              2. Cascades Through Workflow layers
                                   ▼
┌───────────────────────────────┬─────────────────────────────────────────┐
│ .aios/workflows/*.workflow.md │ .aios/commands/*.md                     │
├───────────────────────────────┼─────────────────────────────────────────┤
│ .aios/prompts/*.md            │ .aios/skills/*/SKILL.md                 │
├───────────────────────────────┴─────────────────────────────────────────┤
│ .aios/references/*.md & .aios/templates/*.md                            │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
              3. Reads Project State & Operates on Files
                                   ▼
┌───────────────────────────────┬─────────────────────────────────────────┐
│ docs/tasks/*.md               │ docs/plans/*.md                         │
├───────────────────────────────┼─────────────────────────────────────────┤
│ docs/context/context-map.md   │ Source Code (frontend/, backend/, etc.) │
└───────────────────────────────┴─────────────────────────────────────────┘
```

### Architectural Layer Breakdown

* **Global Agent Instructions**: [AGENTS.md](file:///a:/personal/ai-native-development-os/AGENTS.md) acts as the root system instruction. It mandates reading `.aios/config.json` and `.aios/skill-router.md`.
* **Routing Layer**: [skill-router.md](file:///a:/personal/ai-native-development-os/skill-router.md) maps intent to 11 workflows, 16 skills, 14 prompts, 14 references, and 14 templates.
* **Instruction Redundancy Quadruplet**:
  1. `commands/`: 14 CLI/prompt invocation shims (e.g., [commands/create-adr.md](file:///a:/personal/ai-native-development-os/commands/create-adr.md)).
  2. `prompts/`: 14 lifecycle prompts (e.g., [prompts/03-generate-adr.md](file:///a:/personal/ai-native-development-os/prompts/03-generate-adr.md)).
  3. `skills/`: 16 skill definition directories (e.g., [skills/adr-generator/SKILL.md](file:///a:/personal/ai-native-development-os/skills/adr-generator/SKILL.md)).
  4. `workflows/`: 11 step-by-step development sequence guides (e.g., [workflows/new-feature.workflow.md](file:///a:/personal/ai-native-development-os/workflows/new-feature.workflow.md)).
* **Execution & Scaffolding**: [cli/src/index.ts](file:///a:/personal/ai-native-development-os/cli/src/index.ts) is a CLI utility written in TypeScript (using `commander` and `@inquirer/prompts`) that initializes projects, copies `.aios/` assets into repositories, and generates document templates.

---

## Current Workflow

Derived directly from the repository's workflow markdown files ([workflows/](file:///a:/personal/ai-native-development-os/workflows/)), the end-to-end lifecycle follows this linear sequence:

```
[Developer Idea]
       │
       ▼
 1. PRODUCT DISCOVERY ────────► Output: docs/product/vision.md
       │                       (Skill: product-discovery)
       ▼
 2. PRD GENERATION ───────────► Output: docs/product/PRD.md
       │                       (Skill: prd-generator)
       ▼
 3. ARCHITECTURE DESIGN ──────► Output: docs/architecture/system-architecture.md
       │                       (Skill: architecture-design)
       ▼
 4. ADR CREATION ─────────────► Output: docs/adr/ADR-00X-name.md
       │                       (Skill: adr-generator)
       ▼
 5. TASK BREAKDOWN ───────────► Output: docs/tasks/TASK-00X-name.md
       │                       (Skill: task-breakdown)
       ▼
 6. IMPLEMENTATION PLAN ──────► Output: docs/plans/TASK-00X-plan.md
       │                       (Skill: implementation-planner)
       ▼
 7. TASK IMPLEMENTATION ──────► Modifies Source Code
       │                       (Skill: task-implementation)
       ▼
 8. TESTING & VALIDATION ─────► Runs test commands manually
       │                       (Skill: testing)
       ▼
 9. CODE REVIEW ──────────────► Output: docs/reviews/REVIEW-00X.md
       │                       (Skill: code-review)
       ▼
10. RELEASE MANAGEMENT ────────► Updates CHANGELOG.md & docs/releases/
                               (Skill: release-management)
```

### Critical Flow Analysis

* **Fact**: The lifecycle requires up to 10 sequential documents before code is committed.
* **Inference**: For small features or solo bugfixes, this ceremony creates overwhelming frictional overhead. Solo developers will bypass the system entirely if small changes require 10 document steps.

---

## Strengths

1. **Principled Context Routing Philosophy**: The core mandate in [AGENTS.md](file:///a:/personal/ai-native-development-os/AGENTS.md#L22) ("Do not read the whole repository by default") accurately targets the biggest failure mode of modern AI coding agents: context dilution.
2. **Standardized Task Format**: [templates/task.template.md](file:///a:/personal/ai-native-development-os/templates/task.template.md) enforces clear acceptance criteria, affected file lists, and verification steps.
3. **Tool-Agnostic Specification**: AIOS core directives are stored as pure Markdown files ([AGENTS.md](file:///a:/personal/ai-native-development-os/AGENTS.md), [CLAUDE.md](file:///a:/personal/ai-native-development-os/CLAUDE.md)), making them usable across Antigravity, Claude Code, Cline, Roo Code, and Codex.
4. **Structured CLI Bootstrapping**: The CLI ([cli/src/index.ts](file:///a:/personal/ai-native-development-os/cli/src/index.ts)) provides `aios init`, `aios adopt`, `aios validate`, and `aios update`, giving projects a consistent starting configuration.
5. **Integration Rules for Context Control**: Support for external tools like RTK (command output truncation) and Caveman (concise agent responses) directly addresses LLM response bloat.

---

## Critical Problems

1. **Massive Over-abstraction & Redundancy**:
   - `commands/`, `prompts/`, `skills/`, and `workflows/` duplicate the same instructions 4 times. For example, `create-adr` exists as a command, a prompt, a skill, and a workflow.
2. **Context & Token Exhaustion**:
   - An agent starting work on a task must load [AGENTS.md](file:///a:/personal/ai-native-development-os/AGENTS.md) (130 lines), [skill-router.md](file:///a:/personal/ai-native-development-os/skill-router.md) (101 lines), a workflow file (~150 lines), a prompt file (~50 lines), a skill file (~134 lines), reference manuals (~200 lines), and context maps (~50 lines). This totals over **10,000 tokens of meta-instructions** before inspecting actual code.
3. **No Deterministic Verification Gate**:
   - AIOS relies on the agent self-reporting success by editing Markdown checkboxes in [docs/tasks/](file:///a:/personal/ai-native-development-os/docs/tasks/). There is no automated CLI hook or test execution runner validating git diffs or assertion status.
4. **Stale State & File Archive Decay**:
   - Moving tasks to `docs/tasks/done/` breaks relative Markdown links across ADRs, PRDs, and implementation plans.
5. **Lack of Dynamic Context Discovery**:
   - AIOS relies on static `context-map.md` files curated manually by the developer, which quickly become stale as the project evolves.

---

## Context Engineering Findings

### Context Classification Matrix

| Context Type | Current AIOS Representation | Audit Evaluation | Recommendation |
| :--- | :--- | :--- | :--- |
| **PERMANENT** | [AGENTS.md](file:///a:/personal/ai-native-development-os/AGENTS.md), [.aios/config.json](file:///a:/personal/ai-native-development-os/.aios/config.json) | Necessary root rules, but bloated by router references. | Keep ultra-lean (<40 lines). |
| **PROJECT** | `docs/product/PRD.md`, `docs/architecture/*` | High value, but agents are forced to read whole documents. | Use header-based progressive disclosure. |
| **TASK** | `docs/tasks/*.md`, `docs/plans/*.md` | Active task specification. | Keep as primary execution unit. |
| **DYNAMIC** | `git diff`, test outputs, compiler errors | Currently raw text dumps. | Enforce RTK/summarization filters. |
| **EPHEMERAL** | Conversation history, tool call logs | Grows unbounded in agent memory. | Enforce strict context boundaries. |

### Context Violations Identified

* **Violation 1**: [AGENTS.md](file:///a:/personal/ai-native-development-os/AGENTS.md#L26) directs the agent to read `.aios/skill-router.md` on every interaction in full mode.
  * *Impact*: ~1,000 wasted input tokens per agent turn.
* **Violation 2**: [skills/task-implementation/SKILL.md](file:///a:/personal/ai-native-development-os/skills/task-implementation/SKILL.md#L50) demands reading `AGENTS.md` and `context-map.md` inside the skill step, repeating rules already loaded in the system prompt.
  * *Impact*: Circular context loading and token duplication.

---

## Token Efficiency Findings

### Conceptual Token Cost Model Per Task

$$\text{Token Cost} = T_{\text{baseline}} + T_{\text{router}} + T_{\text{workflow}} + T_{\text{skill}} + T_{\text{references}} + T_{\text{task}} + T_{\text{code}} + T_{\text{output}} + T_{\text{retries}}$$

#### Current Estimated Token Usage (Full Mode)

* $T_{\text{baseline}}$ (AGENTS.md): ~1,200 tokens
* $T_{\text{router}}$ (skill-router.md): ~1,000 tokens
* $T_{\text{workflow}}$ (new-feature.workflow.md): ~1,500 tokens
* $T_{\text{skill}}$ (task-implementation/SKILL.md): ~1,200 tokens
* $T_{\text{references}}$ (engineering + testing principles): ~2,500 tokens
* $T_{\text{task}}$ + $T_{\text{plan}}$: ~1,500 tokens
* **Meta-Context Baseline Overhead**: **~8,900 tokens PER TURN**

#### Optimized Token Usage (Target Architecture)

* Single consolidated Agent Rule File: ~800 tokens
* Dynamically loaded Skill (only when triggered): ~600 tokens
* Task file + target code snippets: ~2,000 tokens
* **Optimized Meta-Context Overhead**: **~3,400 tokens PER TURN** (61% Token Reduction)

### Token Waste Sources Ranked by Priority

1. **HIGH**: Duplicated instruction trees (`commands/` vs `prompts/` vs `skills/` vs `workflows/`).
2. **HIGH**: Mandatory reading of `skill-router.md` on every step.
3. **MEDIUM**: Verbose Markdown headers, preamble prose, and repetitive "Quality Checklists" across all skills.
4. **LOW**: Raw template files loaded into context during non-creation steps.

---

## Task Engine Findings

* **Current Model**: Flat list of Markdown files in `docs/tasks/`.
* **Strengths**: Human-readable, version-controlled with git.
* **Deficiencies**:
  * **No Task Graph / Dependency Awareness**: Tasks cannot express prerequisite dependencies (e.g., `TASK-002` depends on `TASK-001`).
  * **Manual State Transitions**: Moving files from `docs/tasks/` to `docs/tasks/done/` requires manual filesystem edits by the agent or developer.
  * **No Partial Task Recovery**: If an agent fails mid-task, state recovery relies on parsing uncommitted git diffs.

---

## Agent Orchestration Audit

### Agent Role Classification

| Role / Artifact | Current AIOS Status | Recommended Classification | Action |
| :--- | :--- | :--- | :--- |
| **Product Orchestrator** | Fragmented across `product-discovery` & `prd-generator` | **MERGE** | Combine into unified `Spec Planner` |
| **Architect Agent** | Fragmented across `architecture-design` & `adr-generator` | **MERGE** | Combine into unified `Architecture Planner` |
| **Task Breakdown Agent** | `task-breakdown` skill | **CORE** | Retain as Task Planner |
| **Implementation Agent** | `task-implementation` skill | **CORE** | Retain as Code Executor |
| **Reviewer Agent** | `code-review` & `security-review` | **MERGE** | Combine into single `Review & Verification Gate` |

### Multi-Agent vs. Single Strong Agent Tradeoff

```
                     ┌──────────────────────────────────────────┐
                     │ Single Strong Agent + Deterministic CLI  │
                     └──────────────────────────────────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     [ Single Agent Architecture ]                   [ Multi-Agent Architecture ]
     - Low Context Overhead                          - High Token Duplication
     - Zero Inter-agent Latency                      - High Handoff Latency
     - Deterministic CLI Verification                - Emergent Hallucinations
     - High Reliability & Low Cost                   - High Debugging Complexity
```

**Recommendation**: Retain a **Single Strong Agent Architecture** (or simple Planner $\rightarrow$ Executor loop). Avoid multi-agent orchestration for solo developer workflows.

---

## Skill System Audit

Comprehensive audit of all 16 skills in [skills/](file:///a:/personal/ai-native-development-os/skills/):

| Skill Name | Primary Purpose | Recommendation | Justification & Token Risk |
| :--- | :--- | :--- | :--- |
| `product-discovery` | Refine raw product vision | **MERGE** into `spec` | High prose bloat. Combine with PRD generation. |
| `prd-generator` | Generate structured PRDs | **MERGE** into `spec` | Overlaps heavily with `product-discovery`. |
| `architecture-design` | System architecture design | **MERGE** into `arch` | Combine with ADR generator. |
| `adr-generator` | Write ADR files | **MERGE** into `arch` | Minimal standalone value; redundant template wrapper. |
| `task-breakdown` | Decompose specs to tasks | **KEEP** | Essential task engine input. |
| `implementation-planner` | Plan file-level edits | **MERGE** into `task-exec` | Redundant precursor step to implementation. |
| `task-implementation` | Execute active task | **KEEP** | Core workhorse skill. Needs simplification. |
| `code-review` | Review diffs against criteria | **MERGE** into `verify` | Combine with security review & test validation. |
| `security-review` | Audit security constraints | **MERGE** into `verify` | Redundant standalone step for non-security tasks. |
| `testing` | Generate & run tests | **MERGE** into `verify` | Core verification step; combine with review. |
| `api-contract-design` | OpenAPI / API specs | **KEEP (Optional)** | Valuable for fullstack project shape. |
| `backend-api-development` | Backend implementation | **REMOVE** | Generic coding instructions; overlaps with `task-implementation`. |
| `database-migration` | Schema & migration plans | **KEEP (Optional)** | Useful for DB-heavy projects. |
| `ui-ux-design` | Frontend UI design specs | **KEEP (Optional)** | Useful for FE-heavy projects. |
| `context-management` | Context routing rules | **REMOVE** | Belongs in core `AGENTS.md` rule system, not as a skill. |
| `release-management` | Changelog & release notes | **SIMPLIFY** | Reduce to single template automation. |

---

## Memory Audit

AIOS currently manages memory across 4 distinct mechanisms:

1. **Project Knowledge**: Persistent Markdown files (`PRD.md`, `architecture.md`).
2. **Task State**: Mutable Task Markdown files (`TASK-001.md`).
3. **Decisions**: Immutable ADR files (`ADR-001.md`).
4. **Context Maps**: Manually maintained `context-map.md`.

### Failure Modes Identified

* **Context Map Decay**: Developers forget to update `context-map.md` when new modules are added, causing agents to miss critical code folders.
* **Duplicate History**: `done/` directories store historical tasks that are never re-read by agents during active development, wasting disk space and confusing file searches.

---

## Verification Audit

### Current vs. Ideal Verification Model

```
CURRENT MODEL (Passive / Trust-Based):
Agent edits code ──► Agent edits Task Markdown [x] Done ──► Agent claims "Task Complete"
(No automated check that code compiles or tests pass!)

IDEAL MODEL (Deterministic / Tool-Based):
Agent edits code ──► CLI runs `test` & `build` ──► CLI checks `git diff` ──► AIOS Verifies
```

### Violations of "AI Proposes, Tools Verify"

* [skills/task-implementation/SKILL.md#L60](file:///a:/personal/ai-native-development-os/skills/task-implementation/SKILL.md#L60) instructs the agent to check off acceptance criteria boxes manually. If tests fail, the agent can still mark the task as `Done` in Markdown text.

---

## Failure Recovery Audit

AIOS currently **lacks bounded execution constraints**. If an agent enters a failure loop:

* It will repeatedly attempt edits until context limit or model API timeout occurs.
* There is no git auto-stash or rollback mechanism when tests fail repeatedly.

### Recommended Execution Bounds

```yaml
max_iterations_per_task: 5
max_files_changed_per_task: 8
max_consecutive_test_failures: 3
auto_rollback_on_failure: true
```

---

## Git / Worktree Audit

* **Current Status**: AIOS operates directly on the active working tree.
* **Risks**:
  * Concurrent agent runs will overwrite each other's changes.
  * Dirty working trees can cause agents to accidentally commit incomplete code.
* **Recommendation**: Enforce **Git Worktree Isolation** for agent task execution (`.aios/worktrees/task-XXX`).

---

## Observability Audit

AIOS currently provides **zero metrics or telemetry** on agent performance.

### Recommended Key Metrics to Track (via CLI)

```json
{
  "task_id": "TASK-016",
  "duration_seconds": 142,
  "input_tokens": 42100,
  "output_tokens": 3200,
  "tool_calls": 18,
  "files_changed": 3,
  "test_status": "PASSED",
  "verification_passed": true
}
```

---

## Competitive Analysis

| System / Tool | Strengths | AIOS Advantage | Missing Capability in AIOS |
| :--- | :--- | :--- | :--- |
| **Cline / Roo Code** | Deep MCP integration, interactive approval flow | Stronger document lifecycle (PRD/ADR/Tasks) | Automated diff verification & execution bounds |
| **Aider** | Excellent git auto-commits, repo map building via ctags | Broader software engineering lifecycle support | Dynamic AST/code-graph repository mapping |
| **Claude Code** | Ultra-fast agentic loops, sub-agent spawning | Framework/tool agnosticism | Bounded task execution graphs |
| **AGENTS.md (Standard)** | Minimalist single-file system prompt | Standardized template ecosystem | Token efficiency & zero-redundancy design |

---

## What Should Be Removed

### Top 10 Things to Remove

1. **`commands/` folder**: Pure redundancy; duplicates prompts and skills.
2. **`prompts/` folder**: Redundant wrapper around skills and templates.
3. **Root vs `.aios/` directory duplication**: Stop keeping duplicate copies in root and `.aios/`.
4. **`context-management` skill**: Move rules into root `AGENTS.md`.
5. **`backend-api-development` skill**: Generic coding instructions that add no domain value.
6. **`docs/tasks/done/` and `docs/plans/done/` archiving ceremony**: Use git history instead of moving files into archive folders.
7. **Starters without code**: Remove markdown-only starter templates ([starters/](file:///a:/personal/ai-native-development-os/starters/)).
8. **Manual `context-map.md`**: Replace with dynamic file resolution.
9. **`skill-router.md` pre-loading mandate**: Remove requirement to read router on every single turn.
10. **Repetitive "Quality Checklists" in SKILL.md files**: Wastes tokens without improving agent adherence.

---

## What Should Be Simplified

1. **Consolidate 16 Skills into 4 Core Lifecycle Skills**:
   * `spec`: Product Discovery + PRD Generator
   * `arch`: Architecture Design + ADR Generator
   * `task`: Task Breakdown + Implementation Planner
   * `verify`: Testing + Code Review + Security Review
2. **Unify System Prompt**: Reduce `AGENTS.md` from 130 lines to <40 lines.
3. **CLI Simplification**: Refactor [cli/src/index.ts](file:///a:/personal/ai-native-development-os/cli/src/index.ts) from 2,490 lines to a sleek task executor and validator.

---

## What Should Be Added

1. **Deterministic Verification Engine**: CLI command (`aios verify`) that runs tests, lints, and checks git diffs automatically.
2. **Dynamic Repository Indexer**: Automatic AST/tree-sitter based code index generator (`.aios/repo-map.json`).
3. **Execution Safety Bounds**: Task iteration counters and git rollback checkpoints.
4. **Task Graph Dependency Representation**: Support `depends_on: ["TASK-001"]` in task headers.

---

## Recommended AIOS Architecture

```
                  ┌──────────────────────────────────────────────┐
                  │                 DEVELOPER                    │
                  └──────────────────────────────────────────────┘
                                          │
                                 aios task run TASK-001
                                          ▼
                  ┌──────────────────────────────────────────────┐
                  │              AIOS CLI RUNTIME                │
                  ├──────────────────────────────────────────────┤
                  │ 1. Resolves Task & Dependencies              │
                  │ 2. Builds Dynamic Context (Repo Map + Task)  │
                  │ 3. Spawns Agent in Isolated Worktree        │
                  └──────────────────────────────────────────────┘
                                          │
                                          ▼
                  ┌──────────────────────────────────────────────┐
                  │            AI AGENT (Single Core)            │
                  ├──────────────────────────────────────────────┤
                  │ Reads: L0 (Rules) + L2 (Task) + L4 (Code)    │
                  │ Executes: Code Edits & Test Invocation       │
                  └──────────────────────────────────────────────┘
                                          │
                                          ▼
                  ┌──────────────────────────────────────────────┐
                  │        DETERMINISTIC VERIFICATION            │
                  ├──────────────────────────────────────────────┤
                  │ - Runs test suite                            │
                  │ - Validates linters & build                  │
                  │ - Inspects git diff against criteria         │
                  └──────────────────────────────────────────────┘
                                          │
                     ┌────────────────────┴────────────────────┐
                     ▼                                         ▼
            [ PASS: Commit & Merge ]                  [ FAIL: Rollback / Retry ]
```

---

## Recommended Directory Structure

```text
ai-native-development-os/
├── AGENTS.md                  # Minimalist root rules (<40 lines)
├── .aios/
│   ├── config.json            # Machine-readable AIOS settings
│   ├── repo-map.json          # Dynamically generated code graph
│   └── skills/                # Consolidated 4 Core Skills
│       ├── spec.md            # Discovery + PRD
│       ├── arch.md            # Architecture + ADR
│       ├── task.md            # Task Breakdown & Planning
│       └── verify.md          # Verification + Review + Testing
├── docs/                      # Single Source of Truth
│   ├── PRD.md                 # System PRD
│   ├── architecture.md        # System Architecture
│   ├── adr/                   # Architecture Decision Records
│   └── tasks/                 # Active & Completed Tasks (Flat structure)
└── cli/                       # Lightweight Verification & Task Engine
    └── src/
        ├── index.ts           # CLI Entrypoint
        └── verify.ts          # Deterministic Verification Runner
```

---

## Recommended Task Lifecycle

```
Task Drafted ──► Dependency Check ──► Worktree Created ──► Agent Edits ──► CLI Verify (Pass) ──► Git Commit
                                                                   │
                                                                   └──► CLI Verify (Fail x3) ──► Rollback
```

---

## Recommended Context Lifecycle

```
[Trigger Task]
      │
      ▼
Load L0: Root System Rules (~300 tokens)
      │
      ▼
Load L2: Active Task Specification (~500 tokens)
      │
      ▼
Load L4: Relevant Code Snippets from Dynamic Repo Map (~1,500 tokens)
      │
      ▼
Total Initial Prompt: ~2,300 tokens (vs 10,000+ current)
```

---

## Recommended Agent Lifecycle

1. **Initialize**: Read minimal `AGENTS.md` and active task file.
2. **Context Resolution**: Query dynamic repository map for affected files.
3. **Execute**: Modify target source files.
4. **Self-Check**: Invoke project test runner.
5. **Verify**: Pass execution handle to `aios verify`.

---

## Token Optimization Strategy

### Layered Context Hierarchy (L0–L5)

```
┌────────────────────────────────────────────────────────────────────────┐
│ L0: Global Rules (AGENTS.md) — Loaded Always (~300 tokens)              │
├────────────────────────────────────────────────────────────────────────┤
│ L1: Project Config (.aios/config.json) — Loaded Always (~100 tokens)    │
├────────────────────────────────────────────────────────────────────────┤
│ L2: Task Specification (docs/tasks/TASK-X.md) — Per Task (~500 tokens) │
├────────────────────────────────────────────────────────────────────────┤
│ L3: Architecture / ADR — Loaded ONLY when task references ADR          │
├────────────────────────────────────────────────────────────────────────┤
│ L4: Source Code Snippets — Dynamically retrieved via AST Repo Map      │
├────────────────────────────────────────────────────────────────────────┤
│ L5: Terminal / Tool Output — Filtered via RTK Truncation               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## AIOS Maturity Score

| Dimension | Score (0–10) | Empirical Evidence & Rationale |
| :--- | :---: | :--- |
| **1. Architecture** | `5/10` | Clear vision, but severe multi-layer instruction duplication. |
| **2. Context Engineering** | `4/10` | Good routing philosophy, but heavy context bloat in practice. |
| **3. Token Efficiency** | `3/10` | Wastes 8k–14k tokens per task on redundant meta-instructions. |
| **4. Task Decomposition** | `6/10` | Solid task template, but lacks dependency graphs and auto-state updates. |
| **5. Agent Orchestration** | `5/10` | Works for single agents, but over-complicates skill routing. |
| **6. Skill Architecture** | `4/10` | 16 skills contain heavy prose redundancy and overlapping responsibilities. |
| **7. Memory** | `4/10` | File-based memory suffers from path decay when archiving tasks to `done/`. |
| **8. Tool Management** | `5/10` | Good support for RTK/Caveman, but no custom verification tools. |
| **9. Verification** | `2/10` | Relies on LLM self-reporting; lacks automated verification gates. |
| **10. Failure Recovery** | `2/10` | No execution bounds, iteration limits, or git rollbacks. |
| **11. Git Safety** | `3/10` | Operates on active dirty tree; lacks worktree isolation. |
| **12. Observability** | `1/10` | Zero token, cost, or success metrics tracked. |
| **13. Developer Experience** | `6/10` | Easy CLI setup (`aios init`), but high ceremony for small tasks. |
| **14. Portability** | `7/10` | Highly portable Markdown-based specifications. |
| **15. Extensibility** | `5/10` | Modular structure, but rigid folder expectations. |

**Overall AIOS Maturity Score**: **4.1 / 10**

---

## Prioritized Roadmap

```
PHASE 0: Prune Redundancy & Unify Layers (Quick Wins)
   │
   ▼
PHASE 1: Token & Context Optimization
   │
   ▼
PHASE 2: Deterministic Verification Engine
   │
   ▼
PHASE 3: Bounded Execution & Git Worktrees
   │
   ▼
PHASE 4: Dynamic Context & Code Graph Indexing
```

---

## P0 Actions (Immediate - High Impact)

1. **Delete redundant folders**: Remove `commands/` and `prompts/` directories.
2. **Consolidate 16 skills into 4 core skills**: `spec.md`, `arch.md`, `task.md`, `verify.md`.
3. **Slim down `AGENTS.md`**: Reduce root prompt size from 130 lines to <40 lines.
4. **Eliminate file movement to `done/`**: Keep tasks in `docs/tasks/` with `status: completed` to preserve link stability.

---

## P1 Actions (Short Term)

1. **Implement `aios verify` CLI command**: Execute test suite and lint checks automatically.
2. **Remove mandatory pre-loading of `skill-router.md`**: Use dynamic skill invocation.
3. **Add task dependency graph support**: Support `depends_on` in task headers.

---

## P2 Actions (Medium Term)

1. **Add Git Worktree Isolation**: Run tasks in `.aios/worktrees/`.
2. **Implement AST Repo Map Generator**: Dynamic repository context indexer.
3. **Implement Bounded Execution**: Auto-abort agent after 5 failed test attempts.

---

## Final Recommendation

> **Architectural Answer**:
> If I were the lead architect responsible for AIOS for the next 2 years:
>
> 1. **KEEP**: The core product philosophy—Document-Driven AI Development, tool-agnostic Markdown specifications, and strict task-level scope bounds.
> 2. **REMOVE**: The multi-layered instruction bloat (`commands/`, `prompts/`, 12 out of 16 redundant skills, `done/` folder archiving, and manual `context-map.md` files).
> 3. **REDESIGN**: The verification and task engine—transitioning AIOS from a passive collection of guidance Markdown files into a **lightweight, deterministic CLI runtime** that validates agent output against test suites and git diffs.
> 4. **BUILD NEXT**: An automated AST-based repository indexer (`aios map`) and git-worktree task isolation engine (`aios task run`) to achieve maximum agent reliability at minimum token cost.