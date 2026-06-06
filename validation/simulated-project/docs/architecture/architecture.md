# Architecture: Personal Habit Tracker MVP

## Overview

The MVP uses shared docs, a frontend app area, and a backend API area. The architecture remains stack-agnostic for validation.

## Frontend Architecture

The frontend owns habit list UI, create-habit form, completion action, and display of streak state returned by the backend.

## Backend Architecture

The backend owns habit persistence, completion uniqueness for the current day, and streak calculation.

## Database Strategy

Store habits and habit completions separately. Add a uniqueness rule for one completion per habit per date.

## API Strategy

API notes live in `docs/api/`. Full OpenAPI is deferred to V2.

## Testing Strategy

Test habit creation, duplicate completion prevention, and streak display behavior.

## Key Decisions

- ADR-001 records date ownership for habit completion.
