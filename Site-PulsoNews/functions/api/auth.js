// Passo 1 do login do painel /admin: envia a pessoa para a tela de autorização do GitHub.
// Roda na Cloudflare Pages (pasta functions). Precisa das variáveis GITHUB_CLIENT_ID e GITHUB_CLIENT_SECRET.

export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('Falta configurar GITHUB_CLIENT_ID na Cloudflare.', { status: 500 });
  }

  const url = new URL(request.url);
  const state = crypto.randomUUID();

  const destino = new URL('https://github.com/login/oauth/authorize');
  destino.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  destino.searchParams.set('redirect_uri', `${url.origin}/api/callback`);
  destino.searchParams.set('scope', 'repo,user');
  destino.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: destino.href,
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; Path=/api; SameSite=Lax; Max-Age=600`,
    },
  });
}
