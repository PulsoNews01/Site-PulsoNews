// Worker do Pulso. Ele só cuida do login do painel /admin (/api/auth e /api/callback).
// O resto do site é servido direto dos arquivos prontos da pasta dist, sem passar por aqui.

import { handleAuth, handleCallback } from './oauth.js';

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (request.method === 'GET' && pathname === '/api/auth') return handleAuth(request, env);
    if (request.method === 'GET' && pathname === '/api/callback') return handleCallback(request, env);

    return env.ASSETS.fetch(request);
  },
};

