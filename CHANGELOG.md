# Changelog

All notable changes to this project will be documented in this file.

This project loosely follows Semantic Versioning:

- Patch: bug fixes and documentation improvements.
- Minor: new CLI commands, skills, templates, workflows, or non-breaking behavior.
- Major: breaking CLI, template, or workflow changes.

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
