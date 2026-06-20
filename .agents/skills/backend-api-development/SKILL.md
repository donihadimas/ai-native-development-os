---
name: backend-api-development
description: Use when implementing or reviewing backend API behavior in a stack-agnostic project.
---

# Backend API Development

## Goal

Guide backend API implementation so endpoints are contract-aligned, secure by default, testable, and independent of any specific framework.

## When to Use

Use this skill when:

- implementing backend endpoints,
- reviewing API handler or service behavior,
- translating an OpenAPI contract into backend tasks,
- designing validation, errors, authorization, and tests for an API feature.

## Inputs

Expected inputs:

- active backend task,
- API contract or API notes,
- related PRD acceptance criteria,
- related ADRs,
- existing backend code and nearby tests.

## Outputs

Expected outputs:

- backend implementation plan,
- endpoint behavior notes,
- validation and error handling expectations,
- authorization notes,
- test plan or test updates.

## Process

Step-by-step process:

1. Resolve the active backend task without reading every task body. Use direct task filenames under `docs/tasks/` and exclude `docs/tasks/done/` unless reviewing completed work.
2. Read only the selected active backend task and API contract.
3. Confirm endpoint behavior maps to acceptance criteria.
4. Identify validation, authorization, persistence, and side effects.
5. Search existing backend patterns before adding new abstractions.
6. Implement behavior behind clear module or service boundaries.
7. Return responses and errors that match the contract.
8. Add tests for happy path, error path, and authorization or validation boundaries.
9. Report contract alignment and any drift.

## Rules

Hard rules:

- Do not implement an endpoint from guessed frontend needs.
- Do not open every task file to discover the active backend task.
- Do not bypass server-side validation or authorization.
- Do not leak secrets or internal error details.
- Do not introduce framework-specific architecture into reusable OS docs.
- Do not mark API work done while contract and behavior disagree.

## Quality Checklist

Before finishing, verify:

- [ ] Active backend task was read.
- [ ] API contract or notes were read.
- [ ] Validation behavior is defined.
- [ ] Error responses align with the contract.
- [ ] Authorization is considered.
- [ ] Tests cover behavior and failure modes.
- [ ] Contract drift is reported.

## Failure Modes

Watch out for:

- controller-only logic with no clear boundary,
- reading all task files before choosing the backend task,
- success-only endpoint tests,
- frontend and backend schema drift,
- unvalidated input,
- framework lock-in in reusable guidance.

## Example Prompt

```text
Use the backend-api-development skill to implement the backend task for the profile API based on docs/api/openapi.yaml.
```
