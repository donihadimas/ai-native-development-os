---
title: AI Agent Usage Simulation
description: See how to prompt your AI coding agent through the full AIOS lifecycle after CLI setup.
---

This guide assumes you have already run the CLI setup from the [CLI Simulation](/guides/cli-simulation) guide. The CLI created your project structure, installed the workflow kit, and recommended the next step. Now you open an AI coding agent and ask it to do the reasoning work.

## The Pattern

The agent follows a loop:

1. Read context files
2. Execute a skill or fill a template
3. Write output to a specific file
4. Pause for your review
5. Move to the next step

Each prompt should tell the agent exactly which files to read, which skill to use, and where to save the output.

## Step 1: Product Discovery

Your project is new and the idea is still rough. Ask the agent to interview you.

```
Read AGENTS.md and docs/context/context-map.md.
Then use the product-discovery skill or .aios/prompts/00-discover-product.md
to interview me about my product idea.
Save the result to docs/product/vision.md.
Do not generate the PRD until I review the vision.
```

**What the agent does:** Asks you questions about your product, users, goals, and constraints. Fills `docs/product/vision.md` with a structured vision.

**Pause and review.** Read `docs/product/vision.md`. Make sure it captures your idea accurately. Fix any misunderstandings before continuing.

## Step 2: PRD Generation

Once the vision is approved, ask the agent to generate a PRD.

```
Read docs/product/vision.md.
Then use the prd-generator skill or .aios/prompts/01-generate-prd.md
to create a PRD with testable acceptance criteria.
Save it to docs/product/prd.md using .aios/templates/prd.template.md.
```

**What the agent does:** Expands the vision into a structured PRD with user stories, acceptance criteria, scope, and non-goals.

**Pause and review.** Check that acceptance criteria are specific and testable. Verify scope is realistic for your timeline.

## Step 3: Architecture and Design

With a PRD in place, ask the agent to design the architecture.

```
Read docs/product/prd.md.
Use the architecture-design skill or .aios/prompts/02-generate-architecture.md
to create architecture context.
Save it to docs/architecture/architecture.md using .aios/templates/architecture.template.md.
```

**What the agent does:** Proposes technical direction, component structure, data flow, and key decisions.

**Pause and review.** Verify the architecture fits your constraints. If you have a specific decision to record:

```
Use the adr-generator skill or .aios/prompts/03-generate-adr.md
to record this decision: <your decision here>.
Save it to docs/adr/ using .aios/templates/adr.template.md.
```

### UI/UX Design (if building user-facing features)

If your project has a user interface, ask the agent to design it:

```
Read docs/product/prd.md and docs/architecture/architecture.md.
Use the ui-ux-design skill or .aios/prompts/13-design-ui-ux.md
to design user flows and interface states for <your feature>.
Save it to docs/design/design.md using .aios/templates/design.template.md.
```

### API Contract Design (if building APIs)

If your project exposes an API, ask the agent to define the contract:

```
Read docs/product/prd.md and docs/architecture/architecture.md.
Use the api-contract-design skill or .aios/prompts/09-design-api-contract.md
to design the API contract for <your feature>.
Save it to docs/api/ using the OpenAPI template.
```

**Pause and review.** Verify the architecture, design, and API contract fit your constraints before moving to tasks.

## Step 4: Task Breakdown

With architecture settled, ask the agent to split the PRD into tasks.

```
Read docs/product/prd.md and docs/architecture/architecture.md.
Use the task-breakdown skill or .aios/prompts/04-generate-tasks.md
to split the PRD into small implementation tasks.
Save each task to docs/tasks/ using .aios/templates/task.template.md.
```

**What the agent does:** Creates numbered task files with acceptance criteria, affected files, and dependencies.

## Step 5: Implementation Planning

Pick one task and ask the agent to plan it.

```
Read docs/tasks/TASK-001-<task-name>.md.
Use the implementation-planner skill or .aios/prompts/05-plan-implementation.md
to create a short plan for this task.
```

**What the agent does:** Identifies affected files, dependencies, risks, and test approach for the specific task.

## Step 6: Implement One Task

Ask the agent to implement the planned task.

```
Read docs/tasks/TASK-001-<task-name>.md and the implementation plan.
Use the task-implementation skill or .aios/prompts/06-implement-task.md
to implement this task.
Run npm run build or the project test command to verify.
Do not modify unrelated files.
```

**What the agent does:** Writes code, creates tests, runs validation, and updates the task status.

**Pause and review.** Check the diff. Make sure the change is scoped correctly and tests pass.

## Step 7: Code Review

After implementation, ask the agent to review its own work.

```
Use the code-review skill or .aios/prompts/07-review-code.md
to review the recent changes against the task acceptance criteria.
Save the review to docs/reviews/.
```

**What the agent does:** Checks the diff against requirements, identifies risks, and documents findings.

## Step 8: Validation

After code review, ask the agent to run tests and validate:

```
Use the testing skill or .aios/prompts/08-generate-tests.md
to design or run tests for the implemented task.
Verify that all acceptance criteria are met.
Save test evidence to docs/reviews/.
```

If anything fails during validation:

```
Read the error output and the task acceptance criteria.
Identify what failed, fix the issue, and re-run the test.
Update the review document with evidence.
```

## Step 9: Repeat

After one task is complete and reviewed, move to the next task:

```
Read docs/tasks/ and find the next open task.
Follow steps 5 through 8 for that task.
```

Work on one task at a time. Do not skip ahead.

## When the Agent Should Ask Questions

The agent should pause and ask you when:

- The vision or PRD is ambiguous
- Multiple technical approaches exist and the tradeoffs matter
- A task has unclear acceptance criteria
- A change affects security, authentication, or payment logic
- The agent is unsure which files are allowed to change

## When You Should Review

You must review before the agent continues when:

- **Product vision** is filled - before the PRD is based on wrong assumptions
- **PRD is generated** - before architecture is designed around the wrong scope
- **Architecture is proposed** - before tasks are created with incorrect direction
- **A task is implemented** - before moving to the next task with unverified code

Do not skip reviews. The agent follows instructions, but you own the decisions.

## One Task at a Time

The agent should work on one active task at a time. This keeps changes small, reviewable, and testable. If you give the agent too many tasks at once, the diff becomes hard to review and errors compound.

## Related Pages

- [CLI Simulation](/guides/cli-simulation) - What the CLI does before the agent starts
- [Using with AI Agents](/guides/ai-agents) - Agent setup and delivery modes
- [First Ten Minutes](/guides/first-ten-minutes) - Quick start with copy-ready prompts
- [Skills](/guides/skills) - Reusable agent procedures
- [Templates](/guides/templates) - Document formats
- [Workflow](/guides/workflow) - Full development flow
