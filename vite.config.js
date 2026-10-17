import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this repo from https://onyxterminal.github.io/onyxterm-web/,
// so the built bundle has to be rooted one level down. The deploy workflow sets
// BASE_PATH; local dev stays at /.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})