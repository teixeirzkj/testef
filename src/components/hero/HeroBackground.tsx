"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/** Fundo do hero: aurora verde, grid técnico, partículas e linhas animadas com parallax. */
export function HeroBackground() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const yFar = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 120]);
  const yNear = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -80]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Aurora */}
      <motion.div style={{ y: yFar }} className="absolute inset-0">
        <div className="absolute left-1/2 top-[-18%] h-[70vh] w-[110vw] max-w-[1400px] -translate-x-1/2 animate-aurora rounded-full bg-[radial-gradient(closest-side,rgb(25_245_165/0.22),transparent)] blur-2xl" />
        <div className="absolute right-[-15%] top-[25%] h-[50vh] w-[55vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgb(197_255_88/0.08),transparent)] blur-2xl [animation-delay:-6s]" />
        <div className="absolute left-[-20%] top-[45%] h-[55vh] w-[60vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgb(6_80_90/0.45),transparent)] blur-2xl [animation-delay:-11s]" />
      </motion.div>

      <div className="tech-grid absolute inset-0" />
      <Particles />

      {/* Linhas decorativas */}
      <motion.svg
        style={{ y: yNear }}
        className="absolute inset-x-0 top-[8%] h-[70%] w-full opacity-60"
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="hb-line" x1="0" x2="1">
            <stop offset="0" stopColor="#19F5A5" stopOpacity="0" />
            <stop offset=".5" stopColor="#19F5A5" stopOpacity=".55" />
            <stop offset="1" stopColor="#C5FF58" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          "M-40 520 C 300 420, 520 640, 820 500 S 1300 380, 1500 460",
          "M-40 180 C 260 260, 560 80, 900 170 S 1280 260, 1500 140",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="url(#hb-line)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.6, delay: 0.4 + i * 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </motion.svg>

      <div className="noise absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-obsidian" />
    </div>
  );
}

/** Partículas leves em canvas; pausam fora da tela e são desligadas com reduced motion. */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isSmall = window.innerWidth < 768;
    const count = isSmall ? 22 : 48;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      vy: -(Math.random() * 0.18 + 0.04),
      vx: (Math.random() - 0.5) * 0.08,
      a: Math.random() * 0.5 + 0.15,
      lime: Math.random() < 0.18,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.lime ? `rgba(197,255,88,${p.a})` : `rgba(25,245,165,${p.a})`;
        ctx.fill();
      }
      if (visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
