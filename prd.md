# PRD — AI-Native Development OS

**Version:** 0.2
**Status:** Draft
**Owner:** Doni Hadimas
**Target User:** Solo Fullstack Developer
**Primary Execution Agent:** Codex in IDE
**Product Type:** Reusable AI Development Operating System
**Last Updated:** 2026-06-06

---

## 1. Ringkasan

AI-Native Development OS adalah reusable development operating system untuk membantu solo developer membangun berbagai project software dengan bantuan AI secara konsisten, terstruktur, aman, dan efisien.

Produk ini bukan sekadar kumpulan prompt, bukan hanya boilerplate folder, dan bukan framework aplikasi. Produk ini adalah fondasi workflow berbasis AI yang dapat digunakan ulang lintas project.

AI-Native Development OS menyediakan:

- skill AI reusable,
- template dokumen,
- engineering references,
- workflow development,
- project skeleton,
- context management strategy,
- agent instructions,
- dan roadmap automation untuk V2.

V1 akan difokuskan pada implementasi penuh fondasi AI Dev OS yang langsung dapat digunakan secara manual dengan Codex di IDE. V2 akan menambahkan automation, CLI, stack adapters, starter templates, OpenAPI workflow, database migration workflow, security workflow, dan GitHub integration.

---

## 2. Latar Belakang

Solo developer yang menggunakan AI coding agent sering menghadapi masalah berikut:

1. AI bisa menghasilkan kode cepat, tetapi tidak selalu konsisten dengan arsitektur project.
2. Setup instruksi AI harus diulang setiap kali membuat project baru.
3. Prompt sering tercecer di chat dan tidak menjadi aset reusable.
4. AI sering mengerjakan task terlalu besar sehingga hasilnya sulit diverifikasi.
5. Frontend dan backend sering tidak sinkron karena tidak membaca source of truth yang sama.
6. Dokumentasi project sering tidak cukup terstruktur untuk menjadi konteks jangka panjang.
7. AI sering melakukan perubahan file yang tidak relevan.
8. Code review, testing, dan acceptance criteria sering dilewati.
9. Context management sering salah: terlalu banyak konteks dimasukkan, atau konteks penting tidak diberikan.
10. Developer terlalu fokus pada tool seperti Cursor, Codex, Claude, Roo, atau Windsurf, padahal nilai utama ada pada workflow dan context layer.

AI-Native Development OS menyelesaikan masalah tersebut dengan menyediakan struktur kerja reusable yang membuat AI coding agent seperti Codex dapat bekerja berdasarkan dokumen, skill, task, dan aturan yang jelas.

---

## 3. Problem Statement

Solo developer membutuhkan sistem kerja AI-native yang:

- bisa dipakai ulang di berbagai project,
- tidak tergantung penuh pada satu tool,
- membantu AI memahami konteks project,
- mencegah AI mengerjakan task terlalu besar,
- menjaga kualitas kode,
- mendukung project frontend/backend,
- dan mengurangi kebutuhan prompt manual berulang.

Tanpa sistem ini, penggunaan AI coding agent cenderung berubah menjadi vibe coding yang cepat di awal tetapi sulit dipelihara saat project berkembang.

---

## 4. Product Vision

Membangun AI Development OS yang dapat digunakan sebagai fondasi standar untuk setiap project software baru, sehingga developer cukup melakukan:

```text
Clone / copy skeleton
↓
Isi product context
↓
Generate PRD
↓
Generate architecture
↓
Generate ADR
↓
Generate task breakdown
↓
Implement dengan Codex
↓
Review
↓
Test
↓
Release
```

Tujuan akhirnya adalah membuat workflow AI-native yang reusable, maintainable, dan aman untuk pengembangan solo developer jangka panjang.

---

## 5. Goals

### 5.1 Primary Goals

1. Membuat repo AI Dev OS yang langsung bisa digunakan dengan Codex di IDE.
2. Menyediakan struktur project AI-ready untuk FE/BE.
3. Menyediakan skill format seperti Codex skills.
4. Menyediakan template PRD, ADR, architecture, task, review, dan testing.
5. Menyediakan context management strategy agar AI tidak kebanjiran konteks.
6. Menyediakan AGENTS.md sebagai instruksi utama agent.
7. Menyediakan workflow development dari ide sampai release.
8. Menyiapkan extension point untuk V2 tanpa mengimplementasikan automation terlalu dini.

