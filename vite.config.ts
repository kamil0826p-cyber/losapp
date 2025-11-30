import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      firebaseConfig: fileURLToPath(new URL('./firebase.ts', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Firebase packages in separate chunk
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          // Vendor libraries
          vendor: ['vue', 'vue-router', 'pinia'],
          // Utilities and helpers
          utils: ['axios', 'nprogress'],
        },
      },
    },
    // Recommended chunk size
    chunkSizeWarningLimit: 1000,
  },
})
