# AGENTS.md

## Role

You are an AI coding agent working in this repository.

## Core Rule

Do not code before reading the active task file.

## Context Routing

Use `docs/context/context-map.md` to decide which documents to read. Do not read the whole repository by default.

## Required Before Implementation

1. Read the active task in `docs/tasks/`.
2. Read related ADRs if the task mentions them.
3. Read the relevant PRD or architecture sections only when acceptance criteria or constraints are unclear.
4. Search existing code before creating new abstractions.
5. Identify affected files.
6. Make a short implementation plan.

## Hard Constraints

- Do not modify unrelated files.
- Do not introduce new dependencies without approval.
- Do not store secrets in source code.
- Do not bypass tests.
- Do not mark work done if acceptance criteria are not satisfied.

## Done Response

Always report:

- files changed,
- tests run,
- acceptance criteria status,
- risks,
- next recommended step.
