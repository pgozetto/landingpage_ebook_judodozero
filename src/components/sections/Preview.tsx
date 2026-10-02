import Link from "next/link";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { PreviewCarousel } from "@/components/sections/PreviewCarousel";
import { site } from "@/lib/site";

/** Dobra 7: prévia do ebook. Em produção, só aparece depois que houver prints reais em site.previewPages. */
export function Preview() {
  const pages = site.previewPages.filter((p) => p.src);
  const showPlaceholders = process.env.NODE_ENV !== "production";
  if (pages.length === 0 && !showPlaceholders) return null;

  return (
    <section className="overflow-hidden bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Dê uma <Highlight>espiada</Highlight> por dentro
          </h2>
          <p className="mx-auto mt-5 max-w-[40ch] text-xl leading-relaxed text-ink-soft">
            Passo a passo curto, caixas de &ldquo;Erro comum&rdquo; e link para cada vídeo.
          </p>
        </Reveal>
      </div>

      <PreviewCarousel pages={pages.length > 0 ? pages : [...site.previewPages]} />

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:gap-6 sm:px-6">
        <CheckoutButton location="previa" label="Garantir meu exemplar" size="lg" />
        <Link
          href="/mini-guia"
          className="text-lg font-semibold text-judo-red underline decoration-judo-red/30 underline-offset-4 hover:decoration-judo-red"
        >
          Prefere testar antes? Baixe o mini guia grátis →
        </Link>
      </div>
    </section>
  );
}
