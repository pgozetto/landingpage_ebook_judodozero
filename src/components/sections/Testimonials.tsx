import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/** Dobra 9: prova social. Só aparece quando houver depoimentos reais em site.testimonials. */
export function Testimonials() {
  if (site.testimonials.length === 0) return null;

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">O que as pessoas estão dizendo</h2>
        </Reveal>
        <ul className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {site.testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={(i % 3) * 0.06} className="mb-5 break-inside-avoid">
              <figure className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
                <blockquote className="line-clamp-4 text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-bold">{t.name}</span>
                  <span className="text-ink-soft"> - {t.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
