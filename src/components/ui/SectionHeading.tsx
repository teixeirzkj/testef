import { TextReveal } from "./TextReveal";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/[0.06] px-3.5 py-1.5 font-display text-[0.68rem] font-medium uppercase tracking-[0.22em] text-mint sm:text-[0.72rem] ${className}`}
    >
      <span className="size-1.5 rounded-full bg-mint shadow-[0_0_10px_2px_rgb(25_245_165/0.7)]" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  align = "center",
  id,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string[];
  align?: "center" | "left";
  id?: string;
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignCls}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <div id={id}>
        <TextReveal
          text={title}
          highlight={highlight}
          className="font-display text-[clamp(1.9rem,5.2vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ice text-balance"
        />
      </div>
    </div>
  );
}

export function PendingBadge({ pending }: { pending?: boolean }) {
  if (!pending || process.env.NODE_ENV === "production") return null;
  return (
    <span className="ml-2 inline-flex rounded-full border border-lime/40 bg-lime/10 px-2 py-0.5 align-middle font-sans text-[0.6rem] font-semibold uppercase tracking-wider text-lime">
      A confirmar
    </span>
  );
}
