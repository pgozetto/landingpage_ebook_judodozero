import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/** Dobra 11: garantia. Selo e texto curto, centralizados. */
export function Guarantee() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <div className="relative grid size-32 shrink-0 place-items-center rounded-full bg-judo-red-soft">
          <ShieldCheck aria-hidden weight="duotone" className="size-16 text-judo-red" />
          <span className="absolute -bottom-2 rounded-full bg-judo-red px-3 py-1 text-xs font-bold text-white">
            {site.guaranteeDays} dias
          </span>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Compra <Highlight>sem risco</Highlight>
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-ink-soft">
            Leia com calma por {site.guaranteeDays} dias. Não gostou? Devolvemos o valor, sem burocracia.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
