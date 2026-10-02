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
import { Highlight } from "@/components/ui/Highlight";
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
    text: "O que levar, como se comportar e como amarrar a faixa sem soltar.",
    icon: BookOpenText,
    className: "lg:col-span-2",
    tone: "plain",
  },
  {
    title: "Ukemi, a arte de cair",
    text: "As 3 quedas básicas. Quem cai bem treina sem medo.",
    icon: ShieldCheck,
    className: "lg:col-span-2",
    tone: "soft",
  },
  {
    title: "5 projeções essenciais",
    text: "Passo a passo e o erro mais comum de cada uma.",
    icon: PersonSimpleTaiChi,
    className: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    tone: "red",
    extra: ["O-soto-gari", "O-goshi", "Ippon-seoi-nage", "O-uchi-gari", "De-ashi-harai"],
  },
  {
    title: "3 imobilizações básicas",
    text: "Kesa, Yoko-shiho e Kami-shiho-gatame para se orientar no chão.",
    icon: Barbell,
    className: "lg:col-span-2",
    tone: "plain",
  },
  {
    title: "Seu primeiro randori",
    text: "Antes, durante e depois da luta livre de treino.",
    icon: Sparkle,
    className: "lg:col-span-2",
    tone: "ink",
  },
  {
    title: "Plano de treino de 90 dias",
    text: "Um roteiro em 3 fases, com checklist mensal.",
    icon: CalendarCheck,
    className: hasBonus ? "lg:col-span-2" : "sm:col-span-2 lg:col-span-3",
    tone: "paper",
    extra: ["Semanas 1 a 4", "Semanas 5 a 8", "Semanas 9 a 12"],
  },
  {
    title: "Glossário judoca",
    text: "Os termos japoneses do treino, em português.",
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
    <section id="conteudo" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-[20ch] text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            O que tem <Highlight>dentro do ebook</Highlight>
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
                className={cn("flex flex-col rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1", toneClass[item.tone], item.className)}
              >
                <Icon
                  aria-hidden
                  weight="duotone"
                  className={cn("size-9", dark ? "text-white" : "text-judo-red")}
                />
                <h3 className="mt-5 text-2xl font-bold leading-snug tracking-tight">{item.title}</h3>
                <p className={cn("mt-2 text-lg leading-relaxed", dark ? "text-white" : "text-ink-soft")}>{item.text}</p>
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
