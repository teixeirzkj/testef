"use client";

import { motion } from "motion/react";
import { disclaimer, offerContent } from "@/config/content";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { Eyebrow } from "@/components/ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

/** Primeiro bloco de oferta, revelado ao fim do vídeo. */
export function OfferReveal({ quick }: { quick: boolean }) {
  const d = quick ? 0 : 0.55; // atraso para a linha luminosa atravessar primeiro

  const goToEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      id="oferta"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: quick ? 0.3 : 0.8, ease }}
      className="w-full overflow-hidden"
    >
      <div className="pt-8 sm:pt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease, delay: d }}
          className="spotlight-border glass relative mx-auto max-w-[640px] overflow-hidden rounded-[28px] px-5 py-9 text-center sm:px-12 sm:py-12"
          data-active="true"
        >
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-mint/20 blur-3xl" />
          <div className="relative flex flex-col items-center gap-5">
            <Eyebrow>{offerContent.eyebrow}</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 16, filter: "blur(10px)", scale: 0.97 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.9, ease, delay: d + 0.15 }}
              className="font-display text-[clamp(1.7rem,5.5vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-balance"
            >
              {offerContent.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: d + 0.3 }}
              className="max-w-md text-[0.95rem] leading-relaxed text-sage sm:text-base"
            >
              {offerContent.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: d + 0.4 }}
              className="my-2"
            >
              <PriceTag />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: d + 0.75 }}
              className="w-full sm:w-auto"
            >
              <Button href="#inscricao" onClick={goToEnroll}>
                {offerContent.cta}
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: d + 0.95 }}
              className="max-w-sm text-xs leading-relaxed text-sage/80"
            >
              {disclaimer}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
