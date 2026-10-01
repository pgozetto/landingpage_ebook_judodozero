import {
  Barbell,
  BookOpenText,
  CalendarCheck,
  Gift,
  PersonSimpleTaiChi,
  ShieldCheck,
  Sparkle,
  Translate,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type Item = {
  title: string;
  text: string;
  icon: Icon;
  className: string;
  tone: "plain" | "soft" | "red" | "ink" | "paper";
  extra?: string[];
};

const hasBonus = Boolean(site.bonus);

const items: Item[] = [
  {
    title: "Etiqueta, judogi e faixa",
    text: "O que levar ao primeiro treino, como se comportar no tatame e como amarrar a faixa para ela não soltar.",
    icon: BookOpenText,
    className: "lg:col-span-2",
    tone: "plain",
  },
  {
    title: "Ukemi, a arte de cair",
    text: "As 3 quedas básicas explicadas com calma. Quem aprende a cair bem treina com mais confiança.",
    icon: ShieldCheck,
    className: "lg:col-span-2",
    tone: "soft",
  },
  {
    title: "5 projeções essenciais",
    text: "Com passo a passo e o erro mais comum de cada uma.",
    icon: PersonSimpleTaiChi,
    className: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    tone: "red",
    extra: ["O-soto-gari", "O-goshi", "Ippon-seoi-nage", "O-uchi-gari", "De-ashi-harai"],
  },
  {
    title: "3 imobilizações básicas",
    text: "Kesa-gatame, Yoko-shiho-gatame e Kami-shiho-gatame para você começar a se orientar no chão.",
    icon: Barbell,
    className: "lg:col-span-2",
    tone: "plain",
  },
  {
    title: "Seu primeiro randori",
    text: "O que fazer antes, durante e depois da luta livre de treino, e como aproveitar para aprender.",
    icon: Sparkle,
    className: "lg:col-span-2",
    tone: "ink",
  },
  {
    title: "Plano de treino de 90 dias",
    text: "Um roteiro simples, dividido em 3 fases, com checklist mensal para acompanhar sua evolução.",
    icon: CalendarCheck,
    className: hasBonus ? "lg:col-span-2" : "sm:col-span-2 lg:col-span-3",
    tone: "paper",
    extra: ["Semanas 1 a 4", "Semanas 5 a 8", "Semanas 9 a 12"],
  },
  {
    title: "Glossário judoca",
    text: "Os termos japoneses que você vai ouvir em todo treino, explicados em português.",
    icon: Translate,
    className: hasBonus ? "lg:col-span-2" : "sm:col-span-2 lg:col-span-3",
    tone: "plain",
  },
];

if (site.bonus) {
  items.push({
    title: `Bônus: ${site.bonus.title}`,
    text: site.bonus.description,
    icon: Gift,
    className: "sm:col-span-2 lg:col-span-2",
    tone: "soft",
  });
}

const toneClass: Record<Item["tone"], string> = {
  plain: "bg-white ring-1 ring-zinc-200",
  soft: "bg-judo-red-soft",
  red: "bg-judo-red text-white",
  ink: "bg-ink text-white",
  paper: "bg-paper ring-1 ring-zinc-200",
};

/** Dobra 4: o que tem dentro, em grade bento (1 coluna no celular, 2 no tablet, 6 trilhas no desktop). */
export function Contents() {
  return (
    <section id="conteudo" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-[22ch] text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            O que você vai encontrar dentro do ebook
          </h2>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {items.map((item, i) => {
            const dark = item.tone === "red" || item.tone === "ink";
            const Icon = item.icon;
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={(i % 3) * 0.06}
                className={cn("flex flex-col rounded-2xl p-6 sm:p-7", toneClass[item.tone], item.className)}
              >
                <Icon
                  aria-hidden
                  weight="duotone"
                  className={cn("size-9", dark ? "text-white" : "text-judo-red")}
                />
                <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight">{item.title}</h3>
                <p className={cn("mt-2 leading-relaxed", dark ? "text-white/80" : "text-ink-soft")}>{item.text}</p>
                {item.extra ? (
                  <ul className={cn("mt-5 flex flex-wrap gap-2", item.tone === "red" && "lg:mt-auto lg:pt-6")}>
                    {item.extra.map((tag) => (
                      <li
                        key={tag}
                        className={cn(
                          "rounded-full px-3 py-1 text-sm font-semibold",
                          dark ? "bg-white/15 text-white" : "bg-white text-judo-wine ring-1 ring-zinc-200",
                        )}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