### 5.2 Secondary Goals

1. Membantu menjaga konsistensi lintas project.
2. Mengurangi rework akibat AI coding yang terlalu bebas.
3. Mengurangi dependency terhadap prompt manual.
4. Mendukung berbagai stack di masa depan.
5. Menjadi fondasi untuk CLI generator pada V2.

---

## 6. Non-Goals

V1 tidak bertujuan untuk:

1. Membuat CLI generator penuh.
2. Membuat dashboard visual.
3. Membuat multi-agent orchestration kompleks.
4. Membuat framework SaaS baru.
5. Menggantikan framework aplikasi seperti Flutter, Next.js, NestJS, Laravel, Go, atau FastAPI.
6. Mengotomatisasi semua keputusan engineering.
7. Menghapus kebutuhan human review.
8. Membuat stack-specific starter penuh sejak awal.
9. Membuat marketplace skills.
10. Membuat AI agent sendiri.

---

## 7. Target User

### 7.1 Primary User

Solo fullstack developer yang:

- membangun SaaS atau aplikasi digital sendiri,
- menggunakan Codex di IDE,
- bekerja dengan frontend dan backend,
- ingin setup AI workflow reusable,
- ingin mengurangi prompt berulang,
- ingin menjaga kualitas project meskipun bekerja sendiri.

### 7.2 Secondary User

- Indie hacker.
- Technical founder.
- Freelancer fullstack.
- Developer yang ingin membuat internal AI workflow.
- Developer yang sering membuat project boilerplate.

---

## 8. Product Principles

AI-Native Development OS harus mengikuti prinsip berikut:

### 8.1 Docs as Source of Truth

PRD, architecture, ADR, task, API contract, dan context map harus menjadi sumber kebenaran utama project.

### 8.2 Skills over Prompts

Instruksi berulang harus dikemas sebagai skill reusable, bukan prompt sekali pakai.

### 8.3 Context Routing over Context Dumping

AI tidak boleh diminta membaca seluruh repo secara default. AI harus diarahkan membaca konteks minimum yang relevan.

### 8.4 Small Task First

AI agent hanya boleh mengerjakan task kecil, spesifik, dan dapat diverifikasi.

### 8.5 Human Owns Decisions

AI boleh memberi rekomendasi, tetapi keputusan akhir untuk arsitektur, security, dependency, dan product direction tetap milik manusia.

### 8.6 Tool-Agnostic Core

Core system harus kompatibel dengan Codex, tetapi tidak terkunci pada Codex.

### 8.7 FE/BE Shared Context

Frontend dan backend harus membaca dokumen yang sama: PRD, ADR, task, dan API contract.

### 8.8 Verification Before Done

Task tidak dianggap selesai sebelum acceptance criteria, testing, review, dan summary terpenuhi.

### 8.9 Minimal First, Expand Later

V1 harus lengkap sebagai fondasi, tetapi tidak over-engineered.

---

## 9. Core Concept

AI-Native Development OS terdiri dari lima layer utama:

```text
AI Dev OS
├── Skills
│   └── cara berpikir dan cara bekerja AI
├── Templates
│   └── format output standar
├── References
│   └── prinsip engineering stabil
├── Workflows
│   └── urutan kerja development
└── Project Skeleton
    └── struktur project AI-ready
```

Pada project nyata, sistem ini menghasilkan struktur:

```text
Project
├── docs/
│   ├── product/
│   ├── architecture/
│   ├── adr/
│   ├── tasks/
│   ├── api/
│   └── context/
├── frontend/
├── backend/
├── AGENTS.md
├── CLAUDE.md
└── README.md
```

---

## 10. V1 Scope — AI Dev OS Core

V1 adalah full implementation dari fondasi AI Dev OS.

V1 harus langsung dapat digunakan secara manual dengan Codex di IDE tanpa CLI.

### 10.1 V1 Repository Structure

