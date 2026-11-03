import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Update to '/your-subdirectory/' if deploying in a subdirectory
  plugins: [react()],
  define: {
    'process.env': {}, // Optional: for backward compatibility
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist', // Default build output directory
  },
  server: {
    port: 5180,
    strictPort: true,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
