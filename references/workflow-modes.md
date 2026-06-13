# Workflow Modes

Use the lightest workflow mode that matches the project setup.

## Resolve Mode

1. If `.aios/config.json` exists, read it first.
2. Use `mode` from config:
   - `full`: use the local `.aios/` workflow kit.
   - `lite`: use project docs plus root or agent-provided workflow instructions.
3. If `.aios/config.json` does not exist, treat the project as `lite`.
4. Resolve `docsRoot` from config when available; otherwise use `docs`.
5. Resolve `projectShape` from config when available; otherwise infer from existing folders.

## Full Mode

In full mode:

- Use `.aios/skill-router.md` before choosing a skill.
- Use `.aios/prompts/` or `.aios/commands/` for known workflows.
- Use `.aios/templates/` when creating documents.
- Use `.aios/references/` for durable engineering guidance.
- Use `.aios/workflows/` for end-to-end flow steps.
- If integrations are enabled, use `.aios/integrations/rtk.md` and `.aios/integrations/caveman.md` according to their rules.

## Lite Mode

In lite mode:

- Use `AGENTS.md`, `<docsRoot>/context/context-map.md`, and the active task or product document as the primary context.
- Use the repository-level AIOS prompts, skills, templates, references, and workflows only if they are available to the agent.
- If the workflow kit is not available, follow the same sequence manually:
  vision -> PRD -> PRD review -> architecture -> ADRs -> design/API planning when needed -> tasks -> one task -> tests -> review -> release notes.
- Do not assume `.aios/skill-router.md`, `.aios/templates/`, or `.aios/references/` exist.
- Keep outputs smaller than full mode, but preserve acceptance criteria, risks, tests, and next step guidance.

## Integration Rules

When `.aios/config.json` enables integrations:

- Use RTK for noisy command output unless the user needs exact full output or the compact result is ambiguous.
- Use Caveman-style brevity for operational updates and debug loops.
- Do not use Caveman-style brevity for formal artifacts such as PRDs, ADRs, architecture, security reviews, migration plans, release notes, or reports that need trade-offs and evidence.

## Required Next Step

Every workflow output must end with:

- what the user should review,
- whether the artifact is ready for the next stage,
- the next recommended action,
- the artifact or prompt/skill to use next when known.
