import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './dist'),
    },
  },
  server: {
    port: 5173,
    cors: true,
    // Optional: Set up a proxy if you need it
    proxy: {
      '/api': {
        target: 'https://sagip-app.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
    },
  },
});