# V2 Roadmap Workflow

## Input

- V1 validation results.
- Pain points from at least one real or simulated project.
- Repeated manual steps observed during V1 usage.

## Process

1. Review V1 usage notes and validation results.
2. Identify repeated manual work that automation would reduce.
3. Separate CLI needs from stack-adapter needs.
4. Separate starter-template needs from workflow/documentation needs.
5. Prioritize only improvements proven useful by V1 usage.
6. Keep the CLI small: copy skeletons and create docs from templates.
7. Plan stack adapters independently from the core OS.
8. Add GitHub automation only after manual review and testing workflow is stable.

## Output

- V2 candidate list.
- Prioritized roadmap.
- Deferred items.
- Risks and validation needs.

## Done Criteria

- V2 items are based on actual V1 pain points.
- CLI scope remains small.
- Stack adapters do not pollute the V1 core.
- Security, OpenAPI, migrations, and GitHub automation are considered as extensions, not prerequisites.
