## Rule: always use QMD before reading files

Before reading source files with `Read`, search QMD first for architectural context and documentation.

### QMD collections

- `"website"`, `"pulse"`, `"Ofluence"`, `"core"`, `"infra"`, `"felix"`

### Search with `mcp__qmd__query`

All search uses the unified `mcp__qmd__query` tool with typed sub-queries. First sub-query gets 2× weight.

| Sub-query type | Speed  | Use when                                                     |
| -------------- | ------ | ------------------------------------------------------------ |
| `lex`          | Fast   | You know the exact keyword/phrase (supports `"phrase"`, `-negation`) |
| `vec`          | Medium | You want meaning-based/synonym matching (natural language question) |
| `hyde`         | Slow   | Write a 50-100 word hypothetical answer passage for nuanced topics  |

Combine types for best recall (e.g., `lex` + `vec` for broad search, add `hyde` for complex topics).

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
