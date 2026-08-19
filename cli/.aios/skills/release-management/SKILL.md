---
name: release-management
description: Use when preparing release notes, changelog updates, deployment checks, rollback notes, or post-release verification.
---

# Release Management

## Goal

Prepare a release with explicit scope, validation evidence, rollback notes, and post-release checks.

## When to Use

Use this skill when:

- a set of completed tasks is ready to release,
- release notes or changelog entries are needed,
- deployment or publish steps need review,
- rollback and monitoring notes are required,
- a versioned CLI or reusable OS package is being prepared.

## Inputs

Expected inputs:

- completed task list or summaries from `docs/tasks/done/`,
- selected completed implementation plan summaries from `docs/plans/done/` when traceability is needed,
- review and test evidence,
- changed public behavior or command list,
- known risks and deferred work,
- release target and version name.

## Clarification Gate

Before writing release notes, check whether these are clear enough:

- release version or name,
- included and excluded scope,
- user-visible changes,
- validation evidence,
- review evidence,
- breaking changes or migration notes,
- rollback and post-release checks.

If scope or validation evidence is missing, stop and ask the user 3-6 focused questions before generating the release documentation. Do not imply release approval or test success.

## Outputs

Expected outputs:

- release note in `docs/releases/`,
- changelog draft or update,
- deployment checklist,
- rollback checklist,
- post-release verification notes.

## Process

Step-by-step process:

1. Confirm included scope and excluded scope from completed task summaries, usually under `docs/tasks/done/`; read selected completed plan summaries from `docs/plans/done/` only when release traceability needs them.
2. Confirm tests, review, and acceptance criteria status.
3. Summarize user-visible and developer-visible changes.
4. Create release notes using `templates/release-note.template.md`.
5. Create or update changelog content using `templates/changelog.template.md`.
6. Define rollback and post-release verification steps.
7. Require human approval before publishing or deploying.

## Rules

Hard rules:

- Do not release without test and review evidence.
- Do not treat active tasks in `docs/tasks/` as completed release scope unless their status and Done Summary are complete.
- Do not read every archived plan when only selected completed plan summaries are needed.
- Do not publish automatically from the reusable OS guidance in V2.x.
- Do not hide breaking changes or migration needs.
- Do not mark deferred work as complete.
- Do not assume human approval.

## Quality Checklist

Before finishing, verify:

- [ ] Release scope is explicit.
- [ ] Tests and review evidence are summarized.
- [ ] Breaking changes are named or marked none.
- [ ] Rollback path is documented.
- [ ] Post-release checks are documented.
- [ ] Human approval is recorded outside agent assumptions.

## Failure Modes

Watch out for:

- release notes that omit CLI behavior changes,
- reading every historical task when only selected completed task summaries are needed,
- reading every historical plan when only selected completed plan summaries are needed,
- missing rollback notes,
- changelog entries that overclaim completion,
- publish steps that bypass npm dry-run,
- undocumented residual risks.

## Example Prompt

```text
Use the release-management skill to prepare docs/releases/0.3.0-release.md before publishing the AIOS CLI.
```
