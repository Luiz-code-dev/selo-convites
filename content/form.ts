import type { InvitePalette } from '@/content/invite-themes'

export const eventTypes = [
  { id: 'casamento', label: 'Casamento', icon: 'heart', theme: 'casamento', placeholder: 'Marina & Rafael' },
  { id: 'quinze', label: '15 anos', icon: 'crown', theme: 'quinze', placeholder: 'Valentina' },
  { id: 'aniversario', label: 'Aniversário', icon: 'cake', theme: 'aniversario', placeholder: 'André, 40 anos' },
  { id: 'cha', label: 'Chá de bebê / revelação', icon: 'baby', theme: 'cha', placeholder: 'Theo' },
  { id: 'batizado', label: 'Batizado', icon: 'church', theme: 'cha', placeholder: 'Helena' },
  { id: 'bodas', label: 'Bodas', icon: 'gem', theme: 'casamento', placeholder: 'Lúcia & Antônio · 50 anos' },
  { id: 'formatura', label: 'Formatura', icon: 'graduation', theme: 'quinze', placeholder: 'Turma de Medicina 2027' },
  { id: 'corporativo', label: 'Corporativo', icon: 'briefcase', theme: 'corporativo', placeholder: 'Convenção Anual Acme' },
  { id: 'outro', label: 'Outro', icon: 'sparkles', theme: 'aniversario', placeholder: 'Quem ou o que vamos celebrar' },
] as const

export type EventTypeId = (typeof eventTypes)[number]['id']

export const guestRanges = [
  { id: 'ate-50', label: 'Até 50' },
  { id: '51-100', label: '51 a 100' },
  { id: '101-200', label: '101 a 200' },
  { id: '201-300', label: '201 a 300' },
  { id: '300+', label: 'Mais de 300' },
] as const

export type StyleOption = {
  id: string
  label: string
  description: string
  palette: InvitePalette | null
}

export const styles = [
  {
    id: 'classico',
    label: 'Clássico atemporal',
    description: 'Serifas, simetria e elegância que não envelhece.',
    palette: {
      paper: '#FBF8F2',
      ink: '#1F1B16',
      muted: '#6B6257',
      accent: '#7A5C3A',
      envelope: '#EFE6D6',
      envelopeShade: '#E0D3BD',
      seal: '#7A2E2E',
      sealInk: '#FBF8F2',
    },
  },
  {
    id: 'moderno',
    label: 'Moderno minimalista',
    description: 'Muito respiro, linhas retas e tipografia precisa.',
    palette: {
      paper: '#FFFFFF',
      ink: '#111111',
      muted: '#5F5F5F',
      accent: '#111111',
      envelope: '#EDEDED',
      envelopeShade: '#DADADA',
      seal: '#111111',
      sealInk: '#FFFFFF',
    },
  },
  {
    id: 'romantico',
    label: 'Romântico floral',
    description: 'Tons suaves, delicadeza e detalhes botânicos.',
    palette: {
      paper: '#FCF5F3',
      ink: '#3A2328',
      muted: '#7A5A60',
      accent: '#B5526A',
      envelope: '#F4DEDC',
      envelopeShade: '#E8C9C6',
      seal: '#B5526A',
      sealInk: '#FCF5F3',
    },
  },
  {
    id: 'rustico',
    label: 'Rústico natural',
    description: 'Texturas orgânicas, verdes e tons de terra.',
    palette: {
      paper: '#F6F1E7',
      ink: '#2E2A20',
      muted: '#6A6250',
      accent: '#5C6B3C',
      envelope: '#E6DCC6',
      envelopeShade: '#D6C9AC',
      seal: '#8B5A2B',
      sealInk: '#F6F1E7',
    },
  },
  {
    id: 'glamour',
    label: 'Glamour noturno',
    description: 'Fundo escuro, brilho discreto e clima de gala.',
    palette: {
      paper: '#14141C',
      ink: '#F3EFE6',
      muted: '#A9A49A',
      accent: '#C9B37E',
      envelope: '#22222E',
      envelopeShade: '#2C2C3A',
      seal: '#C9B37E',
      sealInk: '#14141C',
    },
  },
  {
    id: 'divertido',
    label: 'Divertido e colorido',
    description: 'Cores vivas, ritmo e muita personalidade.',
    palette: {
      paper: '#FFF8EC',
      ink: '#1E1B3A',
      muted: '#5A5677',
      accent: '#D9452E',
      envelope: '#FFE2B8',
      envelopeShade: '#FFD08A',
      seal: '#3D5AFE',
      sealInk: '#FFF8EC',
    },
  },
  {
    id: 'exclusivo',
    label: 'Quero algo totalmente exclusivo',
    description: 'Partimos do zero, a partir da sua história.',
    palette: null,
  },
] as const satisfies readonly StyleOption[]

