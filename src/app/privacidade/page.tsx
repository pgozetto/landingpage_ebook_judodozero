import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  alternates: { canonical: "/privacidade" },
};

// MODELO INICIAL. Revise com um profissional antes de publicar.
export default function PrivacyPage() {
  const contact = site.contactEmail || "o e-mail de contato informado nesta página";
  return (
    <LegalPage title="Política de privacidade">
      <p>
        Esta política explica como {site.authorName} trata os dados pessoais de quem visita o site do Judô do Zero,
        baixa o mini guia ou compra o ebook, de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
      </p>
      <h2>Quais dados coletamos</h2>
      <p>
        Nome e e-mail, quando você pede o mini guia grátis. Dados de compra (nome, e-mail, CPF e pagamento) são
        coletados e processados diretamente pela plataforma de pagamento, não por este site. Também usamos cookies e
        pixels de medição (Google Analytics, Meta e TikTok) para entender de onde vêm as visitas e melhorar os anúncios.
      </p>
      <h2>Para que usamos</h2>
      <p>
        Para enviar o material que você pediu, entregar o ebook comprado, prestar suporte e mandar conteúdos sobre
        judô. Você pode sair da lista de e-mails a qualquer momento pelo link no rodapé de cada mensagem.
      </p>
      <h2>Com quem compartilhamos</h2>
      <p>
        Apenas com os serviços necessários para operar: plataforma de pagamento, ferramenta de envio de e-mails,
        hospedagem e ferramentas de medição. Não vendemos seus dados.
      </p>
      <h2>Seus direitos</h2>
      <p>
        Você pode pedir acesso, correção, portabilidade ou exclusão dos seus dados, além de revogar o consentimento,
        escrevendo para {contact}.
      </p>
    </LegalPage>
  );
}
