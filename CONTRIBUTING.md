# 🤝 Contributing

Thank you for your interest in contributing to AI-Native Development OS. 🎉

> [!IMPORTANT]
> This project is a reusable workflow foundation for AI-assisted software development. Contributions should keep the core principles intact: small tasks, clear context routing, human-owned decisions, and verifiable work.

## 🛠️ Development Setup

Clone the repository, then install and test the CLI:

```bash
cd cli
npm install
npm test
```

Build the CLI:

```bash
npm run build
```

Run the CLI locally:

```bash
npm run aios -- init ../demo-project
```

## 📋 Contribution Guidelines

- **Keep changes small and focused.**
- **Do not mix unrelated refactors** with feature work.
- **Update documentation** when commands, workflows, templates, skills, or references change.
- **Add or update tests** for CLI behavior changes.
- **Keep V1/V2 boundaries clear.** Do not add large orchestration features without discussion.
- **Avoid stack-specific assumptions** in the core OS unless the change is explicitly an adapter.

## ✅ Pull Request Checklist

Before opening a pull request:

- [ ] The change has a clear purpose.
- [ ] CLI tests pass with `npm test` from `cli/`.
- [ ] Documentation is updated if behavior changed.
- [ ] Generated/package artifacts are not committed unless intentionally required.
- [ ] The PR explains risks, trade-offs, and validation performed.

## 🚢 Release Checklist

Before publishing a CLI release, follow the full process in `RELEASE.md`.

Minimum validation:

```bash
cd cli
npm test
npm pack --dry-run
```

> [!NOTE]
> For npm publishing, verify the package tarball includes runtime files and assets, but excludes source tests and unnecessary files.
