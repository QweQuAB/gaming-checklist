import React, { useState } from 'react';
import { Search, Gamepad2, Trophy, Heart, Flame, Settings, Youtube, Library, LayoutGrid, Star, Plus, User, PlayCircle, HardDrive, CheckCircle2 } from 'lucide-react';
import './retro-arcade.css';

interface Game {
  id: string;
  title: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'R';
  genre: string;
  status: 'Not Downloaded' | 'Downloaded' | 'Playing' | 'Completed' | 'Favorite';
  rating: number;
  progress: number;
  color: string;
}

const MOCK_GAMES: Game[] = [
  { id: '1', title: 'Cyberpunk 2077', tier: 'S', genre: 'RPG', status: 'Playing', rating: 5, progress: 65, color: '#ff0055' },
  { id: '2', title: 'Elden Ring', tier: 'S', genre: 'Action RPG', status: 'Completed', rating: 5, progress: 100, color: '#ffaa00' },
  { id: '3', title: 'Hollow Knight', tier: 'A', genre: 'Metroidvania', status: 'Favorite', rating: 5, progress: 100, color: '#00ffcc' },
  { id: '4', title: 'Forza Horizon 5', tier: 'R', genre: 'Racing', status: 'Downloaded', rating: 4, progress: 15, color: '#0055ff' },
  { id: '5', title: 'Starfield', tier: 'B', genre: 'RPG', status: 'Playing', rating: 3, progress: 30, color: '#ffee00' },
  { id: '6', title: 'Hades', tier: 'S', genre: 'Roguelite', status: 'Completed', rating: 5, progress: 100, color: '#ff0055' },
  { id: '7', title: 'Red Dead Redemption 2', tier: 'A', genre: 'Open World', status: 'Not Downloaded', rating: 0, progress: 0, color: '#ffaa00' },
  { id: '8', title: 'Celeste', tier: 'A', genre: 'Platformer', status: 'Favorite', rating: 5, progress: 100, color: '#ffaa00' },
];

