# Local CLI Testing Guide

This document outlines how to test and verify the `@donihadimas/aios` CLI locally before publishing releases to NPM.

Refer to the full repository guide at [docs/context/local-testing.md](file:///a:/personal/ai-native-development-os/docs/context/local-testing.md).

## Quickstart

```powershell
# 1. Build and sync assets
npm run sync-assets
npm run build

# 2. Link globally
npm link

# 3. Test Anywhere
aios -v
aios validate .
aios verify .
aios map .
aios export .

# 4. Run Automated Test Suite
npm test

# 5. Unlink when done
npm unlink -g @donihadimas/aios
```
