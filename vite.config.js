import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';  // ✅ Necesario para que path.resolve funcione

export default defineConfig({
  base: '/TimeBloom---Frontend/',  // ✅ Solo si lo estás desplegando en GitHub Pages o subcarpeta
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
});
