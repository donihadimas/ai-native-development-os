# Implementation Plan: Add Release Readiness Checklist

## Task

- Task file: `docs/tasks/TASK-004-add-release-readiness-checklist.md`
- Objective: Add a practical checklist for safe manual npm package releases.

## Context Read

- `docs/tasks/TASK-004-add-release-readiness-checklist.md`
- `docs/architecture/architecture.md#Deployment and Release Strategy`
- `cli/package.json`
- `validation/npm-publish-readiness-report.md`

## Affected Files

- `validation/npm-publish-readiness-checklist.md`
- Optional: `README.md`, `cli/README.md`

## Approach

1. Create a checklist with pre-release, build/test, pack inspection, publish, and post-release sections.
2. Include exact commands from `cli/package.json`.
3. Include Windows path notes where relevant.
4. Link the checklist from existing publishing docs if it improves discoverability.

## Data Flow / Behavior Changes

No runtime behavior changes. Maintainers get a repeatable release checklist.

## Risks

- Checklist can drift from package scripts.
- Too much release process could feel heavy for a small CLI.

## Test Plan

- `git diff --check -- validation`
- Optional manual dry-run: `npm.cmd pack --dry-run` from `cli/`

## Rollback Notes

Remove the checklist and any links to it.
