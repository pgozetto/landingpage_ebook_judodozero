/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 *
 * Tudo o que estava entre [colchetes] na copy está aqui.
 * Campos com `null` ou lista vazia escondem automaticamente o trecho da página
 * que dependeria deles, para nunca publicar um dado inventado.
 * Procure por "PREENCHER" para ver o que falta.
 */

export const site = {
  name: "Judô do Zero",
  authorName: "Pedro Gozetto",
  authorBelt: "faixa marrom",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  seo: {
    title: "Judô do Zero: ebook para iniciantes | Pedro Gozetto",
    description:
      "Guia prático de judô para faixas brancas: quedas, projeções, imobilizações, etiqueta e plano de treino de 90 dias. Com vídeo de cada técnica.",
    keywords: [
      "ebook de judô",
      "judô para iniciantes",
      "como começar no judô",
      "aprender judô",
      "faixa branca judô",
      "ukemi",
      "projeções de judô",
    ],
  },

  /** Link do checkout (Hotmart / Kiwify / Eduzz). PREENCHER via .env */
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || "",
  /** Link da área de membros / download, usado na página de obrigado. PREENCHER via .env */
  ebookAccessUrl: process.env.NEXT_PUBLIC_EBOOK_ACCESS_URL || "",
  /** Plataforma que processa a compra. PREENCHER */
  paymentProvider: null as "Hotmart" | "Kiwify" | "Eduzz" | null,
  paymentMethods: "Pix, cartão e boleto", // PREENCHER: confirme as opções ativas

  price: {
    /** Preço de lançamento em reais. PREENCHER (faixa sugerida: R$ 27 a R$ 47) */
    current: 37,
    /** Preço cheio ("De R$ ..."). `null` esconde o riscado. PREENCHER */
    full: null as number | null,
    /** Parcelamento exato mostrado pela plataforma. `null` esconde. PREENCHER */
    installments: null as { count: number; value: number } | null,
    /** Use SOMENTE se for verdade. `null` esconde o gatilho de urgência. */
    launchDeadline: null as { date: string; nextPrice: number } | null,
  },

  /** Prazo de garantia em dias (o CDC exige no mínimo 7 para compras online). */
  guaranteeDays: 7,
  /** Número de páginas do PDF (Judo_do_Zero_EBOOK_v1.pdf). `null` esconde. */
  ebookPages: 26 as number | null,
  /** Bônus da oferta (página 24 do ebook). `null` esconde o card e o item da oferta. */
  bonus: {
    title: "Playlist com todos os vídeos",
    description: "Todos os vídeos das técnicas reunidos em uma playlist, para rever antes e depois de cada treino.",
  } as { title: string; description: string } | null,

  social: {
    /** Sem o @. Vazio esconde o link. (Mesmos perfis da capa e da página 25 do ebook.) */
    instagram: "pgozettojudo",
    tiktok: "pedrogozetto.judo",
  },
  /** E-mail de suporte. PREENCHER */
  contactEmail: "",
  /** CNPJ/CPF para o rodapé, se necessário. */
  legalId: "",

  author: {
    /** Frase de destaque da dobra 3. Confirme se combina com a sua história. */
    introQuote: "Eu escrevi o guia que eu queria ter lido quando era faixa branca.",
    /** Foto de judogi (recortada e tratada a partir da foto original). */
    photo: "/images/pedro.webp" as string | null,
  },

  /**
   * Depoimentos REAIS (com autorização). Lista vazia esconde a dobra 9.
   * Ex.: { quote: "...", name: "Mariana Albuquerque", detail: "faixa branca, 2 meses de treino" }
   */
  testimonials: [] as { quote: string; name: string; detail: string }[],

  /**
   * Prints das páginas do ebook para o carrossel (dobra 7), gerados a partir do PDF em /public/ebook/.
   */
  previewPages: [
    { label: "Sumário", src: "/ebook/sumario.webp" },
    { label: "Técnica: O-soto-gari", src: "/ebook/tecnica-o-soto-gari.webp" },
    { label: "Três imobilizações", src: "/ebook/imobilizacoes.webp" },
    { label: "Plano de 90 dias", src: "/ebook/plano-90-dias.webp" },
    { label: "Glossário judoca", src: "/ebook/glossario.webp" },
    { label: "Bônus e próximos passos", src: "/ebook/bonus.webp" },
  ] as { label: string; src: string | null }[],
} as const;

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const BRL_INT = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** R$ 37 para valores inteiros, R$ 9,90 para valores com centavos. */
export function formatPrice(value: number) {
  return Number.isInteger(value) ? BRL_INT.format(value) : BRL.format(value);
}

export function socialUrl(network: "instagram" | "tiktok") {
  const handle = site.social[network];
  if (!handle) return null;
  return network === "instagram"
    ? `https://www.instagram.com/${handle}/`
    : `https://www.tiktok.com/@${handle}`;
}
