import { whyContent } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="why-title" eyebrow={whyContent.eyebrow} title={whyContent.title} highlight={["Você"]} />
        <Stagger as="ul" className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3 md:gap-5">
          {whyContent.cards.map((card) => (
            <StaggerItem as="li" key={card.number}>
              <TiltCard className="h-full p-7 sm:p-8">
                <div className="flex h-full flex-col gap-10">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-medium tracking-[0.2em] text-mint">{card.number}</span>
                    <span className="h-px flex-1 translate-y-px bg-gradient-to-r from-mint/40 to-transparent ml-4" aria-hidden />
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-display text-xl font-semibold leading-snug text-ice sm:text-[1.4rem]">{card.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-sage">{card.text}</p>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
