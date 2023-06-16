import { defineConfig, sharpImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  site: 'https://modiggo.com',
  compressHTML: true,
  integrations: [tailwind(), mdx(), svelte()],
  image: {
    service: sharpImageService(),
  },
  build: {
    inlineStylesheets: 'auto'
  }
});