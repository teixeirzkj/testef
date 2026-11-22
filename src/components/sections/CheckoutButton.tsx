"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/providers/ToastProvider";
import { getCheckoutUrl } from "@/lib/checkout";
import { enrollContent } from "@/config/content";

/**
 * Leva ao checkout oficial da PagueZy (offerConfig.checkoutUrl).
 * Nenhum dado de pagamento é coletado nesta página.
 */
export function CheckoutButton({ label = enrollContent.cta }: { label?: string }) {
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const url = getCheckoutUrl();

  // Se o visitante voltar pelo histórico (bfcache), libera o botão de novo.
  useEffect(() => {
    const onShow = () => setLoading(false);
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  if (!url) {
    return (
      <Button onClick={() => show(enrollContent.checkoutUnavailable)} className="w-full">
        {label}
      </Button>
    );
  }

  return (
    <Button href={url} onClick={() => setLoading(true)} loading={loading} className="w-full">
      {label}
    </Button>
  );
}
