import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for the Charlesville blog.
// This config enables the React plugin and leaves the rest of the
// configuration at Vite's sensible defaults. TailwindCSS is picked
// up via PostCSS and does not need to be explicitly configured here.

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
