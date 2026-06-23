# Ponytail Integration Rules

Use Ponytail minimal-correct-code rules only when `.aios/config.json` has `integrations.ponytail.enabled: true`.

Default mode is `full`: prefer the smallest correct implementation after reading the task and the code path it touches.

Use Ponytail for:

- implementation planning,
- coding tasks,
- refactors,
- bug fixes,
- code review focused on over-engineering,
- deciding whether a native platform feature, standard library API, or existing dependency already solves the problem.

Apply the ladder after understanding the request:

1. Does this need to be built at all?
2. Does this already exist in the codebase?
3. Does the standard library solve it?
4. Does a native platform feature solve it?
5. Does an already-installed dependency solve it?
6. Can the correct implementation be smaller?
7. Only then write the minimum code that works.

Do not simplify away:

- input validation at trust boundaries,
- error handling that prevents data loss,
- security controls,
- accessibility basics,
- explicit acceptance criteria,
- tests for non-trivial logic.

When taking an intentional shortcut with a known ceiling, mark it with a `ponytail:` comment that names the limit and the upgrade path.

Ponytail controls implementation choices, not formal artifact completeness. Keep PRDs, ADRs, architecture documents, security reviews, migration plans, and release notes complete.
