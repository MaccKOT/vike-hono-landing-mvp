import type { ForWhomBlock as ForWhomBlockType } from '../../server/types'

export function ForWhom({ block }: { block: ForWhomBlockType }) {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
          {block.title}
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {block.items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-5xl mb-3">{item.emoji}</div>
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
