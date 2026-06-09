# Context Budget

AI agents should load the smallest useful context set before acting.

Rules:

- Start from `.aios/config.json`, `AGENTS.md`, the context map, and the active task.
- Prefer focused `rg`, targeted file reads, and compact command output.
- Do not paste large logs, generated files, dependency trees, or full diffs into context by default.
- Summarize large command output and open raw details only when needed.
- If RTK is enabled and available, use it for noisy commands before reading raw output.
- Preserve exact output when debugging parser issues, security findings, release logs, or user-requested command output.

Good default:

1. Read the task and relevant docs.
2. Search affected files.
3. Inspect only the files that can change the decision.
4. Run focused validation.
5. Summarize results with paths to deeper evidence.

