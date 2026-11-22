"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WhySection } from "./WhySection";
import { ImpactSection } from "./ImpactSection";
import { IncludedSection } from "./IncludedSection";
import { TrustSection } from "./TrustSection";
import { EnrollSection } from "./EnrollSection";
import { FaqSection } from "./FaqSection";
import { ProofGallery } from "./ProofGallery";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";

/** Tudo que só aparece depois que o vídeo libera a página (carregado sob demanda). */
export default function UnlockedContent() {
  useEffect(() => {
    // Recalcula posições das cenas GSAP depois que a altura da oferta se estabiliza.
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
    >
      <WhySection />
      <ImpactSection />
      <IncludedSection />
      <TrustSection />
      {/* Adicione aqui provas reais e autorizadas quando existirem: */}
      <ProofGallery items={[]} />
      <EnrollSection />
      <FaqSection />
      <MobileStickyCta />
    </motion.div>
  );
}
