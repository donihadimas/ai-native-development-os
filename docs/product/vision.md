# Product Vision: AI-Native Development OS

## Problem

Solo developers who use AI coding agents can move quickly, but their workflow often becomes inconsistent as a project grows. Product decisions stay in chat history, prompts are repeated manually, tasks become too large, and AI-generated changes can drift away from architecture, acceptance criteria, tests, and review evidence.

AI-Native Development OS solves this by turning the AI-assisted development workflow into reusable files: skills, prompts, commands, templates, references, workflows, project skeletons, and a small setup CLI.

## Target Users

- Primary user: solo fullstack developers and indie builders who use Codex or another AI coding agent inside an IDE.
- Secondary users: technical founders, freelancers, maintainers of internal AI workflow kits, and developers who repeatedly start new software projects.

## Value Proposition

AIOS gives every project a predictable AI-native operating layer. Instead of starting each project with loose prompts, the user can install or adopt a workflow kit that tells agents what to read, which skill to use, which document to update, how to split work into verifiable tasks, and what to report before work is considered done.

The CLI stays intentionally small: it sets up files, generates document stubs, installs local/native skills, validates structure, and recommends the next step. The AI agent still performs discovery, planning, implementation, testing, and review with human oversight.

## MVP Scope

The smallest useful version includes:

- A reusable project skeleton with `AGENTS.md`, optional `CLAUDE.md`, and structured project docs.
- A local `.aios/` workflow kit with commands, prompts, skills, templates, references, workflows, and optional integration rules.
- Product discovery, PRD, architecture, ADR, UI/UX design, API contract, migration, testing, review, security, and release guidance.
- A Node.js CLI for `init`, `starter`, `adopt`, `kit install`, `agent install`, `integration`, `create`, `validate`, `next`, and prompt display.
- Full and lite setup modes, configurable docs root, configurable project shape, and native skill delivery for supported agents.
- Validation that confirms an adopted or generated project has the expected AI-ready structure.

## Out of Scope

The current product will not include:

- Application framework code or production app starters.
- A web dashboard for project management.
- Autonomous multi-agent orchestration.
- Automatic publishing, deployment, or database migration execution.
- Replacing Codex, Claude, Qwen Code, OpenCode, Antigravity, or other agents.
- Making architecture, security, dependency, or release decisions without human review.

## Success Metrics

- User outcome: a developer can start or adopt a project and understand the next AI-native development step without rethinking the workflow from scratch.
- Product usage: generated projects pass `aios validate`, use `aios next`, and create project docs/tasks through AIOS templates.
- Engineering or operational signal: CLI build, tests, and package dry-run pass on Windows and Unix-like environments.

## Assumptions and Constraints

- Assumptions:
  - Users will continue using external AI agents inside their editor.
  - File-based workflow assets are easier to review, version, and reuse than chat-only instructions.
  - AIOS should remain useful even when native agent skill discovery is unavailable.
- Constraints:
  - The repository must remain framework-agnostic.
  - The CLI must not become an autonomous coding or orchestration engine.
  - Optional external tools such as RTK and Caveman must require explicit user intent and clear manual install guidance when auto-install is unsafe.

## Open Questions

- Which native agent targets should be prioritized after Codex, Qwen Code, OpenCode, Antigravity, and generic folders?
- Should future stack adapters remain docs-only, or should any include minimal framework-specific code?
- How much real-project usage is enough before expanding toward V3 productized platform features?
- Should release automation stay dry-run only, or eventually support guarded publish flows?

## Next Step

Review this vision, then keep `docs/product/prd.md` aligned with the accepted scope. Do not create implementation tasks for new AIOS features until the related PRD, architecture, and ADR context is clear.
