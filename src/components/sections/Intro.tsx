import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/** Dobra 3: a virada. Bloco centralizado, curto, com a frase do autor em destaque. */
export function Intro() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-judo-red">Apresentando</p>
        <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Um guia para quem <Highlight>nunca pisou</Highlight> no tatame
        </h2>
        <p className="mt-6 max-w-[44ch] text-xl leading-relaxed text-ink-soft">
          Tudo o que um faixa branca precisa saber, em linguagem simples: passo a passo, erros comuns e link para o
          vídeo de cada técnica.
        </p>
        {site.author.introQuote ? (
          <blockquote className="mt-10 max-w-[30ch] font-display text-2xl font-bold leading-snug text-judo-red sm:text-3xl">
            &ldquo;{site.author.introQuote}&rdquo;
          </blockquote>
        ) : null}
        <CheckoutButton location="apresentacao" size="lg" className="mt-10" />
      </Reveal>
    </section>
  );
}
