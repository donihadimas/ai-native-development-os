# Security Policy

## Reporting Security Issues

Please do not report security issues in public GitHub issues.

If you find a security concern, contact the maintainer privately with:

- a clear description of the issue,
- reproduction steps if available,
- affected files or commands,
- potential impact,
- suggested mitigation if you have one.

## Scope

Security concerns may include:

- unsafe CLI behavior,
- accidental overwrite or destructive file operations,
- package publishing risks,
- secret exposure in templates or docs,
- dependency or supply-chain concerns.

## Maintainer Response

The maintainer will review reports, assess impact, and publish fixes or guidance when appropriate.

## Current Security Posture

The CLI is intentionally small. It copies, renders, numbers, and validates files. It does not run AI agents, execute project code, manage credentials, or perform destructive overwrite operations by default.
