# Tools

Furnace exposes a small set of typed tools to the model. The runtime handles schema, execution, permission checks, and session persistence.

## File and Search

| Tool | Purpose |
| --- | --- |
| `read` | Read a file. Relative paths resolve from the workspace. |
| `ls` | List files and directories. |
| `find` | Find files by path/name substring. |
| `glob` | Find files by glob pattern. |
| `grep` | Search text files for a string or regex. |

## Edit and Run

| Tool | Purpose |
| --- | --- |
| `write` | Create or overwrite a file. |
| `edit` | Apply a Furnace patch envelope to update files. |
| `bash` | Run a bounded shell command. |

## Interaction

| Tool | Purpose |
| --- | --- |
| `ask_question` | Ask the user one or more clarification questions. |
| `todoread`, `todowrite` | Read or update the in-session todo list. |
| `task`, `task_status` | Delegate work to subagents or check their status. |
| `skill`, `skill_manage` | Load or create local skills. |
| `websearch`, `webfetch` | Search the web or fetch a URL. |
| `context_retrieve` | Retrieve compressed tool-output originals. |

## Permission Defaults

- Allowed by default: `read`, `ls`, `find`, `glob`, `grep`, `ask_question`, `skill`, `task`, `task_status`, `todoread`, `todowrite`, `websearch`, `webfetch`.
- Ask by default: `write`, `edit`, `bash`, `skill_manage`.

Denying a request blocks only that specific tool call.

## Path Rules

- Relative paths resolve from the current workspace.
- Absolute paths and `~/` paths are allowed when explicitly provided.
- `.env` and `.env.*` reads are denied; `.env.example` is allowed.
- `write` refuses to overwrite existing files unless `overwrite: true`.

## Output Limits

- Tool output is bounded to 2,000 lines and 50 KB before returning to the model.
- Oversized output is saved under `.furnace/tool-output/` and the model receives a head/tail preview.
- `read` output is capped at 200,000 characters.
- `grep` skips files larger than 1 MB.
- `bash` has a default 30 second timeout and a max 120 second timeout.

## Plan Mode Restrictions

In plan mode, writes and edits are allowed only for the active `.furnace/plans/...` artifact. Mutating `bash` commands, `skill_manage`, package installs, and destructive filesystem commands are denied.
