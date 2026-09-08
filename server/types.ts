// Типы, общие для сервера и клиента. Подключаются из обоих контекстов,
// поэтому только типы, никакого рантайм-кода с fs.

export type BlockId =
  | 'hero'
  | 'why'
  | 'skills'
  | 'program'
  | 'for-whom'
  | 'pricing'
  | 'faq'
  | 'cta'
  | 'footer'

export interface BaseBlock {
  id: BlockId
  order: number
  // Markdown-тело блока (уже отрендерено в HTML на сервере)
  bodyHtml: string
}

export interface HeroBlock extends BaseBlock {
  id: 'hero'
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  badge?: string
}

export interface WhyBlock extends BaseBlock {
  id: 'why'
  title: string
  items: { icon: string; title: string; description: string }[]
}

export interface SkillsBlock extends BaseBlock {
  id: 'skills'
  title: string
  subtitle?: string
  skills: string[]
}

export interface ProgramBlock extends BaseBlock {
  id: 'program'
  title: string
  duration: string
  modules: {
    title: string
    lessons: string[]
  }[]
}

export interface ForWhomBlock extends BaseBlock {
  id: 'for-whom'
  title: string
  items: { emoji: string; title: string; description: string }[]
}

export interface PricingBlock extends BaseBlock {
  id: 'pricing'
  title: string
  plans: {
    name: string
    price: string
    period: string
    features: string[]
    ctaText: string
    highlighted?: boolean
  }[]
}

export interface FAQBlock extends BaseBlock {
  id: 'faq'
  title: string
  questions: { q: string; a: string }[]
}

export interface CTABlock extends BaseBlock {
  id: 'cta'
  title: string
  subtitle: string
}

export interface FooterBlock extends BaseBlock {
  id: 'footer'
  description: string
  links: { label: string; href: string }[]
  socials: { label: string; href: string }[]
  copyright: string
}

export type Block =
  | HeroBlock
  | WhyBlock
  | SkillsBlock
  | ProgramBlock
  | ForWhomBlock
  | PricingBlock
  | FAQBlock
  | CTABlock
  | FooterBlock
