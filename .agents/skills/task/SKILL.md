---
name: task
description: Use when breaking down specifications into actionable tasks, creating implementation plans, and executing code modifications.
---

# Task (Breakdown, Planning & Implementation)

## Goal

Decompose PRDs and architectural designs into bite-sized, independently testable tasks, create execution plans, and implement the necessary code changes.

## When to Use

- When translating PRDs/ADRs into `docs/tasks/TASK-XXX.md`.
- When planning concrete file modifications for an active task.
- When implementing code for an assigned task.

## Expected Outputs

- `docs/tasks/TASK-XXX-<slug>.md` (Task specification)
- `docs/plans/TASK-XXX-plan.md` (Implementation plan if non-trivial)
- Working source code changes matching acceptance criteria.

## Process

1. **Task Breakdown**:
   - Scope tasks to be achievable in a single focused session.
   - Specify clear in-scope, out-of-scope, affected files, and testable acceptance criteria checkboxes (`- [ ]`).
2. **Implementation Planning**:
   - Identify precise target files and code symbols.
   - Note dependencies and failure risks.
3. **Execution**:
   - Modify target files with minimal, correct code.
   - Keep task status up to date in `docs/tasks/`.
4. **Next Step**: Route to Verification (`verify`).
