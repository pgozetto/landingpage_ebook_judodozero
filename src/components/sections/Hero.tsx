import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { EbookCover } from "@/components/ui/EbookCover";
import { site } from "@/lib/site";

const badges = ["Ebook em PDF", "Vídeos de cada técnica", "Acesso imediato"];

export function Hero() {
  return (
    <section className="bg-judo-gradient relative overflow-hidden text-white">
      <div aria-hidden className="tatami-lines pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:pb-24 md:pt-16 lg:pt-20">
        <div className="[&>*]:animate-rise [&>*:nth-child(2)]:[animation-delay:80ms] [&>*:nth-child(3)]:[animation-delay:160ms] [&>*:nth-child(4)]:[animation-delay:220ms] [&>*:nth-child(5)]:[animation-delay:280ms] [&>*:nth-child(6)]:[animation-delay:340ms]">
          <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
            Guia para faixas brancas
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            Judô do Zero: seus primeiros 90 dias no tatame
          </h1>

          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-white/85">
            Aprenda a cair, as primeiras técnicas e o que fazer no seu primeiro randori, com humor, passo a passo
            e vídeos em QR code.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium">
            {badges.map((badge) => (
              <li key={badge} className="flex items-center gap-1.5">
                <CheckCircle weight="fill" aria-hidden className="size-5 text-white" />
                {badge}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <CheckoutButton location="hero" variant="white" size="lg" />
            <a
              href="#conteudo"
              className="px-2 py-2 font-semibold text-white/90 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white"
            >
              Ver o que tem dentro ↓
            </a>
          </div>

          <p className="mt-5 text-sm text-white/70">
            Pagamento seguro. Acesso por e-mail logo após a confirmação. Garantia de {site.guaranteeDays} dias.
          </p>
        </div>

        <div className="relative mx-auto flex justify-center md:justify-end">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl sm:size-96"
          />
          <EbookCover priority className="animate-float motion-reduce:animate-none" />
        </div>
      </div>
    </section>
  );
}
