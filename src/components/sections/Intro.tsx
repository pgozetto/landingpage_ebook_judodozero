import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { EbookCover } from "@/components/ui/EbookCover";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/** Dobra 3: a virada. Texto à esquerda, mockup à direita. */
export function Intro() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 md:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-judo-red">Apresentando</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Um guia feito para quem nunca pisou no tatame
          </h2>
          <div className="mt-6 max-w-[58ch] space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              O Judô do Zero reúne, em linguagem simples, tudo o que um faixa branca precisa saber para chegar ao
              primeiro treino com mais segurança e menos nervosismo.
            </p>
            <p>
              Sem enrolação e sem termos complicados. Cada assunto vem explicado passo a passo, com erros comuns,
              dicas práticas e QR codes que levam você direto ao vídeo da técnica.
            </p>
          </div>
          {site.author.introQuote ? (
            <blockquote className="mt-8 font-display text-2xl font-bold leading-snug text-judo-red">
              &ldquo;{site.author.introQuote}&rdquo;
            </blockquote>
          ) : null}
          <CheckoutButton location="apresentacao" className="mt-9" />
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center">
          <EbookCover className="-rotate-2" />
        </Reveal>
      </div>
    </section>
  );
}
