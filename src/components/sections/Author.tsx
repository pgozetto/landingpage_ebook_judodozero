import Image from "next/image";
import { InstagramLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { site, socialUrl } from "@/lib/site";

/** Dobra 8: quem escreveu. Foto à esquerda, texto à direita. */
export function Author() {
  const instagram = socialUrl("instagram");
  const tiktok = socialUrl("tiktok");

  return (
    <section id="autor" className="overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div aria-hidden className="absolute -inset-3 -rotate-3 rounded-2xl bg-judo-red" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper">
            {site.author.photo ? (
              <Image
                src={site.author.photo}
                alt={`${site.authorName} de judogi, sorrindo`}
                fill
                sizes="(min-width: 768px) 384px, 90vw"
                className="object-cover"
              />
            ) : (
              // TODO: foto do Pedro de judogi (1200 x 1500 px) em /public/images e caminho em site.author.photo
              <div className="grid h-full place-items-center">
                <span className="font-display text-8xl font-extrabold text-judo-red/20">PG</span>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-judo-red">Quem escreveu</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Oi, eu sou o {site.authorName}</h2>
          <div className="mt-6 max-w-[58ch] space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              Sou judoca {site.authorBelt} e criador de conteúdo de judô no Instagram e no TikTok, onde ensino de um
              jeito simples e com bom humor para quem está começando.
            </p>
            {site.author.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {site.author.reason ? (
              <p>
                Eu criei o Judô do Zero porque {site.author.reason} e quero que o seu começo seja mais leve do que foi o
                meu.
              </p>
            ) : (
              <p>Eu criei o Judô do Zero porque quero que o seu começo seja mais leve do que foi o meu.</p>
            )}
          </div>

          {instagram || tiktok ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {instagram ? (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 font-semibold ring-1 ring-zinc-200 transition hover:text-judo-red"
                >
                  <InstagramLogo aria-hidden weight="bold" className="size-5" />@{site.social.instagram}
                </a>
              ) : null}
              {tiktok ? (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 font-semibold ring-1 ring-zinc-200 transition hover:text-judo-red"
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
