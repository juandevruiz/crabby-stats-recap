import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, MapPin, ArrowRight, Flame } from "lucide-react";
import { users } from "@/lib/mockData";

const Search = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return users;
    return users.filter(
      (u) => u.displayName.toLowerCase().includes(s) || u.username.toLowerCase().includes(s) || u.region.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10 animate-fade-in">
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-[0.2em]">
          <Flame className="size-3" /> Encontre um caranguejo
        </span>
        <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tighter">
          Quem está no <span className="text-gradient-cyan">boardwalk</span>?
        </h1>
        <p className="text-muted-foreground text-lg">
          Pesquise por nome, username ou região para abrir o recap de qualquer membro.
        </p>
      </header>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-gradient-cyan blur-2xl opacity-20 rounded-full" />
        <div className="relative flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-4 focus-within:border-primary focus-within:shadow-neon-cyan transition-all">
          <SearchIcon className="size-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar @username, nome ou região…"
            className="flex-1 bg-transparent outline-hidden text-base placeholder:text-muted-foreground"
          />
          {q && (
            <button onClick={() => setQ("")} className="text-xs uppercase tracking-widest font-bold text-muted-foreground hover:text-foreground">
              limpar
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"} no servidor
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((u) => (
          <Link
            key={u.id}
            to={`/user/${u.id}`}
            className="group relative rounded-3xl bg-card border border-border p-6 overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all"
          >
            <div className="absolute -right-12 -top-12 size-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/15 transition-colors" />
            <div className="relative flex items-start gap-4">
              <div className="relative shrink-0">
                <img src={u.avatar} alt={u.displayName} loading="lazy" className="size-16 rounded-2xl object-cover ring-2 ring-border group-hover:ring-primary/50 transition-all" />
                <span className="absolute -bottom-1 -right-1 size-7 rounded-xl bg-sand text-sand-foreground font-display font-bold text-xs flex items-center justify-center ring-2 ring-card">
                  #{u.rank}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-lg truncate">{u.displayName}</p>
                <p className="text-xs text-muted-foreground truncate">@{u.username}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                  <MapPin className="size-3" /> {u.region}
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-border">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Jogo</p>
                <p className="font-display font-bold text-sm text-primary tabular-nums">{u.totalGameHours}h</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Voz</p>
                <p className="font-display font-bold text-sm text-secondary tabular-nums">{u.totalVoiceHours}h</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Lvl</p>
                <p className="font-display font-bold text-sm text-sand tabular-nums">{u.level}</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between mt-5">
              <span className="text-xs px-3 py-1 rounded-full bg-surface-elevated text-muted-foreground font-medium">{u.badge}</span>
              <span className="flex items-center gap-1 text-xs font-bold text-primary uppercase tracking-widest">
                Recap <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">Nenhum caranguejo encontrado 🦀</p>
          <p className="text-sm mt-2">Tente outro nome ou região.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
