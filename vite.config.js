import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// ✅ Load environment variables for flexible deployment (Vercel, Netlify, etc.)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        fastRefresh: true, // improved DX (developer experience)
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // clean import paths
      },
    },

    server: {
      port: parseInt(env.VITE_PORT || '5173'),
      open: true, // auto-opens browser
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      },
    },

    build: {
      sourcemap: env.VITE_SOURCEMAP === 'true', // enable sourcemap if needed
      outDir: 'dist',
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000,
      target: 'esnext', // ensures modern syntax support
      assetsInlineLimit: 4096, // improve performance
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'], // separates React bundle
          },
        },
      },
    },

    preview: {
      port: 4173,
      strictPort: true,
      open: true,
    },

    optimizeDeps: {
      include: ['react', 'react-dom'],
    },

    // 🚀 Silent mode for CI/CD logs and smoother deployment
    logLevel: 'info',
    clearScreen: false,
  };
});
