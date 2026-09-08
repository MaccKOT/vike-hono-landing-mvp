// In-memory кэш с инвалидацией по mtime и TTL.
// Стратегия:
//   1) при каждом обращении смотрим stat() файла — если mtime поменялся,
//      считаем кэш протухшим (даже если TTL не вышел);
//   2) поверх — потолок TTL 60 сек, чтобы при большом потоке запросов
//      не долбить fs каждую миллисекунду;
//   3) ручной invalidate() — дёргается из /api/invalidate (webhook CMS).
//
// Когда подключите реальный CMS (Strapi, Sanity, Directus) — этот модуль
// меняется на HTTP-клиент + Redis, остальной код не трогается.

import { stat } from 'node:fs/promises'

interface CacheEntry<T> {
  data: T
  mtimeMs: number
  loadedAt: number
}

const store = new Map<string, CacheEntry<unknown>>()
const DEFAULT_TTL_MS = 60_000

export async function getCached<T>(
  filePath: string,
  loader: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL_MS,
): Promise<T> {
  const now = Date.now()
  const existing = store.get(filePath) as CacheEntry<T> | undefined

  if (existing && now - existing.loadedAt < ttlMs) {
    try {
      const s = await stat(filePath)
      if (s.mtimeMs === existing.mtimeMs) {
        return existing.data
      }
    } catch {
      // файл мог быть удалён — перезагрузимся
    }
  }

  const fresh = await loader()
  let mtimeMs = now
  try {
    const s = await stat(filePath)
    mtimeMs = s.mtimeMs
  } catch {
    /* keep mtimeMs = now */
  }

  store.set(filePath, { data: fresh, mtimeMs, loadedAt: now })
  return fresh
}

export function invalidate(key?: string): number {
  if (key) {
    const had = store.delete(key)
    return had ? 1 : 0
  }
  const size = store.size
  store.clear()
  return size
}

export function cacheStats() {
  return {
    size: store.size,
    keys: [...store.keys()],
  }
}
