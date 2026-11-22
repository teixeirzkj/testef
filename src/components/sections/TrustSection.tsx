import { CreditCard, LifeBuoy, PackageCheck, Send, ShieldQuestion } from "lucide-react";
import { trustContent } from "@/config/content";
import { SectionHeading, PendingBadge } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const icons = [Send, PackageCheck, LifeBuoy, CreditCard, ShieldQuestion];

/**
 * Transparência sobre entrega, pagamento e garantia.
 * Depoimentos reais (prints/vídeos autorizados) podem ser adicionados com
 * o componente <ProofGallery> quando existirem — nunca use relatos inventados.
 */
export function TrustSection() {
  return (
    <section aria-labelledby="trust-title" className="relative py-20 sm:py-28">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/30 to-transparent" />
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            id="trust-title"
            align="left"
            eyebrow={trustContent.eyebrow}
            title={trustContent.title}
            highlight={["informações", "claras."]}
          />
        </div>
        <Stagger as="ul" className="grid gap-px overflow-hidden rounded-3xl border border-sage/15 bg-sage/10" stagger={0.08}>
          {trustContent.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem as="li" key={item.title} className="bg-obsidian-2">
                <div className="flex gap-5 p-6 transition-colors duration-500 hover:bg-carbon/60 sm:p-7">
                  <Icon className="mt-0.5 size-5 shrink-0 text-mint" aria-hidden />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ice">
                      {item.title}
                      <PendingBadge pending={item.pending} />
                    </h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-sage">{item.text}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
