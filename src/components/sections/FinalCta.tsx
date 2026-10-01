import Link from "next/link";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/** Dobra 13: chamada final. Tela cheia no celular. */
export function FinalCta() {
  // "custa menos que um lanche" só faz sentido com preço baixo (regra da copy).
  const cheap = site.price.current <= 40;

  return (
    <section id="chamada-final" className="bg-judo-red relative flex min-h-[100dvh] items-center overflow-hidden py-20 text-white md:min-h-0 md:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 size-[28rem] -translate-y-1/2 rounded-full bg-white/[0.07]"
      />
      <Reveal className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Seu primeiro tatame começa aqui
        </h2>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-white/85">
          Você pode continuar com a dúvida ou chegar ao primeiro treino sabendo amarrar a faixa, cair sem medo e
          entender o que o sensei diz. A escolha é sua{cheap ? ", e o primeiro passo custa menos que um lanche." : "."}
        </p>
        <CheckoutButton location="chamada-final" label="Começar meu Judô do Zero" variant="white" size="lg" className="mt-9" />
        <p className="mt-10 text-sm text-white/75">
          P.S.: Ainda em dúvida?{" "}
          <Link href="/mini-guia" className="font-semibold text-white underline underline-offset-4">
            Baixe o mini guia grátis
          </Link>{" "}
          e conheça o meu jeito de ensinar antes de decidir.
        </p>
      </Reveal>
    </section>
  );
}
