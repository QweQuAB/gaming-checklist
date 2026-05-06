import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { X, Star, Youtube, MonitorPlay, Clock, ChevronRight, Trash2, ExternalLink } from 'lucide-react';
import { getYouTubeSearchUrl, getGameranxUrl, getHLTBUrl, getSteamUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { STATUS_ORDER } from '@/types';

const STATUS_COLORS: Record<string, string> = {
  'Not Downloaded': '#6b7280',
  'Downloaded':     '#3b82f6',
  'Playing':        '#22c55e',
  'Completed':      '#a855f7',
  'Favorite':       '#f59e0b',
};

export function GameDetailPanel() {
  const { games, selectedGameId, setSelectedGameId, setRating, cycleStatus, updateGame, deleteGame } = useApp();
  const game = games.find(g => g.id === selectedGameId);

  const [notes, setNotes]     = useState('');
  const [playtime, setPlaytime] = useState('');

  useEffect(() => {
    if (game) {
      setNotes(game.notes ?? '');
      setPlaytime(String(game.playtimeHours ?? 0));
    }
  }, [game?.id]);

  if (!game) return null;

  const statusIdx = STATUS_ORDER.indexOf(game.status);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => setSelectedGameId(null)}
      />

      {/* Panel — full-width on mobile, 420px drawer on sm+ */}
      <div
        className="fixed inset-0 sm:inset-auto sm:right-0 sm:top-0 sm:bottom-0 sm:w-[420px] glass-panel z-50 flex flex-col shadow-2xl border-t sm:border-t-0 sm:border-l border-[var(--panel-border)] overflow-hidden"
        style={{ backgroundColor: 'var(--bg-color)', animation: 'slideInPanel 0.28s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        {/* Cover image header */}
        <div className="relative h-48 sm:h-56 flex-shrink-0">
          {game.coverUrl
            ? <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-black/40 flex items-center justify-center font-heading text-6xl opacity-10">{game.title.charAt(0)}</div>
          }
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/20 to-transparent" />

          {/* Close */}
          <button
            onClick={() => setSelectedGameId(null)}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="px-2 py-0.5 rounded text-xs font-bold border font-heading backdrop-blur bg-black/40"
                style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
              >
                {game.tier} TIER
              </span>
              {game.releaseYear > 0 && (
                <span className="text-xs font-semibold opacity-60 uppercase tracking-wider">{game.releaseYear}</span>
              )}
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold leading-tight">{game.title}</h2>
            <p className="text-xs sm:text-sm opacity-60 mt-0.5">{game.genre}</p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-5 space-y-5 sm:space-y-6">

            {/* Rating + Status */}
            <div className="flex items-center justify-between gap-3">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button key={i} onClick={() => setRating(game.id, i + 1)} className="hover:scale-110 active:scale-95 transition-transform p-0.5">
                    <Star className={cn('w-5 h-5 sm:w-6 sm:h-6', i < game.rating ? 'fill-[var(--accent-color)] text-[var(--accent-color)]' : 'text-white/20')} />
                  </button>
                ))}
              </div>

              {/* Status cycle */}
              <button
                onClick={() => cycleStatus(game.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs sm:text-sm font-bold border transition-all hover:opacity-80 active:scale-95 font-heading"
                style={{ borderColor: STATUS_COLORS[game.status] + '60', color: STATUS_COLORS[game.status], backgroundColor: STATUS_COLORS[game.status] + '15' }}
                title="Click to cycle status"
              >
                {game.status}
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>
            </div>

            {/* Status progress bar */}
            <div>
              <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold opacity-40 mb-1.5">
                <span>Progress</span>
                <span>{statusIdx + 1} / {STATUS_ORDER.length}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${((statusIdx + 1) / STATUS_ORDER.length) * 100}%`, backgroundColor: STATUS_COLORS[game.status] }}
                />
              </div>
            </div>

            {/* Playtime */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-50">Playtime (Hours)</label>
              <input
                type="number"
                min={0}
                value={playtime}
                onChange={e => setPlaytime(e.target.value)}
                onBlur={() => updateGame(game.id, { playtimeHours: Math.max(0, Number(playtime) || 0) })}
                className="w-full bg-black/20 border border-[var(--panel-border)] rounded p-2.5 sm:p-3 text-base sm:text-lg font-heading focus:border-[var(--accent-color)] outline-none"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-50">Notes / Review</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                onBlur={() => updateGame(game.id, { notes })}
                rows={3}
                placeholder="What did you think?"
                className="w-full bg-black/20 border border-[var(--panel-border)] rounded p-2.5 sm:p-3 text-sm outline-none resize-none focus:border-[var(--accent-color)] transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <label className="text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-50">Quick Links</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'YT Trailer', href: getYouTubeSearchUrl(game.title), icon: Youtube },
                  { label: 'BYB Review',  href: getGameranxUrl(game.title),    icon: MonitorPlay },
                  { label: 'HLTB',        href: getHLTBUrl(game.title),         icon: Clock },
                  { label: 'Steam',       href: getSteamUrl(game.title),        icon: ExternalLink },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded bg-black/20 hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] border border-[var(--panel-border)] transition-all text-xs font-bold active:scale-95"
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Delete */}
            <div className="pt-2 pb-4">
              <button
                onClick={() => { deleteGame(game.id); setSelectedGameId(null); }}
                className="w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-500/10 rounded font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors border border-transparent hover:border-red-500/20 active:scale-95"
              >
                <Trash2 className="w-4 h-4" /> Remove from Checklist
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInPanel {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 639px) {
          @keyframes slideInPanel {
            from { opacity: 0; transform: translateY(100%); }
            to   { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </>
  );
}
