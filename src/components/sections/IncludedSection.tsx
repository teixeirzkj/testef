"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { BookOpen, KeyRound, LineChart, SearchCheck, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { includedContent, type IncludedIcon } from "@/config/content";
import { SectionHeading, PendingBadge } from "@/components/ui/SectionHeading";

const icons: Record<IncludedIcon, LucideIcon> = {
  key: KeyRound,
  search: SearchCheck,
  chart: LineChart,
  book: BookOpen,
};

/**
 * Cards empilhados: no desktop cada card fica "sticky" e o anterior encolhe
 * levemente (efeito stack). No celular vira uma coluna simples.
 */
export function IncludedSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const items = includedContent.items;

  return (
    <section aria-labelledby="included-title" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="included-title"
          eyebrow={includedContent.eyebrow}
          title={includedContent.title}
          highlight={["direta."]}
        />
        <div ref={ref} className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
          <ul className="flex flex-col gap-4 lg:gap-0">
            {items.map((item, i) => (
              <StackCard
                key={item.title}
                index={i}
                total={items.length}
                progress={scrollYProgress}
                Icon={icons[item.icon]}
                title={item.title}
                text={item.text}
                pending={item.pending}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StackCard({
  index,
  total,
  progress,
  Icon,
  title,
  text,
  pending,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  Icon: LucideIcon;
  title: string;
  text: string;
  pending?: boolean;
}) {
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.04]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index === total - 1 ? 0 : 0.35]);

  return (
    <li className="lg:sticky lg:h-[52vh] lg:pt-0" style={{ top: `calc(14vh + ${index * 28}px)` }}>
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ scale }}
        className="spotlight-border relative origin-top overflow-hidden rounded-3xl border border-sage/15 bg-gradient-to-br from-carbon to-[#0d1d1f] p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] sm:p-9"
      >
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-obsidian" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <div className="relative grid size-14 shrink-0 place-items-center rounded-2xl border border-mint/30 bg-mint/10 sm:size-16">
            <Icon className="size-7 text-mint" aria-hidden />
            <span className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-obsidian font-display text-[0.65rem] font-semibold text-lime ring-1 ring-lime/40">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-ice sm:text-2xl">
              {title}
              <PendingBadge pending={pending} />
            </h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-sage sm:text-base">{text}</p>
          </div>
        </div>
      </motion.div>
    </li>
  );
}
