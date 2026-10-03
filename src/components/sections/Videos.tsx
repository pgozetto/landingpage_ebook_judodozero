import { BookOpen, Info, LinkSimple, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { icon: BookOpen, title: "Leia o passo a passo", text: "Cada técnica em etapas curtas." },
  { icon: LinkSimple, title: "Toque no link", text: "O vídeo abre direto no celular." },
  { icon: PlayCircle, title: "Pratique no treino", text: "Veja o movimento completo antes." },
];

/** Dobra 5: o diferencial. Os vídeos ficam em links dentro do PDF (não há QR codes). */
export function Videos() {
  return (
    <section id="videos" className="bg-judo-red text-shadow-soft relative overflow-hidden py-24 text-white md:py-32">
      <div aria-hidden className="tatami-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-white">O diferencial</p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Cada técnica tem <Highlight tone="light">um vídeo</Highlight>
          </h2>
          <p className="mx-auto mt-6 max-w-[40ch] text-xl leading-relaxed text-white">
            Ler ajuda. Ver o movimento ajuda muito mais. É só tocar no link da página.
          </p>
        </Reveal>

        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-6">
          <span
            aria-hidden
            className="absolute left-[16.6%] right-[16.6%] top-12 hidden h-1 rounded-full bg-white/25 md:block"
          />
          {steps.map((step, i) => {
            const Icon = step.icon;
            const featured = i === 1;
            return (
              <Reveal as="li" key={step.title} delay={i * 0.12} className="relative flex flex-col items-center">
                <span
                  className={
                    featured
                      ? "grid size-24 place-items-center rounded-2xl bg-white text-judo-red shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)]"
                      : "grid size-24 place-items-center rounded-2xl bg-judo-red-deep text-white ring-1 ring-white/25"
                  }
                >
                  <Icon aria-hidden weight={featured ? "bold" : "duotone"} className="size-12" />
                </span>
                <h3 className="mt-6 text-2xl font-bold">{step.title}</h3>
                <p className="mt-2 text-lg text-white">{step.text}</p>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-14 flex max-w-xl items-start justify-center gap-2 rounded-2xl bg-white/10 px-5 py-4 text-left text-base text-white ring-1 ring-white/20 sm:items-center">
            <Info aria-hidden weight="fill" className="mt-0.5 size-5 shrink-0 sm:mt-0" />
            <span>
              <strong>Atenção:</strong> os vídeos abrem por links clicáveis dentro do PDF. O ebook não usa QR code.
            </span>
          </p>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <CheckoutButton location="videos" variant="white" size="lg" />
        </div>
      </div>
    </section>
  );
}