export function RetroArcade() {
  const [activeTab, setActiveTab] = useState('library');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = MOCK_GAMES.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="retro-arcade-theme flex h-screen w-full font-sans">
      <div className="crt-scanlines"></div>
      
      {/* Sidebar */}
      <div className="w-64 glass-panel border-r-[3px] border-[#4a2b6a] flex flex-col relative z-20">
        <div className="p-6 border-b-[3px] border-[#4a2b6a]">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-[#ffaa00] drop-shadow-[0_0_5px_rgba(255,170,0,0.8)]" />
            <h1 className="font-pixel text-sm text-[#e0d8f0] leading-tight">
              ARCADE<br/><span className="text-[#ff0055]">TRACKER</span>
            </h1>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <NavItem icon={<Library />} label="My Library" active={activeTab === 'library'} onClick={() => setActiveTab('library')} />
          <NavItem icon={<Flame />} label="New Releases" active={activeTab === 'new'} onClick={() => setActiveTab('new')} />
          <NavItem icon={<Youtube />} label="YouTubers" active={activeTab === 'youtube'} onClick={() => setActiveTab('youtube')} />
        </nav>

        <div className="p-4 border-t-[3px] border-[#4a2b6a]">
          <NavItem icon={<Settings />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-20 overflow-hidden">
        
        {/* Top Header / Stats */}
        <header className="h-20 glass-panel border-b-[3px] border-[#4a2b6a] px-8 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <StatBox label="SCORE" value="8,450" color="text-[#00ffcc]" />
            <StatBox label="GAMES" value="142" color="text-[#ffaa00]" />
            <StatBox label="BEATEN" value="45" color="text-[#ff0055]" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#a090c0]" />
              </div>
              <input
                type="text"
                placeholder="SEARCH DATABASE..."
                className="bg-[#1a0b2e] border-2 border-[#4a2b6a] text-[#e0d8f0] text-sm font-terminal text-lg focus:border-[#ffaa00] focus:outline-none focus:ring-0 rounded-none pl-10 pr-4 py-2 w-64 uppercase placeholder:text-[#a090c0] transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button className="pixel-border-accent bg-[#1a0b2e] text-[#ffaa00] hover:bg-[#ffaa00] hover:text-[#1a0b2e] px-4 py-2 font-pixel text-[10px] flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" /> ADD GAME
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'library' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex items-center justify-between border-b-2 border-[#4a2b6a] pb-4">
                <h2 className="font-pixel text-xl text-[#00ffcc] tracking-widest drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]">CURRENT ROSTER</h2>
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-[#ffaa00] cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'youtube' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <h2 className="font-pixel text-xl text-[#ff0055] tracking-widest drop-shadow-[0_0_8px_rgba(255,0,85,0.4)]">CREATOR NETWORK</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <YouTuberCard name="Gameranx" specialty="Before You Buy" initial="G" />
                <YouTuberCard name="Skill Up" specialty="Deep Dive Reviews" initial="S" />
                <YouTuberCard name="Dunkey" specialty="Comedy & Reviews" initial="D" />
                <YouTuberCard name="DF" specialty="Tech Analysis" initial="D" />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`arcade-menu-item w-full flex items-center gap-4 px-4 py-3 rounded-none font-terminal text-xl uppercase tracking-wider
        ${active ? 'bg-[#4a2b6a] text-[#ffaa00] shadow-[inset_4px_0_0_#ffaa00]' : 'text-[#a090c0] hover:text-[#e0d8f0]'}`}
    >
      <div className="opacity-80">{icon}</div>
      {label}
    </button>
  );
}

function StatBox({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-terminal text-lg text-[#a090c0] tracking-widest uppercase">{label}</span>
      <span className={`font-pixel text-lg ${color}`}>{value}</span>
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Playing': return 'text-[#00ffcc] border-[#00ffcc]';
      case 'Completed': return 'text-[#ffaa00] border-[#ffaa00]';
      case 'Favorite': return 'text-[#ff0055] border-[#ff0055]';
      case 'Downloaded': return 'text-[#e0d8f0] border-[#e0d8f0]';
      default: return 'text-[#6a5b8a] border-[#6a5b8a]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Playing': return <PlayCircle className="w-3 h-3" />;
      case 'Completed': return <CheckCircle2 className="w-3 h-3" />;
      case 'Favorite': return <Heart className="w-3 h-3 fill-current" />;
      case 'Downloaded': return <HardDrive className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="bg-[#2a1b42] pixel-border p-4 flex gap-4 hover:-translate-y-1 transition-transform group">
      {/* Cover Art Placeholder */}
      <div className="w-24 h-36 bg-[#1a0b2e] border-2 border-[#4a2b6a] flex-shrink-0 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent to-black"></div>
        <div className="w-full h-full p-2 flex flex-col justify-between" style={{ background: `linear-gradient(45deg, #1a0b2e, ${game.color}40)` }}>
          <div className="text-right">
             <div className={`inline-flex items-center justify-center w-8 h-8 font-pixel text-xs tier-badge-${game.tier} border-2 border-black box-content`}>
              {game.tier}
            </div>
          </div>
          <div className="font-pixel text-[8px] text-white/50 text-center uppercase break-words leading-tight">{game.genre}</div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="font-terminal text-2xl font-bold text-[#e0d8f0] leading-none mb-1 group-hover:text-[#ffaa00] transition-colors line-clamp-1">{game.title}</h3>
          <p className="font-terminal text-lg text-[#a090c0] uppercase">{game.genre}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} className={`w-4 h-4 ${star <= game.rating ? 'text-[#ffaa00] fill-[#ffaa00]' : 'text-[#4a2b6a]'}`} />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className={`status-pill flex items-center gap-2 ${getStatusColor(game.status)}`}>
              {getStatusIcon(game.status)}
              {game.status}
            </div>
          </div>

          {game.status !== 'Not Downloaded' && (
            <div className="health-bar-container">
              <div className="health-bar-fill" style={{ width: `${game.progress}%` }}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function YouTuberCard({ name, specialty, initial }: { name: string, specialty: string, initial: string }) {
  return (
    <div className="bg-[#2a1b42] pixel-border p-6 flex flex-col items-center text-center gap-4 hover:border-[#ff0055] transition-colors">
      <div className="w-20 h-20 rounded-none bg-[#1a0b2e] border-4 border-[#ff0055] flex items-center justify-center relative">
        <span className="font-pixel text-3xl text-[#ff0055]">{initial}</span>
        <div className="absolute -bottom-2 -right-2 bg-[#ffaa00] border-2 border-black p-1">
          <Youtube className="w-4 h-4 text-black" />
        </div>
      </div>
      
      <div>
        <h3 className="font-terminal text-3xl text-[#e0d8f0] font-bold">{name}</h3>
        <p className="font-terminal text-xl text-[#00ffcc] uppercase mt-1">{specialty}</p>
      </div>

      <button className="mt-2 w-full bg-[#ff0055] text-white font-terminal text-xl uppercase py-2 border-b-4 border-[#990033] active:border-b-0 active:translate-y-1 transition-all">
        VISIT CHANNEL
      </button>
    </div>
  );
}
