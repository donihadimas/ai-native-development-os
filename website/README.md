# AIOS Website

Public landing page and documentation site for AI-Native Development OS.

The site is built with Astro and Starlight. It should explain the project to new users, provide searchable documentation, and stay aligned with the root repository docs and CLI behavior.

## Source Of Truth

Keep website content synchronized with:

- `../README.md` for public positioning, install flow, status, command overview, generated structure, and boundaries.
- `../cli/src/index.ts` for CLI help text and command signatures.
- `../skills/`, `../templates/`, `../references/`, `../workflows/`, `../commands/`, and `../integrations/` for documentation details.
- `PRD.md` and `DESIGN.md` in this folder for website requirements and visual direction.

## Local Development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321` by default.

## Build

```bash
npm run build
npm run preview
```

`npm run build` generates the static site in `dist/` and builds the Starlight search index.

## Content Structure

```text
src/content/docs/
├── index.mdx
├── getting-started.md
├── guides/
│   ├── ai-agents.md
│   ├── how-it-works.md
│   ├── integrations.md
│   ├── skills.md
│   ├── templates.md
│   └── workflow.md
└── reference/
    ├── cli.md
    └── structure.md
```

## Maintenance Rules

- Do not leave starter placeholder pages in the published docs.
- Keep install commands visible on the landing page and getting-started page.
- Keep CLI docs aligned with actual `aios --help` output.
- Keep claims honest: AIOS helps structure agent work, but it does not generate app code or remove the need for human review.
- Check desktop and mobile screenshots after changing landing components.
- Run `npm run build` before marking website changes done.
