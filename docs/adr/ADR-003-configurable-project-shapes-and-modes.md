# ADR-003: Support Configurable Project Shapes and Modes

## Status

Accepted

## Context

AIOS is meant for many project types. A fullstack app may need `frontend/` and `backend/`, a package may need `src/`, and a workflow repository may only need docs. Early skeleton behavior could leave unrelated placeholder folders, which made docs-only or library projects look wrong.

## Decision

AIOS will store project setup choices in `.aios/config.json` and use them for validation and routing:

- `mode`: `full` or `lite`
- `docsRoot`: where project docs live
- `projectShape`: `fullstack`, `frontend`, `backend`, `mobile`, `library`, or `docs`
- `skillDelivery`: `portable`, `native`, or `both`
- `selectedAgents` and `selectedSkills`
- optional integration config

Project shape controls required placeholder folders:

- `fullstack`: `frontend/` and `backend/`
- `frontend`: `frontend/`
- `backend`: `backend/`
- `mobile`: `mobile/`
- `library`: `src/`
- `docs`: no app placeholder folders

`adopt` may remove only newly created empty placeholders that do not match the selected shape. It must not delete existing user code.

## Alternatives Considered

- Always create `frontend/` and `backend/`: rejected because it confuses docs-only, library, backend-only, and mobile projects.
- Infer shape only from existing folders: rejected because users need explicit control during setup and validation.
- Separate skeletons for every shape: deferred because shared skeleton plus shape logic is simpler for now.

## Consequences

### Positive

- Generated and adopted projects better match user intent.
- Validation reflects the actual project type.
- Agents can use `projectShape` to decide where code should live.

### Negative

- Shape logic increases CLI complexity.
- Existing projects from older AIOS versions may contain stale placeholder folders.

### Neutral / Trade-Offs

- Shape controls placeholders and validation, not framework choice.
- Users can still keep additional folders if they contain real project code.

## Related Documents

- PRD: `docs/product/prd.md`
- Architecture: `docs/architecture/architecture.md`
- Tasks: `docs/tasks/`
