import { site } from "@/lib/site";

/** Perguntas da dobra 12. Usadas no acordeão e no JSON-LD (FAQPage) para o Google. */
function contactAnswer() {
  const parts: string[] = [];
  if (site.contactEmail) parts.push(`pelo e-mail ${site.contactEmail}`);
  if (site.social.instagram) parts.push(`pelo direct do Instagram @${site.social.instagram}`);
  if (parts.length === 0) return null;
  return `Fale comigo ${parts.join(" ou ")}.`;
}

export function getFaq() {
  const items: { q: string; a: string }[] = [
    {
      q: "Preciso ter alguma experiência no judô?",
      a: "Não. O ebook foi feito para quem nunca treinou ou está nos primeiros meses.",
    },
    {
      q: "Como eu recebo o ebook?",
      a: "Por e-mail, logo após a confirmação do pagamento. Você também acessa pela área de membros da plataforma.",
    },
    {
      q: "O ebook serve para crianças?",
      a: "Serve como apoio para pais e responsáveis entenderem o que a criança vai aprender. O treino deve sempre ser acompanhado por um professor qualificado.",
    },
    {
      q: "Vou aprender judô só lendo o ebook?",
      a: "O ebook é um guia para chegar ao tatame mais preparado. O aprendizado de verdade acontece nas aulas, com professor e parceiro de treino.",
    },
    {
      q: "Preciso de judogi para usar o ebook?",
      a: "Não para ler. Para praticar as técnicas, o ideal é treinar em um dojo com o uniforme adequado.",
    },
    {
      q: "Posso ler no celular?",
      a: "Sim. O formato foi pensado para a tela do celular e também funciona no tablet e no computador.",
    },
    {
      q: "Quais formas de pagamento?",
      a: `${site.paymentMethods}, conforme a plataforma de pagamento.`,
    },
    {
      q: "E se eu não gostar?",
      a: `Você tem ${site.guaranteeDays} dias de garantia. Se achar que não é para você, é só pedir o reembolso dentro desse prazo.`,
    },
  ];

  const contact = contactAnswer();
  if (contact) items.push({ q: "Como falo com você?", a: contact });
  return items;
}
