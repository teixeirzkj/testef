/**
 * ============================================================
 *  CONFIGURAÇÃO COMERCIAL — edite aqui preço, vídeo e checkout
 * ============================================================
 *
 *  ⚠ O preço deve ser EXATAMENTE o mesmo configurado no checkout
 *  da PagueZy. Se `price` for null, nenhum valor é exibido.
 */

export type RememberUnlock =
  /** Mantém liberado enquanto a aba/sessão estiver aberta. */
  | "session"
  /** Mantém liberado mesmo se o visitante voltar outro dia. */
  | "always"
  /** Sempre exige assistir até o ponto de liberação. */
  | "none";

/** Link oficial do checkout PagueZy (usado se a variável de ambiente não estiver definida). */
const DEFAULT_CHECKOUT_URL =
  "https://paguezy.com/checkout-v2/c?link_id=9faeeba8-f72c-46f8-aae1-9c1cc3ad6666&product_id=eee8ac22-639f-4467-b410-8811376e257e&company_id=732ddea3-440a-4a8f-b3c9-ca888c6e2bdb";

export const offerConfig = {
  brandName: "Fonte Prime",
  productName: "Fonte Prime — Grupo VIP de Promoções",
  shortProductName: "Grupo VIP de Promoções",

  /* ---------- Preço ---------- */
  /** Pagamento único, em reais. */
  price: 67.0 as number | null,
  /** Selos exibidos junto ao preço. */
  priceTags: ["Pagamento único", "12 meses de acesso"],
  accessMonths: 12,
  platform: "Telegram",

  /* ---------- Checkout (PagueZy) ----------
   * Para trocar o link, defina NEXT_PUBLIC_CHECKOUT_URL no .env.local
   * e nas variáveis de ambiente da Vercel. Sem a variável, usa o link oficial acima.
   */
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || DEFAULT_CHECKOUT_URL,
  checkoutProvider: "PagueZy",

  /* ---------- Vídeo ---------- */
  videoPath: "/videos/fonte-prime-editado.mp4",
  videoPoster: "/images/video-poster.webp",

  /* ---------- Liberação da página ----------
   * A oferta e as seções comerciais ficam recolhidas até o vídeo atingir
   * `unlockTimeSeconds` (tempo do arquivo EDITADO). Se o vídeo for mais
   * curto que isso, a liberação acontece ao terminar.
   */
  unlock: {
    unlockTimeSeconds: 350, // 05:50
    /** Link acessível "Ver a oferta sem assistir ao vídeo". */
    allowSkip: true,
    remember: "session" as RememberUnlock,
    /**
     * Se o arquivo de vídeo não existir, roda uma linha do tempo
     * simulada com esta duração (segundos) para testar o fluxo.
     */
    demoDurationSeconds: 20,
  },
} as const;

export type OfferConfig = typeof offerConfig;
