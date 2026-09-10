import type { HeroBlock as HeroBlockType } from "../../server/types";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function Hero({ block }: { block: HeroBlockType }) {
  return (
    <section className="py-24 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {block.badge && (
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200">
                {block.badge}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              {block.title}
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              {block.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={block.ctaLink}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30 transition-all"
              >
                {block.ctaText}
                <span className="ml-2 text-xl">→</span>
              </a>

              {block.secondaryCtaText && (
                <a
                  href="#program"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-semibold hover:border-indigo-300 hover:text-indigo-700 transition-all"
                >
                  {block.secondaryCtaText}
                </a>
              )}
            </div>
          </div>

          <div className="relative">
            {/* Container owns the geometry: fixed ratio + overflow clip.
                Any native image ratio is cropped, never stretches the block. */}
            <div className="relative aspect-[4/3] w-full max-w-lg mx-auto overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xl">
              {/* Fallback layer: visible while loading and if hotlink dies */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                [Иллюстрация]
              </div>
              <img
                src={HERO_IMAGE_URL}
                alt="Ноутбук и блокнот на рабочем столе"
                width={1200}
                height={900}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
