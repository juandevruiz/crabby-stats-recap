import { Link, NavLink, useLocation } from "react-router-dom";
import { CrabLogo } from "./CrabLogo";
import { Search, Trophy, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/search", label: "Buscar", icon: Search },
  { to: "/user/kai-claw", label: "Meu Recap", icon: Trophy },
];

export const Navbar = () => {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-cyan blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="relative size-12 rounded-2xl bg-gradient-to-br from-surface-elevated to-surface flex items-center justify-center ring-1 ring-primary/20">
              <CrabLogo size={28} />
            </div>
          </div>
          <div className="leading-tight">
            <h1 className="font-display font-bold text-lg tracking-tight uppercase">
              Crab<span className="text-secondary">Recap</span>
            </h1>
            <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-semibold">
              Season 04 · The Migration
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 glass rounded-full p-1.5">
          {links.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to.split("/")[1] ? `/${to.split("/")[1]}` : to);
            return (
              <NavLink
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-neon-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                )}
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end leading-tight">
            <span className="text-sm font-semibold text-sand">Beach Master</span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Verified Crab 🦀</span>
          </div>
          <div className="size-11 rounded-full ring-2 ring-secondary/50 p-0.5 hover:ring-secondary transition-all">
            <img
              src="https://i.pravatar.cc/100?img=64"
              alt="Profile"
              className="size-full rounded-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
