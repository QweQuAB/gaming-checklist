# 🎮 Q's Gaming Checklist

A PWA (Progressive Web App) to track your gaming backlog and progress.

## Features

- 📋 **Tier-based game list** — S, A, B, C, and Racing tiers
- 🔄 **Status tracking** — Not Downloaded → Downloaded → Playing → Completed → Favorite
- ⭐ **Rate games** — 1–5 star ratings
- 📝 **Notes** — Personal notes per game
- 🔍 **Search & Filter** — By name, genre, status
- 🌙 **Dark/Light mode**
- 💾 **Export/Import** — JSON backup
- 🔎 **Auto-fill** — Search RAWG API to auto-fill game details
- 📦 **PWA** — Install on phone/desktop, works offline

## Setup

1. Clone the repo
2. Serve with any static server (e.g. `npx serve .`)
3. Or deploy to GitHub Pages / Netlify

## Structure

```
gaming-checklist/
├── index.html          # Main entry point
├── manifest.json       # PWA config
├── service-worker.js   # Offline support
├── css/
│   └── styles.css
├── js/
│   ├── config.js       # App settings
│   ├── data.js         # Game data
│   ├── storage.js      # localStorage manager
│   ├── icons.js        # SVG icons
│   ├── ui-components.js
│   ├── game-card.js
│   ├── features.js
│   ├── game-search.js  # RAWG API integration
│   ├── app.js          # Main app
│   └── pwa-init.js
└── assets/
    ├── icon-192.png    # Add your icons here
    └── icon-512.png
```

## Icons

Generate icons at [favicon.io](https://favicon.io/favicon-generator/) using:
- Text: 🎮
- Background: #7c3aed (Purple)
- Save as `icon-192.png` and `icon-512.png` in `/assets/`

## Tech Stack

- React 18 (via CDN)
- Tailwind CSS (via CDN)
- Babel Standalone (for JSX in browser)
- RAWG API (game search)
- localStorage (data persistence)
