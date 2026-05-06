import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Youtube, Trash2, Plus, X } from 'lucide-react';

export function YouTubersPage() {
  const { youtubers, deleteYouTuber, addYouTuber } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <header className="px-4 sm:px-6 lg:px-8 py-5 sm:py-8 border-b border-[var(--panel-border)] flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold">YouTubers</h2>
          <p className="text-xs sm:text-sm mt-1 max-w-xs sm:max-w-xl hidden sm:block" style={{ color: 'var(--text-muted)' }}>
            Track your favorite content creators, reviewers, and analysts.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 font-bold text-xs sm:text-sm tracking-wide transition-all hover:opacity-90 active:scale-95 font-heading uppercase flex-shrink-0 rounded"
          style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">Add Creator</span>
        </button>
      </header>

      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {youtubers.map(yt => (
          <div key={yt.id} className="glass-panel p-4 sm:p-6 rounded-lg flex flex-col group relative">
            <button
              onClick={() => deleteYouTuber(yt.id)}
              className="absolute top-3 right-3 sm:opacity-0 sm:group-hover:opacity-100 transition-colors p-1"
              style={{ color: 'rgba(255,255,255,0.2)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pr-6">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-heading text-xl sm:text-2xl font-bold shadow-lg flex-shrink-0"
                style={{ backgroundColor: yt.avatarColor, color: '#fff' }}
              >
                {yt.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold truncate">{yt.name}</h3>
                <p className="text-xs sm:text-sm font-semibold opacity-70 truncate" style={{ color: yt.avatarColor }}>{yt.specialty}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm opacity-75 leading-relaxed mb-4 flex-1 line-clamp-3">{yt.description}</p>

            <a
              href={yt.channelUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded bg-black/20 hover:bg-black/40 border transition-colors font-bold uppercase tracking-wider text-xs sm:text-sm"
              style={{ color: yt.avatarColor, borderColor: `${yt.avatarColor}40` }}
            >
              <Youtube className="w-4 h-4" /> Visit Channel
            </a>
          </div>
        ))}

        {youtubers.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 gap-3 opacity-40">
            <Youtube className="w-10 h-10" />
            <p className="font-heading text-sm">No creators yet</p>
          </div>
        )}
      </div>

      {isAddOpen && <AddYouTuberModal onClose={() => setIsAddOpen(false)} onAdd={addYouTuber} />}
    </div>
  );
}

function AddYouTuberModal({ onClose, onAdd }: { onClose: () => void; onAdd: (yt: any) => void }) {
  const [name,        setName]    = useState('');
  const [channelUrl,  setUrl]     = useState('');
  const [specialty,   setSpec]    = useState('');
  const [description, setDesc]    = useState('');
  const [color,       setColor]   = useState('#f59e0b');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !channelUrl) return;
    onAdd({ name, channelUrl, specialty, description, avatarColor: color });
    onClose();
  };

  const inputCls = 'w-full bg-black/20 border border-[var(--panel-border)] p-2.5 rounded text-[var(--text-color)] outline-none text-sm focus:border-[var(--accent-color)] transition-colors';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <div
        className="glass-panel w-full sm:max-w-md rounded-t-2xl sm:rounded-xl overflow-hidden max-h-[90dvh] flex flex-col"
        style={{ backgroundColor: 'var(--bg-color)' }}
      >
        <div className="p-4 sm:p-5 border-b border-[var(--panel-border)] flex justify-between items-center flex-shrink-0">
          <h2 className="font-heading text-base sm:text-xl font-bold">Add YouTuber</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3 overflow-y-auto">
          <input required value={name} onChange={e => setName(e.target.value)} placeholder="Channel name *" className={inputCls} />
          <input required value={channelUrl} onChange={e => setUrl(e.target.value)} placeholder="Channel URL *" className={inputCls} />
          <input value={specialty} onChange={e => setSpec(e.target.value)} placeholder="Specialty (e.g. Deep Dive Reviews)" className={inputCls} />
          <textarea value={description} onChange={e => setDesc(e.target.value)} placeholder="Description" className={`${inputCls} resize-none`} rows={3} />
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold opacity-60 uppercase tracking-wider flex-1">Avatar Color</label>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-9 w-16 bg-transparent border-0 cursor-pointer rounded" />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-bold rounded hover:bg-white/5 transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm font-bold rounded" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