```text
ai-native-dev-os/
├── README.md
├── AGENTS.md
├── skills/
│   ├── context-management/
│   │   └── SKILL.md
│   ├── product-discovery/
│   │   └── SKILL.md
│   ├── prd-generator/
│   │   └── SKILL.md
│   ├── architecture-design/
│   │   └── SKILL.md
│   ├── adr-generator/
│   │   └── SKILL.md
│   ├── task-breakdown/
│   │   └── SKILL.md
│   ├── implementation-planner/
│   │   └── SKILL.md
│   ├── testing/
│   │   └── SKILL.md
│   └── code-review/
│       └── SKILL.md
│
├── templates/
│   ├── vision.template.md
│   ├── prd.template.md
│   ├── architecture.template.md
│   ├── adr.template.md
│   ├── task.template.md
│   ├── implementation-plan.template.md
│   ├── review-report.template.md
│   └── test-plan.template.md
│
├── references/
│   ├── engineering-principles.md
│   ├── architecture-principles.md
│   ├── api-standards.md
│   ├── database-standards.md
│   ├── frontend-principles.md
│   ├── backend-principles.md
│   ├── testing-principles.md
│   ├── security-principles.md
│   └── context-principles.md
│
├── workflows/
│   ├── new-project.workflow.md
│   ├── new-feature.workflow.md
│   ├── bugfix.workflow.md
│   ├── refactor.workflow.md
│   ├── review.workflow.md
│   ├── release.workflow.md
│   └── v2-roadmap.workflow.md
│
├── prompts/
│   ├── 01-generate-prd.md
│   ├── 02-generate-architecture.md
│   ├── 03-generate-adr.md
│   ├── 04-generate-tasks.md
│   ├── 05-plan-implementation.md
│   ├── 06-implement-task.md
│   ├── 07-review-code.md
│   └── 08-generate-tests.md
│
├── project-skeleton/
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── README.md
│   ├── docs/
│   │   ├── product/
│   │   │   ├── vision.md
│   │   │   └── prd.md
│   │   ├── architecture/
│   │   │   └── architecture.md
│   │   ├── adr/
│   │   │   └── .gitkeep
│   │   ├── tasks/
│   │   │   └── .gitkeep
│   │   ├── api/
│   │   │   └── .gitkeep
│   │   └── context/
│   │       └── context-map.md
│   ├── frontend/
│   │   └── .gitkeep
│   └── backend/
│       └── .gitkeep
│
├── starters/
│   └── README.md
│
├── cli/
│   └── README.md
│
└── .github/
    └── README.md
```

---

## 11. V1 Skills

### 11.1 context-management

Purpose:

Mengarahkan AI memilih konteks minimum yang cukup sebelum planning, coding, testing, atau review.

Key Rules:

- Jangan membaca seluruh repo secara default.
- Baca active task terlebih dahulu.
- Baca ADR hanya jika relevan.
- Baca PRD hanya jika acceptance criteria tidak jelas.
- Search existing code sebelum membuat abstraction baru.
- Gunakan `docs/context/context-map.md` sebagai router konteks.

---

### 11.2 product-discovery

Purpose:

Mengubah ide produk mentah menjadi product vision yang lebih jelas.

Outputs:

- `docs/product/vision.md`
- problem statement
- target user
- core value proposition
- initial MVP scope
- out-of-scope
- success metrics

---

### 11.3 prd-generator

Purpose:

Menghasilkan PRD dari vision atau ide produk.

Outputs:

- `docs/product/prd.md`

PRD harus mencakup:

- background
- target user
- goals
- non-goals
- user stories
- functional requirements
- non-functional requirements
- acceptance criteria
- risks
- open questions

---

### 11.4 architecture-design

Purpose:

Menghasilkan dokumen arsitektur dari PRD.

Outputs:

- `docs/architecture/architecture.md`

Architecture document harus mencakup:

- system overview
- frontend architecture
- backend architecture
- database strategy
- API strategy
- authentication strategy
- authorization strategy
- testing strategy
- deployment strategy
- observability strategy
- constraints

---

### 11.5 adr-generator

Purpose:

Membuat ADR untuk keputusan teknis penting.

Outputs:

- `docs/adr/ADR-XXX-title.md`

ADR harus mencakup:

- status
- context
- decision
- alternatives considered
- consequences
- related documents

---

### 11.6 task-breakdown

Purpose:

Memecah PRD/feature/ADR menjadi task kecil yang cocok dikerjakan Codex.

Outputs:

- `docs/tasks/TASK-XXX-title.md`

Rules:

- Satu task hanya memiliki satu objective.
- Task harus dapat diverifikasi.
- Task harus memiliki acceptance criteria.
- Task harus mencantumkan affected modules.
- Task harus mencantumkan testing expectations.
- FE dan BE dipisahkan jika task terlalu kompleks.
- Jangan membuat task yang terlalu besar untuk satu sesi agent.

