import Link from "next/link";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Highlight } from "@/components/ui/Highlight";
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
        className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07]"
      />
      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <h2 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
          Seu primeiro tatame <Highlight tone="light">começa aqui</Highlight>
        </h2>
        <p className="mt-6 max-w-[38ch] text-xl leading-relaxed text-white">
          Chegue ao primeiro treino sabendo amarrar a faixa, cair sem medo e entender o sensei.
          {cheap ? " Tudo por menos que um lanche." : ""}
        </p>
        <CheckoutButton location="chamada-final" label="Começar meu Judô do Zero" variant="white" size="lg" className="mt-9" />
        <p className="mt-10 text-sm text-white">
          P.S.: Ainda em dúvida?{" "}
          <Link href="/mini-guia" className="font-semibold text-white underline underline-offset-4">
            Leia uma amostra grátis
          </Link>{" "}
          e conheça o meu jeito de ensinar antes de decidir.
        </p>
      </Reveal>
    </section>
  );
}
