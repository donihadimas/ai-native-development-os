# Graphify Integration Rules

Use Graphify only when `.aios/config.json` has `integrations.graphify.enabled: true` and `graphify` is available on `PATH`.

Use Graphify to understand codebase architecture and trace relationships:
- To find where a function/class is called or subclassed.
- To trace API endpoint controllers back to database models.
- To query dependency graphs of complex modules.

Commands:
- Query graph: `graphify query "your natural language question"`
- Re-ingest index: `graphify ingest`
