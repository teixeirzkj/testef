"use client";

import { AnimatePresence, motion } from "motion/react";
import { Lock, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroContent, offerContent } from "@/config/content";
import { offerConfig } from "@/config/offer";
import { useUnlock } from "@/components/providers/UnlockProvider";
import { Logo } from "@/components/brand/Logo";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";
import { HeroBackground } from "./HeroBackground";
import { VideoPlayer, type PlayerFrame } from "./VideoPlayer";
import { ProgressBar, type ProgressBarHandle } from "./ProgressBar";
import { OfferReveal } from "./OfferReveal";

const ease = [0.22, 1, 0.36, 1] as const;
const UNLOCK_AT = offerConfig.unlock.unlockTimeSeconds;

export function Hero() {
  const { unlocked, restored, unlock } = useUnlock();
  const barRef = useRef<ProgressBarHandle>(null);
  const [playing, setPlaying] = useState(false);
  const [sweep, setSweep] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const [markerRatio, setMarkerRatio] = useState<number | null>(null);
  const firedRef = useRef(false);
  const warnedRef = useRef(false);

  /** Dispara a liberação UMA vez; o vídeo segue tocando normalmente. */
  // Referência estável (não depende de `unlocked`) para não re-registrar os eventos do vídeo.
  const doUnlock = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    setSweep(true);
    setJustUnlocked(true);
    unlock();
  }, [unlock]);

  // Visitante que já liberou nesta sessão: não repete a animação.
  useEffect(() => {
    if (unlocked) firedRef.current = true;
  }, [unlocked]);

  const onFrame = useCallback(
    ({ current, duration }: PlayerFrame) => {
      if (duration <= 0) return;
      barRef.current?.set(current / duration);

      const ratio = Math.min(1, UNLOCK_AT / duration);
      setMarkerRatio((prev) => (prev === ratio ? prev : ratio));

      if (duration < UNLOCK_AT && !warnedRef.current) {
        warnedRef.current = true;
        console.warn(
          `[Fonte Prime] O vídeo tem ${Math.round(duration)}s, menos que unlockTimeSeconds (${UNLOCK_AT}s). A página será liberada ao final do vídeo.`,
        );
      }
      if (current >= UNLOCK_AT) doUnlock();
    },
    [doUnlock],
  );

  return (
    <section id="conteudo" className="relative isolate overflow-hidden pb-16 sm:pb-24">
      <HeroBackground />

      <div className="container-page relative flex flex-col items-center">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex w-full items-center justify-center py-6 sm:py-8"
        >
          <Logo size={38} />
        </motion.header>

        <div className="mt-2 flex max-w-4xl flex-col items-center gap-5 text-center sm:mt-6 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <Eyebrow>{heroContent.eyebrow}</Eyebrow>
          </motion.div>
          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.2}
            text={heroContent.title}
            highlight={heroContent.highlightWords}
            className="font-display text-[clamp(2rem,6.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-balance"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
            className="max-w-2xl text-[0.98rem] leading-relaxed text-sage text-pretty sm:text-lg"
          >
            {heroContent.subtitle}
          </motion.p>
        </div>

        {/* Player + barra */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.6 }}
          className="relative mt-9 w-full max-w-[920px] sm:mt-12"
        >
          <div
            aria-hidden
            className={`absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgb(25_245_165/0.28),transparent_70%)] blur-2xl transition-opacity duration-1000 sm:-inset-10 ${
              playing ? "opacity-100" : "opacity-70"
            }`}
          />
          <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-b from-mint/40 via-white/10 to-mint/10 p-px shadow-[0_40px_120px_-40px_rgb(25_245_165/0.45)] sm:rounded-[24px]">
            <VideoPlayer onFrame={onFrame} onEnded={doUnlock} onPlayingChange={setPlaying} />

            {/* Linha luminosa que percorre o container do vídeo na liberação */}
            <AnimatePresence>
              {sweep && (
                <motion.div
                  key="video-sweep"
                  aria-hidden
                  initial={{ x: "-40%", opacity: 0 }}
                  animate={{ x: "340%", opacity: [0, 0.9, 0.9, 0] }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[30%] -skew-x-12 bg-gradient-to-r from-transparent via-mint/35 to-transparent mix-blend-screen"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="relative mt-5 px-1">
            <ProgressBar ref={barRef} unlocked={unlocked} playing={playing} markerRatio={markerRatio} />

            <AnimatePresence>
              {sweep && (
                <motion.div
                  key="bar-sweep"
                  aria-hidden
                  initial={{ left: "-30%", opacity: 0 }}
                  animate={{ left: "110%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                  onAnimationComplete={() => setSweep(false)}
                  className="absolute -top-[2px] h-[9px] w-[30%] rounded-full bg-gradient-to-r from-transparent via-lime to-transparent blur-[2px]"
                />
              )}
            </AnimatePresence>

            <div className="mt-7 flex min-h-6 flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
              <AnimatePresence mode="wait" initial={false}>
                {justUnlocked ? (
                  <motion.p
                    key="unlocked-msg"
                    role="status"
                    initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease, delay: 0.5 }}
                    className="inline-flex items-center gap-2 text-sm font-medium text-mint"
                  >
                    <Sparkles className="size-4" aria-hidden />
                    {heroContent.unlockedMessage}
                  </motion.p>
                ) : (
                  <motion.p key="progress-msg" exit={{ opacity: 0, y: -6 }} className="text-sm text-sage">
                    {heroContent.progressMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              {!unlocked && (
                <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-sage/80">
                    <Lock className="size-3.5 text-mint" aria-hidden />
                    {heroContent.lockedHint}
                  </span>
                  {offerConfig.unlock.allowSkip && (
                    <button
                      type="button"
                      onClick={doUnlock}
                      className="rounded px-1 text-xs font-medium text-mint/80 underline decoration-mint/30 underline-offset-4 transition hover:text-mint hover:decoration-mint"
                    >
                      {offerContent.skip}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>{unlocked && <OfferReveal quick={restored} />}</AnimatePresence>
      </div>
    </section>
  );
}
