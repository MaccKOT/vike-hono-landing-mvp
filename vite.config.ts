import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

// Vite + Vike + vike-react.
// vike-react подключается через `extends: [vikeReactConfig]` в pages/+config.ts
// (новая модель Vike 0.4.266+). Здесь — только Vite-плагины.
//
// В dev: `vite dev` поднимает SSR dev server на 5173.
// В prod: `vite build` собирает клиент + SSR-сервер в dist/.

export default defineConfig({
  plugins: [vike(), react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'pages/index/+Page.tsx',
    },
  },
  server: {
    port: 5173,
  },
})
