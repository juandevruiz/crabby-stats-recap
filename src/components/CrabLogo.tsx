import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
};

export const CrabLogo = ({ className, size = 32 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crabGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(187 85% 53%)" />
          <stop offset="100%" stopColor="hsl(351 95% 71%)" />
        </linearGradient>
      </defs>
      {/* body */}
      <ellipse cx="32" cy="38" rx="20" ry="14" fill="url(#crabGrad)" />
      {/* eyes stalks */}
      <line x1="26" y1="26" x2="24" y2="16" stroke="url(#crabGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="26" x2="40" y2="16" stroke="url(#crabGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="14" r="3" fill="hsl(45 96% 76%)" />
      <circle cx="40" cy="14" r="3" fill="hsl(45 96% 76%)" />
      <circle cx="24" cy="14" r="1.2" fill="hsl(222 47% 4%)" />
      <circle cx="40" cy="14" r="1.2" fill="hsl(222 47% 4%)" />
      {/* claws */}
      <circle cx="10" cy="34" r="6" fill="url(#crabGrad)" />
      <circle cx="54" cy="34" r="6" fill="url(#crabGrad)" />
      <path d="M6 31 L10 34 L6 37 Z" fill="hsl(222 47% 4%)" opacity="0.3" />
      <path d="M58 31 L54 34 L58 37 Z" fill="hsl(222 47% 4%)" opacity="0.3" />
      {/* legs */}
      <line x1="14" y1="44" x2="8" y2="50" stroke="url(#crabGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="50" x2="16" y2="56" stroke="url(#crabGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="44" x2="56" y2="50" stroke="url(#crabGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="44" y1="50" x2="48" y2="56" stroke="url(#crabGrad)" strokeWidth="2.5" strokeLinecap="round" />
      {/* mouth/smile */}
      <path d="M28 42 Q32 45 36 42" stroke="hsl(222 47% 4%)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
};
