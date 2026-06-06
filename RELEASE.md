# Release Guide

This guide explains how to release a new AI-Native Development OS version to GitHub and publish the CLI package to npm.

The repository and the npm package should use the same version number. The npm package is published from `cli/` as `@donihadimas/aios`.

## Semantic Versioning

This project follows Semantic Versioning using `MAJOR.MINOR.PATCH`.

```text
MAJOR.MINOR.PATCH
```

Use the version number consistently in:

- `cli/package.json`
- `cli/package-lock.json`
- `CHANGELOG.md`
- Git tag `vX.Y.Z`
- GitHub Release title
- npm package version

### Version Rules

- `MAJOR`: breaking changes that require users to migrate.
- `MINOR`: backward-compatible new features.
- `PATCH`: backward-compatible fixes and documentation improvements.

Examples:

- `0.2.1`: fix README, validation report, package metadata, or a CLI bug without changing behavior.
- `0.3.0`: add a new command, skill, template, workflow, or non-breaking skeleton capability.
- `1.0.0`: stable public API and workflow contract after real-project usage proves the system is ready for stronger compatibility expectations.

### Current Release Version

The current initial public CLI release should use:

```text
0.2.0
```

Reason:

- V1 manual workflow already exists.
- V2 assisted CLI workflow is implemented.
- The project is usable, but still early and not yet a mature `1.0.0` ecosystem.

## Release Types

- Patch: documentation fixes, validation updates, and bug fixes.
- Minor: new CLI commands, skills, templates, references, workflows, or non-breaking skeleton changes.
- Major: breaking CLI behavior, template format changes, or workflow changes that require users to migrate.

## Pre-Release Checklist

1. Confirm the working tree contains only intended changes:

```bash
git status
```

2. Update version metadata:

```bash
cd cli
npm version <patch|minor|major> --no-git-tag-version
cd ..
```

3. Update `CHANGELOG.md` with the new version, user-visible changes, validation evidence, and known risks.

4. Run validation:

```bash
cd cli
npm test
npm pack --dry-run
cd ..
```

5. Confirm the dry-run tarball includes:

- `dist/src/`
- `assets/project-skeleton/`
- `assets/templates/`
- `README.md`
- `LICENSE`

6. Confirm the dry-run tarball does not include source tests, `dist/test/`, local caches, or unrelated files.

## Commit The Release

Commit the release changes before publishing:

```bash
git add -A -- LICENSE RELEASE.md README.md CONTRIBUTING.md CHANGELOG.md cli/package.json cli/package-lock.json
git commit -m "chore: release vX.Y.Z"
```

If the release includes other source, template, skill, workflow, or validation changes, include those files in the same release commit.

Do not commit `cli/dist/` unless the project intentionally changes that policy. The build output is generated during package preparation.

## Publish To npm

From `cli/`, publish the scoped package:

```bash
cd cli
npm whoami
npm publish --access public
```

After publish, verify installation from npm:

```bash
npm install -g @donihadimas/aios
aios --help
aios init demo-project
aios validate demo-project
```

If publish fails, do not create the GitHub release yet. Fix the issue, rerun validation, and publish again.

## Create The Git Tag

After npm publish succeeds:

```bash
git tag vX.Y.Z
git push origin main
git push origin vX.Y.Z
```

Use the same version number as `cli/package.json`.

## Create The GitHub Release

1. Open the repository on GitHub.
2. Go to **Releases**.
3. Click **Draft a new release**.
4. Choose tag `vX.Y.Z`.
5. Set the release title to `vX.Y.Z - <short release name>`.
6. Copy the relevant `CHANGELOG.md` section into the release notes.
7. Include npm install instructions:

```bash
npm install -g @donihadimas/aios
```

8. Include validation evidence:

```text
npm test: passed
npm pack --dry-run: passed
installed-package smoke test: passed
```

9. Publish the GitHub release.

### Initial `v0.2.0` GitHub Release

Recommended release title:

```text
v0.2.0 - Initial AIOS CLI Release
```

Recommended release notes:

````md
## v0.2.0 - Initial AIOS CLI Release

Initial public release of AI-Native Development OS with the `@donihadimas/aios` CLI.

### Added
- Added `aios init` for creating AI-ready project skeletons.
- Added `aios adopt` for adding AI Dev OS structure to existing projects.
- Added `aios validate` for checking required AI-ready project paths.
- Added document generators: `aios feature`, `aios adr`, `aios task`, and `aios review`.
- Added bundled project skeleton and templates for npm package runtime.
- Added OpenAPI contract workflow and generic backend API guidance.
- Added root MIT license and release documentation.

### Validation
- `npm test`: 17 passed, 0 failed.
- `npm pack --dry-run`: passed.
- Package name: `@donihadimas/aios`.

### Install

```bash
npm install -g @donihadimas/aios
```
````

### Future GitHub Release Template

Use this format for later releases:

````md
## vX.Y.Z - <Release Name>

Short summary of what this release changes and who should care.

### Added
- New backward-compatible features.

### Changed
- Behavior, workflow, template, or documentation changes.

### Fixed
- Bug fixes and correctness improvements.

### Breaking Changes
- List migration-required changes, or write `None`.

### Validation
- `npm test`: passed.
- `npm pack --dry-run`: passed.
- Installed-package smoke test: passed.

### Install

```bash
npm install -g @donihadimas/aios
```
````

## Post-Release Checks

After the GitHub release is public:

```bash
npm view @donihadimas/aios version
npm install -g @donihadimas/aios
aios --help
```

Also confirm:

- GitHub shows the expected release tag.
- The root repository shows the MIT license.
- The README install command points to `@donihadimas/aios`.
- The next planned work is documented in issues, tasks, or the roadmap.

## Rollback Notes

npm packages cannot be fully removed from user machines after publish. If a release is bad:

1. Publish a patch version with the fix.
2. Mark the bad GitHub release notes with a warning.
3. Deprecate the bad npm version if needed:

```bash
npm deprecate @donihadimas/aios@X.Y.Z "Use X.Y.Z+1 instead."
```
