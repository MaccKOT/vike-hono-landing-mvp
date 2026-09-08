import type { WhyBlock as WhyBlockType } from '../../server/types'

export function WhyBlock({ block }: { block: WhyBlockType }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
          {block.title}
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {block.items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-slate-50 border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-200 transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
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
