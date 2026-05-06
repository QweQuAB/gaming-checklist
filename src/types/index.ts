export type GameStatus = 'Not Downloaded' | 'Downloaded' | 'Playing' | 'Completed' | 'Favorite';
export type GameTier = 'S' | 'A' | 'B' | 'C' | 'Racing';
export type AppTheme = 'sleek' | 'neon' | 'retro';
export type ArticleCategory = 'games' | 'companies' | 'hardware';

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

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  source: string;
  sourceUrl: string;
  coverUrl: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  bookmarked: boolean;
  readingTimeMin: number;
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
    description: "Bethesda's space exploration RPG set across the galaxy.",
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
    description: "Epic tale of life in America's unforgiving heartland.",
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
  { id: '1', title: 'GTA VI', genre: 'Open World', releaseDate: '2025-05-26', coverUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=400&h=600', description: "Rockstar's highly anticipated return to Vice City", wishlist: true },
  { id: '2', title: 'Hollow Knight: Silksong', genre: 'Metroidvania', releaseDate: '2025 TBA', coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400&h=600', description: 'The long-awaited sequel to Hollow Knight', wishlist: true },
  { id: '3', title: 'Monster Hunter Wilds', genre: 'Action RPG', releaseDate: '2025-02-28', coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=600', description: 'The next evolution in the Monster Hunter series', wishlist: false },
];

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Elden Ring: Nightreign is FromSoftware\'s Bold Co-op Experiment',
    excerpt: 'FromSoftware steps into uncharted territory with a 3-player co-op spinoff set in a collapsing version of the Lands Between. Early impressions suggest it\'s far more than a tech demo — it\'s a full reimagining of the Soulslike formula built around teamwork, asymmetric roles, and a punishing 3-night roguelite loop.',
    category: 'games',
    source: 'IGN',
    sourceUrl: 'https://www.ign.com',
    coverUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-04-28',
    tags: ['FromSoftware', 'Elden Ring', 'Co-op', 'Roguelite'],
    featured: true,
    bookmarked: false,
    readingTimeMin: 8,
  },
  {
    id: 'a2',
    title: 'Hollow Knight: Silksong — Team Cherry Finally Breaks Silence',
    excerpt: 'After years of near-total silence, Team Cherry has resurfaced with a 12-minute gameplay showcase of Silksong. Hornet\'s moveset has been expanded dramatically, the world is three times the size of the original, and a firm release window has been hinted at for late 2025.',
    category: 'games',
    source: 'Eurogamer',
    sourceUrl: 'https://www.eurogamer.net',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-04-15',
    tags: ['Team Cherry', 'Metroidvania', 'Indie'],
    featured: false,
    bookmarked: true,
    readingTimeMin: 5,
  },
  {
    id: 'a3',
    title: 'Hades II Full Release: Supergiant\'s Masterpiece Completes',
    excerpt: 'After a wildly successful early access run, Hades II has shipped its 1.0 update — and it\'s bigger than anyone expected. New boss encounters, a second playable route, a revamped boon system, and a story that genuinely tops the original make this the best roguelite ever made.',
    category: 'games',
    source: 'Rock Paper Shotgun',
    sourceUrl: 'https://www.rockpapershotgun.com',
    coverUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-03-22',
    tags: ['Supergiant', 'Roguelite', 'Early Access'],
    featured: false,
    bookmarked: false,
    readingTimeMin: 6,
  },
  {
    id: 'a4',
    title: 'The Witcher 4: First In-Engine Footage Stuns at The Game Awards',
    excerpt: 'CD Projekt Red unveiled a jaw-dropping in-engine cinematic for The Witcher 4, built on Unreal Engine 5. The new protagonist Ciri takes center stage, and early technical details suggest the game is targeting 60fps at native 4K on the PlayStation 6 and next Xbox.',
    category: 'games',
    source: 'GameSpot',
    sourceUrl: 'https://www.gamespot.com',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-02-10',
    tags: ['CD Projekt Red', 'RPG', 'Unreal Engine 5'],
    featured: false,
    bookmarked: false,
    readingTimeMin: 7,
  },
  {
    id: 'a5',
    title: 'GTA VI: Rockstar Locks In the Most Anticipated Launch in History',
    excerpt: 'Rockstar Games has confirmed GTA VI ships this fall, and the pre-order numbers are already historic. The game features a dual-protagonist structure, a living Vice City that evolves in real time, and a physics engine that makes everything feel genuinely tactile. The expectations are astronomical.',
    category: 'games',
    source: 'Kotaku',
    sourceUrl: 'https://kotaku.com',
    coverUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-01-30',
    tags: ['Rockstar', 'Open World', 'GTA'],
    featured: false,
    bookmarked: true,
    readingTimeMin: 9,
  },
  {
    id: 'a6',
    title: 'Nintendo Switch 2: Full Hardware Breakdown After Launch',
    excerpt: 'The Switch 2 is here, and Digital Foundry has torn it apart. The custom NVIDIA Tegra T239 chip delivers 4K docked performance at up to 120fps, 12GB LPDDR5X RAM, and a 1080p 120Hz OLED handheld display. GameChat is impressively low-latency. This is a generational leap.',
    category: 'companies',
    source: 'Digital Foundry',
    sourceUrl: 'https://www.eurogamer.net/digital-foundry',
    coverUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-04-20',
    tags: ['Nintendo', 'Switch 2', 'Hardware', 'NVIDIA'],
    featured: false,
    bookmarked: false,
    readingTimeMin: 11,
  },
  {
    id: 'a7',
    title: 'Microsoft\'s Xbox Strategy: Game Pass, AI, and the Long Game',
    excerpt: 'With 40 million Game Pass subscribers and Activision Blizzard fully integrated, Microsoft is playing a fundamentally different game than Sony. Phil Spencer talks candidly about AI-generated NPCs, cloud gaming latency breakthroughs, and why they\'re not rushing a new console.',
    category: 'companies',
    source: 'Ars Technica',
    sourceUrl: 'https://arstechnica.com',
    coverUrl: 'https://images.unsplash.com/photo-1593640408182-31c228f286f9?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-03-05',
    tags: ['Microsoft', 'Xbox', 'Game Pass', 'Activision'],
    featured: false,
    bookmarked: false,
    readingTimeMin: 10,
  },
  {
    id: 'a8',
    title: 'Sony PlayStation 6: Architecture Leak Points to 2027 Launch',
    excerpt: 'A credible industry source has detailed the PS6\'s APU — a custom AMD RDNA 5 GPU paired with a Zen 5 CPU, targeting 24 TFLOPS of compute performance. Sony\'s answer to DLSS, codenamed PSSR 2.0, reportedly uses a dedicated ML core baked directly onto the die.',
    category: 'companies',
    source: 'The Verge',
    sourceUrl: 'https://www.theverge.com',
    coverUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-02-18',
    tags: ['Sony', 'PlayStation 6', 'AMD', 'Leak'],
    featured: false,
    bookmarked: false,
    readingTimeMin: 7,
  },
  {
    id: 'a9',
    title: 'Valve Hits 40 Million Steam Concurrent Users — PC Gaming Isn\'t Dead',
    excerpt: 'Steam just broke its own concurrent user record again, driven by the Steam Deck userbase, a resurgent indie scene, and the ongoing collapse of exclusivity deals. Valve\'s anti-capitalist-by-accident strategy of just making good products continues to pay off handsomely.',
    category: 'companies',
    source: 'PC Gamer',
    sourceUrl: 'https://www.pcgamer.com',
    coverUrl: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-01-12',
    tags: ['Valve', 'Steam', 'PC Gaming', 'Steam Deck'],
    featured: false,
    bookmarked: false,
    readingTimeMin: 5,
  },
  {
    id: 'a10',
    title: 'Xbox Handheld Officially Confirmed — Holiday 2025 Target',
    excerpt: 'Microsoft has officially confirmed a handheld Xbox device targeting Holiday 2025. Running full Windows 12 Gaming Mode with Xbox UI shell, it will support the entire Game Pass library natively. Specs point to AMD\'s Z2 Extreme APU — a direct rival to the Steam Deck OLED.',
    category: 'companies',
    source: 'IGN',
    sourceUrl: 'https://www.ign.com',
    coverUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-04-01',
    tags: ['Xbox', 'Microsoft', 'Handheld', 'Portable'],
    featured: false,
    bookmarked: true,
    readingTimeMin: 6,
  },
  {
    id: 'a11',
    title: 'NVIDIA RTX 5090 Review: 4K 240fps Is Now a Real Thing',
    excerpt: 'The RTX 5090 is a monster — and at $1,999 it should be. DLSS 4 with multi-frame generation delivers unbelievable frame rates in titles like Cyberpunk 2077 Phantom Liberty and Alan Wake 2. The 32GB GDDR7 frame buffer future-proofs it for the next 5 years easily.',
    category: 'hardware',
    source: "Tom's Hardware",
    sourceUrl: 'https://www.tomshardware.com',
    coverUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-04-10',
    tags: ['NVIDIA', 'GPU', 'RTX 5090', 'DLSS 4'],
    featured: false,
    bookmarked: false,
    readingTimeMin: 14,
  },
  {
    id: 'a12',
    title: 'AMD RX 9070 XT: The Best GPU Under $600 in Years',
    excerpt: 'AMD finally has a genuine answer to NVIDIA\'s mid-range dominance. The RX 9070 XT trades blows with the RTX 4080 at half the price, FSR 4 dramatically closes the quality gap with DLSS, and the open-source ecosystem means broader driver support than ever before.',
    category: 'hardware',
    source: 'AnandTech',
    sourceUrl: 'https://www.anandtech.com',
    coverUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-03-15',
    tags: ['AMD', 'GPU', 'RX 9070 XT', 'FSR 4'],
    featured: false,
    bookmarked: false,
    readingTimeMin: 12,
  },
  {
    id: 'a13',
    title: 'Steam Deck 2 Leak: OLED 120Hz, Ryzen Z2 Extreme, 3nm Process',
    excerpt: 'Valve\'s follow-up to the Steam Deck OLED is reportedly entering mass production. An 8-inch 1080p OLED panel at 120Hz, AMD\'s Ryzen Z2 Extreme APU, and a 60Whr battery suggest significant performance and battery life improvements. A late 2025 reveal seems plausible.',
    category: 'hardware',
    source: 'The Verge',
    sourceUrl: 'https://www.theverge.com',
    coverUrl: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-02-28',
    tags: ['Valve', 'Steam Deck 2', 'Handheld', 'AMD'],
    featured: false,
    bookmarked: true,
    readingTimeMin: 8,
  },
  {
    id: 'a14',
    title: 'PS5 Pro Six Months Later: Who Is It Really For?',
    excerpt: 'Sony\'s PlayStation 5 Pro has been out long enough for a proper verdict. PSSR upscaling is genuinely impressive in supported titles, hitting 4K/60fps where the base PS5 struggled. But at $699 with no disc drive, the target audience is narrower than Sony would like to admit.',
    category: 'hardware',
    source: 'Digital Foundry',
    sourceUrl: 'https://www.eurogamer.net/digital-foundry',
    coverUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-01-22',
    tags: ['Sony', 'PS5 Pro', 'PSSR', 'Console'],
    featured: false,
    bookmarked: false,
    readingTimeMin: 10,
  },
  {
    id: 'a15',
    title: 'Intel Arc B580: The Budget GPU That Changed the Game',
    excerpt: 'Nobody expected Intel\'s Arc B580 to be this good. At $249, it outperforms the RX 7600 and RTX 4060 in rasterization, XeSS 2 rivals DLSS in supported titles, and the driver stability that plagued early Arc cards is finally a thing of the past. Intel is back in the GPU race.',
    category: 'hardware',
    source: 'PC Gamer',
    sourceUrl: 'https://www.pcgamer.com',
    coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=450',
    publishedAt: '2025-01-05',
    tags: ['Intel', 'Arc', 'GPU', 'Budget'],
    featured: false,
    bookmarked: false,
    readingTimeMin: 9,
  },
];
