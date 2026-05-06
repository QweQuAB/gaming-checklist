import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { GameCard } from './GameCard';
import { TIER_ORDER } from '@/types';
import { GameDetailPanel } from './GameDetailPanel';
import { AddGameModal } from './AddGameModal';
import { cn } from '@/lib/utils';

const FILTERS = ['all', 'Playing', 'Favorite', 'Completed', 'Downloaded'] as const;

export function LibraryPage() {
  const { games, searchQuery, setSearchQuery, settings, updateSettings } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const stats = [
    { label: 'Total',   value: games.length },
    { label: 'Playing', value: games.filter(g => g.status === 'Playing').length },
    { label: 'Done',    value: games.filter(g => g.status === 'Completed').length },
    { label: 'Favs',    value: games.filter(g => g.status === 'Favorite').length },
  ];

  const activeFilter = settings.filterStatus;

  const filteredGames = games.filter(g => {
    if (activeFilter !== 'all' && g.status !== activeFilter) return false;
    if (searchQuery && !g.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !g.genre.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">

      {/* ── Header / Stats ── */}
      <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between border-b border-[var(--panel-border)] flex-shrink-0 gap-4">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 lg:gap-10 flex-1 min-w-0">
          {stats.map(stat => (
            <div key={stat.label} className="flex flex-col min-w-0">
              <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold leading-none mb-0.5 sm:mb-1" style={{ color: 'var(--text-color)' }}>
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-xs uppercase tracking-wider font-semibold truncate" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Add button */}
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 font-bold text-xs sm:text-sm tracking-wide transition-all hover:opacity-90 active:scale-95 font-heading uppercase flex-shrink-0 rounded sm:rounded-none"
          style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">Add Game</span>
        </button>
      </header>

      {/* ── Toolbar: title + search + filters ── */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-[var(--panel-border)] flex-shrink-0">
        <h2 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold flex-shrink-0">My Library</h2>

        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:justify-end">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-[220px] lg:max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-2 rounded text-sm bg-black/20 outline-none border border-[var(--panel-border)] text-[var(--text-color)] placeholder:opacity-40"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>

          {/* Filter pills — horizontal scroll on mobile */}
          <div className="flex gap-1 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => updateSettings({ filterStatus: filter as typeof activeFilter })}
                className={cn('px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors capitalize flex-shrink-0', activeFilter === filter ? '' : 'opacity-50 hover:opacity-80 bg-black/20 border border-[var(--panel-border)]')}
                style={activeFilter === filter ? { backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' } : {}}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Game grid ── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {TIER_ORDER.map(tier => {
          const tierGames = filteredGames.filter(g => g.tier === tier);
          if (tierGames.length === 0) return null;
          return (
            <div key={tier} className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold opacity-90 flex-shrink-0">{tier} Tier</h3>
                <div className="h-px flex-1 opacity-20" style={{ backgroundColor: 'var(--accent-color)' }} />
                <span className="text-xs opacity-40 font-heading flex-shrink-0">{tierGames.length}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
                {tierGames.map(game => <GameCard key={game.id} game={game} />)}
              </div>
            </div>
          );
        })}

        {filteredGames.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <SlidersHorizontal className="w-10 h-10 opacity-20" />
            <p className="font-heading text-sm opacity-40">No games found</p>
            <button
              onClick={() => { setSearchQuery(''); updateSettings({ filterStatus: 'all' }); }}
              className="text-xs underline opacity-50 hover:opacity-80 transition-opacity"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Bottom padding for mobile nav */}
        <div className="h-4" />
      </div>

      {isAddOpen && <AddGameModal onClose={() => setIsAddOpen(false)} />}
      <GameDetailPanel />
    </div>
  );
}
