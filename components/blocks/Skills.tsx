import type { SkillsBlock as SkillsBlockType } from "../../server/types";

export function Skills({ block }: { block: SkillsBlockType }) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            {block.title}
          </h2>
          {block.subtitle && (
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              {block.subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {block.skills.map((skill, i) => (
            <span
              key={i}
              className="px-6 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-medium shadow-sm hover:border-indigo-300 hover:text-indigo-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
