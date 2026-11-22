"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { faqContent } from "@/config/content";
import { SectionHeading, PendingBadge } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section aria-labelledby="faq-title" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="faq-title" eyebrow={faqContent.eyebrow} title={faqContent.title} />
        <Stagger as="ul" className="mx-auto mt-12 flex max-w-3xl flex-col gap-3 sm:mt-14" stagger={0.06}>
          {faqContent.items.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q-${i}`;
            const panelId = `${baseId}-a-${i}`;
            return (
              <StaggerItem as="li" key={item.q}>
                <div
                  className={`rounded-2xl border transition-colors duration-500 ${
                    isOpen ? "border-mint/35 bg-carbon/70" : "border-sage/15 bg-carbon/30 hover:border-sage/30"
                  }`}
                >
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-display text-base font-medium text-ice sm:px-7 sm:text-lg"
                    >
                      <span>
                        {item.q}
                        <PendingBadge pending={item.pending} />
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className={`grid size-8 shrink-0 place-items-center rounded-full border ${
                          isOpen ? "border-mint bg-mint text-obsidian" : "border-sage/30 text-mint"
                        }`}
                      >
                        <Plus className="size-4" aria-hidden />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 text-[0.95rem] leading-relaxed text-sage sm:px-7">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
