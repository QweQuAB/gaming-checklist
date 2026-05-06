import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Heart, Calendar, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NewReleasesPage() {
  const { newReleases, toggleWishlist } = useApp();

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <header className="px-8 py-10 border-b border-[var(--panel-border)] z-10 flex-shrink-0">
        <h2 className="font-heading text-3xl font-bold flex items-center gap-3">
          New Releases
        </h2>
        <p className="text-[var(--text-muted)] mt-2 font-body max-w-xl">
          Upcoming games to keep an eye on. Toggle the heart to add them to your wishlist.
        </p>
      </header>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {newReleases.map(release => (
          <div key={release.id} className="glass-panel rounded-lg overflow-hidden group flex flex-col relative transition-all hover:-translate-y-1">
            <div className="aspect-video relative overflow-hidden bg-black/40">
              {release.coverUrl ? (
                <img src={release.coverUrl} alt={release.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-heading text-4xl opacity-20">{release.title.charAt(0)}</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
              
              <button 
                onClick={() => toggleWishlist(release.id)}
                className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-colors border border-white/10"
              >
                <Heart className={cn("w-5 h-5 transition-colors", release.wishlist ? "fill-pink-500 text-pink-500" : "text-white")} />
              </button>
            </div>
            
            <div className="p-5 flex flex-col flex-1 gap-3">
              <h4 className="font-heading font-bold text-xl leading-tight">{release.title}</h4>
              <p className="text-sm opacity-70 line-clamp-2 leading-relaxed flex-1">{release.description}</p>
              
              <div className="flex items-center justify-between pt-3 border-t border-[var(--panel-border)] mt-auto">
                <span className="text-xs uppercase tracking-wider font-semibold opacity-60 bg-white/5 px-2 py-1 rounded">{release.genre}</span>
                <div className="flex items-center gap-1.5 text-sm font-semibold opacity-90" style={{ color: 'var(--accent-color)' }}>
                  <Calendar className="w-4 h-4" />
                  {release.releaseDate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
