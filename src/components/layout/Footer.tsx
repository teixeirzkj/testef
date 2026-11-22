import Link from "next/link";
import { siteConfig } from "@/config/site";
import { disclaimer } from "@/config/content";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const year = siteConfig.legal.copyrightYear;
  const { supportEmail, supportWhatsApp } = siteConfig;

  return (
    <footer id="rodape" className="relative border-t border-sage/10 bg-obsidian pb-28 pt-14 md:pb-14">
      <div className="container-page flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-3">
            <Logo size={34} />
            <p className="text-sm text-sage">{siteConfig.slogan}</p>
          </div>
          <nav aria-label="Links institucionais" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link href="/privacidade" className="text-sage transition hover:text-mint">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="text-sage transition hover:text-mint">
              Termos de Uso
            </Link>
            {supportEmail && (
              <a href={`mailto:${supportEmail}`} className="text-sage transition hover:text-mint">
                Suporte: {supportEmail}
              </a>
            )}
            {supportWhatsApp && (
              <a href={supportWhatsApp} target="_blank" rel="noopener noreferrer" className="text-sage transition hover:text-mint">
                WhatsApp
              </a>
            )}
          </nav>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />
        <div className="flex flex-col gap-3 text-xs leading-relaxed text-sage/70">
          <p>{disclaimer}</p>
          <p>{siteConfig.appleDisclaimer}</p>
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
            {siteConfig.legal.companyName && ` ${siteConfig.legal.companyName}`}
            {siteConfig.legal.document && ` · ${siteConfig.legal.document}`}
          </p>
        </div>
      </div>
    </footer>
  );
}
