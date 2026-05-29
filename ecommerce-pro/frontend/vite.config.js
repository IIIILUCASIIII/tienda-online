import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Reemplaza 'tienda-online' por el nombre exacto de tu repositorio en GitHub
  base: '/tienda-online/', 
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true
  }
});