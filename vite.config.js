import { defineConfig } from 'vite'

export default defineConfig({
  base: '/posgrado-frontend/', // <- aquí va el nombre exacto de tu repo
  server: {
    port: 5173,
    open: true
  }
})
