import { BookOpen, PlayCircle, QrCode } from "@phosphor-icons/react/dist/ssr";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { icon: BookOpen, title: "Leia o passo a passo", text: "Cada técnica dividida em etapas curtas." },
  { icon: QrCode, title: "Escaneie o QR code", text: "Aponte a câmera do celular para a página." },
  { icon: PlayCircle, title: "Assista e pratique no treino", text: "O vídeo abre na hora com o movimento completo." },
];

/** Dobra 5: o diferencial. Faixa vermelha com os 3 passos ligados por uma linha (a "faixa"). */
export function QrVideos() {
  return (
    <section id="videos" className="bg-judo-red relative overflow-hidden py-20 text-white md:py-28">
      <div aria-hidden className="tatami-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/80">O diferencial</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Cada técnica tem um vídeo. É só apontar o celular.
          </h2>
          <p className="mx-auto mt-6 max-w-[56ch] text-lg leading-relaxed text-white/85">
            Ler sobre uma técnica ajuda. Ver a técnica em movimento ajuda muito mais. Em cada página de técnica você
            encontra um QR code: aponte a câmera e o vídeo abre na hora, do jeito que eu ensino.
          </p>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          <span
            aria-hidden
            className="absolute left-[16.6%] right-[16.6%] top-12 hidden h-1 rounded-full bg-white/25 md:block"
          />
          {steps.map((step, i) => {
            const Icon = step.icon;
            const featured = i === 1;
            return (
              <Reveal as="li" key={step.title} delay={i * 0.1} className="relative flex flex-col items-center text-center">
                <span
                  className={
                    featured
                      ? "grid size-24 place-items-center rounded-2xl bg-white text-judo-red shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)]"
                      : "grid size-24 place-items-center rounded-2xl bg-judo-red-deep text-white ring-1 ring-white/25"
                  }
                >
                  <Icon aria-hidden weight={featured ? "bold" : "duotone"} className="size-12" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 max-w-[28ch] text-white/80">{step.text}</p>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-14 flex justify-center">
          <CheckoutButton location="videos" variant="white" size="lg" />
        </div>
      </div>
    </section>
  );
}
