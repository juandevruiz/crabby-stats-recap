import { Link, useParams } from "react-router-dom";
import {
  getUser,
  getUserGames,
  voiceChannels,
  topTracks,
  topArtists,
  recapPhrases,
} from "@/lib/mockData";
import {
  Trophy, Mic, MicOff, Video, Cast, Clock, Crown, Music2, Gamepad2, Sparkles,
  ArrowLeft, Share2, Download, Headphones, Calendar, MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

const UserProfile = () => {
  const { id = "kai-claw" } = useParams();
  const user = getUser(id);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display font-bold text-4xl mb-4">Caranguejo não encontrado 🦀</h1>
        <p className="text-muted-foreground mb-8">Esse usuário ainda não existe no boardwalk.</p>
        <Link to="/search" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold">
          Voltar para a busca
        </Link>
      </div>
    );
  }

  const games = getUserGames(user.id);
  const top = games[0];
  const totalGameHrs = games.reduce((s, g) => s + g.hours, 0);

  const muted = 12;
  const camera = 68;
  const stream = 34;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link to="/search" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-4" /> Voltar
        </Link>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold hover:border-primary/40 transition-colors">
            <Share2 className="size-4" /> Compartilhar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-sand text-sand-foreground text-sm font-semibold hover:scale-[1.02] transition-transform">
            <Download className="size-4" /> Postcard
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-gradient-surface border border-border p-10 lg:p-12 shadow-elevated">
          <div className="absolute -right-32 -bottom-32 size-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-32 -top-32 size-96 bg-secondary/10 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em]">
              <Sparkles className="size-3" /> Annual Recap · 2024
            </span>

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-gradient-cyan blur-2xl opacity-50 animate-pulse-glow rounded-3xl" />
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="relative size-32 rounded-3xl object-cover ring-4 ring-card"
                />
                <span className="absolute -bottom-2 -right-2 size-10 rounded-2xl bg-sand text-sand-foreground font-display font-bold text-sm flex items-center justify-center ring-4 ring-card">
                  #{user.rank}
                </span>
              </div>

              <div className="flex-1">
                <h1 className="font-display font-bold text-4xl lg:text-6xl tracking-tighter leading-none">
                  {user.displayName}
                </h1>
                <p className="text-muted-foreground mt-2">@{user.username}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Pill icon={<Crown className="size-3" />} label={user.badge} />
                  <Pill icon={<Calendar className="size-3" />} label={`${user.joinedDays} dias ativo`} />
                  <Pill icon={<MapPin className="size-3" />} label={user.region} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60">
              <HeroStat label="Total em jogo" value={`${user.totalGameHours.toLocaleString()}h`} accent="primary" />
              <HeroStat label="Em call" value={`${user.totalVoiceHours.toLocaleString()}h`} accent="secondary" />
              <HeroStat label="Top game" value={user.topGame} accent="sand" small />
            </div>
          </div>
        </div>

        {/* Level / XP card */}
        <div className="lg:col-span-4 rounded-3xl bg-sand text-sand-foreground p-8 flex flex-col justify-between shadow-soft">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold opacity-70">High Score</p>
            <h3 className="font-display font-bold text-4xl mt-2 leading-none">Level {user.level}</h3>
            <p className="text-sm mt-3 opacity-80">21% mais voice time que o caranguejo médio do servidor 🦀</p>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
              <span>{user.xp.toLocaleString()} XP</span>
              <span>10.000</span>
            </div>
            <div className="h-3 bg-sand-foreground/15 rounded-full p-0.5">
              <div
                className="h-full bg-sand-foreground rounded-full transition-all"
                style={{ width: `${(user.xp / 10000) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recap phrases */}
      <section className="rounded-3xl bg-card border border-border p-8 shadow-soft">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="size-5 text-sand" />
          <h2 className="font-display text-xl font-bold uppercase tracking-wider">Frases do seu Recap</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recapPhrases.slice(0, 3).map((p, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl p-6 border relative overflow-hidden",
                i === 0 && "bg-gradient-cyan border-transparent text-primary-foreground",
                i === 1 && "bg-surface-elevated border-border",
                i === 2 && "bg-gradient-coral border-transparent text-secondary-foreground"
              )}
            >
              <p className="font-display font-bold text-lg leading-snug relative z-10">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GAME RECAP */}
      <section className="rounded-3xl bg-card border border-border overflow-hidden shadow-soft">
        <div className="p-8 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Gamepad2 className="size-6" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-bold">01 — Game Recap</p>
              <h2 className="font-display text-3xl font-bold">Os jogos da sua temporada</h2>
            </div>
          </div>
          <p className="hidden md:block text-sm text-muted-foreground">{totalGameHrs}h totais · {games.length} títulos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8">
          {/* Top game spotlight */}
          <div className="lg:col-span-5 relative rounded-3xl bg-gradient-ocean border border-border overflow-hidden p-6 group">
            <img
              src={top.cover}
              alt={top.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
            <div className="relative z-10 flex flex-col h-full justify-end pt-32">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">#1 favorito</span>
              <h3 className="font-display font-bold text-4xl mt-2">{top.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{top.category} · {top.sessions} sessões</p>
              <p className="font-display font-bold text-6xl text-gradient-cyan mt-4 tabular-nums">{top.hours}h</p>
              <p className="text-xs text-muted-foreground mt-2">Top 0.5% global · seu santuário das madrugadas</p>
            </div>
          </div>

          {/* Game list */}
          <div className="lg:col-span-7 space-y-3">
            {games.slice(1).map((g, i) => {
              const pct = (g.hours / top.hours) * 100;
              return (
                <div key={g.id} className="flex items-center gap-4 p-4 rounded-2xl bg-surface/50 border border-border/50 hover:border-primary/30 transition-colors">
                  <span className="font-display font-bold text-muted-foreground w-8 text-center">#{i + 2}</span>
                  <img src={g.cover} alt={g.name} loading="lazy" className="size-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{g.name}</p>
                    <p className="text-xs text-muted-foreground">{g.category} · {g.sessions} sessões</p>
                    <div className="h-1.5 bg-background rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-cyan rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <p className="font-display font-bold text-lg tabular-nums shrink-0">{g.hours}h</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart */}
        <div className="px-8 pb-8">
          <div className="rounded-2xl bg-surface/50 border border-border/50 p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">Horas por jogo</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={games}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--surface-elevated))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                    }}
                    cursor={{ fill: "hsl(var(--primary) / 0.1)" }}
                  />
                  <Bar dataKey="hours" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* VOICE RECAP */}
      <section className="rounded-3xl bg-card border border-border p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-8">
          <span className="size-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
            <Mic className="size-6" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-secondary font-bold">02 — Voice Recap</p>
            <h2 className="font-display text-3xl font-bold">Suas conversas no fundo do mar</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            <RingStat icon={<MicOff className="size-5" />} label="Tempo mutado" value={muted} note="Você é dos que quase nunca mutam" accent="secondary" />
            <RingStat icon={<Video className="size-5" />} label="Câmera ligada" value={camera} note="Visual pro do servidor" accent="primary" />
            <RingStat icon={<Cast className="size-5" />} label="Tempo em stream" value={stream} note="42 watch parties hosted" accent="sand" />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl bg-gradient-ocean border border-border p-6">
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">Canal favorito</p>
              <h3 className="font-display font-bold text-3xl">{voiceChannels[0].name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{voiceChannels[0].hours}h de pura zoeira na call</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {voiceChannels.map((c, i) => {
                const pct = (c.hours / voiceChannels[0].hours) * 100;
                return (
                  <div key={c.id} className="flex items-center gap-4 p-3 rounded-2xl bg-surface/50 border border-border/50">
                    <span className="size-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center font-display font-bold text-sm">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate text-sm">{c.name}</p>
                      <div className="h-1.5 bg-background rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-gradient-coral rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <p className="font-display font-bold tabular-nums shrink-0">{c.hours}h</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SPOTIFY RECAP */}
      <section className="rounded-3xl bg-card border border-border p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-8">
          <span className="size-12 rounded-2xl bg-sand/15 text-sand flex items-center justify-center">
            <Music2 className="size-6" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-sand font-bold">03 — Spotify Recap</p>
            <h2 className="font-display text-3xl font-bold">A trilha sonora da sua maré</h2>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Headphones className="size-4" />
            {Math.floor(user.totalSpotifyMinutes / 60).toLocaleString()}h ouvidas
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top tracks */}
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Top músicas</p>
            {topTracks.map((t, i) => (
              <div key={t.id} className="group flex items-center gap-4 p-3 rounded-2xl bg-surface/50 border border-border/50 hover:border-sand/40 transition-colors">
                <span className="font-display font-bold text-2xl text-muted-foreground w-8 text-center group-hover:text-sand transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <img src={t.cover} alt={t.title} loading="lazy" className="size-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{t.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.artist}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display font-bold tabular-nums">{t.plays}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">plays</p>
                </div>
              </div>
            ))}
          </div>

          {/* Top artists */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Artistas favoritos</p>
            <div className="rounded-3xl bg-gradient-ocean border border-border p-6 flex items-center gap-5">
              <img src={topArtists[0].cover} alt={topArtists[0].name} loading="lazy" className="size-20 rounded-2xl object-cover ring-2 ring-sand/40" />
              <div>
                <p className="text-xs uppercase tracking-widest text-sand font-bold">#1 artista</p>
                <h3 className="font-display font-bold text-2xl mt-1">{topArtists[0].name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{topArtists[0].minutes.toLocaleString()} min</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {topArtists.slice(1).map((a, i) => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-2xl bg-surface/50 border border-border/50">
                  <span className="font-display font-bold text-muted-foreground w-6 text-center text-sm">#{i + 2}</span>
                  <img src={a.cover} alt={a.name} loading="lazy" className="size-11 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate text-sm">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.minutes.toLocaleString()} min</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-card border border-border p-5 mt-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Audio Aura</p>
              <div className="flex gap-2 items-end h-20">
                {[80, 60, 100, 70, 40, 90, 55].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-coral rounded-full transition-all"
                    style={{ height: `${h}%`, opacity: 0.5 + (h / 200) }}
                  />
                ))}
              </div>
              <p className="font-display italic text-sm mt-3 text-sand">"Profundo, rítmico, sereno"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer banner */}
      <section className="rounded-3xl bg-gradient-hero p-10 text-center text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-background/40" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <Trophy className="size-12 mx-auto text-foreground" />
          <h3 className="font-display font-bold text-3xl text-foreground">Esse foi o seu ano no boardwalk 🦀</h3>
          <p className="text-foreground/80">Compartilha esse recap e mostra pro servidor inteiro quem manda na maré.</p>
          <div className="flex gap-3 justify-center pt-2">
            <button className="px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:scale-105 transition-transform">
              Compartilhar Recap
            </button>
            <Link to="/" className="px-6 py-3 rounded-full glass text-foreground font-semibold text-sm">
              Ver dashboard geral
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const Pill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-medium">
    {icon}
    {label}
  </span>
);

const HeroStat = ({
  label, value, accent, small,
}: { label: string; value: string; accent: "primary" | "secondary" | "sand"; small?: boolean }) => {
  const map = { primary: "text-primary", secondary: "text-secondary", sand: "text-sand" };
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">{label}</p>
      <p className={cn("font-display font-bold tabular-nums", map[accent], small ? "text-lg truncate" : "text-3xl")}>{value}</p>
    </div>
  );
};

const RingStat = ({
  icon, label, value, note, accent,
}: { icon: React.ReactNode; label: string; value: number; note: string; accent: "primary" | "secondary" | "sand" }) => {
  const colorMap = {
    primary: "stroke-primary",
    secondary: "stroke-secondary",
    sand: "stroke-sand",
  };
  const textMap = { primary: "text-primary", secondary: "text-secondary", sand: "text-sand" };
  const radius = 32;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-surface/50 border border-border/50">
      <div className="relative size-20 shrink-0">
        <svg className="size-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} stroke="hsl(var(--border))" strokeWidth="6" fill="none" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className={cn(colorMap[accent], "transition-all duration-700")}
          />
        </svg>
        <div className={cn("absolute inset-0 flex items-center justify-center font-display font-bold text-lg", textMap[accent])}>
          {value}%
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className={cn("flex items-center gap-2 mb-1", textMap[accent])}>
          {icon}
          <p className="text-xs uppercase tracking-widest font-bold">{label}</p>
        </div>
        <p className="text-sm text-muted-foreground">{note}</p>
      </div>
    </div>
  );
};

export default UserProfile;
