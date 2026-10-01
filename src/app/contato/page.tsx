import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site, socialUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  alternates: { canonical: "/contato" },
};

export default function ContactPage() {
  const instagram = socialUrl("instagram");
  return (
    <LegalPage title="Contato">
      <p>Dúvidas sobre o ebook, a compra ou o acesso? Fale comigo.</p>
      {site.contactEmail ? (
        <p>
          E-mail: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>
      ) : null}
      {instagram ? (
        <p>
          Instagram:{" "}
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            @{site.social.instagram}
          </a>
        </p>
      ) : null}
      {!site.contactEmail && !instagram ? <p>Os canais de contato serão publicados em breve.</p> : null}
    </LegalPage>
  );
}
