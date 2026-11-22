import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { Footer } from "./Footer";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <main id="conteudo" className="relative">
        <div className="container-page max-w-3xl py-10 sm:py-14">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Voltar para a página inicial">
              <Logo size={32} />
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-sage transition hover:text-mint">
              <ArrowLeft className="size-4" aria-hidden /> Voltar
            </Link>
          </div>
          <h1 className="mt-14 font-display text-[clamp(2rem,6vw,3rem)] font-semibold tracking-[-0.02em]">{title}</h1>
          <p className="mt-2 text-sm text-sage">Última atualização: {siteConfig.legal.lastUpdate}</p>
          <div className="mt-10 space-y-6 text-[0.98rem] leading-relaxed text-sage [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ice [&_strong]:text-ice">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Mostra o valor configurado ou um marcador visível para preencher. */
export function Fill({ value, label }: { value: string; label: string }) {
  return value ? <>{value}</> : <mark className="rounded bg-lime/15 px-1 text-lime">[{label}]</mark>;
}
