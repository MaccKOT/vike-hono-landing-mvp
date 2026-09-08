import type { HeroBlock as HeroBlockType } from '../../server/types'

export function Hero({ block }: { block: HeroBlockType }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          {block.badge && (
            <span className="inline-block px-3 py-1 mb-5 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/10 backdrop-blur border border-white/20">
              {block.badge}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            {block.title}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-xl">
            {block.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={block.ctaLink}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold shadow-lg shadow-indigo-900/30 hover:bg-slate-100 transition"
            >
              {block.ctaText}
              <span className="ml-2">→</span>
            </a>
            {block.secondaryCtaText && (
              <a
                href="#program"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition"
              >
                {block.secondaryCtaText}
              </a>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square max-w-md mx-auto rounded-3xl bg-white/10 backdrop-blur border border-white/20 p-6 shadow-2xl">
            <div className="grid grid-cols-3 gap-3 h-full">
              {['💻', '⚛️', '🚀', '🧠', '🛠️', '🎯', '📊', '🔒', '✨'].map((emoji, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-3xl"
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
