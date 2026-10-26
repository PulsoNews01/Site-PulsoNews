import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'noticias'>;

// Todas as matérias publicadas (rascunhos ficam de fora), da mais nova para a mais antiga.
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('noticias', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// Endereço da matéria: /editoria/nome-da-materia/
export const postUrl = (p: Post): string => `/${p.data.category}/${p.id}/`;

const tz = 'America/Sao_Paulo';

export const fmtDate = (d: Date): string =>
  d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: tz });

export const fmtTime = (d: Date): string =>
  d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: tz });

export const fmtDateTime = (d: Date): string => `${fmtDate(d)} às ${fmtTime(d)}`;

// Data por extenso (data de montagem do site).
export const fmtLong = (): string =>
  new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: tz,
  });

// Tempo de leitura estimado (200 palavras por minuto).
export const readMinutes = (p: Post): number =>
  Math.max(1, Math.round((p.body ?? '').split(/\s+/).filter(Boolean).length / 200));
