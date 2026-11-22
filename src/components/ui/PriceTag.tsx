"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { CalendarCheck, CircleCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { offerConfig } from "@/config/offer";
import { formatBRL, formatNumberBR } from "@/lib/format";

const tagIcons = [CircleCheck, CalendarCheck];

/** Preço único com contagem numérica + selos ("Pagamento único", "12 meses de acesso"). */
export function PriceTag({ size = "lg", className = "" }: { size?: "lg" | "xl"; className?: string }) {
  const { price, priceTags } = offerConfig;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? (price ?? 0) : 0);
  const text = useTransform(mv, (v) => formatNumberBR(v));

  useEffect(() => {
    if (!inView || reduce || price === null) return;
    const controls = animate(mv, price, { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 });
    return () => controls.stop();
  }, [inView, reduce, mv, price]);

  if (price === null) {
    return (
      <div ref={ref} className={`flex flex-col items-center gap-2 ${className}`}>
        <p className="font-display text-[clamp(1.4rem,5vw,2rem)] font-semibold text-mint">Condições no checkout</p>
      </div>
    );
  }

  const big = size === "xl" ? "text-[clamp(3.8rem,17vw,6.8rem)]" : "text-[clamp(3.4rem,15vw,5.6rem)]";

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <p className="sr-only">
        {formatBRL(price)}, {priceTags.join(", ")}
      </p>
      <div aria-hidden className="flex items-end gap-2 font-display leading-none sm:gap-3">
        <span className="mb-[0.42em] text-[clamp(1.2rem,4vw,1.8rem)] font-semibold text-mint">R$</span>
        <motion.span
          className={`${big} font-bold tracking-[-0.04em] text-mint [text-shadow:0_0_40px_rgb(25_245_165/0.45)] tabular-nums`}
        >
          {text}
        </motion.span>
      </div>
      <ul aria-hidden className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {priceTags.map((tag, i) => {
          const Icon = tagIcons[i % tagIcons.length];
          return (
            <li
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-mint/25 bg-mint/[0.07] px-3 py-1.5 text-xs font-medium text-ice sm:text-sm"
            >
              <Icon className="size-3.5 text-mint sm:size-4" />
              {tag}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
