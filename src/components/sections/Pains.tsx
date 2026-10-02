import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const doubts = [
  "Como amarro essa faixa?",
  "E se eu me machucar na queda?",
  "O sensei fala em japonês!",
  "Vou passar vergonha?",
  "Por onde eu começo?",
];

/** Dobra 2: identificação. As dúvidas aparecem como balões, levemente inclinados. */
export function Pains() {
  return (
    <section id="identificacao" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Começar no judô dá{" "}
            <span className="whitespace-nowrap">
              <Highlight>frio na barriga</Highlight>.
            </span>{" "}
            É normal.
          </h2>
          <p className="mx-auto mt-5 max-w-[40ch] text-xl leading-relaxed text-ink-soft">
            A vontade existe. Mas, na hora de ir ao dojo, as dúvidas aparecem:
          </p>
        </Reveal>

        <ul className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
          {doubts.map((doubt, i) => (
            <Reveal as="li" key={doubt} delay={i * 0.07}>
              <p
                className={cn(
                  "rounded-full px-6 py-3.5 text-lg font-semibold transition-transform duration-300 hover:-translate-y-1 sm:text-xl",
                  i % 2 === 0 ? "-rotate-1 bg-paper text-ink ring-1 ring-zinc-200" : "rotate-1 bg-judo-red-soft text-judo-wine",
                )}
              >
                &ldquo;{doubt}&rdquo;
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.3}>
          <p className="mt-12 text-2xl font-bold leading-snug sm:text-3xl">
            Se você se identificou, <span className="text-judo-red">este guia é para você.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
