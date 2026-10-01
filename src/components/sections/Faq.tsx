import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { getFaq } from "@/content/faq";

/**
 * Dobra 12: FAQ em acordeão com <details> nativo.
 * Funciona sem JavaScript, é acessível por teclado e o Google lê todas as respostas.
 */
export function Faq() {
  const faq = getFaq();
  return (
    <section id="perguntas" className="bg-white pb-20 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Perguntas frequentes</h2>
        </Reveal>

        <div className="divide-y divide-zinc-200 rounded-2xl bg-paper px-5 ring-1 ring-zinc-200 sm:px-7">
          {faq.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-left text-lg font-semibold transition-colors hover:text-judo-red">
                {item.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-judo-red ring-1 ring-zinc-200">
                  <Plus aria-hidden weight="bold" className="faq-icon size-4 transition-transform duration-300" />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-5 pr-10 leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
