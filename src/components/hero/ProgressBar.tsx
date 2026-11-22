"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export type ProgressBarHandle = { set: (ratio: number) => void };

type Props = {
  /** Brilho intensificado após a liberação. */
  unlocked: boolean;
  playing: boolean;
  /** Posição (0–1) do marco de liberação na barra; null se ainda desconhecida. */
  markerRatio: number | null;
};

/**
 * Barra fina que reflete o progresso REAL do vídeo (currentTime / duration).
 * Atualizada direto no DOM (transform) para não re-renderizar a cada frame.
 */
export const ProgressBar = forwardRef<ProgressBarHandle, Props>(function ProgressBar(
  { unlocked, playing, markerRatio },
  ref,
) {
  const fillRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    set(ratio: number) {
      const r = Math.max(0, Math.min(1, ratio));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${r})`;
      if (tipRef.current) tipRef.current.style.left = `${r * 100}%`;
      trackRef.current?.setAttribute("aria-valuenow", String(Math.round(r * 100)));
    },
  }));

  return (
    <div
      ref={trackRef}
      role="progressbar"
      aria-label="Progresso do vídeo"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className={`relative h-[5px] w-full rounded-full bg-white/[0.07] transition-shadow duration-1000 ${
        unlocked ? "shadow-[0_0_26px_3px_rgb(25_245_165/0.5)]" : ""
      }`}
    >
      <div
        ref={fillRef}
        className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-mint/70 via-mint to-[#7dffcf] transition-transform duration-200 ease-linear"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Marco de liberação (05:50) */}
      {markerRatio !== null && markerRatio < 1 && (
        <div
          aria-hidden
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${markerRatio * 100}%` }}
        >
          <span
            className={`block h-3.5 w-[3px] rounded-full transition-colors duration-700 ${
              unlocked ? "bg-lime shadow-[0_0_12px_3px_rgb(197_255_88/0.7)]" : "bg-lime/70"
            }`}
          />
          <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-lime/80">
            {unlocked ? "Liberado" : "Oferta"}
          </span>
        </div>
      )}

      <div
        ref={tipRef}
        aria-hidden
        className={`absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b6ffe4] transition-[left,opacity] duration-200 ease-linear ${
          playing ? "opacity-100" : "opacity-60"
        } shadow-[0_0_12px_4px_rgb(25_245_165/0.8),0_0_28px_8px_rgb(25_245_165/0.35)]`}
        style={{ left: "0%" }}
      />
    </div>
  );
});
