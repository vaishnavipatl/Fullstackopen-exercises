import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',   // force bind to localhost (important for Cypress)
    port: 5173,          // force Vite to stay on 5173 (no auto-switch to random port)
    strictPort: true,    // if 5173 is busy, fail — do not auto-switch to 5174 etc
    proxy: {
      "/api": {
        target: "http://localhost:3001",  // ✅ correct backend port (3001)
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js',
  }
})
