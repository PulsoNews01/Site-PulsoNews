// Regras para os robôs do Google (/robots.txt).
export function GET({ site }: { site?: URL }) {
  const origem = (site ?? new URL('https://seudominio.com.br')).href.replace(/\/$/, '');
  const texto = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${origem}/sitemap.xml
`;
  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
