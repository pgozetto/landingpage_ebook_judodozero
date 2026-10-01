# Judô do Zero: landing page do ebook

Site de vendas do ebook **Judô do Zero: seus primeiros 90 dias no tatame**, de Pedro Gozetto.
Um guia para faixas brancas com quedas, cinco projeções, três imobilizações, primeiro randori,
plano de treino de 90 dias e glossário judoca.

<img src="public/ebook/capa.webp" alt="Capa do ebook Judô do Zero" width="220">

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19, Server Components)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) para as animações de entrada (respeita `prefers-reduced-motion`)
- [Phosphor Icons](https://phosphoricons.com)
- Preparado para um backend **Node.js + Express** (ver [docs/BACKEND.md](docs/BACKEND.md))

## Rodando localmente

Requisitos: Node.js 20 ou mais novo.

```bash
npm install
cp .env.example .env.local   # preencha os valores
npm run dev                  # http://localhost:3000
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run start` | serve o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | verificação de tipos do TypeScript |
| `npm run favicon` | gera `src/app/favicon.ico` a partir de `src/app/icon.svg` |

## Páginas (funil)

Conteúdo nas redes → Captura (mini guia) → Página de vendas → Checkout → Obrigado → E-mail de entrega.

| Rota | Função |
| --- | --- |
| `/` | Página de vendas, com 13 dobras (hero, dores, apresentação, conteúdo, vídeos, para quem é, prévia, autor, depoimentos, oferta, garantia, FAQ, chamada final) |
| `/mini-guia` | Captura de e-mail para o mini guia grátis |
| `/obrigado` | Pós-compra (fora do Google). Configure como página de obrigado na plataforma de pagamento |
| `/termos`, `/privacidade`, `/contato` | Páginas legais (modelos: revise antes de publicar) |
| `/api/leads` | Recebe o formulário e repassa ao backend Express |

## Estrutura

```
src/
  app/                 rotas, layout, SEO (sitemap, robots, manifest, OG image, ícones)
  components/
    sections/          uma dobra da página de vendas por arquivo
    ui/                botão de compra, mockup do ebook, logo, animação de entrada
  content/faq.ts       perguntas frequentes (também viram JSON-LD)
  lib/
    site.ts            CONFIGURAÇÃO CENTRAL: preço, links, redes, bônus, depoimentos
    analytics.ts       eventos do funil (GA4, Meta Pixel, TikTok Pixel) e UTMs
    backend.ts         cliente HTTP do Next para o Express
shared/
  contracts.ts         tipos e validação usados pelo front e pelo backend
  emails/delivery.ts   e-mail de entrega do ebook (HTML + texto)
public/ebook/          capa e páginas de prévia, geradas a partir do PDF do ebook
docs/BACKEND.md        contrato dos endpoints do Express
```

## Onde editar

- **Preço, links, redes, bônus, depoimentos e história do autor:** `src/lib/site.ts`.
  Campos vazios (`null`, `""` ou `[]`) escondem o trecho correspondente da página, para nada inventado ir ao ar.
- **Textos das dobras:** `src/components/sections/*.tsx`.
- **Cores e fontes:** bloco `@theme` em `src/app/globals.css` (vermelho `#C8102E`, vinho `#4A0510`, off-white `#FAF8F7`).
- **Capa e prévias:** substitua os arquivos em `public/ebook/` mantendo os nomes.

## Variáveis de ambiente

Veja [.env.example](.env.example).

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | domínio final (SEO, sitemap, Open Graph) |
| `NEXT_PUBLIC_CHECKOUT_URL` | link do checkout (Hotmart, Kiwify ou Eduzz). Sem ele, os botões rolam até a oferta |
| `NEXT_PUBLIC_EBOOK_ACCESS_URL` | link de acesso mostrado em `/obrigado` |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | rastreamento (opcional) |
| `BACKEND_API_URL`, `BACKEND_API_KEY` | backend Express (somente servidor) |

## SEO

- Título, descrição, palavras-chave e Open Graph em `src/app/layout.tsx`.
- Imagem de compartilhamento 1200×630 gerada com a capa real em `src/app/opengraph-image.tsx`.
- `sitemap.xml`, `robots.txt` e `manifest.webmanifest` gerados pelo Next.
- Dados estruturados JSON-LD: `Book` (com oferta e preço) e `FAQPage`.
- Fontes com `next/font`, imagens com `next/image` e hero sem depender de JavaScript para aparecer (LCP).

## Rastreamento

Eventos enviados para GA4, Meta Pixel e TikTok Pixel (só carregam se o ID existir):
`cta_click`, `initiate_checkout` (InitiateCheckout), `lead` (Lead) e `purchase_thank_you`.
As UTMs da primeira visita são repassadas ao link do checkout e ao formulário do mini guia.

## Backend

O navegador nunca chama o Express direto: as rotas `/api/*` do Next repassam a requisição com a chave secreta.
Contrato completo, webhook de compra e esqueleto sugerido em [docs/BACKEND.md](docs/BACKEND.md).

## Licença

© 2026 Pedro Gozetto. Todos os direitos reservados. O conteúdo do ebook e as imagens em `public/ebook/`
não podem ser reproduzidos sem autorização.
