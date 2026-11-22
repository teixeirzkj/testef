/**
 * TEXTOS DA LANDING PAGE
 * Itens com `pending: true` ainda dependem de confirmação.
 * Em desenvolvimento (npm run dev) eles aparecem com a etiqueta "A confirmar";
 * em produção a etiqueta some. Revise antes de publicar.
 */
import { offerConfig } from "./offer";
import { formatBRL } from "@/lib/format";

const priceText = offerConfig.price !== null ? formatBRL(offerConfig.price) : "";
const months = offerConfig.accessMonths;
const provider = offerConfig.checkoutProvider;

export const disclaimer =
  "O produto não inclui aparelhos físicos. Preços e disponibilidade das promoções podem variar.";

export const heroContent = {
  eyebrow: "Grupo VIP de promoções no Telegram",
  title: "A oportunidade começa quando você encontra a fonte certa.",
  highlightWords: ["fonte", "certa."],
  subtitle:
    "Promoções do mercado de iPhones reunidas em um grupo VIP no Telegram, para você encontrar boas oportunidades sem precisar procurar em todo lugar.",
  progressMessage: "Sua próxima oportunidade está logo à frente.",
  lockedHint: "A oferta é liberada aos 05:50 do vídeo.",
  unlockedMessage: "Seu acesso à oferta foi liberado",
};

export const offerContent = {
  eyebrow: "Grupo VIP Fonte Prime",
  title: "Seu próximo passo começa aqui.",
  description: `${months} meses de acesso ao Grupo VIP de Promoções no Telegram, com pagamento único.`,
  cta: "Quero garantir meu acesso",
  skip: "Ver a oferta sem assistir ao vídeo",
};

export const whyContent = {
  eyebrow: "Por que entrar no grupo?",
  title: "O mercado se movimenta. Você também pode.",
  cards: [
    {
      number: "01",
      title: "Promoções em um só lugar",
      text: "As ofertas chegam no grupo do Telegram, sem você precisar procurar em vários sites.",
    },
    {
      number: "02",
      title: "Avalie antes de comprar",
      text: "Compare as condições de cada promoção e decida no seu tempo, sem pressa.",
    },
    {
      number: "03",
      title: `Acompanhe por ${months} meses`,
      text: `Acesso ao grupo durante ${months} meses com um único pagamento, sem renovação automática.`,
    },
  ],
};

export const impactContent = {
  words: ["Informação.", "Acesso.", "Oportunidade."],
  highlightIndex: 1,
  text: "Quem acompanha as promoções certas enxerga o mercado de outro ângulo. A Fonte Prime reúne as oportunidades em um grupo VIP no Telegram.",
  chips: ["Telegram", "Promoções", "Informação", "Tecnologia", "Mercado"],
};

export type IncludedIcon = "key" | "search" | "chart" | "book";

export const includedContent = {
  eyebrow: "O que está incluído",
  title: "Tudo o que você recebe, de forma direta.",
  items: [
    {
      icon: "key" as IncludedIcon,
      title: "Acesso ao Grupo VIP no Telegram",
      text: "Entrada no grupo exclusivo onde as promoções são publicadas.",
      pending: false,
    },
    {
      icon: "search" as IncludedIcon,
      title: "Promoções do mercado de iPhones",
      text: "Ofertas compartilhadas no grupo para você avaliar. Preços e disponibilidade podem variar.",
      pending: false,
    },
    {
      icon: "chart" as IncludedIcon,
      title: `${months} meses de acesso`,
      text: `Seu acesso dura ${months} meses, contados a partir da confirmação do pagamento.`,
      pending: false,
    },
    {
      icon: "book" as IncludedIcon,
      title: "Pagamento único",
      text: `${priceText} uma única vez. Sem parcelamento e sem renovação automática.`,
      pending: false,
    },
  ],
};

export const trustContent = {
  eyebrow: "Transparência",
  title: "Decisões melhores começam com informações claras.",
  items: [
    {
      title: "Quando o acesso começa",
      text: `O acesso ao grupo VIP no Telegram começa após a confirmação do pagamento e dura ${months} meses.`,
      pending: false,
    },
    {
      title: "O que você recebe",
      text: `${months} meses de acesso ao Grupo VIP de Promoções no Telegram. O produto não inclui aparelhos físicos.`,
      pending: false,
    },
    {
      title: "Sobre as promoções",
      text: "Preços e disponibilidade das promoções podem variar ao longo do tempo.",
      pending: false,
    },
    {
      title: "Compra e pagamento",
      text: `Pagamento único de ${priceText} no checkout da ${provider}, sem renovação automática. Esta página não coleta dados de pagamento.`,
      pending: false,
    },
    {
      title: "Suporte e reembolso",
      text: "Canal de suporte e política de reembolso a serem informados.",
      pending: true,
    },
  ],
};

export const enrollContent = {
  eyebrow: "Fonte Prime Access",
  title: "Pronto para conhecer sua próxima oportunidade?",
  subtitle: `Garanta ${months} meses de acesso ao Grupo VIP de Promoções no Telegram e acompanhe as oportunidades de perto.`,
  cardLabel: "Grupo VIP de Promoções",
  cta: "Quero fazer minha inscrição agora",
  microcopy: `Pagamento processado no checkout da ${provider}.`,
  checkoutUnavailable: "O checkout está indisponível no momento. Tente novamente em instantes.",
};

export const stickyCtaLabel = "Garantir meu acesso";

export const faqContent = {
  eyebrow: "Dúvidas",
  title: "Perguntas frequentes",
  items: [
    {
      q: "O que vou receber após a compra?",
      a: `${months} meses de acesso ao Grupo VIP de Promoções da Fonte Prime no Telegram, onde as promoções são publicadas.`,
      pending: false,
    },
    {
      q: "Quando meu acesso começa?",
      a: `O acesso começa após a confirmação do pagamento e vale por ${months} meses.`,
      pending: false,
    },
    {
      q: "Estou comprando um iPhone?",
      a: "Não. Você está adquirindo acesso a um grupo de promoções. O produto não inclui aparelhos físicos, e os preços e a disponibilidade das promoções podem variar.",
      pending: false,
    },
    {
      q: "Preciso pagar todo mês?",
      a: `Não. É um pagamento único de ${priceText}, sem parcelamento e sem renovação automática.`,
      pending: false,
    },
    {
      q: `O que acontece depois dos ${months} meses?`,
      a: "O acesso ao grupo se encerra. Não há cobrança automática de renovação.",
      pending: false,
    },
    {
      q: "Preciso ter Telegram?",
      a: "Sim. O grupo VIP funciona no Telegram, que pode ser instalado gratuitamente no celular ou no computador.",
      pending: false,
    },
    {
      q: "Como funciona o pagamento?",
      a: `O pagamento é feito no checkout oficial da ${provider}, com as formas de pagamento disponíveis lá. O valor exibido nesta página é o mesmo do checkout.`,
      pending: false,
    },
    {
      q: "Como posso solicitar suporte ou reembolso?",
      a: "Canal de suporte e política de reembolso a serem informados.",
      pending: true,
    },
  ],
};
