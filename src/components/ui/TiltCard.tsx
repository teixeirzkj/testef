"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode, type PointerEvent } from "react";

/**
 * Card com borda luminosa seguindo o cursor e inclinação 3D sutil (apenas
 * dispositivos com mouse). No toque, ativa a borda como feedback visual.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 6,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (e.pointerType !== "mouse" || reduce) return;
    ry.set((px - 0.5) * maxTilt * 2);
    rx.set(-(py - 0.5) * maxTilt * 2);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    setActive(false);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={(e) => e.pointerType !== "mouse" && setActive(true)}
      onPointerUp={() => setActive(false)}
      onPointerCancel={() => setActive(false)}
      data-active={active}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`spotlight-border glass rounded-3xl transition-transform duration-300 data-[active=true]:scale-[0.985] ${className}`}
    >
      {children}
    </motion.div>
  );
}
