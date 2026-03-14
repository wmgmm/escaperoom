# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at http://localhost:5173/escaperoom/ (port increments if busy)
npm run build     # production build to dist/
npm run preview   # serve the dist/ build locally
```

No linter or test runner is configured.

## Architecture

Single-page React app (Vite, framer-motion). No router -- stage transitions are managed in `App.jsx` via a `stage` state string: `SPLASH` → `ACTIVE` → `SUCCESS` or `FAILURE`.

**Game flow**
1. `SplashScreen` -- collects name + Cardiff University email, calls `onStart`
2. `App` starts a 1-second countdown interval (30 min). At 10 min remaining, Web Audio API fires a warning tone. At 0 the stage flips to `FAILURE`.
3. `ACTIVE` stage renders `Countdown`, `EvidenceGallery`, and `SubmissionPortal` stacked vertically.
4. `handleSubmit` in `App.jsx` scores the answer (checks for "server room b" in location, "unsanctioned"/"ai tool" in failure), writes the entry to `localStorage` key `escaperoom_leaderboard`, then transitions to `SUCCESS` or `FAILURE`.

**Evidence artifacts**
Defined as a plain array in `EvidenceGallery.jsx`. Each entry has `id`, `label`, `filename` (the download name), `svgPath` (served from `public/placeholders/`), `altText`, `accentType`, and `accentText`. Clicking a card triggers a browser download via a synthetic `<a>` element. The `accentType` drives a CSS modifier class on `.evidence-card__accent`.

All six real artifact images live in `public/placeholders/` as PNGs. The old placeholder SVGs remain there but are no longer referenced.

**Special URL modes**
- `?admin` -- renders `AdminPanel` instead of the game (no auth). Shows all leaderboard entries, filterable, with CSV export.
- `?leaderboard` -- renders `LeaderboardPage` (read-only leaderboard view for projecting on screen).

**Persistence**
`localStorage` only. No backend. The leaderboard is capped at 30 entries (`escaperoom_leaderboard`). Clearing browser storage resets it.

**Styling**
Single file: `src/styles.css`. CSS custom properties are declared at `:root`. The evidence grid is `repeat(3, 1fr)` with fixed row heights; at ≤768px it collapses to single column. The `BASE_URL` from Vite (`/escaperoom/`) is used for all asset paths.

**Content / narrative**
`src/data/gravitas.js` -- Gravitas failure quotes, tiered by attempt count (keys 1, 2, 3+).
`src/data/hints.js` -- hint text for `HintReveal` / `CopilotHint`.

**Deployment**
`.github/workflows/deploy.yml` builds with Node 22 and deploys to GitHub Pages. The Vite base path is `/escaperoom/` -- do not change this without updating the workflow and any hardcoded asset references.
