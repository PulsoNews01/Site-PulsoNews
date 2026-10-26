# Pulso — site de notícias

Site de notícias de tecnologia, política e entretenimento, feito com Astro e pensado para rodar de graça na Cloudflare (Workers).
As matérias são escritas num painel (`/admin`), sem mexer em código.

## O que tem em cada pasta

| Pasta ou arquivo | Para que serve |
|---|---|
| `src/config.ts` | **Configurações do site**: e-mail, redes sociais, Google Analytics, AdSense, newsletter. |
| `src/content/noticias/` | As matérias (um arquivo por matéria). O painel `/admin` cria e edita estes arquivos. |
| `src/pages/` | As páginas: home, editorias, matéria, busca, sobre, equipe, contato, privacidade, RSS e mapa do site. |
| `src/components/`, `src/layouts/` | Cabeçalho, rodapé, cards, espaços de anúncio e o esqueleto das páginas. |
| `src/styles/global.css` | Cores e visual. |
| `public/admin/` | O painel de edição (Decap CMS) e a configuração dele. |
| `public/uploads/` | Imagens enviadas pelo painel. |
| `worker/` | Login do painel pelo GitHub (roda na Cloudflare). |
| `wrangler.jsonc` | Configuração do Worker da Cloudflare (nome, pasta do site e regra do login). |

## Colocar no ar (Cloudflare Workers)

1. No GitHub, envie o conteúdo desta pasta para o repositório (**Add file → Upload files**, arrastando o **conteúdo** da pasta, não o .zip).
2. Na Cloudflare, o projeto fica ligado ao repositório. A cada envio ao GitHub, o site é refeito sozinho.
3. As configurações de build do projeto (em **Configurações → Compilações**) devem ser:
   - **Comando de build:** `npm run build`
   - **Comando de implantação:** `npx wrangler deploy`
4. Acompanhe em **Implantações**. Em alguns minutos o site abre no endereço `.workers.dev`.
5. Se o build der erro, copie a mensagem completa do log e envie para quem está ajudando com o projeto.

O nome do projeto na Cloudflare precisa ser igual ao campo `name` do arquivo `wrangler.jsonc` (hoje: `site-pulsonews`).

## Trocar o endereço do site (quando tiver o domínio)

O endereço aparece em **três lugares**. Troque o endereço `.workers.dev` pelo real em todos:

1. `astro.config.mjs` → linha `const SITE_URL = ...`
2. `public/admin/config.yml` → `base_url`, `site_url` e `display_url`
3. `src/config.ts` → o campo `email`

No GitHub, também troque o **Authorization callback URL** do aplicativo OAuth para `https://SEU-ENDERECO/api/callback`.

## Ligar o painel /admin

O painel entra com a sua conta do GitHub. Isto é feito uma vez só:

1. No GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - **Homepage URL:** o endereço do site
   - **Authorization callback URL:** `https://SEU-ENDERECO/api/callback`
   - Desmarque **Expire user access tokens**
2. Clique em **Generate a new client secret** e guarde o **Client ID** e o **Client secret**.
3. Na Cloudflare, abra o projeto → **Configurações → Variáveis e segredos** e crie:
   - `GITHUB_CLIENT_ID` com o Client ID
   - `GITHUB_CLIENT_SECRET` com o Client secret (tipo **Segredo**)
4. Se a Cloudflare pedir, faça uma nova implantação para as variáveis valerem.
5. Abra `SEU-ENDERECO/admin/`, clique em **Login with GitHub** e autorize.

Só quem tem permissão de escrita no repositório consegue publicar.

## Publicar uma matéria

1. Entre em `/admin/` e clique em **Nova Matéria**.
2. Preencha título, resumo, editoria, autor e data. Cole o texto no editor.
3. Envie a imagem de capa (largura de 1200 px; prefira arquivos de até 300 KB) e escreva a descrição e o crédito.
4. Clique em **Publicar**. O site é atualizado sozinho em 1 a 3 minutos.

Para guardar sem publicar, marque **Rascunho**. Para uma matéria aparecer grande na home, marque **Destaque na home**.

As 3 matérias que vêm no projeto são **exemplos**. Apague-as antes de divulgar o site (pasta `src/content/noticias/`, ou pelo próprio painel).

## Anúncios (Google AdSense)

Os espaços A1 a A8 já estão posicionados. Para ligar:

1. Peça a aprovação no AdSense só depois de ter páginas Sobre, Equipe, Contato e Privacidade preenchidas e uma boa quantidade de matérias originais.
2. Depois de aprovado, em `src/config.ts` preencha `adsenseClient` (formato `ca-pub-...`) e o ID de cada bloco em `adsenseSlots`.
3. Troque `showAdPlaceholders` para `false` (as caixas tracejadas somem; só aparecem anúncios reais).
4. Crie o arquivo `public/ads.txt` com a linha que o AdSense indicar na sua conta.

Atenção: para visitantes da Europa e do Reino Unido o Google exige um aviso de consentimento de cookies. O projeto ainda não traz esse aviso.

## Google

- **Search Console:** cadastre o site e envie o mapa: `SEU-ENDERECO/sitemap.xml`.
- **Analytics 4:** coloque o ID (`G-...`) em `gaId`, em `src/config.ts`.
- **Newsletter:** crie o formulário no Brevo ou no MailerLite e cole o endereço de envio em `newsletterAction`.

## Antes de divulgar (lista rápida)

- [ ] Trocar o endereço do site nos três lugares (e no aplicativo OAuth do GitHub)
- [ ] Preencher Sobre, Equipe, Contato e Privacidade (procure por `[` nos textos entre colchetes)
- [ ] Apagar as matérias de exemplo
- [ ] `showAdPlaceholders: false` em `src/config.ts`
- [ ] Revisar a política de privacidade com um profissional
- [ ] Enviar o sitemap ao Search Console

## Rodar no seu computador (opcional)

Precisa do Node.js 22. Na pasta do projeto: `npm install` e depois `npm run dev`. O site abre em `http://localhost:4321`.
