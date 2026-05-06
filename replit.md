# Q's Gaming Checklist

A PWA to track your gaming backlog and progress across multiple tiers and statuses.

## Run & Operate

- **Run**: `serve -s . -l 5000` (static file server)
- No build step required — pure static HTML/CSS/JS

## Stack

- HTML/CSS/JS (no framework build step)
- React 18 via CDN, Tailwind CSS via CDN, Babel Standalone (JSX in browser)
- RAWG API for game search (online feature)
- localStorage for data persistence
- PWA with service worker for offline support

## Where things live

- `index.html` — main entry point
- `css/styles.css` — all styles
- `js/config.js` — app settings/constants
- `js/data.js` — game data
- `js/app.js` — main React app
- `manifest.json` — PWA manifest
- `service-worker.js` — offline caching

## Architecture decisions

- No bundler or build step; all dependencies loaded via CDN (React, Tailwind, Babel)
- Data persisted entirely in localStorage — no backend required
- PWA installable on mobile/desktop with offline support via service worker
- RAWG API used for auto-filling game details from web search

## Product

- Tier-based game list (S/A/B/C/Racing tiers)
- Status tracking: Not Downloaded → Downloaded → Playing → Completed → Favorite
- 1–5 star ratings, personal notes per game
- Search & filter by name, genre, status
- Dark/Light mode toggle
- Export/Import JSON backup
- RAWG API integration for auto-filling game details
- PWA installable on phone/desktop, works offline

## User preferences

_Populate as you build_

## Gotchas

- Service worker caches files aggressively; hard-refresh needed after updates in dev
- RAWG API requires internet connection for game search feature
- Assets directory (icons) must exist for PWA manifest not to 404

## Pointers

- [RAWG API docs](https://rawg.io/apidocs)
- [PWA manifest spec](https://developer.mozilla.org/en-US/docs/Web/Manifest)
