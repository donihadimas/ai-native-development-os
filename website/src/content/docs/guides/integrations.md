---
title: Integrations
description: Optional RTK and Caveman integration rules for local AIOS workflows.
---

Integrations are optional rules that help AIOS cooperate with external tools. They are rules-first: AIOS can add local guidance without installing external software.

The current integration targets are RTK and Caveman.

## What Integrations Are For

Use integrations when a project needs consistent local instructions for an external workflow tool:

- RTK for noisy command output and summarized operational traces.
- Caveman-style brevity for short operational updates.

These integrations do not replace formal project documents. Do not use brevity rules for PRDs, ADRs, architecture docs, security reviews, migration plans, release artifacts, or acceptance criteria.

## List Supported Integrations

```bash
aios integration list
```

## Check Integration Status

```bash
aios integration status
```

This prints project config, local rule state, and detected external tool state.

## Add Local Integration Rules

Add RTK rules without installing the external tool:

```bash
aios integration add rtk . --dry-run
aios integration add rtk .
```

Add all supported rules:

```bash
aios integration add all .
```

External install actions require explicit confirmation:

```bash
aios integration add rtk . --install --yes
```

## Remove Or Repair Rules

Remove local rules:

```bash
aios integration remove rtk . --scope project
```

Repair missing local rules for enabled integrations:

```bash
aios integration repair
```

Run a broader diagnostic:

```bash
aios integration doctor
```

## Safety Boundaries

- Integrations are optional.
- They should not store secrets.
- They should not silently install external tools.
- They should not change application behavior.
- They should not weaken AIOS documentation and review requirements.

Use integrations only when they make the local agent workflow clearer.

## Related Pages

- [Integrations Folder](/reference/integrations-folder) - Catalog of integration rule files
- [Command Guide](/guides/command-guide) - Choose the right command for your situation
- [CLI Reference](/reference/cli) - Full `aios integration` command syntax
