---
title: First Ten Minutes
description: A quick-start path for new AIOS users with copy-ready agent prompts.
---

This guide gets you from zero to your first implemented task in about ten minutes. Follow the path that matches your situation.

## Path A: New Project

### Step 1: Create the project

```bash
aios init my-project
cd my-project
```

### Step 2: Check what to do next

```bash
aios next
```

`aios next` is read-only. It prints a recommendation based on what files exist.

### Step 3: Ask your agent to discover your product

Paste this into your AI coding agent:

```
Read docs/context/context-map.md, then use the product-discovery skill
or .aios/prompts/00-discover-product.md to interview me about my product idea.
Fill docs/product/vision.md with the result.
```

**Pause and review.** Read `docs/product/vision.md`. Make sure it captures your idea accurately before continuing.

### Step 4: Ask your agent to generate a PRD

```
Read docs/product/vision.md and use the prd-generator skill
or .aios/prompts/01-generate-prd.md to create a PRD.
Save it as docs/product/prd.md using .aios/templates/prd.template.md.
```

**Pause and review.** Check that acceptance criteria are testable and that scope is realistic.

## Path B: Existing Project

### Step 1: Adopt AIOS into your project

```bash
cd your-existing-project
aios adopt
aios validate
```

`aios adopt` adds structure without overwriting existing files.

### Step 2: Check what to do next

```bash
aios next
```

### Step 3: Start with product discovery or jump in

If you have a clear idea, skip to Continue the Lifecycle. Otherwise, ask your agent:

```
Read docs/context/context-map.md, then use the product-discovery skill
or .aios/prompts/00-discover-product.md to interview me about what we are building.
Fill docs/product/vision.md with the result.
```

**Pause and review.** Verify the vision before moving on.

## Continue the Lifecycle

After vision and PRD are ready, follow these prompts in order. Pause after each one to review the output.

### Architecture

```
Use the architecture-design skill or .aios/prompts/02-generate-architecture.md
to create architecture context. Save it using .aios/templates/architecture.template.md.
```

### ADR (if you have a specific decision)

```
Use the adr-generator skill or .aios/prompts/03-generate-adr.md to record
this decision: <your decision here>. Save it using .aios/templates/adr.template.md.
```

**Pause and review.** Make sure architecture and decisions align with your constraints.

### Task Breakdown

```
Use the task-breakdown skill or .aios/prompts/04-generate-tasks.md to split
the PRD into small implementation tasks. Save them in docs/tasks/.
```

### Implementation Plan

```
Use the implementation-planner skill or .aios/prompts/05-plan-implementation.md
to create a plan for the first task.
```

### Implement One Task

```
Use the task-implementation skill or .aios/prompts/06-implement-task.md
to implement the first task. Run npm run build or your project tests
to verify.
```

**Pause and review.** Check the diff. Make sure the change is scoped and correct.

### Code Review

```
Use the code-review skill or .aios/prompts/07-review-code.md to review
the changes against the task acceptance criteria.
```

### UI/UX Design (when building user-facing features)

```
Use the ui-ux-design skill or .aios/prompts/13-design-ui-ux.md to design
user flows and interface states for <your feature>.
Save it using .aios/templates/design.template.md.
```

### Validation and Debug Follow-up

If something fails during implementation or testing:

```
Read the error output and the task acceptance criteria.
Identify what failed, fix the issue, and re-run the test or build.
Update docs/reviews/ if the fix changes the implementation approach.
```

## The Pattern

The full loop is:

1. Discover product
2. Generate PRD
3. Design architecture
4. Record decisions (ADRs)
5. Break into tasks
6. Plan implementation
7. Implement one task
8. Review the change
9. Repeat from step 6

Each step produces a file. Each file becomes context for the next step. The agent reads the right document instead of relying on chat memory.

## When to Stop and Review

You should pause and review after these steps:

- **Product vision**: before the agent writes a PRD based on wrong assumptions
- **PRD**: before architecture is designed around the wrong scope
- **Architecture/ADR**: before tasks are created with incorrect technical direction
- **Task implementation**: before moving to the next task with an unverified change

Do not skip reviews. The files are meant to be read by humans, not just by agents.

## Related Pages

- [Getting Started](/getting-started) - Installation and setup
- [How It Works](/guides/how-it-works) - Core concepts
- [Skills](/guides/skills) - Reusable agent procedures
- [Templates](/guides/templates) - Document formats
- [Recommended Workflow](/guides/workflow) - Full development flow
- [Using with AI Agents](/guides/ai-agents) - Agent setup and delivery modes
