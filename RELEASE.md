# Release Guide

This guide explains how to release a new AI-Native Development OS version to GitHub and publish the CLI package to npm.

The repository and the npm package should use the same version number. The npm package is published from `cli/` as `@donihadimas/aios`.

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