export type StyleId = (typeof styles)[number]['id']

export const featureOptions = [
  { id: 'envelope', label: 'Envelope animado' },
  { id: 'musica', label: 'Música' },
  { id: 'contagem', label: 'Contagem regressiva' },
  { id: 'mapa', label: 'Mapa' },
  { id: 'rsvp', label: 'Confirmação de presença' },
  { id: 'acompanhantes', label: 'Lista de convidados com acompanhantes' },
  { id: 'presentes', label: 'Presentes / Pix' },
  { id: 'manual', label: 'Manual do convidado' },
  { id: 'galeria', label: 'Galeria de fotos' },
  { id: 'historia', label: 'Nossa história' },
  { id: 'individual', label: 'Convite individual por convidado' },
  { id: 'qrcode', label: 'QR Code de entrada' },
] as const

export type FeatureId = (typeof featureOptions)[number]['id']

const essentials: FeatureId[] = ['envelope', 'musica', 'contagem', 'mapa', 'rsvp']

export const defaultFeaturesByEvent: Record<EventTypeId, FeatureId[]> = {
  casamento: [...essentials, 'acompanhantes', 'presentes', 'manual', 'galeria', 'historia'],
  quinze: [...essentials, 'acompanhantes', 'presentes', 'galeria'],
  aniversario: [...essentials, 'presentes'],
  cha: [...essentials, 'presentes'],
  batizado: [...essentials, 'manual'],
  bodas: [...essentials, 'galeria', 'historia'],
  formatura: [...essentials, 'acompanhantes', 'manual', 'qrcode'],
  corporativo: ['envelope', 'contagem', 'mapa', 'rsvp', 'manual', 'individual', 'qrcode'],
  outro: essentials,
}

export const levels = [
  { id: 'elegante', label: 'Elegante', description: 'Um convite lindo e funcional, com o essencial muito bem-feito.' },
  { id: 'interativo', label: 'Interativo', description: 'Mais seções, animações, fotos e recursos para o convidado.' },
  { id: 'exclusivo', label: 'Exclusivo', description: 'Projeto autoral, criado do zero, com experiência completa.' },
  { id: 'recomendacao', label: 'Quero uma recomendação', description: 'Vocês me indicam o melhor caminho.' },
] as const

export const deadlines = [
  { id: '1-semana', label: 'Em até 1 semana' },
  { id: '2-semanas', label: 'Em até 2 semanas' },
  { id: '1-mes', label: 'Em até 1 mês' },
  { id: 'sem-pressa', label: 'Sem pressa' },
] as const

export const contactPreferences = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'email', label: 'E-mail' },
  { id: 'ligacao', label: 'Ligação' },
] as const

export const sources = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'indicacao', label: 'Indicação' },
  { id: 'google', label: 'Google' },
  { id: 'outro', label: 'Outro' },
] as const

export const wizardSteps = ['O evento', 'O estilo', 'A experiência', 'Contato', 'Revisão'] as const

export const referenceUpload = {
  maxFiles: 3,
  maxBytes: 5 * 1024 * 1024,
  types: ['image/jpeg', 'image/png', 'image/webp'],
}
