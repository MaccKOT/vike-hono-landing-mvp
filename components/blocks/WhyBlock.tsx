import type { WhyBlock as WhyBlockType } from "../../server/types";

export function WhyBlock({ block }: { block: WhyBlockType }) {
  return (
    <section id="why" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            {block.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {block.items.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl bg-white border border-slate-200 p-8 hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
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
  );
}
