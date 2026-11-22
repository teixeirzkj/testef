"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { offerConfig } from "@/config/offer";

const STORAGE_KEY = "fp-unlocked-v2";

type UnlockState = {
  /** Oferta + resto da página liberados. */
  unlocked: boolean;
  /** true quando foi restaurado do navegador (sem animação de revelação). */
  restored: boolean;
  unlock: () => void;
};

const UnlockContext = createContext<UnlockState | null>(null);

function getStore(): Storage | null {
  try {
    const mode = offerConfig.unlock.remember;
    if (mode === "session") return window.sessionStorage;
    if (mode === "always") return window.localStorage;
  } catch {
    /* storage bloqueado */
  }
  return null;
}

export function UnlockProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      if (getStore()?.getItem(STORAGE_KEY) === "1") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única do navegador após hidratação
        setRestored(true);
        setUnlocked(true);
      }
    } catch {
      /* segue bloqueado */
    }
  }, []);

  const unlock = useCallback(() => {
    setUnlocked(true);
    try {
      getStore()?.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ unlocked, restored, unlock }), [unlocked, restored, unlock]);
  return <UnlockContext.Provider value={value}>{children}</UnlockContext.Provider>;
}

export function useUnlock(): UnlockState {
  const ctx = useContext(UnlockContext);
  if (!ctx) throw new Error("useUnlock deve ser usado dentro de UnlockProvider");
  return ctx;
}
