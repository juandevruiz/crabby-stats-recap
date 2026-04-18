// Mock data — purely visual. Replace with Supabase queries later.

export type User = {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  joinedDays: number;
  region: string;
  rank: number;
  totalGameHours: number;
  totalVoiceHours: number;
  totalSpotifyMinutes: number;
  topGame: string;
  level: number;
  xp: number;
  badge: string;
};

export type Game = {
  id: string;
  name: string;
  cover: string;
  hours: number;
  sessions: number;
  category: string;
};

export type VoiceChannel = {
  id: string;
  name: string;
  hours: number;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  plays: number;
};

export type Artist = {
  id: string;
  name: string;
  cover: string;
  minutes: number;
};

export type ActivityEvent = {
  id: string;
  user: string;
  avatar: string;
  type: "game" | "voice" | "spotify" | "achievement";
  text: string;
  detail: string;
  timeAgo: string;
};

export const users: User[] = [
  {
    id: "kai-claw",
    username: "saltycaptain",
    displayName: 'Kai "Claw" Sterling',
    avatar: "https://i.pravatar.cc/300?img=64",
    joinedDays: 942,
    region: "Oceania",
    rank: 1,
    totalGameHours: 1842,
    totalVoiceHours: 412,
    totalSpotifyMinutes: 24810,
    topGame: "Phantom Protocol",
    level: 84,
    xp: 8420,
    badge: "Lobby Legend",
  },
  {
    id: "marisol",
    username: "marisol",
    displayName: "Marisol Tide",
    avatar: "https://i.pravatar.cc/300?img=47",
    joinedDays: 712,
    region: "South America",
    rank: 2,
    totalGameHours: 1410,
    totalVoiceHours: 388,
    totalSpotifyMinutes: 19200,
    topGame: "Neon Drift Racing",
    level: 71,
    xp: 7102,
    badge: "Reef Mage",
  },
  {
    id: "drift",
    username: "driftwood",
    displayName: "Drift Wood",
    avatar: "https://i.pravatar.cc/300?img=12",
    joinedDays: 654,
    region: "EU West",
    rank: 3,
    totalGameHours: 1280,
    totalVoiceHours: 502,
    totalSpotifyMinutes: 15800,
    topGame: "Abyssal Arena",
    level: 68,
    xp: 6840,
    badge: "Voice Whale",
  },
  {
    id: "shellshock",
    username: "shellshock",
    displayName: "Shellshock",
    avatar: "https://i.pravatar.cc/300?img=33",
    joinedDays: 410,
    region: "NA East",
    rank: 4,
    totalGameHours: 980,
    totalVoiceHours: 220,
    totalSpotifyMinutes: 12400,
    topGame: "Tide-Pool Tactics",
    level: 54,
    xp: 5410,
    badge: "Hermit",
  },
  {
    id: "coralsurfer",
    username: "coralsurfer",
    displayName: "Coral Surfer",
    avatar: "https://i.pravatar.cc/300?img=22",
    joinedDays: 388,
    region: "Asia",
    rank: 5,
    totalGameHours: 870,
    totalVoiceHours: 190,
    totalSpotifyMinutes: 9800,
    topGame: "Phantom Protocol",
    level: 49,
    xp: 4920,
    badge: "Tide Rider",
  },
  {
    id: "barnacle",
    username: "barnacle",
    displayName: "Barnacle Boy",
    avatar: "https://i.pravatar.cc/300?img=15",
    joinedDays: 280,
    region: "EU Central",
    rank: 6,
    totalGameHours: 612,
    totalVoiceHours: 145,
    totalSpotifyMinutes: 7200,
    topGame: "Neon Drift Racing",
    level: 38,
    xp: 3812,
    badge: "Sand Digger",
  },
  {
    id: "pearl",
    username: "pearl",
    displayName: "Pearl Diver",
    avatar: "https://i.pravatar.cc/300?img=49",
    joinedDays: 220,
    region: "Oceania",
    rank: 7,
    totalGameHours: 540,
    totalVoiceHours: 88,
    totalSpotifyMinutes: 5600,
    topGame: "Abyssal Arena",
    level: 31,
    xp: 3122,
    badge: "Deep Diver",
  },
  {
    id: "kelpie",
    username: "kelpie",
    displayName: "Kelpie",
    avatar: "https://i.pravatar.cc/300?img=8",
    joinedDays: 190,
    region: "NA West",
    rank: 8,
    totalGameHours: 410,
    totalVoiceHours: 60,
    totalSpotifyMinutes: 4100,
    topGame: "Tide-Pool Tactics",
    level: 24,
    xp: 2412,
    badge: "Drifter",
  },
];

