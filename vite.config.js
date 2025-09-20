import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // clean imports like @/components
    },
  },
  build: {
    sourcemap: false, // keep build light
    chunkSizeWarningLimit: 1000, // avoid warnings for large libs
    outDir: 'dist', // standard output dir
    minify: 'esbuild', // fast + reliable minification
  },
  server: {
    port: 5173, // default but explicit
    open: true, // auto-open browser
    cors: true, // avoid CORS errors in dev
  },
})

