import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const doubts = [
  "Como eu amarro essa faixa sem ela soltar toda hora?",
  "E se eu me machucar na primeira queda?",
  "O professor fala em japonês e eu fico perdido.",
  "Vou passar vergonha no primeiro treino?",
  "Por onde eu começo, afinal?",
];

/** Dobra 2: identificação. As dúvidas aparecem como balões de pensamento, alternando os lados. */
export function Pains() {
  return (
    <section id="identificacao" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-36 lg:self-start">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Começar no judô dá um friozinho na barriga. É normal.
          </h2>
          <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-ink-soft">
            Você viu um vídeo, um amigo comentou, ou seu filho pediu para treinar. A vontade de começar existe. Mas
            na hora de ir ao dojo, as dúvidas aparecem:
          </p>
        </Reveal>

        <div>
          <ul className="flex flex-col gap-4">
            {doubts.map((doubt, i) => (
              <Reveal
                as="li"
                key={doubt}
                delay={i * 0.06}
                className={cn("flex", i % 2 === 0 ? "justify-start" : "justify-end")}
              >
                <p
                  className={cn(
                    "max-w-[34ch] rounded-2xl px-5 py-4 text-[17px] font-medium leading-snug",
                    i % 2 === 0
                      ? "rounded-bl-md bg-paper text-ink ring-1 ring-zinc-200"
                      : "rounded-br-md bg-judo-red-soft text-judo-wine",
                  )}
                >
                  &ldquo;{doubt}&rdquo;
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <p className="mt-10 border-l-4 border-judo-red pl-5 text-xl font-semibold leading-snug">
              Se você se identificou com pelo menos uma dessas perguntas, este guia foi escrito para você.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
