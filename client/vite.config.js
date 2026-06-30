import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/C2B_PROJECT/',
  server: { port: 3000, proxy: { '/api': 'http://localhost:5000' } }
});
