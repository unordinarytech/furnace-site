# Configuration

Furnace can be configured through slash commands and preference files.

## Settings Panel

Open `/settings` to configure:

- Sidebar on/off.
- Input mode: standard or vim.
- Typing indicator: block, underscore, or bar.
- Typing blink: off or on.
- Notifications: on or off.

Use `Tab` or `Enter` to cycle values.

## Status Line

Choose which fields appear in the bottom status line:

- app name
- cwd
- title
- context: on, token+percent, percent-only, or off
- mode
- window
- theme
- model
- reasoning
- fast routing
- fork parent

## Preferences File

Global and project preferences are saved in `.furnace/preferences.json` for the project and `~/.furnace/preferences.json` for the user.

Example:

```json
{
  "model": "openai/gpt-4o",
  "theme": "night",
  "inputMode": "vim",
  "skillPaths": ["custom-skills"]
}
```

## Themes

Use `/theme [name]` to switch themes. The theme picker previews hovered themes; if you abandon browsing, the saved theme is restored.

## Skill Roots

Furnace discovers skills from project, user, Cursor, and Claude Code roots. Add extra roots in preferences:

```json
{
  "skillPaths": ["custom-skills", "~/shared-skills"]
}
```

Run `/skills reload` after changing skills.

## Shell Completions

Generate completions for your shell:

```bash
furnace completion bash
furnace completion zsh
furnace completion fish
```
