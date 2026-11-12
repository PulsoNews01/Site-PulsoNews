// Configurações do site. É o único arquivo que você precisa editar com frequência.

export const site = {
  name: 'Pulso',
  tagline: 'Notícias em tempo real',
  description:
    'Notícias de tecnologia, política e entretenimento com clareza, contexto e checagem.',

  // E-mail que aparece no rodapé e na página de contato.
  email: 'pulsonews01@gmail.com',

  // Redes sociais: deixe vazio para esconder o botão no rodapé.
  social: {
    instagram: '',
    youtube: '',
    x: '',
  },

  // Imagem usada quando a matéria é compartilhada sem foto.
  defaultImage: '/og-default.png',

  // Google Analytics 4: ID no formato G-XXXXXXXXXX. Vazio = desligado.
  gaId: 'G-LJJEM53M4Q',

  // Google AdSense: preencha DEPOIS de ser aprovado.
  // adsenseClient no formato ca-pub-0000000000000000
  adsenseClient: 'ca-pub-3683206386941866',
  // ID de cada bloco de anúncio (criados dentro do painel do AdSense).
  adsenseSlots: {
    A1: '9428831595',
    A2: '4930524247',
    A3: '',
    A4: '4247997968',
    A5: '6531205512',
    A6: '7173544205',
    A7: '',
    A8: '',
  } as Record<string, string>,

  // true = mostra as caixas tracejadas "PUBLICIDADE" onde irão os anúncios.
  // Coloque false antes de divulgar o site e enquanto o AdSense não estiver ligado.
  showAdPlaceholders: false,

  // Endereço de envio do formulário de newsletter (Brevo, MailerLite etc.).
  // Vazio = o formulário mostra um aviso de que ainda não está ativo.
  newsletterAction: '',
};
