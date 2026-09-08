import React from 'react'

// vike-react 19 Layout: оборачивает страницу, рендер происходит внутри onRenderHtml.
// HTML/head/body обёртка управляется vike-react, мы только передаём children.
//
// Head-теги (Tailwind CDN, favicon, global.css) кладём в начало —
// React отрендерит их, и в DOM они окажутся дочерними элементами body.
// Tailwind JIT найдёт классы при загрузке скрипта.

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="/global.css" />
      <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </main>
    </>
  )
}
