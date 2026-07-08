---
title: "Features Section on Home Page"
type: feat
date: 2026-07-08
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
---

# Features Section on Home Page

## Goal Capsule

- **Objective:** Add a features section below the hero on the home page with user-friendly feature descriptions, displayed directly on the shader background without a paper-surface card wrapper.
- **Authority:** User confirmed: no white bg card, features on the page directly, abstract out technical jargon, highlight forking/memory/BYOK.
- **Stop conditions:** Home page has a scrollable features section below the hero with 8 user-friendly feature items. Existing /features route is updated with the same copy. Build passes.
- **Execution profile:** Lightweight one-off UI change.
- **Tail ownership:** User reviews visual layout and copy.

---

## Product Contract

### Summary

The home page currently shows only a hero with an install CTA. Add a second section below it listing Furnace's key features in user-friendly language. No paper-surface card wrapper, features rendered directly on the shader background with the same visual language as the rest of the site (white text, mono font, synthwave hover). Also update the existing /features route with the same improved copy.

### Requirements

- R1. Home page has a scrollable features section below the hero and install CTA.
- R2. Features are displayed directly on the page, no paper-surface card wrapper.
- R3. Feature descriptions use user-friendly language, no technical jargon (no "Ink TUI", "SQLite", "typed tool registry", "append-only entry trees").
- R4. Features highlighted by the user are included: forking, memory/context management, providers (BYOK).
- R5. Additional features included: plan mode, background agents, skills, permission gates, session persistence.
- R6. The existing /features route uses the same updated feature copy.
- R7. Visual style is consistent with the site: white text on shader background, Departure Mono font, synthwave coral hover effects.

### Scope Boundaries

#### In scope
- Adding features section to Home.jsx
- Rewriting feature copy in both Home.jsx and Features.jsx
- CSS for the features section on the home page (no card)

#### Out of scope
- Removing or restructuring the /features route
- Adding new routes
- Changing the shader or background
- Adding animations beyond existing site patterns

---

## Planning Contract

### Key Technical Decisions

- KTD1. **Feature list as shared data:** Extract the features array into a shared constant so Home.jsx and Features.jsx use the same data. Avoids copy drift.
- KTD2. **No card on home page, card stays on /features:** The home page features section uses transparent background with white text directly on the shader. The /features route keeps its paper-surface card as-is, just with updated copy.
- KTD3. **Layout:** Features on home page rendered as a simple list with feature name (uppercase, bold) and description below, separated by thin dividers. Consistent with the feature-list styling already in index.css but adapted for dark/transparent background.

---

## Implementation Units

### U1. Rewrite features data with user-friendly descriptions

**Goal:** Create a shared features data file with 8 user-friendly feature descriptions.

**Requirements:** R3, R4, R5

**Files:**
- `src/features-data.js` (create)
- `src/pages/Features.jsx` (modify, import from shared data)

**Approach:** Extract the features array into `src/features-data.js`. Rewrite all 8 features:

1. **Fork Any Conversation** - Go back to any point and explore a different direction. Your original work stays untouched.
2. **Stays in Context** - Long sessions stay coherent. Furnace automatically summarizes earlier context so nothing gets lost.
3. **Bring Your Own Keys** - OpenRouter, OpenAI, Anthropic, DeepSeek, GLM, or any compatible provider. Your API keys, your models, your rules.
4. **Plan Before You Build** - Think through architecture and write a concrete plan before touching code.
5. **Background Agents** - Delegate independent work to subagents that run in parallel while you keep working.
6. **Skills** - Load focused instruction packages for specific workflows. Works with existing skill ecosystems.
7. **You're in Control** - Approve, deny, or auto-allow each tool call. Furnace asks before doing anything risky.
8. **Sessions That Persist** - Every conversation is saved locally. Resume, review, or branch from any past session.

**Test expectation:** none, pure data file with no behavioral logic.

**Verification:** Build passes, Features.jsx renders with new copy.

---

### U2. Add features section to Home page

**Goal:** Add a scrollable features section below the hero on the home page.

**Requirements:** R1, R2, R7

**Dependencies:** U1

**Files:**
- `src/pages/Home.jsx` (modify)
- `src/index.css` (modify, add home-features styles)

**Approach:** Below the hero div, add a features section that:
- Uses the shared features data from U1
- Renders features directly on the shader background (no paper-surface card)
- White text, Departure Mono for feature names, Libre Baskerville or system font for descriptions
- Thin dividers between items (rgba(255,255,255,0.1))
- Feature names uppercase, bold, with synthwave coral hover
- Adequate top padding to separate from the hero section
- Max width constrained for readability

Add a `.home-features` CSS class in index.css for the transparent-background feature list styling.

**Patterns to follow:** Match the existing `.feature-list` styling from index.css but with inverted colors (white text on dark/transparent instead of dark text on paper).

**Test expectation:** none, pure UI presentation.

**Verification:** Build passes, home page shows features section below hero when scrolling down.

---

## Verification Contract

- `npx vite build` passes with no errors
- Home page renders hero + install CTA + features section when loaded
- Features section is scrollable and visible below the fold
- /features route shows updated copy in the paper-surface card
- No technical jargon in any feature description

---

## Definition of Done

- Features data extracted to shared file
- Home page has features section below hero, no card wrapper
- /features route uses same updated copy
- Build passes
