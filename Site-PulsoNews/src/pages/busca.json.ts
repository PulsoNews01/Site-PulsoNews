import { categories } from '../lib/categories';
import { getPosts, postUrl } from '../lib/posts';

// Índice usado pela página de busca (/busca/): título, resumo, endereço, editoria e assuntos.
export async function GET() {
  const posts = await getPosts();
  const dados = posts.map((p) => ({
    t: p.data.title,
    d: p.data.description,
    u: postUrl(p),
    c: categories[p.data.category].label,
    g: p.data.tags ?? [],
  }));
  return new Response(JSON.stringify(dados), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
