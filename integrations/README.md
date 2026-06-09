# AIOS Integrations

This folder contains optional integration rules for external AI-native tools.

Integrations are opt-in. They guide agents when a tool is available, but AIOS remains usable without the external tool installed.

Supported integrations:

- `rtk` - compact noisy terminal command output before it enters AI context.
- `caveman` - use concise response style for status updates and debug loops.

Use:

```bash
aios integration status
aios integration add rtk
aios integration add caveman --mode lite
```

