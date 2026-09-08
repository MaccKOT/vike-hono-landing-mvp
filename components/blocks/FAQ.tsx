import { useState } from 'react'
import type { FAQBlock as FAQBlockType } from '../../server/types'

export function FAQ({ block }: { block: FAQBlockType }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
          {block.title}
        </h2>

        <div className="mt-10 space-y-3">
          {block.questions.map((qa, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-slate-50 transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-slate-900 pr-4">{qa.q}</span>
                  <span
                    className={`text-slate-400 flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3 bg-slate-50">
                    {qa.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
