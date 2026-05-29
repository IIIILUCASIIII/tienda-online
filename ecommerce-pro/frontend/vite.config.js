import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración corporativa blindada para GitHub Codespaces
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite que Codespaces transmita el contenido
    port: 5173,
    strictPort: true
  }
});