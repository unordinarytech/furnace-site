---
title: "feat: docs subsite and landing page button"
date: 2026-07-08
status: active
---

# feat: docs subsite and landing page button

## Summary

Add a minimal docs subsite to the Furnace landing page. The docs live under `/docs` in the site and are reachable from a new button next to the npm install CTA on the home page. The content is pulled from the Furnace app at `/Users/ronish/superconductor/projects/furnace` and rewritten in plain, industrial language for AI engineers.

## Problem Frame

The landing page has no path to documentation. Visitors who want to understand how to use Furnace have to leave the site for GitHub or the repo. The site needs a lightweight docs subsite that is consistent with the brand colors and typography but utilitarian, not design-heavy.

## Requirements

- Create a minimal docs structure under `furnace-site/docs/` that the site can consume.
- Add a docs page component that renders markdown content in a utilitarian, industrial layout.
- Add a `/docs` route and a nav link in the existing chrome.
- Add a button next to the npm install codeblock on the home page that links to `/docs`.
- Keep the docs simple, technical, and free of buzzwords.

## Scope Boundaries

### In Scope
- Markdown docs content: getting started, commands, tools, safety, configuration.
- Docs layout with sidebar navigation and page rendering.
- Routing and nav integration.
- Home page CTA button.

### Out of Scope
- Full docs search.
- Automated sync with the Furnace repo docs.
- Versioned docs.
- API reference generation.

## Key Technical Decisions

- **Docs as static markdown**: Vite imports markdown files as raw strings and React renders them as simple HTML. This avoids adding a markdown parser dependency and keeps the build fast.
- **Industrial layout**: plain light background, monochrome typography, accent color only for links and the active nav item. No paper texture or decorative background on docs pages.
- **Single-page docs sections**: each section is a markdown file rendered on its own route; the sidebar provides anchors.

## Implementation Units

### U1. Create minimal docs content

- **Goal**: Add the markdown files that the docs subsite will render.
- **Files**:
  - `docs/getting-started.md`
  - `docs/commands.md`
  - `docs/tools.md`
  - `docs/safety.md`
  - `docs/configuration.md`
- **Approach**: Write concise, command-focused docs derived from the Furnace README and existing `docs/` in the furnace repo. Each file covers one topic with short headings and code examples.
- **Test scenarios**: Build should include the new markdown files and Vite should import them without errors.
- **Verification**: `npm run build` completes and the docs files appear in the output.

### U2. Build docs layout and renderer

- **Goal**: Create a reusable docs layout and a renderer that converts markdown strings to HTML.
- **Files**:
  - `src/pages/Docs.jsx` — top-level docs page that selects the current section.
  - `src/components/DocsLayout.jsx` — sidebar + content wrapper.
  - `src/components/Markdown.jsx` — small markdown-to-HTML renderer using regex transforms (headings, code blocks, paragraphs, links, lists).
- **Approach**: Keep the renderer minimal. Support only the markdown constructs used in the docs files. Escape inline HTML to avoid XSS. Use the site's monospace fonts for headings and code, and a readable sans-serif for body text.
- **Test scenarios**: Render each docs page and verify headings, code blocks, and lists appear correctly.
- **Verification**: The docs page renders without runtime errors and all four sections are reachable from the sidebar.

### U3. Wire routing and navigation

- **Goal**: Add the `/docs` route and a docs link in the chrome navigation.
- **Files**:
  - `src/App.jsx` — add `/docs` and `/docs/:section` routes.
  - `src/components/Chrome.jsx` — add a `Docs` link in the top-right nav.
- **Approach**: Use `react-router-dom` route parameters to select the active section. Default to `getting-started`.
- **Test scenarios**: Visiting `/docs` shows the getting-started section; visiting `/docs/tools` shows the tools section; the sidebar highlights the active section.
- **Verification**: Manual navigation across sections works and the Chrome `Docs` link is visible.

### U4. Add docs button next to install CTA

- **Goal**: Place a clear docs entry point next to the npm install codeblock on the home page.
- **Files**:
  - `src/pages/Home.jsx` — add a button linking to `/docs` beside the install block.
  - `src/index.css` — style the button to match the site's industrial accent language without blending into the install block.
- **Approach**: Render the button as a secondary outline-style button using the existing accent color. Keep the copy short: "Docs".
- **Test scenarios**: The button is visible on the home page, links to `/docs`, and remains usable at narrow widths.
- **Verification**: The home page renders the button and the link navigates to `/docs/getting-started`.

## Deferred to Follow-Up Work

- Full-text search across docs.
- Auto-sync docs from the Furnace repo.
- Table of contents within each docs page.
- Dark-mode styling for the docs subsite.

## Open Questions

None. The scope is bounded and the design direction is explicit.

## Sources & Research

- Furnace README at `/Users/ronish/superconductor/projects/furnace/README.md` for install, commands, and overview.
- Furnace `docs/tools.md`, `docs/skills.md`, `docs/plan.md` for detailed technical content.
- Existing furnace-site components and styles for visual consistency.
