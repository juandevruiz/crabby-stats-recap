import { activityFeed, gameDistribution, serverStats, users } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { Trophy, Flame, Mic, Headphones, TrendingUp, Crown, Activity, Gamepad2, Music2, Sparkles } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

const Home = () => {
  const podium = users.slice(0, 3);
  const rest = users.slice(3, 8);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 animate-fade-in">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-gradient-surface border border-border p-10 lg:p-14 shadow-elevated">
          <div className="absolute -right-32 -bottom-32 size-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-32 -top-32 size-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em]">
              <Sparkles className="size-3" /> Server Recap · 2024
            </span>
            <h1 className="font-display font-bold text-5xl lg:text-7xl tracking-tighter leading-[0.95]">
              <span className="text-foreground">A maré</span>
              <br />
              <span className="text-gradient-hero">virou em 2024.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              {serverStats.totalMembers.toLocaleString()} caranguejos jogaram, conversaram e ouviram música.
              Veja quem dominou o boardwalk esta temporada.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                to="/user/kai-claw"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-neon-cyan transition-all hover:scale-[1.02]"
              >
                Ver Recap em destaque
              </Link>
              <Link
                to="/search"
                className="px-6 py-3 rounded-full glass text-foreground font-semibold text-sm hover:border-primary/40 transition-all"
              >
                Buscar usuário
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
          <StatTile
            icon={<Gamepad2 className="size-5" />}
            label="Horas em jogo"
            value={serverStats.totalGameHours.toLocaleString()}
            accent="cyan"
          />
          <StatTile
            icon={<Mic className="size-5" />}
            label="Horas em call"
            value={serverStats.totalVoiceHours.toLocaleString()}
            accent="coral"
          />
        </div>
      </section>

      {/* Server highlight strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <HighlightCard
          icon={<Crown className="size-5" />}
          label="Jogo mais jogado"
          value={serverStats.topServerGame}
          sub={`${serverStats.topServerGameHours.toLocaleString()}h totais`}
        />
        <HighlightCard
          icon={<Flame className="size-5" />}
          label="Crescimento semanal"
          value={`+${serverStats.weeklyGrowth}%`}
          sub="vs semana passada"
          accent="coral"
        />
        <HighlightCard
          icon={<Headphones className="size-5" />}
          label="Top artista"
          value="The Crustaceans"
          sub="4.820 min ouvidos"
          accent="sand"
        />
        <HighlightCard
          icon={<Activity className="size-5" />}
          label="Caranguejos online"
          value="284"
          sub="agora mesmo"
        />
      </section>

      {/* Podium + chart */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-3xl bg-card border border-border p-8 shadow-soft">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                <Trophy className="size-6 text-sand" /> Pódio do servidor
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Top caranguejos por tempo total combinado</p>
            </div>
            <Link to="/search" className="text-xs text-primary font-semibold uppercase tracking-widest hover:underline">
              Ver todos →
            </Link>
          </div>

          {/* Podium */}
          <div className="grid grid-cols-3 gap-4 mb-8 items-end">
            {[podium[1], podium[0], podium[2]].map((u, i) => {
              const place = i === 1 ? 1 : i === 0 ? 2 : 3;
              const heights = ["h-32", "h-44", "h-24"];
              const colors = ["from-muted to-muted/40", "from-primary to-ocean", "from-secondary to-secondary/40"];
              return (
                <Link key={u.id} to={`/user/${u.id}`} className="flex flex-col items-center group">
                  <img
                    src={u.avatar}
                    alt={u.displayName}
                    loading="lazy"
                    className={cn(
                      "size-20 rounded-2xl object-cover ring-2 mb-3 transition-transform group-hover:-translate-y-1",
                      place === 1 ? "ring-primary shadow-neon-cyan" : place === 2 ? "ring-muted-foreground/40" : "ring-secondary/60"
                    )}
                  />
                  <p className="font-semibold text-sm text-center truncate w-full">{u.displayName}</p>
                  <p className="text-xs text-muted-foreground mb-2">{u.totalGameHours + u.totalVoiceHours}h</p>
                  <div
                    className={cn(
                      "w-full rounded-t-2xl bg-gradient-to-b flex items-start justify-center pt-3 font-display font-bold text-3xl text-background",
                      heights[i],
                      colors[i]
                    )}
                  >
                    {place}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Rest of leaderboard */}
          <div className="space-y-2">
            {rest.map((u) => (
              <Link
                key={u.id}
                to={`/user/${u.id}`}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-elevated transition-colors group"
              >
                <span className="font-display font-bold text-muted-foreground w-8 text-center">#{u.rank}</span>
                <img src={u.avatar} alt={u.displayName} loading="lazy" className="size-11 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{u.displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.badge} · {u.region}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold tabular-nums">{u.totalGameHours}h</p>
                  <p className="text-xs text-muted-foreground">jogo</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold tabular-nums text-secondary">{u.totalVoiceHours}h</p>
                  <p className="text-xs text-muted-foreground">voz</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl bg-card border border-border p-8 shadow-soft flex flex-col">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="size-6 text-primary" /> Mix de jogos
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Distribuição de horas no servidor</p>
          </div>
          <div className="flex-1 min-h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gameDistribution}
                  dataKey="hours"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  stroke="hsl(var(--background))"
                  strokeWidth={3}
                >
                  {gameDistribution.map((g, i) => (
                    <Cell key={i} fill={g.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--surface-elevated))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 gap-2 mt-4">
            {gameDistribution.map((g) => (
              <div key={g.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="size-3 rounded-full shrink-0" style={{ background: g.color }} />
                  <span className="truncate">{g.name}</span>
                </div>
                <span className="font-display font-bold tabular-nums text-muted-foreground">{g.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity feed */}
      <section className="rounded-3xl bg-card border border-border p-8 shadow-soft">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Activity className="size-6 text-secondary" /> Atividade ao vivo
            </h2>
            <p className="text-sm text-muted-foreground mt-1">O que está rolando no boardwalk agora</p>
          </div>
          <span className="flex items-center gap-2 text-xs text-secondary font-bold uppercase tracking-widest">
            <span className="size-2 rounded-full bg-secondary animate-pulse" /> Live
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activityFeed.map((e) => (
            <ActivityRow key={e.id} event={e} />
          ))}
        </div>
      </section>
    </div>
  );
};

const StatTile = ({
  icon,
  label,
  value,
  accent = "cyan",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: "cyan" | "coral" | "sand";
}) => {
  const map = {
    cyan: "text-primary border-primary/30 shadow-neon-cyan",
    coral: "text-secondary border-secondary/30 shadow-neon-coral",
    sand: "text-sand border-sand/30",
  };
  return (
    <div className={cn("rounded-3xl bg-card border p-6 flex flex-col gap-3 transition-all hover:-translate-y-1", map[accent])}>
      <div className="flex items-center justify-between">
        <span className={cn("size-10 rounded-xl bg-background/40 flex items-center justify-center")}>{icon}</span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">2024</span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">{label}</p>
        <p className="font-display font-bold text-3xl tabular-nums text-foreground">{value}</p>
      </div>
    </div>
  );
};

const HighlightCard = ({
  icon,
  label,
  value,
  sub,
  accent = "primary",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent?: "primary" | "coral" | "sand";
}) => {
  const accentMap = {
    primary: "text-primary",
    coral: "text-secondary",
    sand: "text-sand",
  };
  return (
    <div className="rounded-2xl bg-card border border-border p-5 hover:border-primary/40 transition-colors">
      <div className={cn("flex items-center gap-2 mb-3", accentMap[accent])}>
        {icon}
        <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
      </div>
      <p className="font-display font-bold text-xl truncate">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  );
};

const ActivityRow = ({ event }: { event: typeof activityFeed[number] }) => {
  const iconMap = {
    game: <Gamepad2 className="size-4 text-primary" />,
    voice: <Mic className="size-4 text-secondary" />,
    spotify: <Music2 className="size-4 text-sand" />,
    achievement: <Trophy className="size-4 text-sand" />,
  };
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface/50 hover:bg-surface-elevated transition-colors border border-border/50">
      <img src={event.avatar} alt={event.user} loading="lazy" className="size-10 rounded-xl object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-semibold">{event.user}</span>{" "}
          <span className="text-muted-foreground">{event.text}</span>{" "}
          <span className="font-medium">{event.detail}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{event.timeAgo}</p>
      </div>
      <span className="size-8 rounded-lg bg-background flex items-center justify-center shrink-0">
        {iconMap[event.type]}
      </span>
    </div>
  );
};

export default Home;
