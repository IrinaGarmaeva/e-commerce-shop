import react from '@vitejs/plugin-react';
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // proxy requests prefixed '/api' and '/uploads'
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        secure: false,
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
      }
    },
  },
})
