# Q's Gaming Checklist

A desktop-grade React+Vite PWA to track your gaming backlog across tiers, statuses, and themes.

## Run & Operate

- **Dev**: `npm run dev` → runs Vite at port 5000
- **Build**: `npm run build` → outputs to `dist/`
- **No backend** — all data in localStorage

## Stack

- React 18 + TypeScript + Vite 6
- Tailwind CSS v4 (via @tailwindcss/vite)
- lucide-react for icons
- vite-plugin-pwa for PWA/installability
- localStorage persistence, no backend

## Where things live

- `src/App.tsx` — root with AppProvider + theme wrapper
- `src/contexts/AppContext.tsx` — all state, CRUD, theme, import/export
- `src/types/index.ts` — all types + sample data
- `src/components/` — Layout, LibraryPage, GameCard, GameDetailPanel, AddGameModal, YouTubersPage, NewReleasesPage, SettingsPage
- `src/index.css` — theme CSS vars (.theme-sleek / .theme-neon / .theme-retro)
- `src/lib/utils.ts` — cn(), generateId(), YouTube/HLTB/Steam URL helpers
- `vite.config.ts` — Vite + PWA config

## Architecture decisions

- Three dramatically different themes (sleek/neon/retro) driven by CSS custom properties on a `.theme-*` root class
- All state in React context + useLocalStorage; no backend needed
- GameDetailPanel is a slide-in drawer (fixed, right side) triggered by selectedGameId in context
- Sample data seeded on first load if localStorage is empty
- PWA manifest + vite-plugin-pwa for desktop/mobile install

## Product

- Tier-based game library (S/A/B/C/Racing), grouped by tier
- Status cycling: Not Downloaded → Downloaded → Playing → Completed → Favorite
- 1–5 star ratings, personal notes, playtime hours per game
- Game detail slide-in panel: edit notes, rate, cycle status, quick links (YouTube, Gameranx, HLTB, Steam)
- Search & filter by name and status
- YouTubers section: add/delete creators with channel links
- New Releases section with wishlist toggle
- Settings page: theme switcher (Sleek Studio / Neon Command / Retro Arcade), RAWG API key, export/import JSON, reset
- PWA — installable on desktop and mobile

## User preferences

- Default theme: Sleek Dark Studio (amber/gold + deep charcoal)
- Neon Command Center + Retro Arcade as alternate themes in Settings

## Gotchas

- `animate-in slide-in-from-right` requires Tailwind animate plugin or inline transition — use CSS transform fallback if not working
- Theme CSS vars defined in `src/index.css` on `.theme-sleek`, `.theme-neon`, `.theme-retro` classes
- Vite HMR works; hard-refresh only needed after service worker updates

## Pointers

- [Vite docs](https://vitejs.dev)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
