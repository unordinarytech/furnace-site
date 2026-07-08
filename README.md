# Furnace

A terminal-first agentic coding harness. Built in the open, run it in your repository.

This is the landing page and documentation site for [Furnace](https://github.com/amoreX/furnace).

## Stack

- [Vite](https://vitejs.dev/) — build tooling
- [React](https://react.dev/) — UI library
- [React Router](https://reactrouter.com/) — client-side routing
- [Tailwind CSS v4](https://tailwindcss.com/) — styling

## Getting started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Build

```bash
npm run build
```

Static files are output to `dist/`. Preview locally with:

```bash
npm run preview
```

## Project structure

```
public/          # Static assets (fonts, images, shader.js)
src/
  components/    # Background, Chrome, Footer, Docs layout, Markdown
  pages/         # Home, Features, Quickstart, Docs
  index.css      # Tailwind entry + minimal base resets
  features-data.js
```

## Deployment

The project is configured for Vercel. Push to a tracked branch and deploy the `dist` output from `vite build`.

## License

MIT
