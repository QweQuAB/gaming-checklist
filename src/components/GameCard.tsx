import React from 'react';
import { Game } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Star, Circle, PlayCircle, CheckCircle2, Heart, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  game: Game;
}

const TIER_COLORS: Record<string, Record<string, string>> = {
  sleek:  { S: '#f59e0b', A: '#94a3b8', B: '#71717a', C: '#78716c', Racing: '#10b981' },
  neon:   { S: '#facc15', A: '#f87171', B: '#60a5fa', C: '#4ade80', Racing: '#00ffff' },
  retro:  { S: '#ef4444', A: '#f97316', B: '#eab308', C: '#14b8a6', Racing: '#3b82f6' },
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  Playing:   <PlayCircle  className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
  Completed: <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
  Favorite:  <Heart        className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
  Downloaded:<Download     className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
};

export function GameCard({ game }: Props) {
  const { setSelectedGameId, settings } = useApp();
  const tierColor = (TIER_COLORS[settings.theme] ?? TIER_COLORS.sleek)[game.tier] ?? '#f59e0b';

  return (
    <div
      onClick={() => setSelectedGameId(game.id)}
      className="glass-panel rounded-lg overflow-hidden group cursor-pointer flex flex-col relative transition-all hover:scale-[1.02] active:scale-[0.98] select-none"
      style={{ '--card-accent': tierColor } as React.CSSProperties}
    >
      {/* Cover image */}
      <div className="aspect-[3/4] relative overflow-hidden bg-black/40">
        {game.coverUrl ? (
          <img
            src={game.coverUrl}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-heading text-5xl opacity-15">
            {game.title.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Tier badge */}
        <div
          className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold font-heading bg-black/60 border backdrop-blur-md"
          style={{ borderColor: tierColor, color: tierColor }}
        >
          {game.tier === 'Racing' ? 'R' : game.tier}
        </div>

        {/* Stars */}
        <div className="absolute bottom-2 left-2 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn('w-3 h-3 sm:w-3.5 sm:h-3.5', i < game.rating ? 'fill-[var(--accent-color)] text-[var(--accent-color)]' : 'text-white/20')}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 sm:p-3 flex flex-col gap-1.5">
        <h4 className="font-heading font-bold text-sm sm:text-base leading-tight truncate">{game.title}</h4>
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold opacity-50 truncate">{game.genre}</span>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs bg-white/5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0 opacity-80">
            {STATUS_ICONS[game.status] ?? <Circle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
            <span className="hidden sm:inline truncate max-w-[80px]">{game.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
