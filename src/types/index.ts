export type GameStatus = 'Not Downloaded' | 'Downloaded' | 'Playing' | 'Completed' | 'Favorite';
export type GameTier = 'S' | 'A' | 'B' | 'C' | 'Racing';
export type AppTheme = 'sleek' | 'neon' | 'retro';

export interface Game {
  id: string;
  title: string;
  tier: GameTier;
  genre: string;
  status: GameStatus;
  rating: number;
  notes: string;
  description: string;
  coverUrl: string;
  playtimeHours: number;
  releaseYear: number;
  addedAt: string;
  updatedAt: string;
}

export interface YouTuber {
  id: string;
  name: string;
  channelUrl: string;
  specialty: string;
  description: string;
  avatarColor: string;
}

export interface NewRelease {
  id: string;
  title: string;
  genre: string;
  releaseDate: string;
  coverUrl: string;
  description: string;
  wishlist: boolean;
}

export interface AppSettings {
  theme: AppTheme;
  rawgApiKey: string;
  defaultTier: GameTier;
  defaultStatus: GameStatus;
  showCompletionProgress: boolean;
  sortBy: 'tier' | 'name' | 'status' | 'rating' | 'addedAt';
  filterStatus: GameStatus | 'all';
}

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'sleek',
  rawgApiKey: '',
  defaultTier: 'C',
  defaultStatus: 'Not Downloaded',
  showCompletionProgress: true,
  sortBy: 'tier',
  filterStatus: 'all',
};

export const STATUS_ORDER: GameStatus[] = [
  'Not Downloaded',
  'Downloaded',
  'Playing',
  'Completed',
  'Favorite',
];

export const TIER_ORDER: GameTier[] = ['S', 'A', 'B', 'C', 'Racing'];

export const SAMPLE_GAMES: Game[] = [
  {
    id: '1',
    title: 'Elden Ring',
    tier: 'S',
    genre: 'Action RPG',
    status: 'Playing',
    rating: 5,
    notes: 'Incredible open world. Take your time exploring.',
    description: 'A vast open-world action RPG from FromSoftware and George R.R. Martin.',
    coverUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=400&h=600',
    playtimeHours: 120,
    releaseYear: 2022,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Hollow Knight',
    tier: 'S',
    genre: 'Metroidvania',
    status: 'Completed',
    rating: 5,
    notes: 'One of the best games ever made. Play it.',
    description: 'A challenging 2D action-adventure through an ancient, ruined kingdom.',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400&h=600',
    playtimeHours: 45,
    releaseYear: 2017,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Cyberpunk 2077',
    tier: 'A',
    genre: 'RPG',
    status: 'Playing',
    rating: 4,
    notes: 'Way better after the 2.0 update. Night City is stunning.',
    description: 'Open world action RPG set in a dystopian cyberpunk future.',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=600',
    playtimeHours: 80,
    releaseYear: 2020,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Forza Horizon 5',
    tier: 'Racing',
    genre: 'Racing',
    status: 'Favorite',
    rating: 5,
    notes: 'Best racing game in years. Mexico is gorgeous.',
    description: 'Open-world racing game set in a stunning recreation of Mexico.',
    coverUrl: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=400&h=600',
    playtimeHours: 200,
    releaseYear: 2021,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Starfield',
    tier: 'B',
    genre: 'RPG',
    status: 'Downloaded',
    rating: 3,
    notes: 'Solid but underwhelming. Wait for mods.',
    description: 'Bethesda\'s space exploration RPG set across the galaxy.',
    coverUrl: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=400&h=600',
    playtimeHours: 30,
    releaseYear: 2023,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Hades',
    tier: 'S',
    genre: 'Roguelike',
    status: 'Favorite',
    rating: 5,
    notes: 'Perfect roguelike. Every run feels different.',
    description: 'A god-like rogue-like dungeon crawler from Supergiant Games.',
    coverUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400&h=600',
    playtimeHours: 150,
    releaseYear: 2020,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Red Dead Redemption 2',
    tier: 'S',
    genre: 'Open World',
    status: 'Completed',
    rating: 5,
    notes: 'A masterpiece of storytelling. Arthur Morgan forever.',
    description: 'Epic tale of life in America\'s unforgiving heartland.',
    coverUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80&w=400&h=600',
    playtimeHours: 180,
    releaseYear: 2018,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Gran Turismo 7',
    tier: 'Racing',
    genre: 'Sim Racing',
    status: 'Playing',
    rating: 4,
    notes: 'The benchmark for sim racing.',
    description: 'Authentic racing simulator with hundreds of cars.',
    coverUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=600',
    playtimeHours: 60,
    releaseYear: 2022,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Diablo IV',
    tier: 'B',
    genre: 'ARPG',
    status: 'Not Downloaded',
    rating: 0,
    notes: '',
    description: 'Action RPG set in the dark world of Sanctuary.',
    coverUrl: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=400&h=600',
    playtimeHours: 0,
    releaseYear: 2023,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const SAMPLE_YOUTUBERS: YouTuber[] = [
  { id: '1', name: 'Gameranx', channelUrl: 'https://www.youtube.com/@gameranxTV', specialty: 'Before You Buy Reviews', description: 'Weekly game reviews and "Before You Buy" series', avatarColor: '#f59e0b' },
  { id: '2', name: 'Skill Up', channelUrl: 'https://www.youtube.com/@SkillUp', specialty: 'Deep Dive Analysis', description: 'In-depth game analysis and reviews', avatarColor: '#3b82f6' },
  { id: '3', name: 'Dunkey', channelUrl: 'https://www.youtube.com/@videogamedunkey', specialty: 'Comedy & Reviews', description: 'Hilarious gaming commentary and reviews', avatarColor: '#ef4444' },
  { id: '4', name: 'Digital Foundry', channelUrl: 'https://www.youtube.com/@DigitalFoundry', specialty: 'Tech Analysis', description: 'Technical game analysis and performance breakdowns', avatarColor: '#8b5cf6' },
];

export const SAMPLE_NEW_RELEASES: NewRelease[] = [
  { id: '1', title: 'GTA VI', genre: 'Open World', releaseDate: '2025-05-26', coverUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=400&h=600', description: 'Rockstar\'s highly anticipated return to Vice City', wishlist: true },
  { id: '2', title: 'Hollow Knight: Silksong', genre: 'Metroidvania', releaseDate: '2025 TBA', coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400&h=600', description: 'The long-awaited sequel to Hollow Knight', wishlist: true },
  { id: '3', title: 'Monster Hunter Wilds', genre: 'Action RPG', releaseDate: '2025-02-28', coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=600', description: 'The next evolution in the Monster Hunter series', wishlist: false },
];
