# 📝 Changelog

All notable changes to this project will be documented in this file.

This project loosely follows Semantic Versioning. While the project is still pre-`1.0.0`, minor releases may include intentional breaking cleanup when migration notes are documented.

- Patch: bug fixes and documentation improvements.
- Minor: new CLI commands, skills, templates, workflows, or pre-`1.0.0` workflow cleanup.
- Major: breaking CLI, template, or workflow changes.

## 0.3.0

Feature release for ready-to-use AI-native project setup.

### ✨ Added

- Added guided `aios` setup for creating or adopting projects with clearer prompts, setup summaries, full/lite mode selection, project shape selection, docs-root selection, native agent skill selection, and optional integration setup.
- Added local `.aios/` workflow kit generation with command prompts, skill router, prompts, references, templates, workflows, integrations, and config.
- Added configurable project shapes for fullstack, frontend, backend, mobile, library, and docs-only projects.
- Added native agent skill installation for Codex/generic, Qwen Code, OpenCode, and Antigravity.
- Added `aios config`, `aios next`, `aios kit install`, `aios prompt list/show`, `aios agent list/install`, and grouped `aios create ...` document commands.
- Added V2.x workflow artifacts for database migrations, security reviews, release preparation, OpenAPI generation, release notes, and changelog drafts.
- Added AI docs only starters for Flutter mobile, Next.js web, Node API, NestJS API, Laravel API, Supabase app, and fullstack SaaS.
- Added optional RTK and Caveman integration manager commands with project-local rules, detection status, dry-run support, targeted Caveman install planning, and safe remove scopes.
- Added GitHub Actions for CI, manual smoke tests, and release dry-run validation.

### 🔄 Changed

- Updated generated `AGENTS.md`, starter docs, command prompts, workflows, references, and skill router to read `.aios/config.json`.
- Updated generator skills and prompts with Clarification Gates so agents ask focused questions before writing final PRDs, architecture docs, ADRs, tasks, tests, API contracts, migration plans, security reviews, and release notes.
- Improved `aios --help` with a clearer beginner path, grouped commands, and important flags such as `--agents`, `--skills`, `--yes`, and `--dry-run`.
- Updated package metadata and bundled assets so npm dry-run includes `assets/aios-kit/`, project skeleton, starters, templates, and integration rules.

### ⚠️ Breaking Changes

- Removed legacy flat document commands such as `aios task`, `aios adr`, `aios review`, and `aios feature`.
- Use grouped replacements instead: `aios create task`, `aios create adr`, `aios create review`, and `aios create feature`.
- Removed legacy flat helper aliases such as `aios agent-install` and `aios command-list`; use `aios agent install` and `aios prompt list`.

### 🐛 Fixed

- Fixed external integration installers so commands run from the target project path, preventing repo-scoped native skills from being installed into the AIOS CLI directory.
- Fixed generated setup guidance so native skill mode can keep `.aios/` compact without duplicating `.aios/skills`.

### ✅ Validation

- `npm test`: 41 passed, 0 failed.
- `npm pack --dry-run`: passed.
- `git diff --check`: passed.

## 0.2.1

Patch release focused on CLI help text clarity.

### 🔄 Changed

- Expanded `aios --help` with a clearer explanation of AI-Native Development OS CLI.
- Added beginner-friendly command descriptions and example workflows for new and existing projects.

### ✅ Validation

- CLI automated tests pass with 18 tests.

## 0.2.0

Initial npm-ready AIOS CLI release.

### ✨ Added

- Added `aios init` for new AI-ready projects.
- Added `aios adopt` for existing projects.
- Added `aios validate` for AI-ready structure checks.
- Added `aios adr`, `aios task`, `aios review`, and `aios feature` document generators.
- Added bundled project skeleton and templates for npm package runtime.
- Added OpenAPI contract template and workflow.
- Added generic backend API skill and standards.

### ✅ Validation

- CLI automated tests pass.
- npm tarball dry-run passes.
- Installed package smoke test passes for `init`, `adopt`, `validate`, `adr`, `task`, `review`, and `feature`.
