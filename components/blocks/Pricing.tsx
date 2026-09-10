import type { PricingBlock as PricingBlockType } from "../../server/types";

export function Pricing({ block }: { block: PricingBlockType }) {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            {block.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {block.plans.map((plan, i) => {
            const isHi = plan.highlighted;
            return (
              <div
                key={i}
                className={`relative rounded-2xl p-8 border-2 transition-all ${
                  isHi
                    ? "bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-400 shadow-2xl shadow-indigo-600/30 scale-105"
                    : "bg-white border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {isHi && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-900 text-sm font-bold shadow-lg">
                    Популярный
                  </span>
                )}

                <h3
                  className={`text-2xl font-bold ${isHi ? "text-white" : "text-slate-900"}`}
                >
                  {plan.name}
                </h3>

                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    className={`text-5xl font-extrabold ${isHi ? "text-white" : "text-slate-900"}`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-base ${isHi ? "text-white/80" : "text-slate-500"}`}
                  >
                    / {plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className={`flex-shrink-0 mt-1 ${isHi ? "text-amber-300" : "text-emerald-500"}`}
                      >
                        ✓
                      </span>
                      <span
                        className={`text-base ${isHi ? "text-white/90" : "text-slate-700"}`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  className={`mt-10 block text-center px-6 py-4 rounded-xl font-semibold text-base transition-all ${
                    isHi
                      ? "bg-white text-indigo-700 hover:bg-slate-100 shadow-lg"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  {plan.ctaText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
