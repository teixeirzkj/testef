# Fonte Prime — Landing page

Landing page (VSL) do **Fonte Prime — Grupo VIP de Promoções**. O visitante vê o vídeo; aos **05:50** a oferta e o resto da página são liberados com animação, e o botão de inscrição leva ao checkout oficial da **PagueZy**.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · GSAP/ScrollTrigger · Lucide.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

## Onde alterar cada coisa

Tudo o que é comercial fica em `src/config/offer.ts`:

| O que | Onde |
|---|---|
| Preço (R$ 67,00) | `price` |
| Selos ao lado do preço | `priceTags`, `accessMonths` |
| Link do checkout | variável `NEXT_PUBLIC_CHECKOUT_URL` (se vazia, usa o link oficial em `DEFAULT_CHECKOUT_URL`) |
| Vídeo | arquivo em `public/videos/fonte-prime-editado.mp4` (`videoPath`) |
| Thumbnail do vídeo (opcional) | `public/images/video-poster.webp` |
| Tempo de liberação | `unlock.unlockTimeSeconds` (350 = 05:50) |
| Link "Ver a oferta sem assistir ao vídeo" | `unlock.allowSkip` |
| Manter liberado | `unlock.remember`: `"session"`, `"always"` ou `"none"` |

- **Textos** (hero, benefícios, FAQ, transparência): `src/config/content.ts`
- **Contato, dados legais, SEO**: `src/config/site.ts`
- **Termos / Privacidade**: `src/app/termos` e `src/app/privacidade`. Preencha os campos marcados entre colchetes.

Se o vídeo for mais curto que `unlockTimeSeconds`, a página é liberada quando ele termina, e um aviso aparece no console.

## Deploy na Vercel

1. Importe este repositório em vercel.com (o framework Next.js é detectado sozinho).
2. Em **Settings → Environment Variables**, cadastre:
   - `NEXT_PUBLIC_CHECKOUT_URL`: link da PagueZy (opcional, porque já existe um padrão no código)
   - `NEXT_PUBLIC_SITE_URL`: o domínio final, por exemplo `https://fonteprime.vercel.app`
3. Cada `git push` na branch `main` gera um novo deploy.

O relatório de edição do vídeo está em [`docs/relatorio-video.md`](docs/relatorio-video.md).
