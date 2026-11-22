import { Lock } from "lucide-react";
import { disclaimer, enrollContent } from "@/config/content";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";
import { PriceTag } from "@/components/ui/PriceTag";
import { LogoMark } from "@/components/brand/Logo";
import { CheckoutButton } from "./CheckoutButton";

export function EnrollSection() {
  return (
    <section
      id="inscricao"
      aria-labelledby="enroll-title"
      className="relative isolate scroll-mt-4 overflow-hidden py-24 sm:py-32"
    >
      {/* Fundo radial verde / preto / petróleo */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,rgb(25_245_165/0.22)_0%,rgb(6_35_42/0.85)_45%,#081316_80%)]" />
        <div className="tech-grid absolute inset-0 opacity-70" />
        <div className="absolute left-1/2 top-1/2 size-[90vmin] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-[conic-gradient(from_180deg,transparent,rgb(25_245_165/0.12),transparent,rgb(197_255_88/0.08),transparent)] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />
      </div>

      <div className="container-page flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>{enrollContent.eyebrow}</Eyebrow>
        </Reveal>
        <div id="enroll-title" className="mt-6 max-w-3xl">
          <TextReveal
            text={enrollContent.title}
            highlight={["próxima", "oportunidade?"]}
            className="font-display text-[clamp(2rem,6vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-balance"
          />
        </div>
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sage sm:text-lg">{enrollContent.subtitle}</p>
        </Reveal>

        {/* Cartão de acesso */}
        <Reveal delay={0.2} className="mt-12 w-full max-w-[520px] sm:mt-14">
          <div className="relative rounded-[30px] bg-gradient-to-br from-mint/70 via-mint/10 to-lime/50 p-px shadow-[0_50px_120px_-30px_rgb(25_245_165/0.5)]">
            <div className="relative overflow-hidden rounded-[29px] bg-[linear-gradient(160deg,#12302f_0%,#0b1c1e_55%,#081316_100%)] px-5 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-mint/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-white/[0.06] to-transparent [animation-duration:6s]" />

              <div className="relative flex items-center justify-between">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-ice">
                  {enrollContent.cardLabel}
                </span>
                <LogoMark size={34} />
              </div>
              {/* "chip" do cartão */}
              <div aria-hidden className="relative mt-6 flex items-center gap-3">
                <div className="h-8 w-11 rounded-md bg-gradient-to-br from-lime/80 to-mint/60 opacity-80" />
                <div className="h-px flex-1 bg-gradient-to-r from-mint/40 to-transparent" />
              </div>

              <PriceTag size="xl" className="relative mt-7" />

              <div className="relative mt-8">
                <CheckoutButton />
              </div>
              <p className="relative mt-5 flex items-center justify-center gap-2 text-xs text-sage sm:text-sm">
                <Lock className="size-3.5 text-mint" aria-hidden />
                {enrollContent.microcopy}
              </p>
              <p className="relative mt-3 text-center text-xs leading-relaxed text-sage/75">{disclaimer}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
