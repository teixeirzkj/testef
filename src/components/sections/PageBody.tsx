"use client";

import dynamic from "next/dynamic";
import { useUnlock } from "@/components/providers/UnlockProvider";

// Code splitting: GSAP e as seções abaixo só são baixados após a liberação.
const UnlockedContent = dynamic(() => import("./UnlockedContent"), { ssr: false });

export function PageBody() {
  const { unlocked } = useUnlock();
  return unlocked ? <UnlockedContent /> : null;
}
