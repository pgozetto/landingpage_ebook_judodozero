import { Author } from "@/components/sections/Author";
import { Contents } from "@/components/sections/Contents";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { ForWho } from "@/components/sections/ForWho";
import { Guarantee } from "@/components/sections/Guarantee";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Offer } from "@/components/sections/Offer";
import { Pains } from "@/components/sections/Pains";
import { Preview } from "@/components/sections/Preview";
import { QrVideos } from "@/components/sections/QrVideos";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/JsonLd";
import { getFaq } from "@/content/faq";
import { site, socialUrl } from "@/lib/site";

export default function SalesPage() {
  const sameAs = [socialUrl("instagram"), socialUrl("tiktok")].filter(Boolean);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Book",
      name: "Judô do Zero: seus primeiros 90 dias no tatame",
      description: site.seo.description,
      bookFormat: "https://schema.org/EBook",
      inLanguage: "pt-BR",
      url: site.url,
      image: `${site.url}/opengraph-image`,
      ...(site.ebookPages ? { numberOfPages: site.ebookPages } : {}),
      author: { "@type": "Person", name: site.authorName, ...(sameAs.length ? { sameAs } : {}) },
      offers: {
        "@type": "Offer",
        price: site.price.current.toFixed(2),
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: site.checkoutUrl || `${site.url}/#oferta`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: getFaq().map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Header />
      <main>
        <Hero />
        <Pains />
        <Intro />
        <Contents />
        <QrVideos />
        <ForWho />
        <Preview />
        <Author />
        <Testimonials />
        <Offer />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
