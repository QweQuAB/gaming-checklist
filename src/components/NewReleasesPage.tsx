import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Heart, Calendar, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NewReleasesPage() {
  const { newReleases, toggleWishlist } = useApp();
  const wishlistCount = newReleases.filter(r => r.wishlist).length;

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <header className="px-4 sm:px-6 lg:px-8 py-5 sm:py-8 border-b border-[var(--panel-border)] flex-shrink-0">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold">New Releases</h2>
          {wishlistCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold font-heading" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}>
              {wishlistCount} wishlisted
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm hidden sm:block mt-1" style={{ color: 'var(--text-muted)' }}>
          Upcoming games to keep an eye on. Tap the heart to wishlist.
        </p>
      </header>

      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
        {newReleases.map(release => (
          <div key={release.id} className="glass-panel rounded-lg overflow-hidden group flex flex-col relative transition-all hover:-translate-y-0.5">
            {/* Cover */}
            <div className="aspect-video relative overflow-hidden bg-black/40">
              {release.coverUrl ? (
                <img
                  src={release.coverUrl}
                  alt={release.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-heading text-4xl opacity-20">
                  {release.title.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <button
                onClick={() => toggleWishlist(release.id)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur hover:bg-black/70 transition-colors border border-white/10"
              >
                <Heart className={cn('w-4 h-4 transition-all', release.wishlist ? 'fill-pink-500 text-pink-500 scale-110' : 'text-white/60')} />
              </button>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2">
              <h4 className="font-heading font-bold text-sm sm:text-base leading-tight line-clamp-2">{release.title}</h4>
              <p className="text-xs opacity-60 line-clamp-2 leading-relaxed flex-1 hidden sm:block">{release.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--panel-border)] mt-auto">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold opacity-50 truncate max-w-[50%]">{release.genre}</span>
                <div className="flex items-center gap-1 text-xs font-semibold flex-shrink-0" style={{ color: 'var(--accent-color)' }}>
                  <Calendar className="w-3 h-3" />
                  <span className="text-[10px] sm:text-xs">{release.releaseDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {newReleases.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 gap-3 opacity-40">
            <Flame className="w-10 h-10" />
            <p className="font-heading text-sm">No upcoming releases yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
