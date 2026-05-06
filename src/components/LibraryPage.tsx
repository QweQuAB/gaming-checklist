import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Plus, Search } from 'lucide-react';
import { GameCard } from './GameCard';
import { TIER_ORDER } from '@/types';
import { GameDetailPanel } from './GameDetailPanel';
import { AddGameModal } from './AddGameModal';
import { cn } from '@/lib/utils';

export function LibraryPage() {
  const { games, searchQuery, setSearchQuery, settings, updateSettings, selectedGameId } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const stats = [
    { label: 'Total Games', value: games.length },
    { label: 'Currently Playing', value: games.filter(g => g.status === 'Playing').length },
    { label: 'Completed', value: games.filter(g => g.status === 'Completed').length },
    { label: 'Favorites', value: games.filter(g => g.status === 'Favorite').length },
  ];

  const filters = ['all', 'Playing', 'Favorite', 'Completed'];
  const activeFilter = settings.filterStatus;

  const filteredGames = games.filter(g => {
    if (activeFilter !== 'all' && g.status !== activeFilter) return false;
    if (searchQuery && !g.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <header className="px-8 py-8 flex justify-between items-end border-b border-[var(--panel-border)] z-10 flex-shrink-0">
        <div className="flex gap-12">
          {stats.map(stat => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-heading text-3xl font-bold mb-1" style={{ color: 'var(--text-color)' }}>{stat.value}</span>
              <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center px-6 py-3 font-bold text-sm tracking-wide transition-transform hover:scale-105 font-heading uppercase"
          style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Game
        </button>
      </header>

      <div className="px-8 py-6 flex items-center justify-between z-10 flex-shrink-0">
        <h2 className="font-heading text-2xl font-bold">My Library</h2>
        
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collection..." 
              className="w-full pl-10 pr-4 py-2 rounded text-sm bg-black/20 outline-none focus:ring-1 focus:ring-[var(--accent-color)] border border-[var(--panel-border)] text-[var(--text-color)] font-body placeholder-[var(--text-muted)]"
            />
          </div>
          <div className="flex bg-black/20 rounded p-1 border border-[var(--panel-border)]">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => updateSettings({ filterStatus: filter as any })}
                className={cn(
                  "px-4 py-1.5 rounded text-xs font-medium transition-colors capitalize",
                  activeFilter === filter ? "" : "opacity-60 hover:opacity-100"
                )}
                style={activeFilter === filter ? { backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' } : {}}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-12">
        {TIER_ORDER.map(tier => {
          const tierGames = filteredGames.filter(g => g.tier === tier);
          if (tierGames.length === 0) return null;
          return (
            <div key={tier} className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-heading text-xl font-bold opacity-90">{tier} Tier</h3>
                <div className="h-px flex-1 opacity-20" style={{ backgroundColor: 'var(--accent-color)' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tierGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          );
        })}
        {filteredGames.length === 0 && (
          <div className="text-center py-20 opacity-50 font-heading">
            No games found.
          </div>
        )}
      </div>

      {isAddOpen && <AddGameModal onClose={() => setIsAddOpen(false)} />}
      <GameDetailPanel />
    </div>
  );
}
