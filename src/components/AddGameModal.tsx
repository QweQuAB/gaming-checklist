import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { TIER_ORDER, STATUS_ORDER, GameTier, GameStatus } from '@/types';
import { X, Search, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface RAWGResult {
  id: number;
  name: string;
  background_image: string | null;
  released: string | null;
  genres: Array<{ name: string }>;
  metacritic: number | null;
}

const FIELD_CLS = 'w-full bg-black/20 border border-[var(--panel-border)] p-2.5 rounded focus:border-[var(--accent-color)] outline-none text-[var(--text-color)] text-sm transition-colors';

export function AddGameModal({ onClose }: { onClose: () => void }) {
  const { addGame, settings } = useApp();
  const hasApiKey = Boolean(settings.rawgApiKey?.trim());

  // Form state
  const [title,       setTitle]       = useState('');
  const [tier,        setTier]        = useState<GameTier>('C');
  const [genre,       setGenre]       = useState('');
  const [status,      setStatus]      = useState<GameStatus>('Not Downloaded');
  const [coverUrl,    setCoverUrl]     = useState('');
  const [releaseYear, setReleaseYear]  = useState(new Date().getFullYear());
  const [description, setDescription] = useState('');

  // RAWG search state
  const [searchQuery,  setSearchQuery]  = useState('');
  const [results,      setResults]      = useState<RAWGResult[]>([]);
  const [searching,    setSearching]    = useState(false);
  const [searchError,  setSearchError]  = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filled,       setFilled]       = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced RAWG search
  useEffect(() => {
    if (!hasApiKey || searchQuery.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      setSearchError('');
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?search=${encodeURIComponent(searchQuery)}&key=${settings.rawgApiKey}&page_size=6`
        );
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        setResults(data.results ?? []);
        setShowDropdown(true);
      } catch {
        setSearchError('Search failed. Check your API key in Settings.');
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 450);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery, settings.rawgApiKey, hasApiKey]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fillFromResult = (r: RAWGResult) => {
    setTitle(r.name);
    if (r.genres?.length)   setGenre(r.genres[0].name);
    if (r.background_image) setCoverUrl(r.background_image);
    if (r.released)         setReleaseYear(new Date(r.released).getFullYear());
    setSearchQuery('');
    setShowDropdown(false);
    setFilled(true);
    setTimeout(() => setFilled(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addGame({ title: title.trim(), tier, genre, status, coverUrl, releaseYear, description, rating: 0, playtimeHours: 0, notes: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <div
        className="glass-panel w-full sm:max-w-lg rounded-t-2xl sm:rounded-xl overflow-hidden max-h-[90dvh] flex flex-col"
        style={{ backgroundColor: 'var(--bg-color)', animation: 'slideUpModal 0.25s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--panel-border)] flex items-center justify-between flex-shrink-0">
          <h2 className="font-heading text-base sm:text-lg font-bold">Add to Checklist</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {/* RAWG Search */}
          <div className="px-4 sm:px-5 pt-4 sm:pt-5">
            <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-1.5 opacity-60">
              Search RAWG Database {!hasApiKey && <span className="opacity-50 normal-case">(add API key in Settings to enable)</span>}
            </label>
            <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
                {searching && <Loader2 className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 animate-spin opacity-50" />}
                {filled && <CheckCircle2 className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />}
                <input
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setFilled(false); }}
                  onFocus={() => results.length > 0 && setShowDropdown(true)}
                  placeholder={hasApiKey ? 'Type a game name to auto-fill...' : 'API key required — fill manually below'}
                  disabled={!hasApiKey}
                  className={`${FIELD_CLS} pl-8 pr-8 disabled:opacity-40 disabled:cursor-not-allowed`}
                />
              </div>

              {/* Dropdown results */}
              {showDropdown && results.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden shadow-2xl z-10 border border-[var(--panel-border)]"
                  style={{ backgroundColor: 'var(--bg-color)' }}
                >
                  {results.map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => fillFromResult(r)}
                      className="w-full flex items-center gap-3 p-2.5 hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="w-10 h-14 rounded flex-shrink-0 overflow-hidden bg-white/10">
                        {r.background_image
                          ? <img src={r.background_image} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-sm font-bold truncate">{r.name}</p>
                        <p className="text-xs opacity-50 truncate">
                          {r.released ? new Date(r.released).getFullYear() : '—'}
                          {r.genres?.length ? ` · ${r.genres[0].name}` : ''}
                          {r.metacritic ? ` · MC ${r.metacritic}` : ''}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {searchError && (
                <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {searchError}
                </p>
              )}
              {filled && (
                <p className="text-xs text-green-400 mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Fields filled from RAWG — review and save
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="px-4 sm:px-5 py-3 flex items-center gap-3">
            <div className="flex-1 h-px opacity-10" style={{ backgroundColor: 'var(--text-color)' }} />
            <span className="text-[10px] uppercase tracking-widest opacity-30 font-bold">or fill manually</span>
            <div className="flex-1 h-px opacity-10" style={{ backgroundColor: 'var(--text-color)' }} />
          </div>

          <form id="add-game-form" onSubmit={handleSubmit} className="px-4 sm:px-5 pb-5 space-y-3">
            {/* Title */}
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-1 opacity-60">Title *</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} className={FIELD_CLS} placeholder="e.g. Hollow Knight" />
            </div>

            {/* Tier + Status */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-1 opacity-60">Tier</label>
                <select value={tier} onChange={e => setTier(e.target.value as GameTier)} className={`${FIELD_CLS} appearance-none cursor-pointer`} style={{ background: 'rgba(0,0,0,0.2)' }}>
                  {TIER_ORDER.map(t => <option key={t} value={t} style={{ backgroundColor: 'var(--bg-color)' }}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-1 opacity-60">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value as GameStatus)} className={`${FIELD_CLS} appearance-none cursor-pointer`} style={{ background: 'rgba(0,0,0,0.2)' }}>
                  {STATUS_ORDER.map(s => <option key={s} value={s} style={{ backgroundColor: 'var(--bg-color)' }}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Genre + Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-1 opacity-60">Genre</label>
                <input value={genre} onChange={e => setGenre(e.target.value)} className={FIELD_CLS} placeholder="e.g. Roguelike" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-1 opacity-60">Year</label>
                <input type="number" value={releaseYear} onChange={e => setReleaseYear(Number(e.target.value))} className={FIELD_CLS} />
              </div>
            </div>

            {/* Cover URL */}
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-1 opacity-60">Cover Image URL</label>
              <div className="flex gap-2">
                <input value={coverUrl} onChange={e => setCoverUrl(e.target.value)} className={`${FIELD_CLS} flex-1`} placeholder="https://..." />
                {coverUrl && (
                  <img src={coverUrl} alt="preview" className="w-9 h-12 object-cover rounded flex-shrink-0 border border-[var(--panel-border)]" onError={e => (e.currentTarget.style.display = 'none')} />
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer buttons */}
        <div className="p-4 sm:p-5 border-t border-[var(--panel-border)] flex justify-end gap-2 flex-shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 font-bold text-sm rounded hover:bg-white/5 transition-colors font-heading">Cancel</button>
          <button type="submit" form="add-game-form" className="px-6 py-2.5 font-bold text-sm rounded font-heading" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}>
            Save Game
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 640px) {
          @keyframes slideUpModal {
            from { opacity: 0; transform: scale(0.96); }
            to   { opacity: 1; transform: scale(1); }
          }
        }
      `}</style>
    </div>
  );
}
