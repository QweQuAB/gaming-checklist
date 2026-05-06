import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { AppTheme } from '@/types';
import { exportGamesJson } from '@/lib/utils';
import { Download, Upload, AlertTriangle, Monitor, Sparkles, Gamepad2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SettingsPage() {
  const { settings, setTheme, games, importGames, updateSettings } = useApp();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.games && Array.isArray(json.games)) {
          importGames(json.games);
          alert('Games imported successfully!');
        } else {
          alert('Invalid file format.');
        }
      } catch {
        alert('Error parsing JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <header className="px-4 sm:px-6 lg:px-8 py-5 sm:py-8 border-b border-[var(--panel-border)] flex-shrink-0">
        <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold">System Settings</h2>
        <p className="text-xs sm:text-sm mt-1 hidden sm:block" style={{ color: 'var(--text-muted)' }}>
          Customize your tracker's appearance and manage your data.
        </p>
      </header>

      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl space-y-8 sm:space-y-12">

        {/* Theme section */}
        <section>
          <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Monitor className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--accent-color)' }} />
            Interface Theme
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
            <ThemeCard
              id="sleek"
              name="Sleek Studio"
              active={settings.theme === 'sleek'}
              onClick={() => setTheme('sleek')}
              preview={
                <div className="w-full h-16 sm:h-20 rounded bg-[#1a1a2e] border border-white/5 flex items-center justify-center font-serif text-[#f59e0b] text-sm sm:text-base">
                  Editorial
                </div>
              }
            />
            <ThemeCard
              id="neon"
              name="Neon Command"
              active={settings.theme === 'neon'}
              onClick={() => setTheme('neon')}
              preview={
                <div
                  className="w-full h-16 sm:h-20 rounded bg-[#050508] border border-cyan-500/30 flex items-center justify-center font-mono text-cyan-400 uppercase tracking-widest text-xs sm:text-sm"
                  style={{ boxShadow: 'inset 0 0 20px rgba(0,255,255,0.1)' }}
                >
                  Terminal
                </div>
              }
            />
            <ThemeCard
              id="retro"
              name="Retro Arcade"
              active={settings.theme === 'retro'}
              onClick={() => setTheme('retro')}
              preview={
                <div
                  className="w-full h-16 sm:h-20 rounded bg-[#1a0b2e] border-[3px] border-[#4a2b6a] flex items-center justify-center font-mono font-bold text-[#ffaa00] text-xs sm:text-sm"
                  style={{ textShadow: '2px 2px 0px #ff0055' }}
                >
                  8-Bit
                </div>
              }
            />
          </div>
        </section>

        {/* RAWG API */}
        <section className="pt-6 sm:pt-8 border-t border-[var(--panel-border)]">
          <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--accent-color)' }} />
            Integrations
          </h3>
          <div className="max-w-md space-y-2">
            <label className="block text-xs sm:text-sm uppercase tracking-wider font-bold opacity-60">RAWG API Key</label>
            <input
              value={settings.rawgApiKey}
              onChange={e => updateSettings({ rawgApiKey: e.target.value })}
              type="password"
              className="w-full bg-black/20 border border-[var(--panel-border)] p-2.5 sm:p-3 rounded focus:border-[var(--accent-color)] outline-none text-[var(--text-color)] text-sm transition-colors"
              placeholder="Paste your RAWG API key..."
            />
            <p className="flex items-start gap-1.5 text-xs opacity-50 leading-relaxed">
              <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              Get a free key at rawg.io — enables game search &amp; auto-fill in the Add Game modal.
            </p>
          </div>
        </section>

        {/* Data management */}
        <section className="pt-6 sm:pt-8 border-t border-[var(--panel-border)]">
          <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--accent-color)' }} />
            Data Management
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => exportGamesJson(games)}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-black/20 hover:bg-black/40 border border-[var(--panel-border)] rounded font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Export JSON
            </button>
            <label className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-black/20 hover:bg-black/40 border border-[var(--panel-border)] rounded font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors cursor-pointer">
              <Upload className="w-4 h-4" /> Import JSON
              <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
          <p className="text-xs opacity-40 mt-3">
            {games.length} game{games.length !== 1 ? 's' : ''} in your library &bull; stored in localStorage
          </p>
        </section>

        {/* Danger zone */}
        <section className="pt-6 sm:pt-8 border-t border-red-500/20">
          <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-red-500 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" /> Danger Zone
          </h3>
          <p className="text-xs opacity-50 mb-3">This will delete all games and reset everything to defaults.</p>
          <button
            onClick={() => {
              if (confirm('Are you sure? This will delete all games and reset everything to defaults.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="px-4 sm:px-5 py-2.5 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white rounded font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors active:scale-95"
          >
            Reset All Data
          </button>
        </section>
      </div>
    </div>
  );
}

function ThemeCard({ id, name, active, onClick, preview }: {
  id: string;
  name: string;
  active: boolean;
  onClick: () => void;
  preview: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer rounded-lg p-3 sm:p-4 transition-all duration-300 border-2',
        active ? 'bg-white/5 shadow-lg scale-[1.01]' : 'border-transparent bg-black/20 hover:bg-black/30',
      )}
      style={active ? { borderColor: 'var(--accent-color)' } : {}}
    >
      {preview}
      <div className="mt-3 flex items-center justify-between">
        <h4 className="font-heading font-bold text-sm sm:text-base">{name}</h4>
        <div
          className={cn('w-4 h-4 rounded-full border-2', active ? 'border-[var(--bg-color)]' : 'border-white/20')}
          style={active ? { backgroundColor: 'var(--accent-color)' } : {}}
        />
      </div>
    </div>
  );
}
