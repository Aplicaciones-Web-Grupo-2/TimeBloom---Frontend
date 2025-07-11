import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  // Para producción sirve directamente desde la raíz:
  base: './',
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
})
