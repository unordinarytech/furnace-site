# Getting Started

Furnace is a terminal-first agentic coding harness. It runs an AI coding loop against real repositories with streamed model output, typed tools, permission gates, and local SQLite session history.

## Requirements

- Node.js 22.x
- npm
- An API key from one of the supported providers

## Install

```bash
npx cook-furnace@latest
```

The first run installs Furnace in your user account and creates the persistent `furnace` command. It does not require administrator access or a global npm install. Reopen your terminal if Furnace reports that it updated your PATH.

## First Run

Start Furnace in interactive mode:

```bash
furnace
```

Set a provider key:

```bash
/login
```

You can also set keys with environment variables:

```bash
OPENROUTER_API_KEY=... furnace
```

Supported providers: OpenRouter, OpenAI, Anthropic, DeepSeek, GLM.

## Headless Prompt

Run a single prompt without opening the TUI:

```bash
furnace -p "List the files in this repo"
```

Get JSON output:

```bash
furnace -p "List changed files" --output-format json
```

## Resume a Session

```bash
furnace --continue
furnace --session <session-id>
```

## Update

```bash
furnace update
```

## Verify Your Install

```bash
furnace --version
```
