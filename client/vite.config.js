import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // eslint-disable-next-line no-unused-vars
        onProxyReq(proxyReq, req, _res) {
          console.log('Proxy request:', req.method, req.url);
        },
      },
    },
  },
});
