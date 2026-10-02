import { CheckCircle, Lightning, LockSimple, Wallet } from "@phosphor-icons/react/dist/ssr";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { EbookCover } from "@/components/ui/EbookCover";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice, site } from "@/lib/site";

/** Dobra 10: oferta. Card branco centralizado sobre o gradiente vermelho. */
export function Offer() {
  const { price } = site;
  const included = [
    site.ebookPages ? `Ebook Judô do Zero em PDF (${site.ebookPages} páginas)` : "Ebook Judô do Zero em PDF",
    "Link para o vídeo de cada técnica",
    "Plano de treino de 90 dias com checklist mensal",
    "Glossário judoca com os termos japoneses do treino",
    ...(site.bonus ? [`Bônus: ${site.bonus.title}`] : []),
    "Acesso imediato por e-mail",
  ];

  return (
    <section id="oferta" className="bg-judo-gradient relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="tatami-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Comece hoje o seu <Highlight tone="light">Judô do Zero</Highlight>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-4xl overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-30px_rgb(40_0_8/0.7)] md:grid-cols-[0.8fr_1.2fr]">
            <div className="hidden items-center justify-center bg-paper p-10 md:flex">
              <EbookCover size="sm" />
            </div>

            <div className="p-7 sm:p-10">
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-snug">
                    <CheckCircle aria-hidden weight="fill" className="size-6 shrink-0 text-judo-red" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-zinc-200 pt-6">
                {price.full ? (
                  <p className="text-ink-soft">
                    De <s>{formatPrice(price.full)}</s>
                  </p>
                ) : null}
                <p className="flex items-baseline gap-2">
                  <span className="text-ink-soft">{price.full ? "Por apenas" : "Por"}</span>
                  <span className="font-display text-6xl font-extrabold tracking-tight text-judo-red">
                    {formatPrice(price.current)}
                  </span>
                </p>
                {price.installments ? (
                  <p className="mt-1 text-ink-soft">
                    ou {price.installments.count}x de {formatPrice(price.installments.value)} no cartão
                  </p>
                ) : null}
              </div>

              <CheckoutButton location="oferta" label="Quero meu ebook agora" size="lg" fullWidth className="mt-7" />

              <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-soft">
                <li className="flex items-center gap-1.5">
                  <LockSimple aria-hidden weight="bold" className="size-4" /> Pagamento seguro
                </li>
                <li className="flex items-center gap-1.5">
                  <Lightning aria-hidden weight="bold" className="size-4" /> Acesso imediato
                </li>
                <li className="flex items-center gap-1.5">
                  <Wallet aria-hidden weight="bold" className="size-4" /> {site.paymentMethods}
                </li>
              </ul>

              {price.launchDeadline ? (
                <p className="mt-6 rounded-xl bg-judo-red-soft p-4 text-center text-sm font-medium text-judo-wine">
                  O preço de lançamento vale até {price.launchDeadline.date}. Depois, o valor passa para{" "}
                  {formatPrice(price.launchDeadline.nextPrice)}.
                </p>
              ) : null}

              {site.paymentProvider ? (
                <p className="mt-4 text-center text-xs text-ink-soft">Compra processada por {site.paymentProvider}</p>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
