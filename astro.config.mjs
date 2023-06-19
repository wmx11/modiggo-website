import { defineConfig, sharpImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  site: 'https://modiggo.com',
  compressHTML: true,
  integrations: [tailwind(), mdx(), svelte(), partytown({ config: { forward:["dataLayer.push"] }})],
  image: {
    service: sharpImageService(),
  },
  build: {
    inlineStylesheets: 'auto'
  }
});