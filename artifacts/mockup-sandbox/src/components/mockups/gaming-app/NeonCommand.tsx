import React, { useState } from 'react';
import { 
  Gamepad2, 
  Search, 
  Library, 
  Flame, 
  Users, 
  Settings, 
  Plus,
  Star,
  Download,
  PlayCircle,
  CheckCircle2,
  Heart,
  ChevronDown,
  Filter,
  MonitorPlay,
  Clock,
  Trophy
} from 'lucide-react';
import './_group.css';

// Mock Data
const GAMES = [
  { id: 1, title: 'Cyberpunk 2077', tier: 'S', genre: 'RPG', status: 'Playing', rating: 5, cover: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=400&q=80', hours: 142 },
  { id: 2, title: 'Elden Ring', tier: 'S', genre: 'Action RPG', status: 'Completed', rating: 5, cover: 'https://images.unsplash.com/photo-1604845564903-cb3918b857dc?w=400&q=80', hours: 210 },
  { id: 3, title: 'Forza Horizon 5', tier: 'Racing', genre: 'Racing', status: 'Downloaded', rating: 4, cover: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=400&q=80', hours: 12 },
  { id: 4, title: 'Starfield', tier: 'A', genre: 'RPG', status: 'Playing', rating: 4, cover: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=400&q=80', hours: 45 },
  { id: 5, title: 'Hollow Knight', tier: 'S', genre: 'Metroidvania', status: 'Favorite', rating: 5, cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80', hours: 65 },
  { id: 6, title: 'Assassin\'s Creed Mirage', tier: 'B', genre: 'Action', status: 'Not Downloaded', rating: 3, cover: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&q=80', hours: 0 },
  { id: 7, title: 'Red Dead Redemption 2', tier: 'S', genre: 'Action Adventure', status: 'Completed', rating: 5, cover: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&q=80', hours: 180 },
  { id: 8, title: 'Diablo IV', tier: 'A', genre: 'ARPG', status: 'Playing', rating: 4, cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80', hours: 85 },
];

const STATUS_CONFIG = {
  'Not Downloaded': { icon: Download, color: 'bg-gray-600', dot: 'bg-gray-500' },
  'Downloaded': { icon: CheckCircle2, color: 'neon-text-cyan', dot: 'neon-glow-dot-cyan' },
  'Playing': { icon: PlayCircle, color: 'neon-text-purple', dot: 'neon-glow-dot-blue' },
  'Completed': { icon: Trophy, color: 'text-yellow-400', dot: 'neon-glow-dot-yellow' },
  'Favorite': { icon: Heart, color: 'text-pink-500', dot: 'neon-glow-dot-green' },
};

const TIER_COLORS = {
  'S': 'text-yellow-400 border-yellow-400',
  'A': 'text-red-400 border-red-400',
  'B': 'text-blue-400 border-blue-400',
  'C': 'text-green-400 border-green-400',
  'Racing': 'neon-text-cyan neon-border-cyan',
};

export function NeonCommand() {
  const [activeTab, setActiveTab] = useState('library');

  return (
    <div className="neon-theme w-full h-[100dvh] flex overflow-hidden neon-scanline font-cyber bg-[#050508] text-gray-200">
      
      {/* Sidebar */}
      <aside className="w-64 neon-glass border-r border-[#00ffff33] flex flex-col relative z-10">
        <div className="p-6 flex items-center gap-3 border-b border-[#00ffff22]">
          <div className="w-10 h-10 rounded-sm border border-cyan-400 bg-cyan-900/30 flex items-center justify-center neon-border-cyan">
            <MonitorPlay className="w-6 h-6 neon-text-cyan" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider neon-text-cyan leading-tight uppercase">SYS_CMD</h1>
            <p className="text-[10px] font-mono-cyber text-cyan-500/70 tracking-widest uppercase">Nexus Tracker v2.4</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          <NavItem icon={Library} label="My Library" active={activeTab === 'library'} onClick={() => setActiveTab('library')} />
          <NavItem icon={Flame} label="New Releases" active={activeTab === 'releases'} onClick={() => setActiveTab('releases')} />
          <NavItem icon={Users} label="YouTubers" active={activeTab === 'youtubers'} onClick={() => setActiveTab('youtubers')} />
          
          <div className="pt-8 pb-2">
            <p className="px-3 text-xs font-mono-cyber text-gray-500 tracking-widest uppercase mb-2">Filters</p>
            <div className="space-y-1">
              {['Favorites', 'Currently Playing', 'Completed', 'Wishlist'].map(f => (
                <button key={f} className="w-full flex items-center justify-between px-3 py-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors group">
                  <span className="font-cyber group-hover:translate-x-1 transition-transform">{f}</span>
                  <span className="text-xs font-mono-cyber opacity-50">[{Math.floor(Math.random() * 20)}]</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-[#00ffff22]">
          <NavItem icon={Settings} label="System Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        
        {/* Topbar / Stats */}
        <header className="h-20 neon-glass border-b border-[#00ffff22] flex items-center justify-between px-8">
          <div className="flex items-center gap-8 h-full">
            <StatBox label="Total Games" value="142" />
            <StatBox label="Playing" value="3" highlight="neon-text-purple" />
            <StatBox label="Completed" value="87" />
            <StatBox label="Time Logged" value="1,240h" highlight="neon-text-cyan" />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center bg-[#0a0a12] border border-[#00ffff44] rounded-sm px-4 py-2 w-64 neon-glass">
                <Search className="w-4 h-4 text-cyan-500/50 mr-3" />
                <input 
                  type="text" 
                  placeholder="Query database..." 
                  className="bg-transparent border-none outline-none text-sm font-mono-cyber text-cyan-100 placeholder:text-cyan-800 w-full"
                />
              </div>
            </div>

            <button className="h-10 px-6 bg-purple-600/20 border border-purple-500 text-purple-400 font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 hover:bg-purple-600/40 hover:text-white transition-all neon-border-purple group">
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              <span className="font-cyber">Add Entry</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-wider text-white uppercase flex items-center gap-3">
              <span className="w-2 h-8 bg-cyan-500 shadow-[0_0_10px_#0ff]"></span>
              Active Library
            </h2>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 neon-glass text-sm text-cyan-400 hover:bg-cyan-900/30 transition-colors uppercase font-mono-cyber">
                <Filter className="w-4 h-4" />
                Sort: Tier
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {GAMES.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </main>
      
      {/* Decorative corners */}
      <div className="fixed top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50 z-20 pointer-events-none" />
      <div className="fixed top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50 z-20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50 z-20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50 z-20 pointer-events-none" />
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all relative overflow-hidden group ${
        active 
          ? 'bg-cyan-900/30 text-cyan-300 neon-border-cyan border-l-2 border-y-0 border-r-0' 
          : 'text-gray-400 hover:text-cyan-100 hover:bg-[#ffffff08]'
      }`}
    >
      {active && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none" />}
      <Icon className={`w-5 h-5 ${active ? 'neon-text-cyan' : 'opacity-70'}`} />
      <span className="font-cyber uppercase tracking-wider text-sm font-semibold relative z-10">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full neon-glow-dot-cyan" />}
    </button>
  );
}

function StatBox({ label, value, highlight = 'text-white' }: { label: string, value: string, highlight?: string }) {
  return (
    <div className="flex flex-col justify-center h-full border-r border-[#00ffff11] pr-8 last:border-0">
      <span className="text-[10px] font-mono-cyber text-gray-500 tracking-widest uppercase mb-1">{label}</span>
      <span className={`text-2xl font-bold font-mono-cyber ${highlight} tracking-tight`}>{value}</span>
    </div>
  );
}

function GameCard({ game }: { game: any }) {
  const StatusIcon = STATUS_CONFIG[game.status as keyof typeof STATUS_CONFIG].icon;
  const statusColor = STATUS_CONFIG[game.status as keyof typeof STATUS_CONFIG].color;
  const statusDot = STATUS_CONFIG[game.status as keyof typeof STATUS_CONFIG].dot;

  return (
    <div className="group relative bg-[#0a0a12] border border-[#ffffff11] hover:border-cyan-500/50 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] flex flex-col h-[320px]">
      
      {/* Cover Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a1288] to-transparent z-10" />
        <img 
          src={game.cover} 
          alt={game.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 filter saturate-50 group-hover:saturate-100"
        />
        
        {/* Tier Badge */}
        <div className={`absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center border font-bold font-mono-cyber bg-black/50 backdrop-blur-md rounded-sm ${TIER_COLORS[game.tier as keyof typeof TIER_COLORS]}`}>
          {game.tier === 'Racing' ? 'R' : game.tier}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 relative z-20 -mt-8">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-cyber font-bold text-lg text-white leading-tight truncate pr-4">{game.title}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-mono-cyber text-cyan-500/70 uppercase border border-cyan-900/50 bg-cyan-900/20 px-2 py-0.5 rounded-sm">
            {game.genre}
          </span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < game.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-700'}`} />
            ))}
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-cyber">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statusDot}`} />
              <span className={`uppercase ${statusColor}`}>{game.status}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{game.hours}h</span>
            </div>
          </div>
          
          {/* Progress Bar (fake for visual) */}
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500" 
              style={{ width: game.status === 'Completed' ? '100%' : game.status === 'Not Downloaded' ? '0%' : `${Math.random() * 60 + 20}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Hover Actions */}
      <div className="absolute inset-0 bg-[#050508]/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-3/4 py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-cyber font-bold uppercase tracking-wider text-sm hover:bg-cyan-400 hover:text-black transition-colors flex items-center justify-center gap-2">
          <PlayCircle className="w-4 h-4" /> Launch
        </button>
        <button className="w-3/4 py-2 bg-purple-500/10 border border-purple-500/50 text-purple-400 font-cyber font-bold uppercase tracking-wider text-sm hover:bg-purple-500/30 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}