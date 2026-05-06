import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { X, Star, Youtube, MonitorPlay, Clock, PlayCircle, Trash2 } from 'lucide-react';
import { getYouTubeSearchUrl, getGameranxUrl, getHLTBUrl, getSteamUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function GameDetailPanel() {
  const { games, selectedGameId, setSelectedGameId, setRating, cycleStatus, updateGame, deleteGame } = useApp();
  const game = games.find(g => g.id === selectedGameId);

  const [notes, setNotes] = useState('');
  const [playtime, setPlaytime] = useState('');

  useEffect(() => {
    if (game) {
      setNotes(game.notes || '');
      setPlaytime(game.playtimeHours?.toString() || '0');
    }
  }, [game]);

  if (!game) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => setSelectedGameId(null)}
      />
      <div className="fixed right-0 top-0 bottom-0 w-[420px] max-w-full glass-panel z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 border-l border-[var(--panel-border)] bg-[var(--bg-color)]">
        <div className="relative h-64 flex-shrink-0">
          {game.coverUrl ? (
             <img src={game.coverUrl} className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full bg-black/40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] to-transparent" />
          <button 
            onClick={() => setSelectedGameId(null)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold border border-[var(--accent-color)] text-[var(--accent-color)] font-heading bg-black/50 backdrop-blur">
                {game.tier} TIER
              </span>
              <span className="text-sm font-semibold opacity-70 uppercase tracking-wider">{game.releaseYear}</span>
            </div>
            <h2 className="font-heading text-3xl font-bold leading-tight">{game.title}</h2>
            <p className="text-sm opacity-70 mt-1">{game.genre}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setRating(game.id, i + 1)} className="hover:scale-110 transition-transform">
                  <Star className={cn("w-6 h-6", i < game.rating ? "fill-[var(--accent-color)] text-[var(--accent-color)]" : "text-white/20")} />
                </button>
              ))}
            </div>
            <button 
              onClick={() => cycleStatus(game.id)}
              className="px-4 py-2 text-sm font-bold border border-[var(--panel-border)] rounded hover:border-[var(--accent-color)] transition-colors flex items-center gap-2 font-heading bg-black/20"
            >
              <PlayCircle className="w-4 h-4" /> {game.status}
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold opacity-60">Playtime (Hours)</label>
            <input 
              type="number" 
              value={playtime}
              onChange={(e) => setPlaytime(e.target.value)}
              onBlur={() => updateGame(game.id, { playtimeHours: Number(playtime) || 0 })}
              className="w-full bg-black/20 border border-[var(--panel-border)] rounded p-3 text-lg font-body focus:border-[var(--accent-color)] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold opacity-60">Notes / Review</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => updateGame(game.id, { notes })}
              rows={4}
              placeholder="What did you think of this game?"
              className="w-full bg-black/20 border border-[var(--panel-border)] rounded p-3 font-body focus:border-[var(--accent-color)] outline-none resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider font-bold opacity-60">Quick Links</label>
            <div className="grid grid-cols-2 gap-3">
              <a href={getYouTubeSearchUrl(game.title)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-3 rounded bg-black/20 hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] border border-[var(--panel-border)] transition-colors text-sm font-bold">
                <Youtube className="w-4 h-4" /> Trailer
              </a>
              <a href={getGameranxUrl(game.title)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-3 rounded bg-black/20 hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] border border-[var(--panel-border)] transition-colors text-sm font-bold">
                <MonitorPlay className="w-4 h-4" /> Review
              </a>
              <a href={getHLTBUrl(game.title)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-3 rounded bg-black/20 hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] border border-[var(--panel-border)] transition-colors text-sm font-bold">
                <Clock className="w-4 h-4" /> HLTB
              </a>
              <a href={getSteamUrl(game.title)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-3 rounded bg-black/20 hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] border border-[var(--panel-border)] transition-colors text-sm font-bold">
                Steam
              </a>
            </div>
          </div>

          <div className="pt-8">
            <button 
              onClick={() => {
                deleteGame(game.id);
                setSelectedGameId(null);
              }}
              className="w-full flex items-center justify-center gap-2 p-4 text-red-500 hover:bg-red-500/10 rounded font-bold uppercase tracking-wider text-sm transition-colors border border-transparent hover:border-red-500/30"
            >
              <Trash2 className="w-4 h-4" /> Remove Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
