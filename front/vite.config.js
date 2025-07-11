import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/TimeBloom---Frontend/',    // ← nombre exacto de tu repo con slash al inicio y al final
  plugins: [vue()],
})
