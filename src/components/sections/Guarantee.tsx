import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/** Dobra 11: garantia. Selo à esquerda, texto curto à direita. */
export function Guarantee() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
        <div className="relative grid size-32 shrink-0 place-items-center rounded-full bg-judo-red-soft">
          <ShieldCheck aria-hidden weight="duotone" className="size-16 text-judo-red" />
          <span className="absolute -bottom-2 rounded-full bg-judo-red px-3 py-1 text-xs font-bold text-white">
            {site.guaranteeDays} dias
          </span>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Compra sem risco</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">
            Você tem {site.guaranteeDays} dias para ler o ebook com calma. Se achar que não é para você, é só pedir o
            reembolso dentro desse prazo e devolvemos o valor, sem burocracia.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
