"use client";

import { AnimatePresence, motion } from "motion/react";
import { Maximize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { offerConfig } from "@/config/offer";
import { formatTime } from "@/lib/format";
import { LogoMark } from "@/components/brand/Logo";

type Status = "idle" | "playing" | "paused" | "ended";

export type PlayerFrame = { current: number; duration: number };

type Props = {
  /** Chamado a cada frame enquanto toca, e em cada mudança de tempo. */
  onFrame: (frame: PlayerFrame) => void;
  onEnded: () => void;
  onPlayingChange?: (playing: boolean) => void;
};

const RESUME_KEY = "fp-video-pos-v1";

/**
 * Player MP4 personalizado, sem barra de busca (formato VSL).
 * Se o arquivo de vídeo não existir, entra em "modo demonstração" com uma
 * linha do tempo simulada para que o fluxo possa ser testado.
 */
export function VideoPlayer({ onFrame, onEnded, onPlayingChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const demoTimeRef = useRef(0);
  const lastTickRef = useRef(0);
  const resumeDoneRef = useRef(false);

  const [status, setStatus] = useState<Status>("idle");
  const [muted, setMuted] = useState(false);
  const [demo, setDemo] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [time, setTime] = useState({ current: 0, duration: 0 });

  const demoDuration = offerConfig.unlock.demoDurationSeconds;

  /* ---------- leitura do tempo atual ---------- */
  const readFrame = useCallback((): PlayerFrame => {
    if (demo) return { current: demoTimeRef.current, duration: demoDuration };
    const v = videoRef.current;
    return {
      current: v?.currentTime ?? 0,
      duration: v && Number.isFinite(v.duration) ? v.duration : 0,
    };
  }, [demo, demoDuration]);

  const emit = useCallback(() => {
    const f = readFrame();
    onFrame(f);
    setTime((prev) =>
      Math.floor(prev.current) !== Math.floor(f.current) || prev.duration !== f.duration ? f : prev,
    );
    return f;
  }, [onFrame, readFrame]);

  /* ---------- loop de animação enquanto toca ---------- */
  useEffect(() => {
    if (status !== "playing") return;
    lastTickRef.current = performance.now();
    let lastSave = 0;
    const tick = (now: number) => {
      if (demo) {
        demoTimeRef.current = Math.min(
          demoDuration,
          demoTimeRef.current + (now - lastTickRef.current) / 1000,
        );
        lastTickRef.current = now;
        if (demoTimeRef.current >= demoDuration) {
          emit();
          setStatus("ended");
          onEnded();
          return;
        }
      }
      const f = emit();
      if (!demo && now - lastSave > 4000) {
        lastSave = now;
        try {
          window.localStorage.setItem(RESUME_KEY, String(f.current));
        } catch {
          /* ignore */
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [status, demo, demoDuration, emit, onEnded]);

  useEffect(() => {
    onPlayingChange?.(status === "playing");
  }, [status, onPlayingChange]);

  /* ---------- eventos do <video> ---------- */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || demo) return;
    const onMeta = () => {
      // Retoma a posição salva UMA única vez por carregamento da página.
      // (Este efeito pode rodar de novo, por exemplo na liberação da oferta, e
      // não pode fazer o vídeo voltar no tempo.)
      if (!resumeDoneRef.current) {
        resumeDoneRef.current = true;
        try {
          const saved = Number(window.localStorage.getItem(RESUME_KEY));
          if (saved > 1 && saved < v.duration - 2 && v.currentTime < 1) v.currentTime = saved;
        } catch {
          /* ignore */
        }
      }
      emit();
    };
    const onPause = () => {
      if (!v.ended) setStatus((s) => (s === "idle" ? s : "paused"));
      emit();
    };
    const onPlay = () => setStatus("playing");
    const onEnd = () => {
      emit();
      setStatus("ended");
      try {
        window.localStorage.removeItem(RESUME_KEY);
      } catch {
        /* ignore */
      }
      onEnded();
    };
    const onSeeked = () => emit();
    const onError = () => {
      setDemo(true);
      setTime({ current: 0, duration: demoDuration });
    };

    // O vídeo pode ter carregado (ou falhado) antes da hidratação.
    if (v.error) onError();
    else if (v.readyState >= 1) onMeta();
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("pause", onPause);
    v.addEventListener("play", onPlay);
    v.addEventListener("ended", onEnd);
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("error", onError);
    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("error", onError);
    };
  }, [demo, demoDuration, emit, onEnded]);

  /* ---------- ações ---------- */
  const play = useCallback(async () => {
    if (demo) {
      if (status === "ended") demoTimeRef.current = 0;
      setStatus("playing");
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    if (status === "ended") v.currentTime = 0;
    try {
      await v.play();
    } catch {
      // Navegador bloqueou com som: tenta sem som.
      v.muted = true;
      setMuted(true);
      try {
        await v.play();
      } catch {
        /* ignore */
      }
    }
  }, [demo, status]);

  const pause = useCallback(() => {
    if (demo) {
      setStatus("paused");
      emit();
      return;
    }
    videoRef.current?.pause();
  }, [demo, emit]);

  const toggle = useCallback(() => {
    if (status === "playing") pause();
    else void play();
  }, [status, play, pause]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    const next = !muted;
    if (v) v.muted = next;
    setMuted(next);
  }, [muted]);

  const fullscreen = useCallback(() => {
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    const c = containerRef.current;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (c?.requestFullscreen) {
      void c.requestFullscreen().catch(() => v?.webkitEnterFullscreen?.());
    } else {
      v?.webkitEnterFullscreen?.();
    }
  }, []);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const k = e.key.toLowerCase();
    if (k === " " || k === "k" || k === "enter") {
      e.preventDefault();
      toggle();
    } else if (k === "m") toggleMute();
    else if (k === "f") fullscreen();
  };

  const started = status !== "idle";
  const showOverlay = status !== "playing";

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Vídeo de apresentação Fonte Prime. Espaço para reproduzir ou pausar, M para som, F para tela cheia."
      onKeyDown={onKey}
      className="group/player relative aspect-video w-full overflow-hidden rounded-[18px] bg-obsidian-2 sm:rounded-[22px]"
    >
      {/* Vídeo real */}
      {!demo && (
        <video
          ref={videoRef}
          src={offerConfig.videoPath}
          playsInline
          preload="metadata"
          muted={muted}
          onClick={toggle}
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}

      {/* Placeholder de demonstração */}
      {demo && <DemoScreen playing={status === "playing"} onClick={toggle} />}

      {/* Thumbnail cinematográfica antes do play */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="poster"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <PosterArt />
            {/* eslint-disable-next-line @next/next/no-img-element -- poster opcional; fica invisível se o arquivo não existir */}
            <img
              ref={(img) => {
                // imagem já carregada antes da hidratação
                if (img?.complete && img.naturalWidth > 0 && !posterLoaded) setPosterLoaded(true);
              }}
              src={offerConfig.videoPoster}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${posterLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setPosterLoaded(true)}
              decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão central */}
      <AnimatePresence>
        {showOverlay && (
          <motion.button
            key="center-btn"
            type="button"
            onClick={() => void play()}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-obsidian/30"
            aria-label={status === "ended" ? "Assistir novamente" : status === "paused" ? "Continuar vídeo" : "Reproduzir vídeo"}
          >
            <span className="relative grid size-16 place-items-center rounded-full bg-mint text-obsidian shadow-[0_0_0_10px_rgb(25_245_165/0.12),0_0_60px_8px_rgb(25_245_165/0.45)] transition-transform duration-300 group-hover/player:scale-105 sm:size-20">
              <span className="absolute inset-0 animate-ping rounded-full bg-mint/30 [animation-duration:2.4s]" aria-hidden />
              {status === "ended" ? (
                <RotateCcw className="relative size-7 sm:size-8" aria-hidden />
              ) : (
                <Play className="relative ml-1 size-7 fill-current sm:size-9" aria-hidden />
              )}
            </span>
            <span className="rounded-full bg-obsidian/70 px-4 py-1.5 font-display text-xs font-medium uppercase tracking-[0.2em] text-ice backdrop-blur-sm sm:text-sm">
              {status === "ended" ? "Assistir novamente" : status === "paused" ? "Continuar assistindo" : "Assista com som"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Barra de controles */}
      {started && (
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-1 bg-gradient-to-t from-obsidian/90 to-transparent px-2 pb-2 pt-8 opacity-100 transition-opacity duration-300 sm:gap-2 sm:px-3 sm:pb-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/player:opacity-100 [@media(hover:hover)]:group-focus-within/player:opacity-100">
          <ControlButton label={status === "playing" ? "Pausar" : "Reproduzir"} onClick={toggle}>
            {status === "playing" ? <Pause className="size-5" /> : <Play className="size-5" />}
          </ControlButton>
          <ControlButton label={muted ? "Ativar som" : "Silenciar"} onClick={toggleMute}>
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </ControlButton>
          <span className="ml-1 font-mono text-xs tabular-nums text-ice/85 sm:text-sm" aria-live="off">
            {formatTime(time.current)} <span className="text-sage">/ {formatTime(time.duration)}</span>
          </span>
          <span className="flex-1" />
          {demo && (
            <span className="mr-1 hidden rounded-full border border-lime/40 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-lime sm:inline">
              Demonstração
            </span>
          )}
          {!demo && (
            <ControlButton label="Tela cheia" onClick={fullscreen}>
              <Maximize className="size-5" />
            </ControlButton>
          )}
        </div>
      )}

      {/* Aviso de som desligado */}
      <AnimatePresence>
        {muted && status === "playing" && (
          <motion.button
            type="button"
            onClick={toggleMute}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-3 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-mint px-4 py-2 text-xs font-semibold text-obsidian shadow-lg"
          >
            <VolumeX className="size-4" aria-hidden /> Toque para ativar o som
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function ControlButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full text-ice transition hover:bg-white/10 hover:text-mint active:scale-95"
    >
      {children}
    </button>
  );
}

/** Arte de fundo usada como thumbnail quando não há poster. */
function PosterArt() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(120%_90%_at_70%_20%,#0f3a35_0%,#0a1f22_45%,#081316_100%)]">
      <div className="tech-grid absolute inset-0 opacity-60" />
      <div className="absolute -right-[10%] top-[10%] h-[80%] w-[45%] rounded-full bg-mint/20 blur-3xl" />
      <div className="absolute left-[8%] top-1/2 hidden -translate-y-1/2 sm:block">
        <LogoMark size={56} />
      </div>
      <div className="absolute bottom-[14%] left-[8%] hidden max-w-[50%] font-display text-[clamp(1rem,2.6vw,1.9rem)] font-semibold leading-tight text-ice/90 sm:block">
        O próximo passo <span className="text-gradient">começa na fonte.</span>
      </div>
    </div>
  );
}

/** Tela exibida quando /public/videos/fonte-prime-editado.mp4 ainda não existe. */
function DemoScreen({ playing, onClick }: { playing: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className="absolute inset-0 cursor-pointer">
      <PosterArt />
      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}>
        <div className="flex h-10 items-end gap-1" aria-hidden>
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-mint/80"
              style={{
                height: `${20 + ((i * 37) % 80)}%`,
                animation: playing ? `float ${0.6 + (i % 5) * 0.15}s ease-in-out infinite` : "none",
              }}
            />
          ))}
        </div>
        <p className="font-display text-sm font-medium text-ice sm:text-base">Vídeo de apresentação em breve</p>
        <p className="max-w-sm text-xs text-sage">
          Modo demonstração. Adicione o arquivo em <code className="text-mint">/public/videos/fonte-prime-editado.mp4</code>.
        </p>
      </div>
    </div>
  );
}
