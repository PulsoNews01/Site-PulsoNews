import { categoryList } from '../lib/categories';
import { getPosts, postUrl } from '../lib/posts';

// Mapa do site para o Google (/sitemap.xml). Enviar este endereço no Search Console.
export async function GET({ site: base }: { site?: URL }) {
  const origem = (base ?? new URL('https://seudominio.com.br')).href.replace(/\/$/, '');
  const posts = await getPosts();

  const fixas = ['/', ...categoryList.map((c) => `/${c.slug}/`), '/sobre/', '/equipe/', '/contato/', '/privacidade/'];

  const urls = [
    ...fixas.map((u) => `  <url><loc>${origem}${u}</loc></url>`),
    ...posts.map(
      (p) =>
        `  <url><loc>${origem}${postUrl(p)}</loc><lastmod>${(p.data.updatedDate ?? p.data.pubDate).toISOString()}</lastmod></url>`,
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
