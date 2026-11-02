export type MomentOverlay = 'envelope' | 'rsvp' | 'countdown' | 'location' | 'audio' | 'pix'

export type Moment = {
  id: string
  image?: string
  alt: string
  tag: string
  overlay: MomentOverlay
  caption: string
}

export const momentsHint = 'Toque ou arraste para ver cada momento'

export const momentsCta = 'Quero que meus convidados sintam isso'

export const STORY_DURATION_MS = 5000

export const momentList: Moment[] = [
  {
    id: 'noiva',
    image: '/images/momentos/noiva-emocionada.png',
    alt: 'Mulher sorrindo emocionada enquanto olha o convite no celular, sob luz natural de fim de tarde',
    tag: 'Casamento',
    overlay: 'envelope',
    caption: 'O primeiro sorriso do grande dia.',
  },
  {
    id: 'avos',
    image: '/images/momentos/avos-sofa.png',
    alt: 'Casal de avós sentado no sofá vendo o convite juntos no celular',
    tag: 'Casamento',
    overlay: 'rsvp',
    caption: 'Simples para todas as idades.',
  },
  {
    id: 'amigas',
    image: '/images/momentos/amigas-cafe.png',
    alt: 'Três amigas rindo em volta de um celular em um café',
    tag: 'Aniversário',
    overlay: 'countdown',
    caption: 'Compartilhado em segundos.',
  },
  {
    id: 'debutante',
    image: '/images/momentos/debutante-mae.png',
    alt: 'Adolescente mostrando o convite de 15 anos no celular para a mãe',
    tag: '15 anos',
    overlay: 'location',
    caption: 'Do jeito que ela sonhou.',
  },
  {
    id: 'detalhe',
    image: '/images/momentos/maos-celular.png',
    alt: 'Close de mãos segurando o celular com o convite aberto',
    tag: 'Chá de bebê',
    overlay: 'audio',
    caption: 'Cada detalhe, pensado.',
  },
  {
    id: 'casal',
    image: '/images/momentos/casal-sofa.png',
    alt: 'Casal no sofá abrindo o convite no celular e rindo',
    tag: 'Bodas',
    overlay: 'pix',
    caption: 'Tudo resolvido em um toque.',
  },
]

export type LiveReaction = {
  id: string
  icon: 'check' | 'map' | 'gift' | 'music'
  text: string
}

export const liveReactions: LiveReaction[] = [
  { id: 'ana', icon: 'check', text: 'Ana confirmou presença · 2 pessoas' },
  { id: 'carlos', icon: 'map', text: 'Carlos abriu a rota até o local' },
  { id: 'pix', icon: 'gift', text: 'Pix de presente copiado' },
  { id: 'musica', icon: 'music', text: '18 convidados ouviram a música hoje' },
  { id: 'souza', icon: 'check', text: 'Família Souza confirmou presença · 4 pessoas' },
]
