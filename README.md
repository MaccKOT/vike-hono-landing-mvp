# IT Курсы — MVP лендинг (Vike + Hono + Bun)

Лендинг для IT-курсов. SSR, MDX-контент как эмуляция CMS, кэширование
с инвалидацией по mtime + webhook'у.

## Стек

- **Vike** (0.4.266) — SSR-фреймворк поверх Vite
- **vike-react** (0.6.26) — React-интеграция для Vike (SSR + hydration)
- **Hono** (4.x) — backend. В проде обслуживает SSR + API + статику.
- **Bun** (1.4) — runtime для прода (`bun run server/index.ts`)
- **React 19** — UI
- **Tailwind CSS** — через официальный CDN (для MVP)
- **MDX** — формат хранения контент-блоков (frontmatter + markdown body)
- **gray-matter** + **marked** — парсинг MDX-файлов на сервере

> ⚠️ **Совместимость стека**: Vike 0.4.266 + vike-react 0.6.26 — это bleeding edge с нестабильной интеграцией.

## Структура

```
.
├── pages/                       # Vike-роутинг
│   ├── +config.ts               # SSR, extends vikeReact
│   ├── +Layout.tsx              # Обёртка страницы (children + head-теги)
│   └── index/
│       ├── +Page.tsx            # Маппит блоки на React-компоненты
│       └── +data.ts             # Server-only: loadAllBlocks()
├── components/blocks/           # React-компоненты для каждого типа блока
│   ├── Hero.tsx
│   ├── WhyBlock.tsx
│   ├── Skills.tsx
│   ├── Program.tsx
│   ├── ForWhom.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   └── FooterBlock.tsx
├── server/                      # Только prod (dev обслуживает Vite dev)
│   ├── index.ts                 # Hono app: API + SSR + static
│   ├── content-loader.ts        # Читает MDX из content/blocks
│   ├── cache.ts                 # In-memory кэш с TTL + mtime-инвалидацией
│   └── types.ts                 # Общие типы (Block, HeroBlock, ...)
├── content/blocks/              # MDX-файлы — "приход из CMS"
│   ├── 01-hero.mdx
│   ├── 02-why.mdx
│   └── ... 09-footer.mdx
├── public/                      # Статика (favicon, global.css)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Запуск

### Dev (Vite + Vike SSR dev server)

```bash
bun install
bun run dev
```

Откройте http://localhost:5173

> В dev API endpoints (Hono) **не работают** — это допустимое упрощение для MVP.
> Vite dev server обслуживает SSR-страницы через встроенный Vike. Когда понадобится
> API в dev — добавим Vite-плагин, который проксирует `/api/*` в Hono.

### Prod (Hono + Bun, без Vite middleware)

```bash
bun install
bun run build       # собирает клиент в dist/client/ и SSR в dist/server/
bun run start       # Hono + Bun.serve на порту 3000
```

Откройте http://localhost:3000

В prod Hono обслуживает:

- `/api/blocks`, `/api/health`, `/api/cache-stats`, `/api/invalidate` — API
- `/assets/*`, `/favicon.svg` — статика из `dist/client/`
- Всё остальное — SSR через Vike `renderPage()`

## API

- `GET  /api/blocks` — список всех блоков (для клиентских обновлений)
- `GET  /api/health` — health-check
- `GET  /api/cache-stats` — статистика in-memory кэша
- `POST /api/invalidate` — webhook от CMS. Сбрасывает кэш.
  Заголовок `x-cms-secret: $CMS_SECRET` (если задан в env).

Пример:

```bash
curl -X POST http://localhost:3000/api/invalidate \
  -H "x-cms-secret: my-secret" \
  -H "Content-Type: application/json" \
  -d '{}'
# {"ok":true,"invalidated":1,"requested":"all"}
```

## Как добавить новый блок

1. Создайте `content/blocks/10-my-new-block.mdx` с frontmatter:

   ```mdx
   ---
   id: my-block
   order: 10
   title: "Заголовок"
   items: [...]
   ---

   Markdown-тело блока.
   ```

2. Добавьте тип в `server/types.ts`:

   ```ts
   export interface MyBlock extends BaseBlock {
     id: 'my-block'
     title: string
     items: ...
   }

   export type Block = HeroBlock | ... | MyBlock
   ```

3. Создайте компонент `components/blocks/MyBlock.tsx`.

4. Добавьте case в `components/BlockRenderer.tsx`.

5. В dev — HMR подхватит. В prod — `bun run build && bun run start`,
   или быстрее: `curl -X POST .../api/invalidate` (но BlockRenderer не подхватится
   без перезапуска — для новых блоков нужен restart).

## Кэширование — что внутри

| Уровень           | Что кэшируется             | Инвалидация                                              |
| ----------------- | -------------------------- | -------------------------------------------------------- |
| Блоки (in-memory) | Парсинг MDX-файлов         | TTL 60s + `fs.stat` на mtime + webhook `/api/invalidate` |
| HTTP-ответ        | ETag на основе cacheStats  | `If-None-Match` → 304                                    |
| Vike SSR          | Внутренний кэш Vike по URL | Сам сбрасывается при изменении исходников                |

Подробнее про блоковый кэш: `server/cache.ts`.
Ключ кэша — путь к MDX-файлу. На каждом запросе проверяется mtime — если
контент-менеджер сохранил файл в CMS, кэш автоматически перечитается без рестарта.

## Что нужно сделать, чтобы переехать с MDX на реальный CMS

Замените реализацию `loadAllBlocks()` в `server/content-loader.ts`:

```ts
// Было: читаем MDX-файлы
const blocks = await getCached(path, () => parseBlock(name));

// Стало: HTTP-запрос к CMS
const res = await fetch(`https://cms.example.com/api/blocks`);
const blocks = await res.json();
```

Кэш переедет в Redis (ключ = путь в CMS, TTL = 60s).
Остальной код (типы, BlockRenderer, компоненты) — без изменений.

## Что порезано из референса для MVP

Чтобы сосредоточиться на коде, а не на вёрстке, в референсе оставил только то,
что формирует архитектуру. Убрано:

- "Партнёры" (список логотипов)
- "Бесплатные события" (календарь)
- "Истории студентов" (отзывы с фото)
- "Рецензенты Skillbox" (там был зарегистрированный товарный знак)
- "Помощь с трудоустройством" (была перегружена отзывами)

Оставлено: Hero, "Почему этот курс", "Что освоишь", "Программа" (аккордеон),
"Для кого", "Тарифы", "FAQ", CTA-форма, футер.

Все названия брендов/товарных знаков из референса удалены — это принципиально,
чтобы не нарушать копирайт.

## Замечания по стеку

- **Vike + Bun**: работает, но в dev идёт через Vite (Node), в prod — через
  Bun.serve. Не пытайтесь запускать `bun run server/index.ts` без `vite build`
  в проде — не найдёт SSR-бандл.
- **Tailwind CDN**: ок для MVP. На прод-нагрузке переехать на build-time Tailwind (меньше JS, JIT, purge).
- **MDX как CMS-эмулятор**: компромисс. В реальной CMS у контент-менеджера будет
  UI-форма, а у нас — yaml в файле. Контракт данных (frontmatter) — тот же.
- **vike-react 0.6.26 + Vike 0.4.266**: bleeding edge, документация отстаёт.
  Если будете апгрейдить — сначала прочтите vike.dev/migration/settings.
