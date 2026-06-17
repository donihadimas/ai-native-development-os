# Changelog

All notable changes to this project will be documented in this file.

This project loosely follows Semantic Versioning. While the project is still pre-`1.0.0`, minor releases may include intentional breaking cleanup when migration notes are documented.

- Patch: bug fixes and documentation improvements.
- Minor: new CLI commands, skills, templates, workflows, or pre-`1.0.0` workflow cleanup.
- Major: breaking CLI, template, or workflow changes.

## 0.4.0

Feature release focused on safe project updates, workflow kit acceptance, and broader AIOS workflow coverage.

### Added

- Added `aios update` to backfill missing bundled `.aios/` kit assets, safe core skill defaults, and configured native skills without overwriting local changes by default.
- Added `aios update --dry-run` so users can preview update actions before writing files.
- Added `aios update --accept` and section-scoped accept mode so users can explicitly apply bundled `.aios/` asset changes after review.
- Added line-ending-only classification in update output to reduce noisy review-needed reports.
- Added the `task-implementation` skill and native Codex skill metadata.
- Added UI/UX design workflow coverage, design document generation, design templates, and design docs in project skeletons and starters.
- Added dogfood task, validation report, update command task, update accept-flow task, and implementation plans through TASK-010.
- Added local `.aios/` kit assets and native `.agents/skills/` assets to support AIOS dogfooding in this repository.
- Added website documentation and reference content for AIOS workflows and CLI usage.

### Changed

- Improved generated workflow instructions with full/lite mode guidance and clearer next actions.
- Improved CLI help, README onboarding, native skill install behavior, project shape guidance, and `aios next` recommendations.
- Updated release, security, database, API, testing, context, and engineering references.
- Synced bundled CLI assets so npm packages include updated skills, commands, prompts, references, templates, workflows, starters, and project skeleton files.
- Preserved npm package metadata from the `0.3.1` release, including homepage, repository, bugs, and author fields.

### Fixed

- Fixed update dry-run planning so native skill additions are counted from the effective post-config update skill set.
- Fixed update config expansion so minimal custom skill selections are not expanded unexpectedly.
- Fixed section-scoped `aios update --accept <section> <project-path>` parsing so section names are not treated as project paths.
- Fixed update behavior so existing differing `.aios/` assets remain non-destructive unless accept mode is explicitly used.

### Breaking Changes

- None known.

### Validation

- `npm test`: 77 passed, 0 failed.
- `npm pack --dry-run`: passed.
- `git diff --check`: passed.

## 0.3.1

Patch release focused on npm package metadata and README onboarding clarity.

### Changed

- Added npm metadata for homepage, repository, issue tracker, and author.
- Updated root and CLI README onboarding so guided setup is the primary path after install.
- Reframed command examples as a non-interactive command quickstart.

### Validation

- `npm test`: 41 passed, 0 failed.
- `npm pack --dry-run`: passed.
- `git diff --check`: passed.

## 0.3.0

Feature release for ready-to-use AI-native project setup.

### Added

- Added guided `aios` setup for creating or adopting projects with clearer prompts, setup summaries, full/lite mode selection, project shape selection, docs-root selection, native agent skill selection, and optional integration setup.
- Added local `.aios/` workflow kit generation with command prompts, skill router, prompts, references, templates, workflows, integrations, and config.
- Added configurable project shapes for fullstack, frontend, backend, mobile, library, and docs-only projects.
- Added native agent skill installation for Codex/generic, Qwen Code, OpenCode, and Antigravity.
- Added `aios config`, `aios next`, `aios kit install`, `aios prompt list/show`, `aios agent list/install`, and grouped `aios create ...` document commands.
- Added V2.x workflow artifacts for database migrations, security reviews, release preparation, OpenAPI generation, release notes, and changelog drafts.
- Added AI docs only starters for Flutter mobile, Next.js web, Node API, NestJS API, Laravel API, Supabase app, and fullstack SaaS.
- Added optional RTK and Caveman integration manager commands with project-local rules, detection status, dry-run support, targeted Caveman install planning, and safe remove scopes.
- Added GitHub Actions for CI, manual smoke tests, and release dry-run validation.

### Changed

- Updated generated `AGENTS.md`, starter docs, command prompts, workflows, references, and skill router to read `.aios/config.json`.
- Updated generator skills and prompts with Clarification Gates so agents ask focused questions before writing final PRDs, architecture docs, ADRs, tasks, tests, API contracts, migration plans, security reviews, and release notes.
- Improved `aios --help` with a clearer beginner path, grouped commands, and important flags such as `--agents`, `--skills`, `--yes`, and `--dry-run`.
- Updated package metadata and bundled assets so npm dry-run includes `assets/aios-kit/`, project skeleton, starters, templates, and integration rules.

### Breaking Changes

- Removed legacy flat document commands such as `aios task`, `aios adr`, `aios review`, and `aios feature`.
- Use grouped replacements instead: `aios create task`, `aios create adr`, `aios create review`, and `aios create feature`.
- Removed legacy flat helper aliases such as `aios agent-install` and `aios command-list`; use `aios agent install` and `aios prompt list`.

### Fixed

- Fixed external integration installers so commands run from the target project path, preventing repo-scoped native skills from being installed into the AIOS CLI directory.
- Fixed generated setup guidance so native skill mode can keep `.aios/` compact without duplicating `.aios/skills`.

### Validation

- `npm test`: 41 passed, 0 failed.
- `npm pack --dry-run`: passed.
- `git diff --check`: passed.

## 0.2.1

Patch release focused on CLI help text clarity.

### Changed

- Expanded `aios --help` with a clearer explanation of AI-Native Development OS CLI.
- Added beginner-friendly command descriptions and example workflows for new and existing projects.

### Validation

- CLI automated tests pass with 18 tests.

## 0.2.0

Initial npm-ready AIOS CLI release.

### Added

- Added `aios init` for new AI-ready projects.
- Added `aios adopt` for existing projects.
- Added `aios validate` for AI-ready structure checks.
- Added `aios adr`, `aios task`, `aios review`, and `aios feature` document generators.
- Added bundled project skeleton and templates for npm package runtime.
- Added OpenAPI contract template and workflow.
- Added generic backend API skill and standards.

### Validation

- CLI automated tests pass.
- npm tarball dry-run passes.
- Installed package smoke test passes for `init`, `adopt`, `validate`, `adr`, `task`, `review`, and `feature`.
