import Image from "next/image";
import { InstagramLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import { Highlight } from "@/components/ui/Highlight";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { site, socialUrl } from "@/lib/site";

/** Dobra 8: quem escreveu. Foto com brilho vermelho e parallax, texto curto ao lado. */
export function Author() {
  const instagram = socialUrl("instagram");
  const tiktok = socialUrl("tiktok");

  return (
    <section id="autor" className="overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-14 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
        <Reveal className="relative mx-auto w-full max-w-sm">
          {/* Brilho vermelho sutil atrás da foto */}
          <div
            aria-hidden
            className="absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgb(200_16_46/0.45),transparent)] blur-2xl"
          />
          <Parallax distance={30}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink shadow-[0_30px_80px_-30px_rgb(200_16_46/0.8)] ring-1 ring-judo-red/30">
              {site.author.photo ? (
                <Image
                  src={site.author.photo}
                  alt={`${site.authorName}, judoca faixa marrom, de judogi no tatame`}
                  fill
                  sizes="(min-width: 768px) 384px, 90vw"
                  className="object-cover"
                />
              ) : null}
              {/* Tom vermelho suave na base da foto */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgb(200_16_46/0.35),transparent_45%)] mix-blend-multiply"
              />
            </div>
          </Parallax>
        </Reveal>

        <Reveal delay={0.1} className="text-center md:text-left">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-judo-red">Quem escreveu</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Oi, eu sou o <Highlight>Pedro</Highlight>
          </h2>
          <div className="mt-6 space-y-4 text-xl leading-relaxed text-ink-soft">
            <p>
              Judoca <strong className="text-ink">{site.authorBelt}</strong>, tenho mais de{" "}
              <strong className="text-ink">9 anos de judô</strong>. Comecei aos 7, perdido e travado igual todo faixa
              branca.
            </p>
            <p>Escrevi o Judô do Zero para o seu começo ser melhor e com mais orientação do que o meu foi.</p>
          </div>

          {instagram || tiktok ? (
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              {instagram ? (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-lg font-semibold ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:text-judo-red"
                >
                  <InstagramLogo aria-hidden weight="bold" className="size-5" />@{site.social.instagram}
                </a>
              ) : null}
              {tiktok ? (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-lg font-semibold ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:text-judo-red"
                >
                  <TiktokLogo aria-hidden weight="bold" className="size-5" />@{site.social.tiktok}
                </a>
              ) : null}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