---

### 11.7 implementation-planner

Purpose:

Membuat rencana implementasi sebelum Codex menulis kode.

Outputs:

- implementation plan
- affected files
- dependencies
- risk notes
- test plan

Rules:

- Tidak boleh coding sebelum plan singkat.
- Harus search existing implementation.
- Harus menjelaskan file yang akan diubah.
- Harus menandai risiko perubahan.

---

### 11.8 testing

Purpose:

Membantu AI membuat atau mengevaluasi test yang menguji behavior, bukan hanya coverage.

Outputs:

- test plan
- unit tests
- integration tests
- regression tests

Rules:

- Test harus terkait acceptance criteria.
- Test harus mencakup happy path.
- Test harus mencakup error path.
- Test harus mencakup edge cases.
- Hindari test yang hanya memverifikasi implementation details.

---

### 11.9 code-review

Purpose:

Melakukan review awal terhadap perubahan kode sebelum dianggap selesai.

Review Dimensions:

- correctness
- security
- architecture
- duplication
- maintainability
- performance
- testing
- documentation

Outputs:

- review report
- actionable findings
- risk summary
- approval or revision required

---

## 12. Skill File Format

Setiap skill harus menggunakan format berikut:

````md
---
name: skill-name
description: Short description of when this skill should be used.
---

# Skill Title

## Goal

What this skill helps the AI agent accomplish.

## When to Use

Use this skill when:

- ...

## Inputs

Expected inputs:

- ...

## Outputs

Expected outputs:

- ...

## Process

Step-by-step process:

1. ...
2. ...
3. ...

## Rules

Hard rules:

- ...

## Quality Checklist

Before finishing, verify:

- [ ] ...
- [ ] ...

## Failure Modes

Watch out for:

- ...

## Example Prompt

Example user prompt:

```text
...
```
````

````

---

## 13. Context Management Strategy

Context management adalah bagian inti produk.

Prinsip utama:

```text
Context is not dumping.
Context is routing.
````

AI tidak boleh diberi seluruh repo secara default. AI harus memilih konteks berdasarkan jenis pekerjaan.

### 13.1 Context Layers

```text
Level 0 — Global Agent Rules
AGENTS.md

