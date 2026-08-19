# Graphify Integration Rules

Use Graphify only when `.aios/config.json` has `integrations.graphify.enabled: true` and `graphify` is available on `PATH`.

Use Graphify to understand codebase architecture and trace relationships:
- To find where a function/class is called or subclassed (`graphify explain "<symbol>"`).
- To find all downstream callers/files affected by a change (`graphify affected "<file/symbol>"`).
- To answer structural questions via graph traversal (`graphify query "<question>"`).
- To trace dependency paths between modules (`graphify path "<nodeA>" "<nodeB>"`).

Commands:
- Query graph: `graphify query "your natural language question"`
- Explain node & connections: `graphify explain "<symbol_or_file>"`
- Trace impacted nodes: `graphify affected "<symbol_or_file>"`
- Re-index/extract graph: `graphify extract . --code-only` (or `graphify update .`)
