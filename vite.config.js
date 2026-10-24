import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative base for 100% offline standalone file & Electron loading
  server: {
    port: 5858, // Dedicated non-conflicting port (frees 5173 for other projects)
    strictPort: false
  }
})
