import { useState } from 'react'
import type { ProgramBlock as ProgramBlockType } from '../../server/types'

export function Program({ block }: { block: ProgramBlockType }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="program" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
          {block.title}
        </h2>
        <p className="mt-3 text-center text-slate-500">
          {block.duration} · {block.modules.length} модулей
        </p>

        <div className="mt-10 space-y-3">
          {block.modules.map((m, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center text-sm">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-semibold text-slate-900">{m.title}</span>
                  </span>
                  <span
                    className={`text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <ul className="px-6 pb-5 pt-1 bg-slate-50 space-y-2 border-t border-slate-100">
                    {m.lessons.map((lesson, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <span className="text-indigo-500 mt-0.5">•</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
