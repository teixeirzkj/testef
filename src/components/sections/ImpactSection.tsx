"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BarChart3, Cpu, Link2, Store, Database } from "lucide-react";
import { impactContent } from "@/config/content";
import { LogoMark } from "@/components/brand/Logo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const chipIcons = [Link2, Store, Database, Cpu, BarChart3];
const chipPos = [
  "left-[-6%] top-[12%]",
  "right-[-10%] top-[22%]",
  "left-[-12%] bottom-[30%]",
  "right-[-4%] bottom-[16%]",
  "left-[18%] bottom-[-4%]",
];

/**
 * Cena de impacto: smartphone estilizado (genérico, sem marca) que gira
 * conforme o scroll. No desktop a cena fica fixada por um trecho curto.
 */
export function ImpactSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: desktop ? "top top" : "top 80%",
              end: desktop ? "+=70%" : "bottom 40%",
              scrub: 0.8,
              pin: desktop ? (root.current?.querySelector<HTMLElement>(".impact-pin") ?? false) : false,
            },
          });
          tl.fromTo(".impact-phone", { rotateY: -28, rotateX: 10, y: 60 }, { rotateY: 14, rotateX: -4, y: -20, ease: "none" }, 0)
            .fromTo(".impact-word", { opacity: 0.15, y: 30 }, { opacity: 1, y: 0, stagger: 0.18, ease: "power2.out" }, 0)
            .fromTo(".impact-chip", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, ease: "power2.out" }, 0.1)
            .fromTo(".impact-glow", { scale: 0.7, opacity: 0.3 }, { scale: 1.15, opacity: 1, ease: "none" }, 0);
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Informação, acesso e oportunidade" className="relative">
      <div className="impact-pin relative flex min-h-[100svh] items-center overflow-hidden py-20 lg:py-0">
        <div aria-hidden className="impact-glow absolute right-[10%] top-1/2 size-[70vmin] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(25_245_165/0.22),transparent)]" />
        <div className="container-page relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-[clamp(2.6rem,9vw,6.2rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              {impactContent.words.map((w, i) => (
                <span
                  key={w}
                  className={`impact-word block ${i === impactContent.highlightIndex ? "text-gradient" : "text-ice"}`}
                >
                  {w}
                </span>
              ))}
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-sage sm:text-lg">{impactContent.text}</p>
          </div>

          <div className="order-1 flex justify-center lg:order-2" style={{ perspective: 1200 }}>
            <div className="relative">
              <Phone />
              {impactContent.chips.map((chip, i) => {
                const Icon = chipIcons[i % chipIcons.length];
                return (
                  <div
                    key={chip}
                    className={`impact-chip glass absolute ${chipPos[i]} flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-ice sm:px-4 sm:text-sm`}
                  >
                    <span className="animate-float flex items-center gap-2" style={{ animationDelay: `${i * -1.3}s` }}>
                      <Icon className="size-4 text-mint" aria-hidden />
                      {chip}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Smartphone genérico em CSS — sem logotipos de terceiros. */
function Phone() {
  return (
    <div
      className="impact-phone relative h-[min(64vh,540px)] w-[min(31vh,262px)] rounded-[44px] bg-gradient-to-br from-[#2b4a4a] via-[#132526] to-[#0a1517] p-[10px] shadow-[0_60px_120px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(145_170_165/0.25),inset_0_0_0_1px_rgb(255_255_255/0.06)]"
      style={{ transformStyle: "preserve-3d" }}
      aria-hidden
    >
      <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-[radial-gradient(120%_80%_at_50%_0%,#0f3d36,#081316_70%)]">
        <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="tech-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
          <LogoMark size={64} />
          <div className="font-display text-sm font-semibold tracking-[0.2em] text-ice">FONTE PRIME</div>
          <div className="w-full space-y-2.5">
            {[78, 56, 88].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-white/[0.06]">
                <div className="h-full rounded-full bg-gradient-to-r from-mint to-lime" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-full bg-mint px-5 py-2 font-display text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-obsidian">
            Acesso liberado
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.1]" />
      </div>
    </div>
  );
}
