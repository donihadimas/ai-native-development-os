# TASK-015: Normalize Website Visible Text Encoding

## Status

Planned

## Objective

Fix mojibake and broken visible characters in the website content and landing components so the public documentation reads cleanly.

## Background

Several website files contain broken encoded characters such as `ðŸ...`, `âœ...`, and box-drawing artifacts. This makes the current site feel unfinished and can reduce trust, especially on a developer documentation site.

## Scope

### In Scope

- Search website source files for mojibake and broken visible characters.
- Fix visible text in:
  - landing components
  - docs pages
  - terminal previews
  - trust badges
  - homepage feature cards
  - structure diagrams if present in website docs
- Prefer ASCII labels where symbols are not necessary.
- If symbols are retained, ensure they are valid UTF-8 and render correctly.
- Keep root README normalization separate unless explicitly included by a later task.

### Out of Scope

- Do not normalize root `README.md` in this task; that is covered by prior repo task history.
- Do not rewrite content for tone beyond fixing broken characters.
- Do not change CLI output.
- Do not change generated project skeleton files.

## Affected Areas

- Frontend: `website/src/content/docs/`, `website/src/components/landing/`
- Backend: N/A
- Shared docs: Website docs only
- API contract: N/A
- Database: N/A

## Dependencies

- Related PRD: `website/PRD.md`
- Related design: `website/DESIGN.md`
- Related ADR: N/A
- Related architecture section: N/A
- Blocking tasks: None

## Acceptance Criteria

- [ ] `rg "ð|â|Â" website/src website/README.md website/PRD.md website/DESIGN.md` has no user-visible mojibake matches, except intentional examples if any are documented.
- [ ] Landing component text renders without broken icons or symbols.
- [ ] Terminal previews use readable text and valid symbols or ASCII alternatives.
- [ ] Project structure diagrams in website docs are readable.
- [ ] Content remains accurate after normalization.
- [ ] No unrelated content rewrites are included.

## Testing Expectations

- Unit tests: N/A
- Integration tests: N/A
- Regression tests: Run `npm run build` from `website/`.
- Manual checks: Inspect homepage, Project Structure, Getting Started, and CLI Reference pages in local dev server.

## Implementation Notes

- Use `rg "ð|â|Â" website -g '!node_modules/**' -g '!.astro/**'` to locate candidates.
- For trust badges, simple labels like "Apache 2.0", "npm package", "GitHub", and "TypeScript" are acceptable.
- For terminal checks, replace broken checkmarks with `OK` or verified check symbols.
- Keep changes scoped to website files.

## Done Summary

- Files changed:
- Tests run:
- Acceptance criteria status:
- Risks:
