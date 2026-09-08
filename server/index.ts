// Hono + Vike SSR + Bun runtime.
//
// Режимы:
//   - dev:  `bun run dev` → `vite dev` (Vike SSR dev server, HMR).
//          server/index.ts в dev не используется (Vike сам обслуживает).
//   - prod: `bun run build` → собирает клиент в dist/client/ + SSR в dist/server/
//           `bun run start` → этот файл: Hono + renderPage из Vike + статика
//                            из dist/client/.
//
// Кэширование блоков: см. server/cache.ts (TTL + mtime + ручной invalidate).
// Кэширование HTTP: ETag на базе состояния кэша.

import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { readFile, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { loadAllBlocks, reloadBlocks } from './content-loader'
import { cacheStats, invalidate } from './cache'

const isProd = process.env.NODE_ENV === 'production'
const PORT = Number(process.env.PORT ?? 3000)
const ROOT = process.cwd()
const DIST_CLIENT = resolve(ROOT, 'dist/client')

const app = new Hono()

// ---------- Лог ----------

app.use('*', async (c, next) => {
  const t0 = Date.now()
  await next()
  const ms = Date.now() - t0
  if (!c.req.path.startsWith('/@') && !c.req.path.startsWith('/node_modules')) {
    console.log(`[${c.req.method}] ${c.req.path} -> ${c.res.status} (${ms}ms)`)
  }
})

// ---------- API ----------

app.get('/api/blocks', async (c) => {
  const blocks = await loadAllBlocks()
  return c.json({ blocks })
})

app.post('/api/invalidate', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const secret = c.req.header('x-cms-secret')
  if (process.env.CMS_SECRET && secret !== process.env.CMS_SECRET) {
    return c.json({ ok: false, error: 'unauthorized' }, 401)
  }
  const count = await reloadBlocks()
  invalidate()
  return c.json({ ok: true, invalidated: count, requested: body?.path ?? 'all' })
})

app.get('/api/health', (c) => c.json({ ok: true, ts: Date.now() }))
app.get('/api/cache-stats', (c) => c.json(cacheStats()))

// ---------- Статика клиента (только в prod) ----------

if (isProd) {
  app.use('/assets/*', serveStatic({ root: './dist/client' }))
  app.use('/favicon.svg', serveStatic({ root: './dist/client' }))
  // global.css из /public
  app.use('/global.css', serveStatic({ root: './public' }))

  // ---------- SSR-роуты через Vike renderPage ----------

  // Загружаем собранный SSR-бандл: его side-effect — setGlobalContext_prodBuildEntry
  // После этого renderPage из vike/server работает в prod-режиме.
  // Используем абсолютный путь, чтобы Bun резолвил корректно.
  const entryPath = resolve(ROOT, 'dist/server/entry.mjs')
  try {
    await stat(entryPath)
  } catch {
    throw new Error(
      `SSR-бандл не найден по ${entryPath}. Запустите сначала \`bun run build\`.`,
    )
  }
  await import(/* @vite-ignore */ entryPath)

  const { renderPage } = await import('vike/server')

  app.get('*', async (c) => {
    const url = new URL(c.req.url)

    // ETag для быстрого 304
    const etagInput = url.pathname + JSON.stringify(cacheStats())
    const etag = '"' + createHash('sha1').update(etagInput).digest('hex') + '"'
    if (c.req.header('if-none-match') === etag) {
      return c.body(null, 304, { ETag: etag })
    }

    const pageContext = await renderPage({
      urlOriginal: url.pathname + url.search,
      headersOriginal: Object.fromEntries(c.req.raw.headers),
    } as any)

    const { httpResponse } = pageContext
    if (!httpResponse) {
      return c.text('Not found', 404)
    }

    // Пробрасываем заголовки Vike (content-type и т.д.)
    const out: Record<string, string> = { ETag: etag }
    for (const [k, v] of httpResponse.headers) {
      if (k.toLowerCase() === 'content-length') continue
      out[k] = v
    }

    return c.body(httpResponse.body, httpResponse.statusCode as 200, out)
  })
} else {
  // В dev — заглушка: рекомендуем `bun run dev`
  app.get('*', (c) => {
    return c.text(
      'В dev-режиме запустите `bun run dev` для SSR (Vite dev server).\n' +
        'Для prod используйте `bun run build && bun run start`.',
      200,
    )
  })
}

// ---------- Запуск через Bun ----------

console.log(`🚀 IT-курсы лендинг — ${isProd ? 'PROD' : 'DEV'} режим, порт ${PORT}`)

Bun.serve({
  port: PORT,
  hostname: '0.0.0.0',
  fetch: app.fetch,
})

