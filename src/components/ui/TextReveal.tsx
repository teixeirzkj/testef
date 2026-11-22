"use client";

import { motion } from "motion/react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  highlight?: readonly string[];
  /** "mount": anima ao montar; "view": anima ao entrar na tela. */
  trigger?: "mount" | "view";
  delay?: number;
};

/** Título que surge palavra por palavra (fade + blur + movimento vertical). */
export function TextReveal({
  text,
  as = "h2",
  className,
  highlight = [],
  trigger = "view",
  delay = 0,
}: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  const animateProps =
    trigger === "mount"
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag
      className={className}
      initial="hidden"
      {...animateProps}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(word) ? "text-gradient" : ""}`}
            variants={{
              hidden: { opacity: 0, y: "70%", filter: "blur(10px)" },
              visible: {
                opacity: 1,
                y: "0%",
                filter: "blur(0px)",
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
