// Passo 2 do login do painel /admin: troca o código do GitHub por um token e entrega ao painel.
// Só quem tem permissão de escrita no repositório consegue publicar matérias.

function resposta(status, conteudo) {
  const mensagem = `authorization:github:${status}:${JSON.stringify(conteudo)}`;
  const seguro = JSON.stringify(mensagem).replace(/</g, '\\u003c');
  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Entrando…</title></head>
<body>
<p>Entrando no painel… Você já pode fechar esta janela se ela não fechar sozinha.</p>
<script>
(function () {
  function receber(e) {
    window.opener.postMessage(${seguro}, e.origin);
    window.removeEventListener('message', receber, false);
  }
  window.addEventListener('message', receber, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body></html>`;
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'oauth_state=; HttpOnly; Secure; Path=/api; SameSite=Lax; Max-Age=0',
    },
  });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('Cookie') || '';
  const guardado = (cookie.match(/(?:^|;\s*)oauth_state=([^;]+)/) || [])[1];

  if (!code || !state || state !== guardado) {
    return resposta('error', { message: 'Login inválido ou expirado. Feche esta janela e tente de novo.' });
  }
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return resposta('error', { message: 'Faltam GITHUB_CLIENT_ID e GITHUB_CLIENT_SECRET na Cloudflare.' });
  }

  const r = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'pulso-decap-oauth',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/callback`,
    }),
  });
  const dados = await r.json();

  if (!dados.access_token) {
    return resposta('error', { message: dados.error_description || dados.error || 'O GitHub não autorizou o login.' });
  }
  return resposta('success', { token: dados.access_token, provider: 'github' });
}
