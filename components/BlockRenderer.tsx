import type { Block } from '../server/types'
import { Hero } from './blocks/Hero'
import { WhyBlock } from './blocks/WhyBlock'
import { Skills } from './blocks/Skills'
import { Program } from './blocks/Program'
import { ForWhom } from './blocks/ForWhom'
import { Pricing } from './blocks/Pricing'
import { FAQ } from './blocks/FAQ'
import { CTA } from './blocks/CTA'
import { FooterBlock } from './blocks/FooterBlock'

// Центральный диспетчер блоков. Когда подключите CMS — в этом файле
// ничего не поменяется, он по-прежнему мапит id блока на React-компонент.
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.id) {
    case 'hero':
      return <Hero block={block} />
    case 'why':
      return <WhyBlock block={block} />
    case 'skills':
      return <Skills block={block} />
    case 'program':
      return <Program block={block} />
    case 'for-whom':
      return <ForWhom block={block} />
    case 'pricing':
      return <Pricing block={block} />
    case 'faq':
      return <FAQ block={block} />
    case 'cta':
      return <CTA block={block} />
    case 'footer':
      return <FooterBlock block={block} />
    default: {
      // На случай неизвестного id (CMS прислала что-то новое) —
      // просто отрендерим тело как HTML, чтобы ничего не упало.
      const fallback = block as unknown as { id: string; bodyHtml: string }
      return (
        <section className="py-12">
          <div
            className="max-w-4xl mx-auto px-6 prose prose-slate"
            dangerouslySetInnerHTML={{ __html: fallback.bodyHtml ?? '' }}
          />
        </section>
      )
    }
  }
}
