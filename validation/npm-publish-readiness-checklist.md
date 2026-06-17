# NPM Publish Readiness Checklist

Use this checklist before every `npm publish` from `cli/`. All steps are manual. Do not publish automatically.

## 1. Pre-Release

- [ ] Working tree contains only intended changes (`git status` clean or only release files).
- [ ] Version updated in `cli/package.json` (and `cli/package-lock.json` if present).
- [ ] Same version number used in `CHANGELOG.md`, Git tag, and GitHub Release title.

## 2. Build and Test

```bash
cd cli
npm run build
npm test
```

- [ ] Build succeeds (`tsc -p tsconfig.json`).
- [ ] All tests pass.

## 3. Asset Sync

```bash
npm run sync-assets
```

- [ ] Synced assets include any new workflow files, templates, starters, integration rules, or skill changes.
- [ ] Verify `cli/assets/` contains expected directories: `aios-kit/`, `project-skeleton/`, `templates/`, `starters/`.

## 4. Pack Dry-Run and Tarball Inspection

```bash
npm pack --dry-run
```

- [ ] Tarball includes `dist/src/`, `assets/aios-kit/`, `assets/project-skeleton/`, `assets/templates/`, `assets/starters/`, `README.md`, `LICENSE`.
- [ ] Tarball does **not** include `src/`, `test/`, `dist/test/`, `node_modules/`, or unrelated files.

## 5. Installed Package Smoke Test

```bash
npm pack --pack-destination /tmp
cd /tmp
npm init -y
npm install donihadimas-aios-X.Y.Z.tgz
./node_modules/.bin/aios init demo-project
./node_modules/.bin/aios validate demo-project
./node_modules/.bin/aios create task "Smoke Test"
./node_modules/.bin/aios next demo-project
```

- [ ] `aios init` creates a valid project.
- [ ] `aios validate` passes.
- [ ] `aios create` generates files from bundled templates.
- [ ] `aios next` produces guidance without errors.

## 6. Version and Changelog

- [ ] `CHANGELOG.md` documents new features, fixes, and breaking changes for this version.
- [ ] Package version matches the intended release version.

## 7. npm Authentication

```bash
npm whoami
```

- [ ] Logged in to npm with publish permission for `@donihadimas`.

## 8. Publish

```bash
cd cli
npm publish --access public
```

- [ ] Publish succeeds without errors.

## 9. Post-Publish Verification

```bash
npm view @donihadimas/aios version
npm install -g @donihadimas/aios
aios --help
aios init /tmp/verify-project
aios validate /tmp/verify-project
```

- [ ] `npm view` shows the expected version.
- [ ] Global install works.
- [ ] Basic commands run correctly from the installed package.

## 10. Post-Pack Cleanup

```bash
rm -f cli/*.tgz
rm -rf /tmp/verify-project
```

- [ ] Local `.tgz` files removed.
- [ ] Temporary smoke-test directories cleaned up.

## 11. Tag and Release

```bash
git tag vX.Y.Z
git push origin main
git push origin vX.Y.Z
```

- [ ] Git tag created and pushed.
- [ ] GitHub Release created with changelog section and install instructions.
