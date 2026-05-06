import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  Game, YouTuber, NewRelease, AppSettings,
  DEFAULT_SETTINGS, SAMPLE_GAMES, SAMPLE_YOUTUBERS, SAMPLE_NEW_RELEASES,
  GameStatus, GameTier, AppTheme
} from '@/types';
import { generateId } from '@/lib/utils';

interface AppContextValue {
  games: Game[];
  youtubers: YouTuber[];
  newReleases: NewRelease[];
  settings: AppSettings;
  addGame: (game: Omit<Game, 'id' | 'addedAt' | 'updatedAt'>) => void;
  updateGame: (id: string, updates: Partial<Game>) => void;
  deleteGame: (id: string) => void;
  cycleStatus: (id: string) => void;
  setRating: (id: string, rating: number) => void;
  addYouTuber: (yt: Omit<YouTuber, 'id'>) => void;
  updateYouTuber: (id: string, updates: Partial<YouTuber>) => void;
  deleteYouTuber: (id: string) => void;
  toggleWishlist: (id: string) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
  setTheme: (theme: AppTheme) => void;
  importGames: (games: Game[]) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  selectedGameId: string | null;
  setSelectedGameId: (id: string | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STATUS_CYCLE: GameStatus[] = ['Not Downloaded', 'Downloaded', 'Playing', 'Completed', 'Favorite'];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [games, setGames] = useLocalStorage<Game[]>('gc_games', SAMPLE_GAMES);
  const [youtubers, setYoutubers] = useLocalStorage<YouTuber[]>('gc_youtubers', SAMPLE_YOUTUBERS);
  const [newReleases, setNewReleases] = useLocalStorage<NewRelease[]>('gc_newreleases', SAMPLE_NEW_RELEASES);
  const [settings, setSettings] = useLocalStorage<AppSettings>('gc_settings', DEFAULT_SETTINGS);
  const [searchQuery, setSearchQuery] = useLocalStorage<string>('gc_search', '');
  const [activeSection, setActiveSection] = useLocalStorage<string>('gc_section', 'library');
  const [selectedGameId, setSelectedGameId] = React.useState<string | null>(null);

  const addGame = useCallback((game: Omit<Game, 'id' | 'addedAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    setGames(prev => [...prev, { ...game, id: generateId(), addedAt: now, updatedAt: now }]);
  }, [setGames]);

  const updateGame = useCallback((id: string, updates: Partial<Game>) => {
    setGames(prev => prev.map(g => g.id === id ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g));
  }, [setGames]);

  const deleteGame = useCallback((id: string) => {
    setGames(prev => prev.filter(g => g.id !== id));
  }, [setGames]);

  const cycleStatus = useCallback((id: string) => {
    setGames(prev => prev.map(g => {
      if (g.id !== id) return g;
      const idx = STATUS_CYCLE.indexOf(g.status);
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
      return { ...g, status: next, updatedAt: new Date().toISOString() };
    }));
  }, [setGames]);

  const setRating = useCallback((id: string, rating: number) => {
    setGames(prev => prev.map(g => g.id === id ? { ...g, rating, updatedAt: new Date().toISOString() } : g));
  }, [setGames]);

  const addYouTuber = useCallback((yt: Omit<YouTuber, 'id'>) => {
    setYoutubers(prev => [...prev, { ...yt, id: generateId() }]);
  }, [setYoutubers]);

  const updateYouTuber = useCallback((id: string, updates: Partial<YouTuber>) => {
    setYoutubers(prev => prev.map(y => y.id === id ? { ...y, ...updates } : y));
  }, [setYoutubers]);

  const deleteYouTuber = useCallback((id: string) => {
    setYoutubers(prev => prev.filter(y => y.id !== id));
  }, [setYoutubers]);

  const toggleWishlist = useCallback((id: string) => {
    setNewReleases(prev => prev.map(r => r.id === id ? { ...r, wishlist: !r.wishlist } : r));
  }, [setNewReleases]);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, [setSettings]);

  const setTheme = useCallback((theme: AppTheme) => {
    setSettings(prev => ({ ...prev, theme }));
  }, [setSettings]);

  const importGames = useCallback((imported: Game[]) => {
    setGames(prev => {
      const existingIds = new Set(prev.map(g => g.id));
      const newGames = imported.filter(g => !existingIds.has(g.id));
      return [...prev, ...newGames];
    });
  }, [setGames]);

  return (
    <AppContext.Provider value={{
      games, youtubers, newReleases, settings,
      addGame, updateGame, deleteGame, cycleStatus, setRating,
      addYouTuber, updateYouTuber, deleteYouTuber,
      toggleWishlist, updateSettings, setTheme,
      importGames, searchQuery, setSearchQuery,
      activeSection, setActiveSection,
      selectedGameId, setSelectedGameId,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
