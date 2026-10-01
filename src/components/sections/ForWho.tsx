import { Check, Info, X } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";

const yes = [
  "Quer começar no judô e não sabe por onde",
  "Já começou e ainda se sente perdido no tatame",
  "É pai, mãe ou responsável e quer entender o que o seu filho vai aprender",
  "Gosta de aprender com linguagem simples e um pouco de humor",
  "Quer chegar ao primeiro treino mais tranquilo",
];

const no = [
  "Já é faixa preta ou avançado e procura técnicas de competição",
  "Espera aprender judô apenas lendo, sem treinar com um professor",
];

/** Dobra 6: para quem é (e para quem não é). Duas colunas de peso diferente. */
export function ForWho() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="rounded-2xl bg-paper p-7 ring-1 ring-zinc-200 sm:p-10">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Este ebook é para você se...</h2>
          <ul className="mt-8 space-y-4">
            {yes.map((item) => (
              <li key={item} className="flex gap-3 text-lg leading-snug">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-judo-red text-white">
                  <Check aria-hidden weight="bold" className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
          <div className="rounded-2xl p-7 ring-1 ring-zinc-200 sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight">Talvez não seja para você se...</h2>
            <ul className="mt-6 space-y-4">
              {no.map((item) => (
                <li key={item} className="flex gap-3 leading-snug text-ink-soft">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-zinc-200 text-ink">
                    <X aria-hidden weight="bold" className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="flex gap-3 rounded-2xl bg-judo-red-soft p-6 leading-relaxed text-judo-wine">
            <Info aria-hidden weight="fill" className="mt-0.5 size-6 shrink-0" />
            <span>
              <strong>Importante:</strong> o ebook complementa as aulas. Judô se aprende no tatame, com parceiro e
              professor qualificado.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
