import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueObserveVisibility from 'vue-observe-visibility'


// https://vitejs.dev/config/
export default defineConfig({
  base:'/Buzz/',
  plugins: [vue(),VueObserveVisibility],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
