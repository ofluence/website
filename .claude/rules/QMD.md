## Rule: always use QMD before reading files

Before reading source files with `Read`, search QMD first for architectural context and documentation.

### QMD collections

- `"pulse"`, `"Ofluence"`, `"core"`, `"infra"`

### Search (pick the right tool for the job)

| Tool                      | Speed | Use when                                                                   |
| ------------------------- | ----- | -------------------------------------------------------------------------- |
| `mcp__qmd__search`        | ~30ms | You know the exact keyword/phrase                                          |
| `mcp__qmd__vector_search` | ~2s   | You want meaning-based/synonym matching                                    |
| `mcp__qmd__deep_search`   | ~10s  | Broad exploration — auto-expands query, combines keyword + vector, reranks |

Use `minScore: 0.5` to filter low-confidence results.

### Retrieving full documents

After searching, retrieve docs using `mcp__qmd__get` with the **`file`** parameter (NOT `id`):

```
# By file path from search results:
mcp__qmd__get(file: "core/docs/architecture.md")

# By docid from search results:
mcp__qmd__get(file: "#8a2a24")

# With line offset:
mcp__qmd__get(file: "core/docs/architecture.md:100")
```

For multiple documents, use `mcp__qmd__multi_get` with the **`pattern`** parameter:

```
# Glob pattern:
mcp__qmd__multi_get(pattern: "core/docs/*.md")

# Comma-separated list:
mcp__qmd__multi_get(pattern: "core/docs/architecture.md,pulse/docs/structure.md")
```

### Typical workflow

1. **QMD search** → find relevant docs (get file paths and docids from results)
2. **QMD get/multi_get** → retrieve full doc content using `file`/`pattern` params
3. **Grep/Glob** → find source files in the codebase
4. **Read** → read specific source files for implementation details
