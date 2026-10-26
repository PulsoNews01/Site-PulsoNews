import { defineConfig } from 'astro/config';

// TROQUE pelo endereço real do site quando o domínio estiver ligado.
// Enquanto usar o endereço provisório da Cloudflare, coloque aqui o endereço .pages.dev.
const SITE_URL = 'https://site-pulsonews.pulsonews01.workers.dev';

// Insere um marcador depois do 2º parágrafo de cada matéria.
// É nesse ponto que o anúncio A7 (dentro do texto) é encaixado.
function rehypeMarcadorAnuncio() {
  return (tree) => {
    let paragrafos = 0;
    const idx = tree.children.findIndex((no) => {
      if (no.type === 'element' && no.tagName === 'p') {
        paragrafos += 1;
        return paragrafos === 2;
      }
      return false;
    });
    if (idx !== -1 && tree.children.length > idx + 2) {
      tree.children.splice(idx + 1, 0, {
        type: 'element',
        tagName: 'div',
        properties: { id: 'in-article-marker' },
        children: [],
      });
    }
  };
}

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeMarcadorAnuncio],
  },
});
