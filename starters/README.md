# Starters

This directory contains V2.x AI-ready starter shells. Starters are intentionally docs-first and do not include framework code or dependencies. The CLI installs the local `.aios/` workflow kit into generated starter projects by default.

## Available Starters

- `flutter-mobile` - mobile app shell with shared product, architecture, task, API, and context docs.
- `nextjs-web` - web frontend shell with AI-ready docs and a frontend placeholder.
- `node-api` - generic Node API shell with API and backend placeholders.
- `nestjs-api` - NestJS-oriented API shell without generated NestJS code.
- `laravel-api` - Laravel-oriented API shell without generated Laravel code.
- `supabase-app` - Supabase-oriented app shell with database and API context placeholders.
- `fullstack-saas` - frontend/backend SaaS shell with shared docs.

## Rules

- Starters must not introduce dependencies.
- Starters must not include stack-specific application code in V2.x.
- Starters may include placeholders, documentation, and context routing only.
- Use `aios starter <starter-name> <project-name>` to copy a ready-to-use starter with `.aios/`.
- Use `aios starter <starter-name> <project-name> --lite` to skip `.aios/`.
