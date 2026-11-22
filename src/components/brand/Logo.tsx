import { useId } from "react";

type Tone = "dark" | "light";

/**
 * Monograma FP: a haste e o braço superior são compartilhados pelo F e pelo P.
 * O bojo do P "abre" num nó de conexão e o braço do F termina em outro nó,
 * sugerindo acesso / rede.
 */
export function LogoMark({
  size = 40,
  tone = "dark",
  className,
  title,
}: {
  size?: number;
  tone?: Tone;
  className?: string;
  title?: string;
}) {
  const id = useId().replace(/:/g, "");
  const tile = tone === "dark" ? "#0E2024" : "#081316";
  const stroke = tone === "dark" ? `url(#fp-g-${id})` : "#19F5A5";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`fp-g-${id}`} x1="10" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#19F5A5" />
          <stop offset="1" stopColor="#C5FF58" />
        </linearGradient>
        <linearGradient id={`fp-b-${id}`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#19F5A5" stopOpacity=".55" />
          <stop offset=".5" stopColor="#19F5A5" stopOpacity=".08" />
          <stop offset="1" stopColor="#C5FF58" stopOpacity=".4" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="13" fill={tile} />
      <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" stroke={`url(#fp-b-${id})`} />
      <path
        d="M15 37V15.5a4.5 4.5 0 0 1 4.5-4.5H28a8 8 0 0 1 0 16h-5"
        stroke={stroke}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 20h5.5" stroke={stroke} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="22" cy="27" r="2.6" fill="#C5FF58" />
      <circle cx="15" cy="37" r="2.6" fill="#19F5A5" />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  size = 36,
  className = "",
  showText = true,
}: {
  tone?: Tone;
  size?: number;
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} tone={tone} />
      {showText && (
        <span
          className={`font-display text-[1.05rem] font-semibold leading-none tracking-[0.18em] ${
            tone === "dark" ? "text-ice" : "text-obsidian"
          }`}
        >
          FONTE<span className="text-mint">·</span>PRIME
        </span>
      )}
      <span className="sr-only">Fonte Prime</span>
    </span>
  );
}
