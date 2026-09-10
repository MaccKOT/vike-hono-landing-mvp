import { useState } from "react";
import type { ProgramBlock as ProgramBlockType } from "../../server/types";

export function Program({ block }: { block: ProgramBlockType }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="program" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            {block.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {block.duration} · {block.modules.length} модулей
          </p>
        </div>

        <div className="space-y-4">
          {block.modules.map((m, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl border-2 border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-base">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-slate-900 text-lg">
                      {m.title}
                    </span>
                  </span>
                  <span
                    className={`text-slate-400 text-2xl transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <ul className="px-6 pb-6 pt-2 bg-slate-50 space-y-3 border-t border-slate-200">
                    {m.lessons.map((lesson, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-base text-slate-700"
                      >
                        <span className="text-indigo-500 mt-1 flex-shrink-0">
                          •
                        </span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
