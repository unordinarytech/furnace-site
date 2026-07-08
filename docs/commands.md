# Commands

Furnace uses slash commands in interactive mode. Type `/` followed by the command name.

## Session

| Command | Purpose |
| --- | --- |
| `/new` | Start a fresh conversation. |
| `/resume`, `/history` | Browse saved conversations. |
| `/fork [current\|prompt-preview]` | Fork the current conversation or a prior prompt. |
| `/clone` | Fork from the current conversation tip. |

## Input and Context

| Command | Purpose |
| --- | --- |
| `/image <path\|url>` | Attach an image to the next message. |
| `/compact [focus]` | Summarize older conversation entries. |
| `/copy` | Copy the last assistant response. |
| `/editor` | Compose a message in `$EDITOR`. |
| `/clear` | Clear the conversation display. |

## Model and Mode

| Command | Purpose |
| --- | --- |
| `/model` | Browse/select model and configure context/reasoning/fast routing. |
| `/plan [prompt]` | Switch to plan mode. |
| `/agent` or `/mode agent` | Switch back to agent mode. |

## Tools and Tasks

| Command | Purpose |
| --- | --- |
| `/tasks` | Show active subagents. |
| `/permissions` | View/clear conversation approvals. |
| `/diff` | Show files changed this session. |
| `/undo` | Revert the most recent file-changing tool call. |

## Skills and Settings

| Command | Purpose |
| --- | --- |
| `/skills list` | List discovered skills. |
| `/skills view <name>` | View a skill. |
| `/skills reload` | Reload skill discovery. |
| `/settings`, `/prefs` | Configure UI/status preferences. |
| `/theme [name]` | Select a theme. |
| `/status` | Show session/model/mode/context status. |
| `/cost` | Show token/cost usage estimates. |
| `/export [json] [path]` | Export the conversation. |
| `/lofi` | Toggle lofi mode. |
| `/exit`, `/quit` | Exit Furnace. |

## Custom Commands

You can add reusable slash-command templates under `.furnace/commands` or `~/.furnace/commands`. Project commands override global commands.
