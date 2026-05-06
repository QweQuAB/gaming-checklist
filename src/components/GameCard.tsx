import React from 'react';
import { Game } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Star, Circle, PlayCircle, CheckCircle2, Heart, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  game: Game;
}

export function GameCard({ game }: Props) {
  const { setSelectedGameId, settings } = useApp();

  const getTierColor = (tier: string) => {
    if (settings.theme === 'neon') {
      const map: Record<string, string> = { S: '#facc15', A: '#f87171', B: '#60a5fa', C: '#4ade80', Racing: '#00ffff' };
      return map[tier];
    }
    if (settings.theme === 'retro') {
      const map: Record<string, string> = { S: '#ef4444', A: '#f97316', B: '#eab308', C: '#14b8a6', Racing: '#3b82f6' };
      return map[tier];
    }
    const map: Record<string, string> = { S: '#f59e0b', A: '#94a3b8', B: '#71717a', C: '#78716c', Racing: '#10b981' };
    return map[tier] || '#f59e0b';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Playing': return <PlayCircle className="w-3.5 h-3.5" />;
      case 'Completed': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Favorite': return <Heart className="w-3.5 h-3.5" />;
      case 'Downloaded': return <Download className="w-3.5 h-3.5" />;
      default: return <Circle className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div 
      onClick={() => setSelectedGameId(game.id)}
      className="glass-panel rounded-lg overflow-hidden group cursor-pointer flex flex-col relative transition-all hover:scale-[1.02] hover:border-[var(--accent-color)]"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-black/40">
        {game.coverUrl ? (
          <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-heading text-6xl opacity-20">
            {game.title.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        
        <div 
          className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-bold font-heading bg-black/60 border backdrop-blur-md"
          style={{ borderColor: getTierColor(game.tier), color: getTierColor(game.tier) }}
        >
          {game.tier === 'Racing' ? 'R' : game.tier}
        </div>

        <div className="absolute bottom-3 left-3 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i}
              className={cn("w-3.5 h-3.5", i < game.rating ? "fill-[var(--accent-color)] text-[var(--accent-color)]" : "text-white/20")}
            />
          ))}
        </div>
      </div>
      
      <div className="p-3 flex flex-col gap-2">
        <h4 className="font-heading font-bold text-lg truncate leading-tight">{game.title}</h4>
        
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-semibold opacity-60 truncate max-w-[50%]">{game.genre}</span>
          <div className="flex items-center gap-1.5 text-xs bg-white/5 px-2 py-1 rounded opacity-80">
            {getStatusIcon(game.status)}
            <span className="truncate max-w-[80px]">{game.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
