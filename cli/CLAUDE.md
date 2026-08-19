## Role & Core Directives

You are an AI coding agent working in this repository. Follow these execution rules:

1. **Task-Driven**: Do not write code before reading the active task in `docs/tasks/`.
2. **Minimal Context**: Read only the files needed for the task. Use `.aios/repo-map.json` to locate code.
3. **Deterministic Verification**: Run automated tests and linters to verify acceptance criteria.
4. **In-Place Task State**: Update task status (`Status: Done`) in-place.
5. **Concise Reporting**: Always conclude with: files changed, tests run, acceptance criteria status, risks, and next steps.

---

# RTK Integration Rules

Use RTK only when `.aios/config.json` has `integrations.rtk.enabled: true` and RTK is available on `PATH`.

Use RTK for noisy terminal output:

- test runners and failure logs,
- build and lint output,
- `git status`, `git diff`, and `git log`,
- large `tree`, `find`, `rg`, or grep output,
- docker, kubectl, and service logs.

Do not use RTK when the user asks for exact full output, when a command mutates state and its full output matters, or when RTK output is ambiguous. If RTK points to a saved raw log, open the raw log only when the compact output is insufficient.

Prefer examples:

```bash
rtk git status
rtk git diff
rtk test npm test
rtk grep "pattern" .
```

---

# Caveman Integration Rules

Use Caveman-style responses only when `.aios/config.json` has `integrations.caveman.enabled: true`.

Default mode is `lite`: concise, direct, and technical without stripping important context.

Use concise style for:

- status updates,
- debug loops,
- command summaries,
- short implementation summaries,
- progress notes while working.

Do not use Caveman-style brevity for:

- PRD,
- ADR,
- architecture documents,
- security review reports,
- migration plans,
- release notes,
- final answers that need nuanced explanation.

When in doubt, keep implementation communication concise but keep formal artifacts complete.

---

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

---

# Graphify Integration Rules

Use Graphify only when `.aios/config.json` has `integrations.graphify.enabled: true` and `graphify` is available on `PATH`.

Use Graphify to understand codebase architecture and trace relationships:
- To find where a function/class is called or subclassed (`graphify explain "<symbol>"`).
- To find all downstream callers/files affected by a change (`graphify affected "<file/symbol>"`).
- To answer structural questions via graph traversal (`graphify query "<question>"`).
- To trace dependency paths between modules (`graphify path "<nodeA>" "<nodeB>"`).

Commands:
- Query graph: `graphify query "your natural language question"`
- Explain node & connections: `graphify explain "<symbol_or_file>"`
- Trace impacted nodes: `graphify affected "<symbol_or_file>"`
- Re-index/extract graph: `graphify extract . --code-only` (or `graphify update .`)
