import React, { useState } from 'react';
import { 
  Gamepad2, 
  Search, 
  Settings, 
  Youtube, 
  Library, 
  Plus,
  Play,
  CheckCircle,
  Download,
  Heart,
  Star,
  MoreVertical,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Dummy Data
const STATS = [
  { label: 'Total Games', value: '142' },
  { label: 'Currently Playing', value: '3' },
  { label: 'Completed', value: '87' },
  { label: 'Favorites', value: '24' },
];

const TIERS = ['S', 'A', 'B', 'C', 'Racing'];

const GAMES = [
  { id: 1, title: 'Elden Ring', tier: 'S', genre: 'Action RPG', status: 'Playing', rating: 5, cover: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 2, title: 'Hollow Knight', tier: 'S', genre: 'Metroidvania', status: 'Completed', rating: 5, cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 3, title: 'Cyberpunk 2077', tier: 'A', genre: 'RPG', status: 'Playing', rating: 4, cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 4, title: 'Forza Horizon 5', tier: 'Racing', genre: 'Racing', status: 'Favorite', rating: 5, cover: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 5, title: 'Starfield', tier: 'B', genre: 'RPG', status: 'Downloaded', rating: 3, cover: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 6, title: 'Hades', tier: 'S', genre: 'Roguelike', status: 'Favorite', rating: 5, cover: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 7, title: 'Diablo IV', tier: 'B', genre: 'ARPG', status: 'Not Downloaded', rating: 3, cover: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 8, title: 'Gran Turismo 7', tier: 'Racing', genre: 'Sim Racing', status: 'Playing', rating: 4, cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=600' },
];

const STATUS_ICONS = {
  'Not Downloaded': Download,
  'Downloaded': CheckCircle,
  'Playing': Play,
  'Completed': Flame,
  'Favorite': Heart,
};

const TIER_COLORS = {
  'S': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'A': 'bg-slate-300/10 text-slate-300 border-slate-300/20',
  'B': 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  'C': 'bg-stone-500/10 text-stone-400 border-stone-500/20',
  'Racing': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
};

export function SleekStudio() {
  const [activeTab, setActiveTab] = useState('My Library');

  return (
    <div 
      className="flex h-screen w-full overflow-hidden text-slate-200 font-sans"
      style={{ 
        backgroundColor: '#1a1a2e',
        backgroundImage: 'radial-gradient(circle at top right, rgba(245, 158, 11, 0.03), transparent 40%)'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .glass-panel {
          background: rgba(30, 30, 46, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .premium-shadow {
          box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        .hover-card-premium {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-card-premium:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(245, 158, 11, 0.2);
        }
      `}} />

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col glass-panel z-10">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-[#1a1a2e]">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h1 className="font-serif text-2xl font-semibold tracking-wide text-white">Backlog</h1>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { name: 'My Library', icon: Library },
            { name: 'New Releases', icon: Flame },
            { name: 'YouTubers', icon: Youtube },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                activeTab === item.name 
                  ? "bg-amber-500/10 text-amber-500" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-300">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header / Stats */}
        <header className="px-12 py-10 flex justify-between items-end border-b border-white/5 z-10">
          <div className="flex gap-16">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-serif text-4xl text-white mb-2">{stat.value}</span>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{stat.label}</span>
              </div>
            ))}
          </div>
          
          <Button 
            className="bg-amber-500 hover:bg-amber-400 text-[#1a1a2e] font-semibold h-11 px-6 rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Game
          </Button>
        </header>

        {/* Toolbar */}
        <div className="px-12 py-6 flex items-center justify-between z-10">
          <h2 className="font-serif text-3xl text-white">{activeTab}</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <Input 
                placeholder="Search collection..." 
                className="pl-10 bg-black/20 border-white/10 text-slate-200 placeholder:text-slate-600 focus-visible:ring-amber-500/30 rounded-full h-10"
              />
            </div>
            <div className="flex bg-black/20 rounded-full p-1 border border-white/5">
              {['All', 'Favorites', 'Playing'].map((filter, i) => (
                <button 
                  key={filter}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                    i === 0 ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Game Grid */}
        <ScrollArea className="flex-1 px-12 pb-12">
          {TIERS.map(tier => {
            const tierGames = GAMES.filter(g => g.tier === tier);
            if (tierGames.length === 0) return null;
            
            return (
              <div key={tier} className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="font-serif text-2xl text-white/80">{tier} Tier</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {tierGames.map(game => {
                    const StatusIcon = STATUS_ICONS[game.status as keyof typeof STATUS_ICONS] || Circle;
                    return (
                      <div key={game.id} className="group relative rounded-xl overflow-hidden glass-panel hover-card-premium p-3">
                        <div className="aspect-[3/4] rounded-lg overflow-hidden relative mb-4">
                          <img 
                            src={game.cover} 
                            alt={game.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-80" />
                          
                          <div className="absolute top-3 left-3">
                            <Badge variant="outline" className={cn("px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md rounded-full border", TIER_COLORS[game.tier as keyof typeof TIER_COLORS])}>
                              {game.tier}
                            </Badge>
                          </div>
                          
                          <div className="absolute top-3 right-3">
                            <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-colors border border-white/10">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="absolute bottom-3 left-3 flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i}
                                className={cn(
                                  "w-3.5 h-3.5",
                                  i < game.rating ? "fill-amber-500 text-amber-500" : "text-white/20"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="px-2 pb-2">
                          <h4 className="font-serif text-lg text-white mb-1 truncate">{game.title}</h4>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-slate-400 font-medium">{game.genre}</span>
                            
                            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 px-2 py-1 rounded-md">
                              <StatusIcon className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[80px]">{game.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </main>
    </div>
  );
}
