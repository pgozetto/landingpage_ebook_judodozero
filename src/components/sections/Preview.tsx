import Link from "next/link";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Reveal } from "@/components/ui/Reveal";
import { PreviewCarousel } from "@/components/sections/PreviewCarousel";
import { site } from "@/lib/site";

/** Dobra 7: prévia do ebook. Em produção, só aparece depois que houver prints reais em site.previewPages. */
export function Preview() {
  const pages = site.previewPages.filter((p) => p.src);
  const showPlaceholders = process.env.NODE_ENV !== "production";
  if (pages.length === 0 && !showPlaceholders) return null;

  return (
    <section className="overflow-hidden bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Dê uma espiada por dentro</h2>
          <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
            Títulos claros, passo a passo curto, caixas de &ldquo;Erro comum&rdquo; e QR codes para os vídeos.
          </p>
        </Reveal>
      </div>

      <PreviewCarousel pages={pages.length > 0 ? pages : [...site.previewPages]} />

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-start gap-4 px-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
        <CheckoutButton location="previa" label="Garantir meu exemplar" />
        <Link
          href="/mini-guia"
          className="font-semibold text-judo-red underline decoration-judo-red/30 underline-offset-4 hover:decoration-judo-red"
        >
          Prefere testar antes? Baixe o mini guia grátis →
        </Link>
      </div>
    </section>
  );
}
