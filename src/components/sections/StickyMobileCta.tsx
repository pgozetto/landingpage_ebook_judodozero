"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { formatPrice, site } from "@/lib/site";

/**
 * Botão fixo no rodapé do celular. Aparece depois da dobra 2 (identificação)
 * e some enquanto a oferta ou a chamada final estão na tela, para não duplicar o CTA.
 */
export function StickyMobileCta() {
  const [pastPains, setPastPains] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const pains = document.getElementById("identificacao");
    const offer = document.getElementById("oferta");
    if (!pains) return;

    const painsObserver = new IntersectionObserver(([entry]) => {
      // Passou da dobra 2 quando ela saiu da tela por cima.
      setPastPains(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    painsObserver.observe(pains);

    const visible = new Set<Element>();
    const offerObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setCtaVisible(visible.size > 0);
      },
      { threshold: 0.15 },
    );
    for (const el of [offer, document.getElementById("chamada-final")]) if (el) offerObserver.observe(el);

    return () => {
      painsObserver.disconnect();
      offerObserver.disconnect();
    };
  }, []);

  const show = pastPains && !ctaVisible;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduce ? false : { y: 100 }}
          animate={{ y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: 100 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="shrink-0 leading-tight">
              <p className="text-xs text-ink-soft">Lançamento</p>
              <p className="font-display text-xl font-extrabold text-judo-red">{formatPrice(site.price.current)}</p>
            </div>
            <CheckoutButton location="sticky-mobile" label="Baixar agora" fullWidth />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
