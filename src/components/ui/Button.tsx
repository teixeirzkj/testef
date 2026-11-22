"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Variant = "primary" | "ghost";

type Props = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  variant?: Variant;
  size?: "md" | "lg";
  loading?: boolean;
  icon?: boolean;
  className?: string;
  magnetic?: boolean;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex select-none items-center justify-center gap-3 overflow-hidden rounded-full font-display font-semibold uppercase tracking-[0.08em] transition-[box-shadow,background-color,color] duration-300 ease-[var(--ease-premium)] disabled:cursor-wait";

const variants: Record<Variant, string> = {
  primary:
    "bg-mint text-obsidian shadow-[0_0_0_1px_rgb(25_245_165/0.4),0_12px_40px_-10px_rgb(25_245_165/0.7)] hover:shadow-[0_0_0_1px_rgb(197_255_88/0.7),0_16px_60px_-8px_rgb(25_245_165/0.9)] hover:bg-[#3dffb8]",
  ghost:
    "border border-sage/25 bg-white/[0.03] text-ice hover:border-mint/60 hover:text-mint",
};

const sizes = {
  md: "min-h-12 px-6 text-[0.8rem]",
  lg: "min-h-14 px-7 text-[0.85rem] sm:min-h-16 sm:px-9 sm:text-[0.95rem]",
};

export function Button({
  children,
  onClick,
  href,
  variant = "primary",
  size = "lg",
  loading = false,
  icon = true,
  className = "",
  magnetic = true,
  ariaLabel,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!magnetic || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      )}
      <span className="relative">{children}</span>
      {loading ? (
        <Loader2 className="relative size-5 animate-spin" aria-hidden />
      ) : (
        icon && (
          <ArrowRight
            className="relative size-5 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:translate-x-1"
            aria-hidden
          />
        )
      )}
    </>
  );

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-flex w-full sm:w-auto"
    >
      {href ? (
        <motion.a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          whileTap={{ scale: 0.97 }}
          className={`${cls} w-full sm:w-auto`}
        >
          {inner}
        </motion.a>
      ) : (
        <motion.button
          type="button"
          onClick={onClick}
          disabled={loading}
          aria-busy={loading}
          aria-label={ariaLabel}
          whileTap={{ scale: 0.97 }}
          className={`${cls} w-full sm:w-auto`}
        >
          {inner}
        </motion.button>
      )}
    </motion.div>
  );
}
