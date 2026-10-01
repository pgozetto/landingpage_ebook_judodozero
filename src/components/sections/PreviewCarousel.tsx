"use client";

import Image from "next/image";
import { useRef } from "react";
import { CaretLeft, CaretRight, ImageSquare } from "@phosphor-icons/react";

type Page = { label: string; src: string | null };

/** Carrossel com scroll-snap nativo: arrasta no celular, setas no desktop, sem biblioteca extra. */
export function PreviewCarousel({ pages }: { pages: Page[] }) {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative mt-12">
      <ul
        ref={track}
        aria-label="Prévia das páginas do ebook"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:scroll-px-6 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((page) => (
          <li key={page.label} className="w-[68vw] shrink-0 snap-start sm:w-64">
            <figure>
              <div className="relative aspect-[420/595] overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-zinc-200">
                {page.src ? (
                  <Image src={page.src} alt={`Página do ebook: ${page.label}`} fill sizes="(min-width: 640px) 256px, 68vw" className="object-cover" />
                ) : (
                  // Espaço reservado visível só em desenvolvimento (ver Preview.tsx)
                  <div className="absolute inset-3 grid place-items-center rounded-xl border-2 border-dashed border-zinc-300 text-center text-sm text-zinc-500">
                    <span className="flex flex-col items-center gap-2 px-4">
                      <ImageSquare aria-hidden className="size-8" />
                      Adicionar print: {page.label}
                    </span>
                  </div>
                )}
              </div>
              <figcaption className="mt-3 text-sm font-semibold text-ink-soft">{page.label}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-4 hidden max-w-6xl justify-end gap-2 px-6 sm:flex">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Página anterior"
          className="grid size-11 place-items-center rounded-full bg-white text-ink ring-1 ring-zinc-300 transition hover:text-judo-red active:scale-95"
        >
          <CaretLeft weight="bold" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Próxima página"
          className="grid size-11 place-items-center rounded-full bg-judo-red text-white transition hover:bg-judo-red-deep active:scale-95"
        >
          <CaretRight weight="bold" className="size-5" />
        </button>
      </div>
    </div>
  );
}
