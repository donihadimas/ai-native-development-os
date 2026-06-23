---
title: Integrations Folder
description: Catalog of integration rule files in the .aios/integrations/ folder.
---

The `integrations/` folder contains optional integration rules for external AI-native tools. These are Markdown files that tell your AI agent how to cooperate with external tools like RTK, Caveman, and Ponytail.

## What Integrations Are

Integrations are rules-first. AIOS writes local guidance files without requiring external tools to be installed. When you run `aios integration add`, it copies rule files into your project. The agent reads these rules and adjusts its behavior accordingly.

## Integration Files

| File | Purpose |
| --- | --- |
| `README.md` | Overview of available integrations and usage |
| `rtk.md` | Rules for compacting noisy terminal output |
| `caveman.md` | Rules for concise response style |
| `ponytail.md` | Rules for minimal correct implementation choices |

## Detailed Reference

### README.md

**Purpose:** Lists supported integrations and shows basic usage commands.

**When to use:** Reference file for understanding what integrations are available.

**Behavior change:** None - informational only.

**Must not be used for:** Does not activate any integration or install any tool.

**Related CLI commands:**
```bash
aios integration list
aios integration status
```

**Safety boundaries:** Informational file only. Does not store secrets, does not install external tools, does not change agent behavior.

### rtk.md

**Purpose:** Guide the agent to compact noisy terminal command output before it enters AI context.

**When to enable:** When your project generates large command output (test runners, build logs, git output, docker logs).

**Behavior change:** The agent uses RTK to compact output from test runners, build/lint output, git status/diff/log, large file listings, and service logs.

**Must not be used for:**
- When the user asks for exact full output
- When a command mutates state and full output matters
- When RTK output is ambiguous

**Related CLI commands:**
```bash
aios integration list
aios integration status
aios integration add rtk
aios integration remove rtk
aios integration doctor
aios integration repair
```

**Safety boundaries:** RTK compacts output for readability. It does not hide errors or change command behavior. Does not store secrets. External install requires explicit `--install` flag.

### caveman.md

**Purpose:** Guide the agent to use concise response style for status updates and debug loops.

**When to enable:** When you want shorter operational updates during implementation.

**Behavior change:** The agent uses concise, direct responses for status updates, debug loops, command summaries, and progress notes.

**Must not be used for:**
- PRDs, ADRs, architecture documents
- Security review reports, migration plans, release notes
- Final answers that need nuanced explanation

**Related CLI commands:**
```bash
aios integration list
aios integration status
aios integration add caveman
aios integration add caveman --mode lite
aios integration remove caveman
aios integration doctor
aios integration repair
```

**Safety boundaries:** Caveman style applies only to operational communication. Formal artifacts remain complete. Does not store secrets. External install requires explicit `--install` flag.

### ponytail.md

**Purpose:** Guide the agent to prefer the smallest correct implementation after understanding the task and affected code.

**When to enable:** When you want coding work to avoid unnecessary abstractions, dependencies, scaffolding, or custom code that native platform features already cover.

**Behavior change:** The agent uses Ponytail's minimal-correct-code ladder for implementation, refactor, bugfix, and over-engineering review work.

**Must not be used for:**
- Skipping task/context reading
- Removing explicit acceptance criteria
- Weakening validation, security, accessibility, or needed tests
- Shrinking formal artifacts that need complete reasoning

**Related CLI commands:**
```bash
aios integration list
aios integration status
aios integration add ponytail
aios integration add ponytail --mode full
aios integration remove ponytail
aios integration doctor
aios integration repair
```

**Safety boundaries:** Ponytail affects implementation choices only. Formal artifacts remain complete. Does not store secrets. External install requires explicit `--install` flag.

## Rules-First Behavior

When you enable an integration:

1. AIOS writes local rule files to `.aios/integrations/`
2. The config in `.aios/config.json` is updated with `integrations.<name>.enabled: true`
3. Your AI agent reads the rules and adjusts behavior
4. No external tools are installed unless you explicitly use `--install`

This means integrations work even without the external tool installed. The rules guide the agent to produce output in the expected format.

## Safety Boundaries

All integrations share these safety boundaries:

- **Must not store secrets** - Integration files never contain API keys, tokens, passwords, or credentials.
- **Must not silently install external tools** - External tool installation only runs with explicit `--install` flag and confirmation.
- **Must not weaken documentation requirements** - Formal artifacts (PRDs, ADRs, architecture docs, reviews, release notes) remain complete regardless of integration style settings.

## Related Pages

- [Integrations Guide](/guides/integrations) - How to use integration commands
- [Command Guide](/guides/command-guide) - Integration management commands
- [CLI Reference](/reference/cli) - Full `aios integration` command syntax
- [Building Blocks](/guides/building-blocks) - What each AIOS artifact type does
