import React from 'react';
import { Gamepad2, Library, Flame, Youtube, Settings } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'library',   label: 'Library',   icon: Library  },
  { id: 'releases',  label: 'Releases',  icon: Flame    },
  { id: 'youtubers', label: 'YouTubers', icon: Youtube  },
  { id: 'settings',  label: 'Settings',  icon: Settings },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { activeSection, setActiveSection } = useApp();

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden text-[var(--text-color)]">

      {/* ── Desktop / Tablet sidebar (md+) ── */}
      <aside className="hidden md:flex w-56 lg:w-64 flex-col glass-panel z-10 h-full border-r border-[var(--panel-border)] flex-shrink-0">
        <div className="p-5 lg:p-6 border-b border-[var(--panel-border)] flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center rounded flex-shrink-0"
            style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}
          >
            <Gamepad2 className="w-5 h-5" />
          </div>
          <h1 className="font-heading text-base lg:text-lg font-bold tracking-wide truncate">
            Q's Checklist
          </h1>
        </div>

        <nav className="flex-1 px-3 lg:px-4 space-y-1 mt-4 lg:mt-6 overflow-y-auto">
          {NAV_ITEMS.slice(0, 3).map(item => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded text-sm transition-all font-heading',
                  active ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100',
                )}
                style={active ? { color: 'var(--accent-color)', backgroundColor: 'rgba(255,255,255,0.06)' } : {}}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 lg:p-4 border-t border-[var(--panel-border)]">
          <button
            onClick={() => setActiveSection('settings')}
            className={cn(
              'w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded text-sm transition-all font-heading',
              activeSection === 'settings' ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100',
            )}
            style={activeSection === 'settings' ? { color: 'var(--accent-color)', backgroundColor: 'rgba(255,255,255,0.06)' } : {}}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            Settings
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col relative overflow-hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {/* mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-[var(--panel-border)] glass-panel flex-shrink-0">
          <div
            className="w-7 h-7 flex items-center justify-center rounded flex-shrink-0"
            style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}
          >
            <Gamepad2 className="w-4 h-4" />
          </div>
          <span className="font-heading text-sm font-bold tracking-wide flex-1 truncate">Q's Gaming Checklist</span>
          <span className="text-xs opacity-50 font-heading capitalize">{activeSection}</span>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col pb-16 md:pb-0">
          {children}
        </div>
      </main>

      {/* ── Mobile bottom navigation (< md) ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 glass-panel border-t border-[var(--panel-border)] flex items-stretch"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)', backgroundColor: 'var(--bg-color)' }}
      >
        {NAV_ITEMS.map(item => {
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all"
              style={{ color: active ? 'var(--accent-color)' : 'var(--text-muted)' }}
            >
              <item.icon className="w-5 h-5" style={{ filter: active ? 'drop-shadow(0 0 4px var(--accent-color))' : 'none' }} />
              <span className="text-[9px] font-bold tracking-wide uppercase">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
