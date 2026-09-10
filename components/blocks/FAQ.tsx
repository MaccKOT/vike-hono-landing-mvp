import { useState } from "react";
import type { FAQBlock as FAQBlockType } from "../../server/types";

export function FAQ({ block }: { block: FAQBlockType }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            {block.title}
          </h2>
        </div>

        <div className="space-y-4">
          {block.questions.map((qa, i) => {
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
                  <span className="font-semibold text-slate-900 text-base pr-4">
                    {qa.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-xl font-bold transition-all ${
                      isOpen ? "bg-indigo-100 text-indigo-600 rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 text-base leading-relaxed border-t border-slate-200 pt-4 bg-slate-50">
                    {qa.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
