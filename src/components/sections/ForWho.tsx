import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";

const yes = [
  "Quer começar e não sabe por onde",
  "Já começou e ainda se sente perdido",
  "É pai ou mãe de um judoca iniciante",
  "Gosta de aprender com humor",
];

const no = ["Já é avançado e busca técnicas de competição", "Quer aprender só lendo, sem professor"];

/** Dobra 6: para quem é (e para quem não é). */
export function ForWho() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Este ebook é <Highlight>para você</Highlight> se...
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-[1.3fr_1fr]">
          <Reveal className="rounded-2xl bg-paper p-8 ring-1 ring-zinc-200 sm:p-10">
            <ul className="space-y-5">
              {yes.map((item) => (
                <li key={item} className="flex items-center gap-4 text-xl font-medium leading-snug">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-judo-red text-white">
                    <Check aria-hidden weight="bold" className="size-5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl p-8 ring-1 ring-zinc-200 sm:p-10">
            <h3 className="text-xl font-bold text-ink-soft">Talvez não seja se...</h3>
            <ul className="mt-5 space-y-4">
              {no.map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg leading-snug text-ink-soft">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-zinc-200 text-ink">
                    <X aria-hidden weight="bold" className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-lg text-ink-soft">
            <strong className="text-judo-red">Importante:</strong> o ebook complementa as aulas. Judô se aprende no
            tatame.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
