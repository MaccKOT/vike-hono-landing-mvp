import { useState } from 'react'
import type { CTABlock as CTABlockType } from '../../server/types'

export function CTA({ block }: { block: CTABlockType }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      // Заглушка: в прод тут fetch('/api/leads', { method: 'POST', ... })
      // или отправка в CRM. Сейчас — имитируем задержку.
      await new Promise((r) => setTimeout(r, 600))
      console.log('lead', form)
      setStatus('sent')
      setForm({ name: '', email: '', phone: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">{block.title}</h2>
        <p className="mt-3 text-center text-white/85 max-w-xl mx-auto">
          {block.subtitle}
        </p>

        {status === 'sent' ? (
          <div className="mt-10 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-center">
            <div className="text-4xl mb-2">✅</div>
            <h3 className="text-xl font-semibold">Заявка отправлена</h3>
            <p className="text-white/80 mt-1 text-sm">
              Менеджер свяжется с вами в течение рабочего дня.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-sm"
            >
              Отправить ещё
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-10 grid sm:grid-cols-3 gap-3"
            aria-label="Форма заявки"
          >
            <input
              required
              type="text"
              placeholder="Имя"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            <input
              required
              type="tel"
              placeholder="Телефон"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="sm:col-span-3 mt-2 px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-slate-100 disabled:opacity-60 transition"
            >
              {status === 'sending' ? 'Отправляем…' : 'Записаться на курс'}
            </button>
            {status === 'error' && (
              <p className="sm:col-span-3 text-sm text-amber-200 text-center">
                Что-то пошло не так. Попробуйте ещё раз.
              </p>
            )}
            <p className="sm:col-span-3 text-xs text-white/60 text-center">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
