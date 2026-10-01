# Integração com o backend (Node.js + Express)

O front já está pronto para falar com o Express. Falta só implementar o servidor seguindo este contrato.

## Arquitetura

```
Navegador ──► Next.js /api/leads ──► Express /v1/leads ──► banco + ferramenta de e-mail
                (valida, esconde a chave)

Hotmart/Kiwify/Eduzz ──webhook──► Express /v1/webhooks/:provider ──► e-mail de entrega
```

- O navegador **nunca** chama o Express direto. As rotas `/api/*` do Next repassam a chamada com `x-api-key`.
  Isso evita CORS e não expõe a URL nem a chave do backend.
- Tipos e validação compartilhados ficam em [`shared/contracts.ts`](../shared/contracts.ts).
- O e-mail de entrega (Página 4 da copy) já está pronto em [`shared/emails/delivery.ts`](../shared/emails/delivery.ts).
- O cliente HTTP do lado do Next está em [`src/lib/backend.ts`](../src/lib/backend.ts).

## Variáveis no Next (`.env.local`)

| Variável | Exemplo |
| --- | --- |
| `BACKEND_API_URL` | `http://localhost:4000` |
| `BACKEND_API_KEY` | mesma chave configurada no Express |

Enquanto `BACKEND_API_URL` estiver vazia, em desenvolvimento os leads aparecem só no terminal do `npm run dev`.
Em produção a rota responde 503 e o formulário mostra uma mensagem de erro (para nenhum lead ser descartado em silêncio).

## Endpoints que o Express deve implementar

Todos sob o prefixo `/v1`, JSON, exigindo o header `x-api-key` (exceto webhooks, que usam a assinatura da plataforma).

### `POST /v1/leads`

Corpo (`LeadRequest`):

```json
{
  "name": "Mariana",
  "email": "mariana@email.com",
  "source": "mini-guia",
  "utm": { "utm_source": "instagram", "utm_campaign": "bio" },
  "consent": true
}
```

Respostas:

| Status | Corpo |
| --- | --- |
| 200 | `{ "ok": true, "id": "..." }` |
| 422 | `{ "ok": false, "code": "VALIDATION_ERROR", "message": "...", "fields": { "email": "..." } }` |
| 429 | `{ "ok": false, "code": "RATE_LIMITED", "message": "..." }` |

O que fazer: validar de novo com `validateLead`, salvar (upsert por e-mail), cadastrar na ferramenta de e-mail
e enviar o mini guia. Responder 200 também quando o e-mail já existir.

### `POST /v1/webhooks/:provider` (`hotmart` | `kiwify` | `eduzz`)

1. Validar a assinatura/token do webhook da plataforma.
2. Normalizar para `PurchaseEvent` (ver `shared/contracts.ts`).
3. Se `status === "approved"`: enviar `buildDeliveryEmail(...)` para o comprador. Garantir idempotência por `transactionId`.
4. Se `refunded` ou `chargeback`: revogar o acesso, se houver área de membros própria.

### `GET /v1/health`

`{ "ok": true }` para monitoramento.

## Esqueleto sugerido

```
backend/
  src/
    server.ts            # express(), helmet, cors fechado, express.json({ limit: "10kb" })
    middleware/apiKey.ts # compara x-api-key com process.env.API_KEY
    routes/leads.ts      # usa validateLead de ../shared/contracts
    routes/webhooks.ts
  package.json           # express, helmet, express-rate-limit
```

Pacotes recomendados: `express`, `helmet`, `express-rate-limit`, `zod` (opcional), um SDK de e-mail (Resend, Brevo ou SES).
