---
name: api-contract-design
description: Use when defining or updating an API contract before frontend and backend integration work begins.
---

# API Contract Design

## Goal

Create a clear API contract that keeps frontend and backend implementation synchronized before either side guesses request or response shapes.

## When to Use

Use this skill when:

- a feature requires frontend/backend integration,
- API request or response shape is unclear,
- backend endpoints are planned before frontend work,
- frontend implementation needs a stable contract,
- an existing API contract may change.

## Inputs

Expected inputs:

- relevant PRD or feature requirements,
- architecture constraints,
- related ADRs,
- existing API notes or OpenAPI files,
- affected frontend and backend tasks.

## Clarification Gate

Before writing an API contract, check whether these are clear enough:

- consumer and provider responsibilities,
- user action or capability the API supports,
- resources and endpoint intent,
- authentication and authorization expectations,
- request fields,
- response fields,
- error cases and status semantics.

If request/response/error behavior is unclear, stop and ask the user 4-7 focused questions before generating the contract. Do not invent fields that are not tied to product behavior.

## Outputs

Expected outputs:

- API contract in `docs/api/`,
- request and response shapes,
- error responses,
- authentication or authorization notes,
- contract risks and open questions.

## Process

Step-by-step process:

1. Read the feature requirements and acceptance criteria.
2. Identify required user actions and data exchanges.
3. Define endpoints, methods, request bodies, response bodies, and errors.
4. Add authentication and authorization expectations when relevant.
5. Update or create an OpenAPI file using `templates/openapi.template.yaml`.
6. Link the contract from related frontend and backend tasks.
7. Record unresolved contract decisions as open questions or ADR candidates.

## Rules

Hard rules:

- Do not implement frontend or backend before the contract is clear.
- Do not invent fields that are not tied to product behavior.
- Do not hide error behavior.
- Do not make breaking changes without naming migration impact.
- Do not treat OpenAPI as a replacement for task acceptance criteria.

## Quality Checklist

Before finishing, verify:

- [ ] Endpoints map to product requirements.
- [ ] Request and response shapes are explicit.
- [ ] Error responses are defined.
- [ ] Auth expectations are stated when relevant.
- [ ] Frontend and backend tasks link to the contract.
- [ ] Open questions are recorded.

## Failure Modes

Watch out for:

- frontend and backend guessing different shapes,
- success-only contracts without errors,
- over-general API fields,
- undocumented breaking changes,
- contract files that drift from tasks.

## Example Prompt

```text
Use the api-contract-design skill to create docs/api/openapi.yaml for the profile feature before backend and frontend implementation.
```
