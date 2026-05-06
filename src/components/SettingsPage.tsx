import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { AppTheme } from '@/types';
import { exportGamesJson } from '@/lib/utils';
import { Download, Upload, AlertTriangle, Monitor, Sparkles, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SettingsPage() {
  const { settings, setTheme, games, importGames, updateSettings } = useApp();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.games && Array.isArray(json.games)) {
          importGames(json.games);
          alert('Games imported successfully!');
        } else {
          alert('Invalid file format.');
        }
      } catch (err) {
        alert('Error parsing JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <header className="px-8 py-10 border-b border-[var(--panel-border)] z-10 flex-shrink-0">
        <h2 className="font-heading text-3xl font-bold">System Settings</h2>
        <p className="text-[var(--text-muted)] mt-2 font-body max-w-xl">
          Customize your tracker's appearance and manage your data.
        </p>
      </header>

      <div className="p-8 max-w-4xl space-y-12">
        <section>
          <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-[var(--accent-color)]" /> Interface Theme
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ThemeCard 
              id="sleek" 
              name="Sleek Studio" 
              active={settings.theme === 'sleek'} 
              onClick={() => setTheme('sleek')}
              preview={<div className="w-full h-24 rounded bg-[#1a1a2e] border border-white/5 flex items-center justify-center font-serif text-[#f59e0b]">Editorial</div>}
            />
            <ThemeCard 
              id="neon" 
              name="Neon Command" 
              active={settings.theme === 'neon'} 
              onClick={() => setTheme('neon')}
              preview={<div className="w-full h-24 rounded bg-[#050508] border border-cyan-500/30 flex items-center justify-center font-mono text-cyan-400 uppercase tracking-widest" style={{ boxShadow: 'inset 0 0 20px rgba(0,255,255,0.1)' }}>Terminal</div>}
            />
            <ThemeCard 
              id="retro" 
              name="Retro Arcade" 
              active={settings.theme === 'retro'} 
              onClick={() => setTheme('retro')}
              preview={<div className="w-full h-24 rounded bg-[#1a0b2e] border-[4px] border-[#4a2b6a] flex items-center justify-center font-mono font-bold text-[#ffaa00]" style={{ textShadow: '2px 2px 0px #ff0055' }}>8-Bit</div>}
            />
          </div>
        </section>

        <section className="pt-8 border-t border-[var(--panel-border)]">
          <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-[var(--accent-color)]" /> Integrations
          </h3>
          <div className="max-w-md space-y-2">
            <label className="block text-sm uppercase tracking-wider font-bold opacity-70">RAWG API Key</label>
            <input 
              value={settings.rawgApiKey} 
              onChange={e => updateSettings({ rawgApiKey: e.target.value })}
              className="w-full bg-black/20 border border-[var(--panel-border)] p-3 rounded focus:border-[var(--accent-color)] outline-none text-[var(--text-color)]" 
              placeholder="For future metadata syncing..." 
            />
          </div>
        </section>

        <section className="pt-8 border-t border-[var(--panel-border)]">
          <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent-color)]" /> Data Management
          </h3>
          <div className="flex gap-4">
            <button 
              onClick={() => exportGamesJson(games)}
              className="flex items-center gap-2 px-6 py-3 bg-black/20 hover:bg-black/40 border border-[var(--panel-border)] rounded font-bold uppercase tracking-wider text-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Export JSON
            </button>
            <label className="flex items-center gap-2 px-6 py-3 bg-black/20 hover:bg-black/40 border border-[var(--panel-border)] rounded font-bold uppercase tracking-wider text-sm transition-colors cursor-pointer">
              <Upload className="w-4 h-4" /> Import JSON
              <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </section>

        <section className="pt-8 border-t border-red-500/20">
          <h3 className="font-heading text-xl font-bold mb-4 text-red-500 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Danger Zone
          </h3>
          <button 
            onClick={() => {
              if (confirm('Are you sure? This will delete all games and reset everything to defaults.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white rounded font-bold uppercase tracking-wider text-sm transition-colors"
          >
            Reset All Data
          </button>
        </section>
      </div>
    </div>
  );
}

function ThemeCard({ id, name, active, onClick, preview }: { id: string, name: string, active: boolean, onClick: () => void, preview: React.ReactNode }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-lg p-4 transition-all duration-300 border-2",
        active ? "bg-white/5 shadow-lg scale-[1.02]" : "border-transparent bg-black/20 hover:bg-black/30"
      )}
      style={active ? { borderColor: 'var(--accent-color)' } : {}}
    >
      {preview}
      <div className="mt-4 flex items-center justify-between">
        <h4 className="font-heading font-bold text-lg">{name}</h4>
        <div className={cn("w-4 h-4 rounded-full border-2", active ? "border-[var(--bg-color)]" : "border-white/20")} style={active ? { backgroundColor: 'var(--accent-color)' } : {}} />
      </div>
    </div>
  );
}
