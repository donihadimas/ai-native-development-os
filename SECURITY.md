# 🛡️ Security Policy

## 🚨 Reporting Security Issues

> [!WARNING]
> Please **do not** report security issues in public GitHub issues.

If you find a security concern, contact the maintainer privately with:

- A clear description of the issue.
- Reproduction steps if available.
- Affected files or commands.
- Potential impact.
- Suggested mitigation if you have one.

## 🔍 Scope

Security concerns may include:

- Unsafe CLI behavior.
- Accidental overwrite or destructive file operations.
- Package publishing risks.
- Secret exposure in templates or docs.
- Dependency or supply-chain concerns.

## 🛠️ Maintainer Response

The maintainer will review reports, assess impact, and publish fixes or guidance when appropriate.

## 📊 Current Security Posture

> [!NOTE]
> The CLI is intentionally small. It copies, renders, numbers, and validates files. It does not run AI agents, execute project code, manage credentials, or perform destructive overwrite operations by default.
