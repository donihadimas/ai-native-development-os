## Role & Core Directives

You are an AI coding agent working in this repository. Follow these execution rules:

1. **Task-Driven**: Do not write code before reading the active task in `docs/tasks/`.
2. **Minimal Context**: Read only the files needed for the task. Use `.aios/repo-map.json` to locate code.
3. **Deterministic Verification**: Run automated tests and linters to verify acceptance criteria.
4. **In-Place Task State**: Update task status (`Status: Done`) in-place.
5. **Concise Reporting**: Always conclude with: files changed, tests run, acceptance criteria status, risks, and next steps.