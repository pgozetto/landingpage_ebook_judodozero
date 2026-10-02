import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { EbookCover } from "@/components/ui/EbookCover";
import { Parallax } from "@/components/ui/Parallax";
import { site } from "@/lib/site";

const badges = ["Ebook em PDF", "Vídeo de cada técnica", "Acesso imediato"];

/** Palavras do título. As de `mark` ficam juntas na mesma linha. */
const title: { word: string; mark?: boolean }[] = [
  { word: "Judô" },
  { word: "do" },
  { word: "Zero:" },
  { word: "seus" },
  { word: "primeiros" },
  { word: "90 dias", mark: true },
  { word: "no" },
  { word: "tatame" },
];

/**
 * Dobra 1: hero centralizado. O título entra palavra por palavra (CSS puro, aparece antes
 * do JavaScript carregar, bom para o LCP) e o ebook flutua com parallax.
 */
export function Hero() {
  return (
    <section className="bg-judo-gradient relative overflow-hidden text-white">
      <div aria-hidden className="tatami-lines pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[62%] size-[36rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-14 text-center sm:px-6 md:pt-20">
        <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.2rem]">
          {title.map(({ word, mark }, i) => (
            <span key={i}>
              <span
                className={mark ? "inline-block whitespace-nowrap animate-word" : "inline-block animate-word"}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {word}
              </span>
              {i < title.length - 1 ? " " : null}
            </span>
          ))}
        </h1>

        <p
          className="mt-6 max-w-[34ch] animate-rise text-xl leading-relaxed text-white/90 sm:text-2xl"
          style={{ animationDelay: "550ms" }}
        >
          Aprenda a cair, as primeiras técnicas e o seu primeiro randori. Com humor e vídeos.
        </p>

        <ul
          className="mt-7 flex animate-rise flex-wrap justify-center gap-x-6 gap-y-2 text-base font-medium sm:text-lg"
          style={{ animationDelay: "650ms" }}
        >
          {badges.map((badge) => (
            <li key={badge} className="flex items-center gap-1.5">
              <CheckCircle weight="fill" aria-hidden className="size-5" />
              {badge}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex animate-rise flex-col items-center gap-3" style={{ animationDelay: "750ms" }}>
          <CheckoutButton location="hero" variant="white" size="lg" />
          <p className="text-sm text-white/75">
            Pagamento seguro · Garantia de {site.guaranteeDays} dias
          </p>
        </div>

        <Parallax distance={40} className="mt-14 pb-16 md:pb-24">
          <EbookCover priority className="animate-float motion-reduce:animate-none" />
        </Parallax>
      </div>
    </section>
  );
}
