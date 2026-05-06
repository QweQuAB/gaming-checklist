import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { TIER_ORDER, STATUS_ORDER, GameTier, GameStatus } from '@/types';
import { X } from 'lucide-react';

export function AddGameModal({ onClose }: { onClose: () => void }) {
  const { addGame } = useApp();
  const [title, setTitle] = useState('');
  const [tier, setTier] = useState<GameTier>('C');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState<GameStatus>('Not Downloaded');
  const [coverUrl, setCoverUrl] = useState('');
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    
    addGame({
      title, tier, genre, status, coverUrl, releaseYear, description,
      rating: 0, playtimeHours: 0, notes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-lg rounded-lg overflow-hidden bg-[var(--bg-color)] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-[var(--panel-border)] flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold">Add to Checklist</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold mb-1 opacity-70">Title</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/20 border border-[var(--panel-border)] p-2.5 rounded focus:border-[var(--accent-color)] outline-none text-[var(--text-color)]" placeholder="e.g. Hades II" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-1 opacity-70">Tier</label>
              <select value={tier} onChange={e => setTier(e.target.value as GameTier)} className="w-full bg-black/20 border border-[var(--panel-border)] p-2.5 rounded focus:border-[var(--accent-color)] outline-none text-[var(--text-color)] appearance-none">
                {TIER_ORDER.map(t => <option key={t} value={t} className="bg-[var(--bg-color)]">{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-1 opacity-70">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as GameStatus)} className="w-full bg-black/20 border border-[var(--panel-border)] p-2.5 rounded focus:border-[var(--accent-color)] outline-none text-[var(--text-color)] appearance-none">
                {STATUS_ORDER.map(s => <option key={s} value={s} className="bg-[var(--bg-color)]">{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-1 opacity-70">Genre</label>
              <input value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-black/20 border border-[var(--panel-border)] p-2.5 rounded focus:border-[var(--accent-color)] outline-none text-[var(--text-color)]" placeholder="e.g. Roguelike" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-1 opacity-70">Release Year</label>
              <input type="number" value={releaseYear} onChange={e => setReleaseYear(Number(e.target.value))} className="w-full bg-black/20 border border-[var(--panel-border)] p-2.5 rounded focus:border-[var(--accent-color)] outline-none text-[var(--text-color)]" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold mb-1 opacity-70">Cover Image URL (Optional)</label>
            <input value={coverUrl} onChange={e => setCoverUrl(e.target.value)} className="w-full bg-black/20 border border-[var(--panel-border)] p-2.5 rounded focus:border-[var(--accent-color)] outline-none text-[var(--text-color)]" placeholder="https://..." />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2.5 font-bold rounded hover:bg-white/5 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2.5 font-bold rounded" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}>Save Game</button>
          </div>
        </form>
      </div>
    </div>
  );
}
