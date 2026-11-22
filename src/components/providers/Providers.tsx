"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { UnlockProvider } from "./UnlockProvider";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <UnlockProvider>{children}</UnlockProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