export const userGames: Record<string, Game[]> = {
  "kai-claw": [
    { id: "g1", name: "Phantom Protocol", cover: "https://picsum.photos/seed/phantom/400/500", hours: 682, sessions: 184, category: "Tactical" },
    { id: "g2", name: "Neon Drift Racing", cover: "https://picsum.photos/seed/neondrift/400/500", hours: 428, sessions: 96, category: "Racing" },
    { id: "g3", name: "Abyssal Arena", cover: "https://picsum.photos/seed/abyssal/400/500", hours: 312, sessions: 72, category: "Fighting" },
    { id: "g4", name: "Tide-Pool Tactics", cover: "https://picsum.photos/seed/tidepool/400/500", hours: 218, sessions: 54, category: "Strategy" },
    { id: "g5", name: "Coral Quest", cover: "https://picsum.photos/seed/coralq/400/500", hours: 142, sessions: 38, category: "RPG" },
    { id: "g6", name: "Crab Royale", cover: "https://picsum.photos/seed/crabroyale/400/500", hours: 60, sessions: 22, category: "Battle Royale" },
  ],
};

export const voiceChannels: VoiceChannel[] = [
  { id: "vc1", name: "Coral Reef Lounge", hours: 184 },
  { id: "vc2", name: "Kelp Forest", hours: 122 },
  { id: "vc3", name: "Sandbar Chill", hours: 68 },
  { id: "vc4", name: "Deep Trench AFK", hours: 38 },
];

export const topTracks: Track[] = [
  { id: "t1", title: "Neon Horizon", artist: "The Crustaceans", cover: "https://picsum.photos/seed/neonhz/200/200", plays: 312 },
  { id: "t2", title: "Salt Water Dreams", artist: "Lofi Crab Beats", cover: "https://picsum.photos/seed/saltwd/200/200", plays: 248 },
  { id: "t3", title: "Abyssal Frequency", artist: "Deep Dive", cover: "https://picsum.photos/seed/abyssfreq/200/200", plays: 198 },
  { id: "t4", title: "Tidal Wave Echo", artist: "Tidal Wave Echo", cover: "https://picsum.photos/seed/tidalwe/200/200", plays: 172 },
  { id: "t5", title: "Bioluminescent", artist: "Trench Trio", cover: "https://picsum.photos/seed/biolum/200/200", plays: 144 },
];

export const topArtists: Artist[] = [
  { id: "a1", name: "The Crustaceans", cover: "https://picsum.photos/seed/crustart/200/200", minutes: 4820 },
  { id: "a2", name: "Lofi Crab Beats", cover: "https://picsum.photos/seed/lofiart/200/200", minutes: 3910 },
  { id: "a3", name: "Tidal Wave Echo", cover: "https://picsum.photos/seed/tideart/200/200", minutes: 2840 },
  { id: "a4", name: "Trench Trio", cover: "https://picsum.photos/seed/trenchart/200/200", minutes: 2110 },
];

export const activityFeed: ActivityEvent[] = [
  { id: "e1", user: 'Kai "Claw" Sterling', avatar: "https://i.pravatar.cc/100?img=64", type: "achievement", text: "unlocked", detail: "Lobby Legend tier", timeAgo: "2 min ago" },
  { id: "e2", user: "Marisol Tide", avatar: "https://i.pravatar.cc/100?img=47", type: "game", text: "started playing", detail: "Neon Drift Racing", timeAgo: "12 min ago" },
  { id: "e3", user: "Drift Wood", avatar: "https://i.pravatar.cc/100?img=12", type: "voice", text: "joined", detail: "Coral Reef Lounge", timeAgo: "28 min ago" },
  { id: "e4", user: "Shellshock", avatar: "https://i.pravatar.cc/100?img=33", type: "spotify", text: "is listening to", detail: "Salt Water Dreams · The Crustaceans", timeAgo: "44 min ago" },
  { id: "e5", user: "Coral Surfer", avatar: "https://i.pravatar.cc/100?img=22", type: "game", text: "finished a session of", detail: "Phantom Protocol · 3h 12m", timeAgo: "1h ago" },
  { id: "e6", user: "Barnacle Boy", avatar: "https://i.pravatar.cc/100?img=15", type: "voice", text: "streamed in", detail: "Kelp Forest · 47 min", timeAgo: "2h ago" },
];

export const serverStats = {
  totalMembers: 1284,
  topServerGame: "Phantom Protocol",
  topServerGameHours: 18420,
  totalVoiceHours: 9420,
  totalGameHours: 48210,
  weeklyGrowth: 12.4,
};

export const gameDistribution = [
  { name: "Phantom Protocol", hours: 682, color: "hsl(187 85% 53%)" },
  { name: "Neon Drift", hours: 428, color: "hsl(351 95% 71%)" },
  { name: "Abyssal Arena", hours: 312, color: "hsl(45 96% 76%)" },
  { name: "Tide-Pool", hours: 218, color: "hsl(224 76% 51%)" },
  { name: "Coral Quest", hours: 142, color: "hsl(280 70% 65%)" },
];

export function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getUserGames(id: string): Game[] {
  return userGames[id] ?? userGames["kai-claw"];
}

export const recapPhrases = [
  "Você passou mais tempo em call do que 90% do servidor 🎙️",
  "Top 0.5% global em Phantom Protocol 🏆",
  "Mais músicas ouvidas que 3 servidores inteiros 🎧",
  "Suas noites começam às 23:42 — coruja confirmada 🌙",
  "21% mais voice time que o caranguejo médio 🦀",
];
