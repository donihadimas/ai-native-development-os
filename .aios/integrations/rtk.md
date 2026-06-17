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

