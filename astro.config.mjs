import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Esto asegura que Twitch no bloquee mini-assets inline
      assetsInlineLimit: 0, 
    },
  },
  // HEMOS ELIMINADO LA SECCIÓN EXPERIMENTAL DE AQUÍ
});