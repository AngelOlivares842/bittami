import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite'; // Importamos el plugin de Vite

export default defineConfig({
  integrations: [react()], // Quitamos 'tailwind()' de aquí
  vite: {
    plugins: [tailwindcss()], // Lo añadimos aquí
  },
});