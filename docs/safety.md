# Safety

Furnace is designed to be useful on real repositories without requiring blind trust. It uses permission gates, not a sandbox.

## Local Data

Furnace stores local state in the current workspace under `.furnace/`:

- `furnace.sqlite` — sessions, tool calls, tool results, todo state, fork metadata, file-read tracking, image metadata.
- `context-store/` — full originals of compressed tool output.
- `plans/` — active plan artifacts.

`.furnace/` is excluded from `git status` via the local `.git/info/exclude` file when possible.

## Permission Model

When a gated tool runs, you can choose:

- `Allow once` — approve only this call.
- `Allow <tool> for conversation` — approve future calls of this tool in the current session.
- `Allow all tools for conversation` — approve all future tool calls in this session.
- `Deny` — block this call.

Use `/reset-perms` or `/permissions` to clear grants.

## Defaults

- Low-risk read/search/question/task/todo/web tools are allowed by default.
- `write`, `edit`, `bash`, and `skill_manage` ask by default.
- `.env` reads are denied.
- Writes outside the workspace require an explicit external path and approval.
- Plan mode denies most mutations except the active plan artifact and safe read-only exploration.

## Stale-Write Warnings

`read` tracks file size and mtime. If a file changes after Furnace read it in the active session, `write` and `edit` warn before applying the change. Approval still happens first; the warning appears in the result.

## Subagents

Child subagents inherit the parent conversation's permission grants, but ungranted side-effecting tools inside children still prompt normally. Subagents cannot create further subagents (`task` is removed from their tool set).

## Images

Local images are validated, stored with the session, and sent as multimodal content when the model supports image input. Supported formats: JPEG, PNG, GIF, WebP. Remote image URLs are also supported.

## Known Limits

- Provider support is OpenRouter-first.
- There is no OS/container sandbox adapter yet.
- Use Furnace in repositories where you are comfortable reviewing tool approvals.
