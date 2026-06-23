---
title: Integrations
description: Optional RTK, Caveman, and Ponytail integration rules for local AIOS workflows.
---

Integrations are optional rules that help AIOS cooperate with external tools. They are rules-first: AIOS can add local guidance without installing external software.

The current integration targets are RTK, Caveman, and Ponytail.

## What Integrations Are For

Use integrations when a project needs consistent local instructions for an external workflow tool:

- RTK for noisy command output and summarized operational traces.
- Caveman-style brevity for short operational updates.
- Ponytail for minimal-correct-code implementation choices.

These integrations do not replace formal project documents. Do not use brevity rules or minimal-code guidance to weaken PRDs, ADRs, architecture docs, security reviews, migration plans, release artifacts, acceptance criteria, validation, security, accessibility, or needed tests.

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

Add Ponytail rules without installing the external skill/plugin:

```bash
aios integration add ponytail . --dry-run
aios integration add ponytail . --mode full
```

Add all supported rules:

```bash
aios integration add all .
```

External install actions require explicit confirmation:

```bash
aios integration add rtk . --install --yes
aios integration add ponytail . --install --agents codex --yes
```

## Remove Or Repair Rules

Remove local rules:

```bash
aios integration remove rtk . --scope project
aios integration remove ponytail . --scope project
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
