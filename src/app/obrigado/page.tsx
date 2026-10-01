import type { Metadata } from "next";
import Link from "next/link";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { TrackOnMount } from "@/components/TrackOnMount";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compra confirmada",
  robots: { index: false, follow: false },
};

/** Página 3: obrigado (pós-compra). Configure esta URL como "página de obrigado" na plataforma. */
export default function ThankYouPage() {
  const steps = [
    "Confira sua caixa de entrada (e a de promoções e spam)",
    "Baixe o PDF e salve no celular",
    "Leia o capítulo 1 antes do seu próximo treino",
    site.social.instagram
      ? `Me marque no Instagram @${site.social.instagram} com a sua leitura. Vou adorar ver!`
      : "Me marque no Instagram com a sua leitura. Vou adorar ver!",
  ];

  return (
    <main className="min-h-[100dvh] bg-white">
      <TrackOnMount event={{ name: "purchase_thank_you" }} />
      <div className="h-3 bg-judo-red" />
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
        <Link href="/" aria-label="Judô do Zero, página inicial">
          <Logo />
        </Link>

        <h1 className="mt-12 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Compra confirmada. Bem-vindo ao tatame! <span aria-hidden>🥋</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Obrigado por confiar no Judô do Zero. Em poucos minutos você recebe um e-mail com o acesso ao ebook e aos
          vídeos.
        </p>

        <h2 className="mt-12 text-xl font-bold">Próximos passos</h2>
        <ol className="mt-5 space-y-4">
          {steps.map((step, i) => (
            <li key={step} className="flex items-start gap-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-judo-red-soft font-bold text-judo-red">
                {i + 1}
              </span>
              <span className="pt-1 text-lg leading-snug">{step}</span>
            </li>
          ))}
        </ol>

        {site.ebookAccessUrl ? (
          <a
            href={site.ebookAccessUrl}
            className="mt-12 inline-flex h-14 items-center gap-2 rounded-full bg-judo-red px-8 text-lg font-semibold text-white shadow-soft transition hover:bg-judo-red-deep active:scale-[0.98]"
          >
            <DownloadSimple aria-hidden weight="bold" className="size-5" />
            Acessar meu ebook
          </a>
        ) : null}

        {site.contactEmail ? (
          <p className="mt-8 text-ink-soft">
            Não recebeu? Fale com a gente:{" "}
            <a href={`mailto:${site.contactEmail}`} className="font-semibold text-judo-red underline underline-offset-4">
              {site.contactEmail}
            </a>
          </p>
        ) : null}
      </div>
    </main>
  );
}
