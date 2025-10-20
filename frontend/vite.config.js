import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'localhost',
      'aiverse-1-yz9e.onrender.com',
      '.onrender.com'
    ],
    watch: {
      usePolling: true
    }
  }
})
