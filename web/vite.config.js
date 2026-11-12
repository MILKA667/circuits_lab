import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // или '127.0.0.1'
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  }
})
