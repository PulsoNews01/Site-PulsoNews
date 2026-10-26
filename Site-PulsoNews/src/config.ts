// Configurações do site. É o único arquivo que você precisa editar com frequência.

export const site = {
  name: 'Pulso',
  tagline: 'Notícias em tempo real',
  description:
    'Notícias de tecnologia, política e entretenimento com clareza, contexto e checagem.',

  // E-mail que aparece no rodapé e na página de contato.
  email: 'contato@seudominio.com.br',

  // Redes sociais: deixe vazio para esconder o botão no rodapé.
  social: {
    instagram: '',
    youtube: '',
    x: '',
  },

  // Imagem usada quando a matéria é compartilhada sem foto.
  defaultImage: '/og-default.png',

  // Google Analytics 4: ID no formato G-XXXXXXXXXX. Vazio = desligado.
  gaId: '',

  // Google AdSense: preencha DEPOIS de ser aprovado.
  // adsenseClient no formato ca-pub-0000000000000000
  adsenseClient: '',
  // ID de cada bloco de anúncio (criados dentro do painel do AdSense).
  adsenseSlots: {
    A1: '',
    A2: '',
    A3: '',
    A4: '',
    A5: '',
    A6: '',
    A7: '',
    A8: '',
  } as Record<string, string>,

  // true = mostra as caixas tracejadas "PUBLICIDADE" onde irão os anúncios.
  // Coloque false antes de divulgar o site e enquanto o AdSense não estiver ligado.
  showAdPlaceholders: true,

  // Endereço de envio do formulário de newsletter (Brevo, MailerLite etc.).
  // Vazio = o formulário mostra um aviso de que ainda não está ativo.
  newsletterAction: '',
};