Level 1 — Reusable Skills
skills/*/SKILL.md

Level 2 — Stable References
references/*.md

Level 3 — Project Source of Truth
docs/product, docs/architecture, docs/adr, docs/api

Level 4 — Active Task Context
docs/tasks/TASK-XXX.md

Level 5 — Code Context
affected files and nearby tests
```

### 13.2 Context Selection by Task Type

#### New Feature

Read:

- active task
- relevant PRD section
- related ADR
- API contract if FE/BE integration exists
- affected modules

#### Bugfix

Read:

- bug report
- affected files
- related tests
- related ADR only if architectural

#### Refactor

Read:

- architecture document
- related ADR
- affected modules
- existing tests

#### Review

Read:

- diff
- task acceptance criteria
- related ADR
- related tests

### 13.3 Context Anti-Patterns

Avoid:

- dumping entire repo into prompt
- reading all ADRs for small tasks
- reading full PRD for simple implementation tasks
- using stale docs as source of truth
- letting global rules override task-specific requirements
- overloading AGENTS.md with long documentation

---

## 14. Project Skeleton Requirements

`project-skeleton/` harus bisa dicopy menjadi project baru.

### 14.1 Required Structure

```text
project-skeleton/
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── docs/
│   ├── product/
│   │   ├── vision.md
│   │   └── prd.md
│   ├── architecture/
│   │   └── architecture.md
│   ├── adr/
│   ├── tasks/
│   ├── api/
│   └── context/
│       └── context-map.md
├── frontend/
└── backend/
```

### 14.2 AGENTS.md Requirements

`AGENTS.md` harus minimal, jelas, dan bertindak sebagai entrypoint agent.

Minimal content:

```md
# AGENTS.md

## Role

You are an AI coding agent working in this repository.

## Core Rule

Do not code before reading the active task file.

## Context Routing

Use `docs/context/context-map.md` to decide which documents to read.

## Required Before Implementation

1. Read the active task in `docs/tasks/`.
2. Read related ADR if mentioned by the task.
3. Search existing code before creating new abstractions.
4. Identify affected files.
5. Make a short implementation plan.

## Hard Constraints

- Do not modify unrelated files.
- Do not introduce new dependencies without approval.
- Do not store secrets in source code.
- Do not bypass tests.
- Do not mark work done if acceptance criteria are not satisfied.

## Done Response

Always report:

- files changed
- tests run
- acceptance criteria status
- risks
- next recommended step
```

---

## 15. FE/BE Support

AI-Native Development OS harus mendukung project dengan frontend dan backend terpisah.

### 15.1 Recommended Project Structure

```text
my-project/
├── docs/
├── frontend/
└── backend/
```

### 15.2 Source of Truth

Frontend dan backend harus membaca:

- `docs/product/prd.md`
- `docs/architecture/architecture.md`
- `docs/adr/*`
- `docs/tasks/*`
- `docs/api/openapi.yaml`

### 15.3 Task Splitting Rule

Jika task menyentuh frontend dan backend, task boleh ditulis sebagai parent task, tetapi implementasi harus dipisahkan jika kompleksitasnya sedang atau tinggi.

Example:

```text
TASK-010-user-profile.md
TASK-010A-backend-update-profile.md
TASK-010B-frontend-profile-form.md
```

### 15.4 API Contract Rule

Jika FE/BE integration terlibat, API contract harus dibuat atau diperbarui sebelum implementasi frontend.

---

## 16. Workflows V1

### 16.1 New Project Workflow

```text
Idea
↓
Generate vision.md
↓
Generate prd.md
↓
Generate architecture.md
↓
Generate initial ADRs
↓
Generate initial tasks
↓
Initialize frontend/backend
↓
Implement task one by one
```

### 16.2 New Feature Workflow

```text
Feature idea
↓
Update PRD
↓
Check whether ADR is needed
↓
Create task breakdown
↓
Plan implementation
↓
Implement backend task
↓
Implement frontend task
↓
Generate/update tests
↓
Review
↓
Release
```

### 16.3 Bugfix Workflow

```text
Bug report
↓
Reproduce bug
↓
Identify affected module
↓
Create bugfix task
↓
Plan fix
↓
Fix
↓
Add regression test
↓
Review
↓
Release
```

### 16.4 Refactor Workflow

```text
Refactor goal
↓
Check architecture/ADR
↓
Define safe scope
↓
Create refactor task
↓
Run existing tests
↓
Plan affected files
↓
Refactor
↓
Run tests again
↓
Review diff
```

### 16.5 Review Workflow

```text
Diff
↓
Task acceptance criteria
↓
Relevant ADR
↓
Testing evidence
↓
Review report
↓
Approve / request changes
```

### 16.6 Release Workflow

```text
Completed tasks
↓
Test summary
↓
Review summary
↓
Release notes
↓
Deployment checklist
↓
Post-release monitoring notes
```

---

## 17. Functional Requirements

### FR-001 — Repository Structure

The system must provide a reusable repository structure for AI-native development.

Acceptance Criteria:

- Repo contains `skills/`, `templates/`, `references/`, `workflows/`, `prompts/`, and `project-skeleton/`.
- Repo also includes placeholder directories for V2: `cli/`, `starters/`, and `.github/`.
- Each major directory has README or clear documentation.

---

### FR-002 — Skill System

The system must provide reusable skills for common AI development activities.

Acceptance Criteria:

- Each skill has `SKILL.md`.
- Each skill uses standard metadata.
- Each skill defines goal, when to use, inputs, outputs, process, rules, checklist, failure modes, and example prompt.
- Skills are written in English for better compatibility with coding agents.
- Skills avoid stack-specific assumptions in V1.

---

### FR-003 — Template System

The system must provide templates for recurring development documents.

Acceptance Criteria:

- Vision template exists.
- PRD template exists.
- Architecture template exists.
- ADR template exists.
- Task template exists.
- Implementation plan template exists.
- Review report template exists.
- Test plan template exists.

---

### FR-004 — Reference System

The system must provide stable engineering principles.

Acceptance Criteria:

- References are separated from skills and workflows.
- References are reusable across projects.
- References avoid project-specific decisions.
- References can be linked from skills and AGENTS.md.

---

### FR-005 — Workflow System

The system must provide workflow documents for common development flows.

Acceptance Criteria:

- New project workflow exists.
- New feature workflow exists.
- Bugfix workflow exists.
- Refactor workflow exists.
- Review workflow exists.
- Release workflow exists.
- V2 roadmap workflow exists.
- Each workflow has input, process, output, and done criteria.

---

### FR-006 — Project Skeleton

The system must provide a ready-to-copy project skeleton.

Acceptance Criteria:

- Skeleton supports frontend/backend separation.
- Skeleton includes shared docs.
- Skeleton includes `AGENTS.md`.
- Skeleton includes optional `CLAUDE.md`.
- Skeleton includes `docs/context/context-map.md`.
- Skeleton includes README.
- Skeleton does not force a specific app framework in V1.

---

### FR-007 — Codex Compatibility

The system must be usable with Codex in IDE.

Acceptance Criteria:

- `AGENTS.md` provides clear agent instructions.
- Task files are small enough for Codex execution.
- Skill files are discoverable by directory structure.
- Prompts mention which files Codex should read.
- Workflows avoid unsupported tool-specific assumptions.

---

### FR-008 — Context Management

The system must include explicit context management strategy.

Acceptance Criteria:

- `context-management` skill exists.
- `context-principles.md` exists.
- `project-skeleton/docs/context/context-map.md` exists.
- AGENTS.md references context-map.
- Prompts avoid instructing AI to read the whole repository by default.

---

### FR-009 — FE/BE Project Support

The system must support projects with separate frontend and backend directories.

Acceptance Criteria:

- Shared docs live outside frontend/backend.
- Task template supports frontend scope and backend scope.
- API contract can be stored in `docs/api/`.
- ADR can define cross-cutting decisions.
- Workflow recommends splitting FE and BE implementation tasks when needed.

---

### FR-010 — Review and Testing

The system must require review and testing as part of done criteria.

Acceptance Criteria:

- Review skill exists.
- Testing skill exists.
- Task template includes testing expectations.
- Implementation plan includes test plan.
- AGENTS.md instructs agent to report tests run.
- Review checklist includes security, architecture, duplication, maintainability, correctness, and testing.

---

## 18. Non-Functional Requirements

### NFR-001 — Simplicity

V1 must be understandable and usable in one day.

### NFR-002 — Reusability

Skills, templates, references, and workflows must be reusable across project types.

### NFR-003 — Tool Agnosticism

Core system must not depend entirely on Codex-specific features.

### NFR-004 — Extensibility

System must allow stack-specific skills and starters in V2.

### NFR-005 — Maintainability

Files must be short enough for humans and AI to read efficiently.

### NFR-006 — Safety

System must discourage blind AI acceptance and require verification.

### NFR-007 — Context Efficiency

System must avoid unnecessary context loading.

### NFR-008 — Low Setup Friction

V1 should not require custom installation or CLI to be useful.

---

## 19. Quality Gates

### 19.1 AI Dev OS Repo Is Complete When

- `skills/` contains all V1 skills.
- `templates/` contains all V1 templates.
- `references/` contains all V1 references.
- `workflows/` contains all V1 workflows.
- `project-skeleton/` can be copied into a new project.
- `AGENTS.md` is present.
- `README.md` explains how to use the system.

### 19.2 Project Is AI-Ready When

- `AGENTS.md` exists.
- `docs/context/context-map.md` exists.
- `docs/product/vision.md` exists.
- `docs/product/prd.md` exists or is ready to be generated.
- `docs/architecture/architecture.md` exists or is ready to be generated.
- `docs/adr/` exists.
- `docs/tasks/` exists.
- `frontend/` and `backend/` exist if applicable.

### 19.3 Task Is Implementation-Ready When

- Objective is clear.
- Scope is limited.
- Affected modules are listed.
- Dependencies are listed.
- Acceptance criteria are testable.
- Testing expectations are defined.
- Related PRD/ADR links are included.

### 19.4 Task Is Done When

- Code is implemented.
- Acceptance criteria are met.
- Tests are added or updated when needed.
- Lint/typecheck/build are run when available.
- No unrelated files are changed.
- Implementation summary is written.

---

## 20. Success Metrics

### 20.1 Product Metrics

- Time to initialize new project.
- Time to generate first PRD.
- Time to generate first architecture document.
- Time to generate first task breakdown.
- Number of projects using the same AI Dev OS.
- Number of reusable skills actually used.

### 20.2 Engineering Metrics

- Rework rate.
- Bug rate after AI implementation.
- Number of unrelated file changes per task.
- Number of tasks completed without manual re-prompting.
- Number of AI-generated changes rejected during review.
- Average task size.

### 20.3 Workflow Metrics

- Percentage of tasks with acceptance criteria.
- Percentage of tasks with testing expectations.
- Percentage of features linked to PRD/ADR.
- Percentage of tasks with implementation plan.
- Documentation freshness.

---

## 21. Risks and Mitigations

### Risk 1 — Over-Engineering

The system may become too complex before being used in a real project.

Mitigation:

- V1 focuses on repo structure and manual use.
- CLI is deferred to V2.
- Multi-agent orchestration is excluded.

---

### Risk 2 — Tool Lock-In

The system may become too dependent on Codex.

Mitigation:

- Use generic `AGENTS.md`.
- Keep skills and templates tool-agnostic.
- Include optional `CLAUDE.md` only for compatibility.

---

### Risk 3 — Context Overload

AI may receive too much context and produce worse output.

Mitigation:

- Add context-management skill.
- Add context-map.
- Keep AGENTS.md minimal.
- Avoid repo dump by default.

---

### Risk 4 — Documentation Rot

Docs may become outdated as code changes.

Mitigation:

- Add doc update requirement to done criteria.
- Include documentation review in code-review skill.

---

### Risk 5 — AI Overconfidence

AI may generate convincing but incorrect code or documentation.

Mitigation:

- Require review.
- Require tests.
- Require acceptance criteria.
- Require human approval for architecture/security/dependency changes.

---

### Risk 6 — Task Oversizing

AI may receive tasks too large to complete safely.

Mitigation:

- Enforce task-breakdown skill.
- Add task readiness checklist.
- Split FE and BE task when needed.

---

## 22. V2 Scope — Automation and Stack Adapters

V2 begins only after V1 is used in at least one real project.

V2 goal:

```text
Reduce repetitive manual setup and add stack-specific workflow support.
```

### 22.1 CLI Generator

Add minimal CLI:

```bash
aios init <project-name>
aios feature <feature-name>
aios adr <decision-name>
aios task <task-name>
aios review
```

CLI responsibilities:

- copy project skeleton,
- create feature docs,
- create ADR from template,
- create task from template,
- create review report,
- optionally validate folder structure.

CLI must not become a complex orchestration engine in V2.

---

### 22.2 Stack Adapters

Add stack-specific skills and references.

Priority:

1. `flutter-development`
2. `backend-api-development`
3. `database-design`
4. `auth-billing-workflow`
5. `nextjs-development`
6. `supabase-development`

Example V2 structure:

```text
skills/
├── flutter-development/
├── backend-api-development/
├── database-design/
├── auth-billing-workflow/
├── nextjs-development/
└── supabase-development/
```

---

### 22.3 Starter Templates

Add starter skeletons:

```text
starters/
├── flutter-mobile/
├── nextjs-web/
├── node-api/
├── nestjs-api/
├── laravel-api/
├── supabase-app/
└── fullstack-saas/
```

Starter templates should include only minimal app scaffolding and AI docs integration.

---

### 22.4 OpenAPI Workflow

Add:

```text
skills/api-contract-design/
workflows/api-contract.workflow.md
templates/openapi.template.yaml
```

Purpose:

- keep frontend and backend synchronized,
- define request/response before implementation,
- reduce integration mismatch.

Workflow:

```text
Feature PRD
↓
API Contract
↓
Backend endpoint
↓
Frontend integration
↓
Contract test
```

---

### 22.5 Database Migration Workflow

Add:

```text
skills/database-migration/
workflows/database-migration.workflow.md
templates/migration-plan.template.md
```

Checklist:

- schema change,
- migration strategy,
- rollback plan,
- seed data,
- index impact,
- data compatibility,
- production safety.

---

### 22.6 Security Review Workflow

Add:

```text
skills/security-review/
workflows/security-review.workflow.md
templates/security-review-report.template.md
```

Scope:

- authentication,
- authorization,
- secrets,
- input validation,
- SQL injection,
- XSS,
- CSRF,
- rate limiting,
- webhook verification,
- payment security.

---

### 22.7 Release Automation

Add:

```text
skills/release-management/
templates/release-note.template.md
templates/changelog.template.md
workflows/release.workflow.md
```

Outputs:

- changelog,
- release notes,
- deployment checklist,
- rollback checklist.

---

### 22.8 GitHub Integration

Add:

```text
.github/
├── workflows/
│   ├── ci.yml
│   ├── test.yml
│   └── release.yml
├── PULL_REQUEST_TEMPLATE.md
└── ISSUE_TEMPLATE/
    ├── feature_request.md
    ├── bug_report.md
    └── task.md
```

Purpose:

- connect AI workflow to Git lifecycle,
- standardize PR review,
- standardize issue/task creation,
- automate basic checks.

---

## 23. V3 Scope — Productized AI Dev Platform

V3 is optional and should only begin after V2 proves useful.

Potential features:

1. Interactive CLI.
2. Skill installer.
3. Project health checker.
4. Context health checker.
5. Documentation freshness checker.
6. Task complexity analyzer.
7. AI review score.
8. GitHub Issues integration.
9. Multi-repo orchestration.
10. Web dashboard.

V3 should not be started until V1 and V2 are validated.

---

## 24. Milestones

### Milestone 1 — V1 Core Structure

Deliverables:

- repository structure,
- README,
- AGENTS.md,
- project skeleton,
- V2 placeholder directories.

Done Criteria:

- Repo can be cloned and understood.
- Skeleton can be copied into a new project.

---

### Milestone 2 — V1 Templates

Deliverables:

- vision template,
- PRD template,
- architecture template,
- ADR template,
- task template,
- implementation plan template,
- review report template,
- test plan template.

Done Criteria:

- Templates can be used by Codex without extra explanation.

---

### Milestone 3 — V1 References

Deliverables:

- engineering principles,
- architecture principles,
- API standards,
- database standards,
- frontend principles,
- backend principles,
- testing principles,
- security principles,
- context principles.

Done Criteria:

- References are reusable and not stack-specific.

---

### Milestone 4 — V1 Skills

Deliverables:

- context-management,
- product-discovery,
- prd-generator,
- architecture-design,
- adr-generator,
- task-breakdown,
- implementation-planner,
- testing,
- code-review.

Done Criteria:

- Each skill follows standard SKILL.md format.
- Each skill has example prompt.
- Each skill links to relevant templates/references.

---

### Milestone 5 — V1 Workflows

Deliverables:

- new-project workflow,
- new-feature workflow,
- bugfix workflow,
- refactor workflow,
- review workflow,
- release workflow,
- v2-roadmap workflow.

Done Criteria:

- Each workflow has input, process, output, and done criteria.

---

### Milestone 6 — V1 Validation

Deliverables:

- Use project skeleton for one real or simulated project.
- Generate vision.
- Generate PRD.
- Generate architecture.
- Generate ADR.
- Generate task breakdown.
- Implement at least one small task with Codex.

Done Criteria:

- One feature or simulated feature completes end-to-end.
- Pain points are documented.
- V2 improvements are identified.

---

## 25. Recommended Implementation Order

1. Create repository structure.
2. Create root `README.md`.
3. Create root `AGENTS.md`.
4. Create `project-skeleton/`.
5. Create `project-skeleton/AGENTS.md`.
6. Create `project-skeleton/docs/context/context-map.md`.
7. Create templates.
8. Create references.
9. Create skills.
10. Create workflows.
11. Create prompts.
12. Add V2 placeholder folders.
13. Validate with one small project/feature.

---

## 26. Open Questions

1. Should all core docs be written in English for better AI compatibility?
2. Should project-specific docs be allowed in Indonesian?
3. Should V1 include `CLAUDE.md` by default or only optional?
4. Should API contract use OpenAPI from V1 or start as optional?
5. Should the first stack adapter be Flutter or generic frontend?
6. Should backend adapter target NestJS, Laravel, Go, or generic REST API first?
7. Should CLI be built with Node.js, Go, or Python in V2?
8. Should the AI Dev OS be used as a copied skeleton or installed as submodule/package?
9. Should V2 support multi-repo FE/BE or only monorepo first?
10. Should security-review become V1 or remain V2?

---

## 27. Final Recommendation

V1 should be implemented now as a complete AI Dev OS repository, not as CLI or SaaS application.

The most important V1 deliverables are:

- `AGENTS.md`,
- `context-map.md`,
- `skills/context-management`,
- `skills/task-breakdown`,
- `skills/implementation-planner`,
- `skills/code-review`,
- templates,
- references,
- workflows,
- and project skeleton.

V2 should be planned from the beginning but not fully implemented until V1 is validated in a real project.

The product succeeds if a new project can start without rethinking AI workflow from zero and Codex can work from clear context, small tasks, reusable skills, and verifiable acceptance criteria.
