import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getYouTubeSearchUrl(gameName: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(gameName + ' trailer')}`;
}

export function getGameranxUrl(gameName: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent('gameranx ' + gameName + ' before you buy')}`;
}

export function getHLTBUrl(gameName: string): string {
  return `https://howlongtobeat.com/?q=${encodeURIComponent(gameName)}`;
}

export function getSteamUrl(gameName: string): string {
  return `https://store.steampowered.com/search/?term=${encodeURIComponent(gameName)}`;
}

export function exportGamesJson(games: unknown[]): void {
  const data = JSON.stringify({ games, exportedAt: new Date().toISOString() }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gaming-checklist-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
