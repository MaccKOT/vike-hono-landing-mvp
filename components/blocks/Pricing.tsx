import type { PricingBlock as PricingBlockType } from '../../server/types'

export function Pricing({ block }: { block: PricingBlockType }) {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">{block.title}</h2>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {block.plans.map((plan, i) => {
            const isHi = plan.highlighted
            return (
              <div
                key={i}
                className={`relative rounded-2xl p-7 border transition ${
                  isHi
                    ? 'bg-gradient-to-br from-indigo-500 to-violet-600 border-indigo-400 shadow-2xl shadow-indigo-500/30 scale-100 md:scale-105'
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                }`}
              >
                {isHi && (
                  <span className="absolute -top-3 right-5 px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-bold">
                    Популярный
                  </span>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-white/70 text-sm">/ {plan.period}</span>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className={isHi ? 'text-amber-300' : 'text-emerald-400'}>
                        ✓
                      </span>
                      <span className="text-white/85">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className={`mt-7 block text-center px-5 py-3 rounded-xl font-semibold transition ${
                    isHi
                      ? 'bg-white text-indigo-700 hover:bg-slate-100'
                      : 'bg-indigo-500 text-white hover:bg-indigo-400'
                  }`}
                >
                  {plan.ctaText}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
