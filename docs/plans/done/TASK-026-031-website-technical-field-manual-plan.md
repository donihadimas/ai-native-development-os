# TASK-026-031: Website Technical Field Manual Redesign Plan

## Objective

Move the AIOS documentation website away from generic AI product styling and toward a distinctive Technical Field Manual / OS Workbench experience.

The website should feel like a disciplined engineering operating system: clear, artifact-driven, readable, and useful for repeated reference. The redesign should reduce generic AI visual tropes such as purple/cyan glow, abstract bento claims, and marketing-heavy page structure.

## Design Direction

Use a Technical Field Manual / OS Workbench direction:

- Crisp technical documentation over glossy SaaS landing style.
- Artifact-first communication: skills, templates, workflows, tasks, ADRs, context maps, and config files.
- Dense but readable documentation surfaces.
- Subtle system-console cues through file paths, code surfaces, labels, dividers, and lifecycle diagrams.
- Balanced color system with green, blue, yellow, and red semantic accents instead of one-note purple/cyan gradients.

## Proposed Visual Baseline

### Dark Theme

- Base: `#0B0F14`
- Surface: `#111820`
- Surface soft: `#17212B`
- Border: `#253241`
- Text: `#E6EDF3`
- Muted: `#9BA8B7`
- Primary/action: `#3DDC97`
- Secondary/navigation: `#7AA2F7`
- Decision/warning: `#F4C95D`
- Risk/danger: `#F97066`
- Code background: `#0A0D11`

### Light Theme

- Base: `#F7F8FA`
- Surface: `#FFFFFF`
- Surface soft: `#EEF2F5`
- Border: `#D8DEE7`
- Text: `#111827`
- Muted: `#5F6B7A`
- Primary/action: `#047857`
- Secondary/navigation: `#2563EB`
- Decision/warning: `#B7791F`
- Risk/danger: `#C2413D`

### Typography

Recommended stack:

- Heading: `IBM Plex Sans`
- Body: `Inter`
- Code: `JetBrains Mono`

Do not add web font dependencies without approval. Use system fallbacks first unless a later task explicitly approves font loading.

## Task Sequence

1. TASK-026: Define AIOS Website Visual System
2. TASK-027: Rework Landing Hero Into OS Workbench
3. TASK-028: Replace Generic Bento With Artifact Cards
4. TASK-029: Improve Docs Page Reading Experience
5. TASK-030: Add AIOS Metadata Patterns To Reference Pages
6. TASK-031: Polish Responsive, Accessibility, And Visual QA

## Implementation Strategy

Start with the visual foundation before changing individual components. This keeps later tasks smaller and prevents one-off styling.

Recommended order:

1. Implement TASK-026 first.
2. Implement TASK-027 and TASK-028 together only if the first visual change needs a stronger visible impact.
3. Implement TASK-029 before broad content restructuring.
4. Implement TASK-030 on a small number of high-value reference pages first.
5. Finish with TASK-031 after all visual changes are in place.

## Out Of Scope

- Replacing Starlight with a custom site framework.
- Adding heavy animation, 3D, or complex interactivity.
- Adding new dependencies without approval.
- Rebranding the project name or changing AIOS product positioning.
- Rewriting every documentation page in one task.
- Implementing CLI behavior or stack-specific starters.

## Validation Plan

- Run `npm run build` from `website/` after each implementation task.
- Manually inspect the homepage and key docs pages in desktop and mobile widths.
- Check these pages at minimum:
  - `/`
  - `/guides/skills`
  - `/reference/skills-folder`
  - `/reference/workflows-folder`
- Confirm no text overlap, code overflow, or unreadable contrast in dark and light themes.

## Risks

- Visual polish can expand into broad content rewrites. Keep each task scoped.
- Typography changes may require dependency approval if external fonts are desired.
- Starlight theme variables may constrain component styling; prefer targeted overrides before replacing core layouts.
- Dark theme changes need light theme parity so the site does not become dark-only.

## Next Recommended Step

Implement TASK-026 first using `implementation-planner`, then build and review the website before moving to the landing page tasks.
