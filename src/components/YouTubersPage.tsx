import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Youtube, Trash2, Plus, X } from 'lucide-react';

export function YouTubersPage() {
  const { youtubers, deleteYouTuber, addYouTuber } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <header className="px-8 py-10 border-b border-[var(--panel-border)] z-10 flex-shrink-0 flex justify-between items-end">
        <div>
          <h2 className="font-heading text-3xl font-bold">YouTubers</h2>
          <p className="text-[var(--text-muted)] mt-2 font-body max-w-xl">
            Track your favorite content creators, reviewers, and analysts.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center px-6 py-3 font-bold text-sm tracking-wide transition-transform hover:scale-105 font-heading uppercase rounded"
          style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Creator
        </button>
      </header>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {youtubers.map(yt => (
          <div key={yt.id} className="glass-panel p-6 rounded-lg flex flex-col group relative">
            <button onClick={() => deleteYouTuber(yt.id)} className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center font-heading text-2xl font-bold shadow-lg"
                style={{ backgroundColor: yt.avatarColor, color: '#fff' }}
              >
                {yt.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold">{yt.name}</h3>
                <p className="text-sm font-semibold opacity-70" style={{ color: yt.avatarColor }}>{yt.specialty}</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6 flex-1">{yt.description}</p>
            <a 
              href={yt.channelUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded bg-black/20 hover:bg-black/40 border border-[var(--panel-border)] transition-colors font-bold uppercase tracking-wider text-sm"
              style={{ color: yt.avatarColor, borderColor: `${yt.avatarColor}40` }}
            >
              <Youtube className="w-5 h-5" /> Visit Channel
            </a>
          </div>
        ))}
      </div>

      {isAddOpen && <AddYouTuberModal onClose={() => setIsAddOpen(false)} onAdd={addYouTuber} />}
    </div>
  );
}

function AddYouTuberModal({ onClose, onAdd }: { onClose: () => void, onAdd: (yt: any) => void }) {
  const [name, setName] = useState('');
  const [channelUrl, setUrl] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [description, setDesc] = useState('');
  const [color, setColor] = useState('#f59e0b');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !channelUrl) return;
    onAdd({ name, channelUrl, specialty, description, avatarColor: color });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-md rounded-lg overflow-hidden bg-[var(--bg-color)]">
        <div className="p-6 border-b border-[var(--panel-border)] flex justify-between">
          <h2 className="font-heading text-xl font-bold">Add YouTuber</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full bg-black/20 border border-[var(--panel-border)] p-3 rounded text-[var(--text-color)] outline-none" />
          <input required value={channelUrl} onChange={e=>setUrl(e.target.value)} placeholder="Channel URL" className="w-full bg-black/20 border border-[var(--panel-border)] p-3 rounded text-[var(--text-color)] outline-none" />
          <input value={specialty} onChange={e=>setSpecialty(e.target.value)} placeholder="Specialty (e.g. Deep Dive Reviews)" className="w-full bg-black/20 border border-[var(--panel-border)] p-3 rounded text-[var(--text-color)] outline-none" />
          <textarea value={description} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full bg-black/20 border border-[var(--panel-border)] p-3 rounded text-[var(--text-color)] outline-none resize-none" rows={3} />
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold opacity-70 uppercase tracking-wider">Avatar Color</label>
            <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="h-10 w-20 bg-transparent border-0 cursor-pointer" />
          </div>
          <div className="pt-4 flex justify-end">
            <button type="submit" className="px-6 py-3 font-bold rounded text-[var(--bg-color)]" style={{ backgroundColor: 'var(--accent-color)' }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
