import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // ou '0.0.0.0'
    port: 5173, // opcional, se quiser fixar a porta
  },
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Krediti',
        short_name: 'Krediti',
        theme_color: '#2B7FFF',
        icons: [
          {
            src: '/assets/img/pwa/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/img/pwa/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
