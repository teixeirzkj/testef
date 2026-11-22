import Image from "next/image";

/**
 * Componente preparado para provas sociais REAIS e autorizadas
 * (prints, vídeos ou avaliações). Não é renderizado enquanto `items` estiver vazio.
 *
 * Exemplo de uso em UnlockedContent.tsx:
 *   <ProofGallery items={[{ type: "image", src: "/images/provas/1.webp", alt: "Print autorizado de cliente" }]} />
 */
export type ProofItem =
  | { type: "image"; src: string; alt: string; width?: number; height?: number }
  | { type: "video"; src: string; poster?: string; label: string };

export function ProofGallery({ title = "Quem já conheceu", items }: { title?: string; items: ProofItem[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-label={title} className="py-20">
      <div className="container-page">
        <h2 className="text-center font-display text-3xl font-semibold">{title}</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={i} className="glass overflow-hidden rounded-2xl">
              {item.type === "image" ? (
                <Image src={item.src} alt={item.alt} width={item.width ?? 600} height={item.height ?? 1000} className="h-auto w-full" />
              ) : (
                <video src={item.src} poster={item.poster} controls playsInline preload="none" aria-label={item.label} className="w-full" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
