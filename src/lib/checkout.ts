import { offerConfig } from "@/config/offer";

/**
 * Retorna a URL oficial do checkout (somente https) exatamente como
 * configurada — sem adicionar parâmetros — ou null se inválida.
 */
export function getCheckoutUrl(): string | null {
  const raw = offerConfig.checkoutUrl.trim();
  if (!raw) return null;
  try {
    return new URL(raw).protocol === "https:" ? raw : null;
  } catch {
    return null;
  }
}
