---
title: Recommended Workflow
description: Step-by-step guide to building an application using the AI-Native Workflow.
---

Once AIOS is installed, use this workflow to keep the agent grounded in explicit context and verifiable tasks.

## 1. Initialize Or Adopt A Workspace

For a new project, run the guided setup wizard:

```bash
aios
```

Choose a project shape and use full setup for the complete `.aios/` workflow kit.

For an existing project, run:

```bash
aios adopt
aios validate
```

`adopt` adds AIOS files without overwriting existing files.

## 2. Define The Product Vision

Open `docs/product/vision.md`. Write down your app idea in plain text. It doesn't have to be formal.

Example:

> "I want to build a habit tracker where users can log in, add habits, check them off daily, and see a streak counter. Use React and Tailwind."

## 3. Generate Or Refine The PRD

Open your AI coding agent in the IDE and route it to the PRD skill:

> "Please read `docs/product/vision.md` and run the `prd-generator` skill to create `docs/product/prd.md`."

Review the PRD manually. Make sure the target users, scope, non-goals, and acceptance criteria match what you actually want to build.

## 4. Record Architecture Decisions

Create architecture and ADR documents before implementation:

```bash
aios create adr "Use Next.js and Supabase"
```

Instruct your AI:
> "Fill out the new ADR in `docs/adr/` explaining why this stack fits the PRD. Include trade-offs, alternatives, and consequences."

## 5. Break Work Into Tasks

Avoid asking the agent to build the whole app at once. Create small task files:

```bash
aios create task "Setup Next.js boilerplate and Tailwind"
aios create task "Create Supabase database schema"
aios create task "Build Login UI"
```

Each task should include scope, acceptance criteria, context links, risks, and validation steps.

## 6. Implement One Task At A Time

Open the first task file, then instruct the agent:

> "Please implement task 001. Read the task file, check the PRD context if needed, and write the code."

Keep the request narrow. If the agent needs more context, point it to a specific document instead of asking it to read the whole repo.

## 7. Review And Validate

After implementation, do not blindly commit the result.

1. Create a review document:

   ```bash
   aios create review "Setup Next.js"
   ```

2. Ask the agent to review against the task:

> "Run a self-review of the code you just wrote against the acceptance criteria in task 001. Fill out the review document."

3. Run the relevant tests or manual validation.
4. Record evidence before marking the task done.

## 8. Ask For The Next Step

Use `aios next` when you are unsure what to do next:

```bash
aios next
```

The command is read-only. It inspects the project structure and recommends a next step based on the docs and workflow files that exist.
