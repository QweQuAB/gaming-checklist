import { Gamepad2, Library, Flame, Youtube, Settings } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { activeSection, setActiveSection, games } = useApp();

  const totalGames = games.length;
  const currentlyPlaying = games.filter(g => g.status === 'Playing').length;

  const navItems = [
    { id: 'library', label: 'My Library', icon: Library },
    { id: 'releases', label: 'New Releases', icon: Flame },
    { id: 'youtubers', label: 'YouTubers', icon: Youtube },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden text-[var(--text-color)] font-body">
      <aside className="w-64 flex flex-col glass-panel z-10 h-full border-r border-[var(--panel-border)] flex-shrink-0">
        <div className="p-6 border-b border-[var(--panel-border)] flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}>
            <Gamepad2 className="w-5 h-5" />
          </div>
          <h1 className="font-heading text-lg font-bold tracking-wide">Q's Checklist</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-all font-heading",
                  active 
                    ? "opacity-100 font-bold" 
                    : "opacity-70 hover:opacity-100"
                )}
                style={active ? { color: 'var(--accent-color)', backgroundColor: 'rgba(255,255,255,0.05)' } : {}}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[var(--panel-border)] mt-auto">
          <button
            onClick={() => setActiveSection('settings')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-all font-heading",
              activeSection === 'settings' 
                ? "opacity-100 font-bold" 
                : "opacity-70 hover:opacity-100"
            )}
            style={activeSection === 'settings' ? { color: 'var(--accent-color)', backgroundColor: 'rgba(255,255,255,0.05)' } : {}}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-transparent">
        {children}
      </main>
    </div>
  );
}
