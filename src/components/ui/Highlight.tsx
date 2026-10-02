"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Destaque de texto: uma faixa (como a faixa do judogi) que se desenha por trás da palavra
 * quando ela entra na tela. `tone="light"` para fundos vermelhos.
 */
export function Highlight({ children, tone = "red" }: { children: ReactNode; tone?: "red" | "light" }) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("relative isolate inline-block whitespace-nowrap", tone === "red" && "text-judo-red")}>
      <motion.span
        aria-hidden
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
        className={cn(
          "absolute inset-x-[-0.12em] bottom-[0.06em] -z-10 h-[0.38em] origin-left rounded-sm",
          tone === "red" ? "bg-judo-red/15" : "bg-white/25",
        )}
      />
      {children}
    </span>
  );
}
