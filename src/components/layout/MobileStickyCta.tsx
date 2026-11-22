"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { stickyCtaLabel } from "@/config/content";
import { offerConfig } from "@/config/offer";
import { formatBRL } from "@/lib/format";

/**
 * CTA fixo no celular. Aparece depois que o visitante passa pelo bloco de
 * oferta e some quando a seção de inscrição ou o rodapé estão visíveis
 * (para não cobrir o botão principal nem os links).
 */
export function MobileStickyCta() {
  const [pastOffer, setPastOffer] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const offer = document.getElementById("oferta");
    const enroll = document.getElementById("inscricao");
    const footer = document.getElementById("rodape");
    const blockers = new Map<Element, boolean>();

    const offerIo = new IntersectionObserver(([e]) => {
      // passou da oferta = ela saiu da tela por cima
      setPastOffer(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    const blockIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => blockers.set(e.target, e.isIntersecting));
      setBlocked([...blockers.values()].some(Boolean));
    });

    if (offer) offerIo.observe(offer);
    [enroll, footer].forEach((el) => el && blockIo.observe(el));
    return () => {
      offerIo.disconnect();
      blockIo.disconnect();
    };
  }, []);

  const visible = pastOffer && !blocked;
  const { price } = offerConfig;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-mint/20 bg-obsidian/85 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg md:hidden"
        >
          <a
            href="#inscricao"
            className="flex min-h-14 w-full items-center justify-between gap-3 rounded-full bg-mint pl-6 pr-2 font-display text-sm font-semibold uppercase tracking-[0.08em] text-obsidian shadow-[0_8px_30px_-6px_rgb(25_245_165/0.7)] active:scale-[0.98]"
          >
            <span>{stickyCtaLabel}</span>
            <span className="flex items-center gap-2 rounded-full bg-obsidian px-4 py-2.5 text-xs normal-case tracking-normal text-mint">
              {price !== null && formatBRL(price)}
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
