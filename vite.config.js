import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps the build portable — works both at a domain root and
// under a project sub-path (same rule the HumanPlus-1000 site was built on).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5174,
    host: true,
  },
})
