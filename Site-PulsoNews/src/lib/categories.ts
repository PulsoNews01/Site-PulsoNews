// As três editorias do Pulso. Cores iguais às do design aprovado.

export const categories = {
  tecnologia: {
    slug: 'tecnologia',
    label: 'Tecnologia',
    short: 'Tech',
    chip: '#1D4ED8',
    tint: '#1B2A55',
    icon: '#8EA7E8',
    accentVar: '--tech',
    description:
      'Celulares, inteligência artificial, segurança digital e o que a tecnologia muda no seu dia a dia.',
    navIcon:
      '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
  },
  politica: {
    slug: 'politica',
    label: 'Política',
    short: 'Política',
    chip: '#B42318',
    tint: '#3B1A1F',
    icon: '#E79088',
    accentVar: '--pol',
    description:
      'Congresso, governo e decisões públicas explicadas com contexto e sem juridiquês.',
    navIcon:
      '<path d="M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M2 10l10-6 10 6"/>',
  },
  entretenimento: {
    slug: 'entretenimento',
    label: 'Entretenimento',
    short: 'Pop',
    chip: '#7C3AED',
    tint: '#2E1F5E',
    icon: '#B79CFF',
    accentVar: '--ent',
    description:
      'Cinema, séries, música, games e cultura pop: o que vale o seu tempo.',
    navIcon:
      '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  },
} as const;

export type CategorySlug = keyof typeof categories;
export const categoryList = Object.values(categories);

// Variáveis de cor usadas pelos cards e pelas fotos de reserva.
export function catStyle(slug: CategorySlug): string {
  const c = categories[slug];
  return `--chip:${c.chip};--tint:${c.tint};--icon:${c.icon};--accent:var(${c.accentVar})`;
}
