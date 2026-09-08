import type { Config } from 'vike/types'
import vikeReactConfig from 'vike-react/config'

// Глобальный конфиг Vike.
// vike-react подключается через `extends` — это новая модель Vike 0.4.266+,
// где extensions указываются в +config.ts (а не в vite.config.ts).
// Без extends vike-react настройки `ssr`, `Layout` не распознаются.
export default {
  extends: [vikeReactConfig],
  ssr: true,
} satisfies Config
