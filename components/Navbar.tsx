import { useState } from "react";

const links = [
  { href: "#why", label: "Почему курс" },
  { href: "#program", label: "Программа" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-bold text-slate-900 tracking-tight">
          course<span className="text-indigo-600">.dev</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 hover:text-indigo-700 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#cta"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
          >
            Записаться
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700"
            aria-expanded={open}
            aria-label="Меню"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-slate-700 hover:text-indigo-700"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="block text-center px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Записаться
          </a>
        </nav>
      )}
    </header>
  );
}
