import type { FooterBlock as FooterBlockType } from '../../server/types'

export function FooterBlock({ block }: { block: FooterBlockType }) {
  return (
    <footer className="py-12 bg-slate-950 text-slate-400">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <div className="text-xl font-bold text-white">IT Курсы</div>
          <p className="mt-3 text-sm leading-relaxed">{block.description}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
            Разделы
          </h4>
          <ul className="space-y-2 text-sm">
            {block.links.map((l, i) => (
              <li key={i}>
                <a href={l.href} className="hover:text-white transition">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
            Соцсети
          </h4>
          <ul className="space-y-2 text-sm">
            {block.socials.map((s, i) => (
              <li key={i}>
                <a
                  href={s.href}
                  className="hover:text-white transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} {block.copyright}</span>
        <span>Сделано на Vike + Hono + Bun</span>
      </div>
    </footer>
  )
}
