import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de uso",
  alternates: { canonical: "/termos" },
};

// MODELO INICIAL. Revise com um profissional antes de publicar.
export default function TermsPage() {
  return (
    <LegalPage title="Termos de uso">
      <p>
        Ao acessar este site ou adquirir o ebook Judô do Zero, você concorda com os termos abaixo.
      </p>
      <h2>Finalidade educativa</h2>
      <p>
        O conteúdo tem fins educativos e não substitui o acompanhamento de um professor qualificado. Consulte um
        médico antes de iniciar qualquer atividade física. Pratique as técnicas apenas em um dojo, com supervisão.
        Os resultados variam de pessoa para pessoa.
      </p>
      <h2>Direitos autorais</h2>
      <p>
        O ebook, os vídeos e os textos deste site são de autoria de {site.authorName}. A licença é pessoal e
        intransferível: não é permitido revender, copiar ou compartilhar o arquivo ou os links dos vídeos.
      </p>
      <h2>Garantia e reembolso</h2>
      <p>
        Você tem {site.guaranteeDays} dias a partir da compra para pedir o reembolso, sem precisar justificar, pela
        própria plataforma de pagamento ou pelo contato de suporte.
      </p>
      <h2>Alterações</h2>
      <p>Estes termos podem ser atualizados. A versão válida é sempre a publicada nesta página.</p>
    </LegalPage>
  );
}
