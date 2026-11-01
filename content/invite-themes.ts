export type InvitePalette = {
  paper: string
  ink: string
  muted: string
  accent: string
  envelope: string
  envelopeShade: string
  seal: string
  sealInk: string
}

export type InviteTheme = {
  id: string
  label: string
  kicker: string
  names: string
  dateISO: string
  dateLabel: string
  place: string
  city: string
  invitation: string
  ornament: 'leaf' | 'star' | 'dot' | 'cloud' | 'line'
  italicNames: boolean
  palette: InvitePalette
}

export const inviteThemes: InviteTheme[] = [
  {
    id: 'casamento',
    label: 'Casamento',
    kicker: 'Com alegria, convidamos para o nosso casamento',
    names: 'Marina & Rafael',
    dateISO: '2027-03-14T16:30:00-03:00',
    dateLabel: '14 de março · 16h30',
    place: 'Casa Amarela',
    city: 'Salvador',
    invitation: 'Sua presença vai tornar esse dia ainda mais nosso.',
    ornament: 'leaf',
    italicNames: true,
    palette: {
      paper: '#FAF8F4',
      ink: '#0E1116',
      muted: '#4A505A',
      accent: '#0F766E',
      envelope: '#F1ECE4',
      envelopeShade: '#E4DED4',
      seal: '#0F766E',
      sealInk: '#FAF8F4',
    },
  },
  {
    id: 'quinze',
    label: '15 anos',
    kicker: 'Uma noite para celebrar',
    names: 'Os 15 anos de Valentina',
    dateISO: '2027-05-22T21:00:00-03:00',
    dateLabel: '22 de maio · 21h',
    place: 'Espaço Jardim de Inverno',
    city: 'Belo Horizonte',
    invitation: 'Venha viver comigo a noite que eu sempre sonhei.',
    ornament: 'star',
    italicNames: true,
    palette: {
      paper: '#1B1530',
      ink: '#F6EEF5',
      muted: '#C9BCD6',
      accent: '#E8B4C8',
      envelope: '#2A2147',
      envelopeShade: '#211A3A',
      seal: '#E8B4C8',
      sealInk: '#1B1530',
    },
  },
  {
    id: 'aniversario',
    label: 'Aniversário',
    kicker: 'Bora comemorar?',
    names: 'Celebrando os 40 de André',
    dateISO: '2027-02-06T20:00:00-03:00',
    dateLabel: '6 de fevereiro · 20h',
    place: 'Terraço Vila Nova',
    city: 'São Paulo',
    invitation: 'Quatro décadas merecem os melhores amigos por perto.',
    ornament: 'dot',
    italicNames: false,
    palette: {
      paper: '#FFF4E6',
      ink: '#2B1A0E',
      muted: '#6B5444',
      accent: '#E2552E',
      envelope: '#F7D9B5',
      envelopeShade: '#EFC79A',
      seal: '#E2552E',
      sealInk: '#FFF4E6',
    },
  },
  {
    id: 'cha',
    label: 'Chá de bebê',
    kicker: 'Um novo capítulo vai começar',
    names: 'Chegou a hora de conhecer o Theo',
    dateISO: '2027-01-24T15:00:00-03:00',
    dateLabel: '24 de janeiro · 15h',
    place: 'Casa da vovó Lúcia',
    city: 'Curitiba',
    invitation: 'Uma tarde cheia de carinho para receber quem está chegando.',
    ornament: 'cloud',
    italicNames: true,
    palette: {
      paper: '#F3F7FA',
      ink: '#1E3448',
      muted: '#55697B',
      accent: '#6E9BC2',
      envelope: '#DCE8F1',
      envelopeShade: '#C9DAE7',
      seal: '#6E9BC2',
      sealInk: '#F3F7FA',
    },
  },
  {
    id: 'corporativo',
    label: 'Corporativo',
    kicker: 'Você está convidado',
    names: 'Convenção Anual · Noite de Gala',
    dateISO: '2027-04-15T19:30:00-03:00',
    dateLabel: '15 de abril · 19h30',
    place: 'Centro de Convenções',
    city: 'Rio de Janeiro',
    invitation: 'Uma noite para reconhecer quem faz a nossa história.',
    ornament: 'line',
    italicNames: false,
    palette: {
      paper: '#0E1116',
      ink: '#FAF8F4',
      muted: '#A4AAB3',
      accent: '#5EEAD4',
      envelope: '#1A1F27',
      envelopeShade: '#151920',
      seal: '#5EEAD4',
      sealInk: '#0E1116',
    },
  },
]

export const defaultTheme = inviteThemes[0]
