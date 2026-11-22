/**
 * Identidade, contato e informações institucionais.
 * Campos vazios ("") não aparecem no site.
 */
export const siteConfig = {
  name: "Fonte Prime",
  slogan: "O próximo passo começa na fonte.",
  title: "Fonte Prime | O próximo passo começa na fonte",
  description:
    "Grupo VIP de Promoções no Telegram com oportunidades do mercado de iPhones. Pagamento único, 12 meses de acesso.",
  /** URL final do site (ex.: https://fonteprime.com.br). Usada em SEO/Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fonteprime.vercel.app",
  locale: "pt_BR",

  /* ---------- Contato / suporte ---------- */
  supportEmail: "", // ex.: "suporte@fonteprime.com.br"
  supportWhatsApp: "", // ex.: "https://wa.me/5511999999999"

  /* ---------- Dados legais (usados em Termos e Privacidade) ---------- */
  legal: {
    companyName: "", // Razão social ou nome do responsável
    document: "", // CNPJ ou CPF
    city: "",
    lastUpdate: "22/11/2026",
    copyrightYear: 2026,
  },

  appleDisclaimer:
    "Fonte Prime é um produto independente e não possui qualquer afiliação, patrocínio ou vínculo com a Apple Inc. iPhone é marca registrada da Apple Inc.",
} as const;

export const colors = {
  obsidian: "#081316",
  carbon: "#152A2B",
  mint: "#19F5A5",
  lime: "#C5FF58",
  ice: "#F5FAF8",
  sage: "#91AAA5",
} as const;
