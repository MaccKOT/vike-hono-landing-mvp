import type { SkillsBlock as SkillsBlockType } from '../../server/types'

export function Skills({ block }: { block: SkillsBlockType }) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
          {block.title}
        </h2>
        {block.subtitle && (
          <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
            {block.subtitle}
          </p>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {block.skills.map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-medium shadow-sm hover:border-indigo-300 hover:text-indigo-700 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
