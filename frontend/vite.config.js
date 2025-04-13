import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 4173, // or any fallback
    allowedHosts: ['category-management-1-95g0.onrender.com']
  }
});