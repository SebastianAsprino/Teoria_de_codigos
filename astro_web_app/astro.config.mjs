import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://teoria-de-codigo.asprino.tech',
  integrations: [react()]
});