import { site } from '../config';
import { getPosts, postUrl } from '../lib/posts';

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Feed RSS com as 30 matérias mais recentes (/rss.xml).
export async function GET({ site: base }: { site?: URL }) {
  const origem = (base ?? new URL('https://seudominio.com.br')).href.replace(/\/$/, '');
  const posts = (await getPosts()).slice(0, 30);

  const itens = posts
    .map((p) => {
      const link = `${origem}${postUrl(p)}`;
      return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>
      <category>${esc(p.data.category)}</category>
      <description>${esc(p.data.description)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${origem}/</link>
    <description>${esc(site.description)}</description>
    <language>pt-BR</language>
${itens}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
